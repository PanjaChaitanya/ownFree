'use client';
import { useEffect, useRef } from 'react';
import {
  Clock, Mesh, OrthographicCamera, PlaneGeometry,
  Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import './FloatingLines.css';

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);
  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;
  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) return baseColor;
  if (lineGradientCount == 1) return lineGradient[0];
  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled   = clampedT * float(lineGradientCount - 1);
  int   idx      = int(floor(scaled));
  float f        = fract(scaled);
  int   idx2     = min(idx + 1, lineGradientCount - 1);
  return mix(lineGradient[idx], lineGradient[idx2], f) * 0.5;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time       = iTime * animationSpeed;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + offset + x_movement) * amp;

  if (shouldBend) {
    vec2  d         = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);
  vec3 b   = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t  = fi / max(float(bottomLineCount - 1), 1.0);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      col += getLineColor(t, b) * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t  = fi / max(float(middleLineCount - 1), 1.0);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      col += getLineColor(t, b) * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi, baseUv, mouseUv, interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t  = fi / max(float(topLineCount - 1), 1.0);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2  ruv   = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += getLineColor(t, b) * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }

  // Only line-center pixels are opaque; background stays fully transparent
  float brightness = col.r * 0.299 + col.g * 0.587 + col.b * 0.114;
  float alpha      = smoothstep(0.04, 0.28, brightness);
  fragColor = vec4(col, alpha);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

function hexToVec3(hex) {
  let v = hex.trim().replace(/^#/, '');
  let r = 255, g = 255, b = 255;
  if (v.length === 3) {
    r = parseInt(v[0] + v[0], 16);
    g = parseInt(v[1] + v[1], 16);
    b = parseInt(v[2] + v[2], 16);
  } else if (v.length === 6) {
    r = parseInt(v.slice(0, 2), 16);
    g = parseInt(v.slice(2, 4), 16);
    b = parseInt(v.slice(4, 6), 16);
  }
  return new Vector3(r / 255, g / 255, b / 255);
}

export default function FloatingLines({
  linesGradient,
  enabledWaves     = ['top', 'middle', 'bottom'],
  lineCount        = [6],
  lineDistance     = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed   = 1,
  interactive      = true,
  bendRadius       = 5.0,
  bendStrength     = -0.5,
  mouseDamping     = 0.05,
  parallax         = true,
  parallaxStrength = 0.2,
  mixBlendMode     = 'normal',
}) {
  const containerRef        = useRef(null);
  const targetMouseRef      = useRef(new Vector2(-1000, -1000));
  const currentMouseRef     = useRef(new Vector2(-1000, -1000));
  const targetInfluenceRef  = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef   = useRef(new Vector2(0, 0));
  const currentParallaxRef  = useRef(new Vector2(0, 0));

  const getCount = (type) => {
    if (typeof lineCount === 'number') return lineCount;
    return enabledWaves.includes(type) ? (lineCount[enabledWaves.indexOf(type)] ?? 6) : 0;
  };
  const getDist = (type) => {
    if (typeof lineDistance === 'number') return lineDistance;
    return enabledWaves.includes(type) ? (lineDistance[enabledWaves.indexOf(type)] ?? 5) : 0.1;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;

    const scene    = new Scene();
    const camera   = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    // alpha: true → transparent canvas so white page shows through
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1); // always 1 — retina DPR quadruples pixel count for no visible gain
    renderer.domElement.style.width          = '100%';
    renderer.domElement.style.height         = '100%';
    // Canvas never blocks pointer events — we listen on window instead
    renderer.domElement.style.pointerEvents  = 'none';
    container.appendChild(renderer.domElement);

    const topLineCount    = enabledWaves.includes('top')    ? getCount('top')    : 0;
    const middleLineCount = enabledWaves.includes('middle') ? getCount('middle') : 0;
    const bottomLineCount = enabledWaves.includes('bottom') ? getCount('bottom') : 0;

    const uniforms = {
      iTime:            { value: 0 },
      iResolution:      { value: new Vector3(1, 1, 1) },
      animationSpeed:   { value: animationSpeed },
      enableTop:        { value: enabledWaves.includes('top') },
      enableMiddle:     { value: enabledWaves.includes('middle') },
      enableBottom:     { value: enabledWaves.includes('bottom') },
      topLineCount:     { value: topLineCount },
      middleLineCount:  { value: middleLineCount },
      bottomLineCount:  { value: bottomLineCount },
      topLineDistance:    { value: enabledWaves.includes('top')    ? getDist('top')    * 0.01 : 0.01 },
      middleLineDistance: { value: enabledWaves.includes('middle') ? getDist('middle') * 0.01 : 0.01 },
      bottomLineDistance: { value: enabledWaves.includes('bottom') ? getDist('bottom') * 0.01 : 0.01 },
      topWavePosition:    { value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5,    topWavePosition?.rotate    ?? -0.4) },
      middleWavePosition: { value: new Vector3(middleWavePosition?.x ?? 5.0,  middleWavePosition?.y ?? 0.0, middleWavePosition?.rotate ?? 0.2)  },
      bottomWavePosition: { value: new Vector3(bottomWavePosition?.x ?? 2.0,  bottomWavePosition?.y ?? -0.7, bottomWavePosition?.rotate ?? 0.4) },
      iMouse:           { value: new Vector2(-1000, -1000) },
      interactive:      { value: interactive },
      bendRadius:       { value: bendRadius },
      bendStrength:     { value: bendStrength },
      bendInfluence:    { value: 0 },
      parallax:         { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset:   { value: new Vector2(0, 0) },
      lineGradient:     { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
    };

    if (linesGradient?.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;
      stops.forEach((hex, i) => {
        const c = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(c.x, c.y, c.z);
      });
    }

    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    scene.add(new Mesh(geometry, material));

    const clock = new Clock();

    const setSize = () => {
      if (!active) return;
      const w = container.clientWidth  || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };
    setSize();

    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => { if (active) setSize(); })
      : null;
    if (ro) ro.observe(container);

    // ── Mouse listeners on WINDOW so they fire even when cursor is over
    //    overlaid content (buttons, text, etc.) that sits above the canvas.
    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const dpr  = renderer.getPixelRatio();

      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;

      if (parallax) {
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        targetParallaxRef.current.set(
          ((x - cx) / rect.width)  *  parallaxStrength,
          ((y - cy) / rect.height) * -parallaxStrength,
        );
      }
    };

    const handlePointerLeave = () => { targetInfluenceRef.current = 0.0; };

    if (interactive) {
      window.addEventListener('pointermove',  handlePointerMove,  { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    let raf = 0;
    let visible = true;

    // Pause GPU rendering when hero is scrolled out of view
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 })
      : null;
    if (io) io.observe(container);

    const renderLoop = () => {
      if (!active) return;
      raf = requestAnimationFrame(renderLoop);
      if (!visible) return; // skip all GPU work when off-screen

      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouseRef.current);
        currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluenceRef.current;
      }

      if (parallax) {
        currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      }

      renderer.render(scene, camera);
    };
    renderLoop();

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      if (interactive) {
        window.removeEventListener('pointermove',  handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.parentElement?.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linesGradient, enabledWaves, lineCount, lineDistance, topWavePosition, middleWavePosition,
      bottomWavePosition, animationSpeed, interactive, bendRadius, bendStrength, mouseDamping,
      parallax, parallaxStrength]);

  return (
    <div
      ref={containerRef}
      className="floating-lines-container"
      style={{ mixBlendMode }}
    />
  );
}
