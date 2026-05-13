import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function PublicLayout({ children }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
