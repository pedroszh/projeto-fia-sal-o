import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Marquee from "@/components/Marquee";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Services />
        <Marquee
          variant="blush"
          reverse
          tilt={1.5}
          items={["Fia", "Mechas", "Coloração", "Luzes", "Fia", "Hidratação", "Maquiagem", "Corte"]}
        />
        <Testimonials />
        <Location />
        <Booking />
      </main>
      <Footer />
      <FloatingSocial />
    </>
  );
}
