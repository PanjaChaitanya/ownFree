'use client';
import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  // Cached absolute offsets — populated once, recomputed on resize only
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Absolute offset from top of document — reads layout once, not in hot path
  const getAbsoluteOffset = useCallback((element) => {
    if (useWindowScroll) {
      // getBoundingClientRect + scrollY gives correct absolute position regardless of scroll
      return element.getBoundingClientRect().top + window.scrollY;
    }
    return element.offsetTop;
  }, [useWindowScroll]);

  const cacheOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scroller?.querySelector('.scroll-stack-end');

    cardOffsetsRef.current = cardsRef.current.map((card) => getAbsoluteOffset(card));
    endOffsetRef.current = endEl ? getAbsoluteOffset(endEl) : 0;
  }, [useWindowScroll, getAbsoluteOffset]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = useWindowScroll
      ? window.scrollY
      : (scrollerRef.current?.scrollTop ?? 0);
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : (scrollerRef.current?.clientHeight ?? 0);

    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPosPx = parsePercentage(scaleEndPosition, containerHeight);
    const endTop = endOffsetRef.current;
    const n = cards.length;

    // ── PASS 1: compute all transforms (pure math, zero DOM reads) ──
    const computed = new Array(n);
    for (let i = 0; i < n; i++) {
      const cardTop = cardOffsetsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd   = cardTop - scaleEndPosPx;
      const pinStart     = triggerStart;
      const pinEnd       = endTop - containerHeight / 2;

      const t = scrollTop < triggerStart ? 0
              : scrollTop > triggerEnd   ? 1
              : (scrollTop - triggerStart) / (triggerEnd - triggerStart);

      const scale    = 1 - t * (1 - (baseScale + i * itemScale));
      const rotation = rotationAmount ? i * rotationAmount * t : 0;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      computed[i] = {
        translateY: Math.round(translateY * 10) / 10,
        scale:      Math.round(scale * 1000) / 1000,
        rotation:   Math.round(rotation * 100) / 100,
      };
    }

    // ── PASS 2: write all transforms (zero DOM reads) ──
    const cache = lastTransformsRef.current;
    for (let i = 0; i < n; i++) {
      const card = cards[i];
      const c = computed[i];
      if (!card || !c) continue;

      const prev = cache.get(i);
      if (
        prev &&
        Math.abs(prev.translateY - c.translateY) <= 0.2 &&
        Math.abs(prev.scale - c.scale) <= 0.001 &&
        Math.abs(prev.rotation - c.rotation) <= 0.1
      ) continue;

      card.style.transform =
        `translate3d(0, ${c.translateY}px, 0) scale(${c.scale}) rotate(${c.rotation}deg)`;
      cache.set(i, c);
    }

    // Stack-complete callback
    if (n > 0) {
      const cardTop  = cardOffsetsRef.current[n - 1] ?? 0;
      const pinStart = cardTop - stackPosPx - itemStackDistance * (n - 1);
      const pinEnd   = endTop - containerHeight / 2;
      const isIn     = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isIn && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!isIn && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, useWindowScroll, onStackComplete, parsePercentage,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current = cards;

    // GPU layer setup — set once, never thrash
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.transformOrigin      = 'top center';
      card.style.backfaceVisibility   = 'hidden';
      card.style.webkitBackfaceVisibility = 'hidden';
      card.style.transform            = 'translate3d(0, 0, 0)';
    });

    // Cache offsets after layout settles — 200ms gives fonts/images time to paint
    const initTimer = setTimeout(() => {
      cacheOffsets();
      updateCardTransforms();
    }, 200);

    // Recompute cached offsets on resize only
    const onResize = () => { cacheOffsets(); updateCardTransforms(); };
    window.addEventListener('resize', onResize, { passive: true });

    let cleanup;

    if (useWindowScroll) {
      // Sync to Lenis via its custom event — no competing RAF loop
      const onScroll = () => updateCardTransforms();
      window.addEventListener('lenis-scroll', onScroll, { passive: true });
      // Native scroll fallback (for environments without Lenis)
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanup = () => {
        window.removeEventListener('lenis-scroll', onScroll);
        window.removeEventListener('scroll', onScroll);
      };
    } else {
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
      });
      lenis.on('scroll', updateCardTransforms);
      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      cleanup = () => {};
    }

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', onResize);
      cleanup();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) { lenisRef.current.destroy(); lenisRef.current = null; }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll,
    onStackComplete, updateCardTransforms, cacheOffsets,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-window' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
