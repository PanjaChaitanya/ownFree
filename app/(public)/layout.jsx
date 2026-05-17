import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import StudentBar from '@/components/ui/StudentBar';

export default function PublicLayout({ children }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StudentBar />
      <WhatsAppButton />
    </>
  );
}
