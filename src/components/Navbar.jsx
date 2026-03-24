import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Sparkles, Camera, Gem, Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg'

// --- CONFIG & DATA ---
const COLORS = {
  cream: '#F6F1EA', // Extracted from your logo background
  navy: '#0B132B',  // Extracted from your logo text
  gold: '#B59A7A',  // Complementary accent color
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans antialiased selection:bg-[#0B132B] selection:text-[#F6F1EA]" style={{ backgroundColor: COLORS.cream, color: COLORS.navy }}>
      {/* Injecting Fonts */}
      <style>{`
        html { scroll-behavior: smooth; }
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>

      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <main>
        <Hero />
        <HighlightMarquee />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

// --- COMPONENTS ---

function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 shadow-sm backdrop-blur-md bg-[#F6F1EA]/90' : 'py-6 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center cursor-pointer group">
             <img 
               src={logo} 
               alt="The Charming Salon Logo" 
               className="[clip-path:circle(50%)] contrast-200 brightness-100 h-16 md:h-20 w-auto object-contain group-hover:opacity-80 transition-opacity mix-blend-multiply"
             />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Services', 'Portfolio'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-montserrat tracking-[0.15em] uppercase text-[#0B132B] hover:text-[#B59A7A] transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="px-6 py-2 border border-[#0B132B] text-xs font-montserrat tracking-[0.15em] uppercase text-[#0B132B] hover:bg-[#0B132B] hover:text-[#F6F1EA] transition-all duration-300">
              Book Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#0B132B]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F6F1EA] flex flex-col items-center justify-center space-y-8"
          >
            {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-cinzel text-3xl tracking-widest text-[#0B132B]"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityTransform = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <motion.div 
        style={{ y: y1, opacity: opacityTransform }}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-0"
      >
         {/* Using an elegant editorial photo for the background */}
         <div className="w-[80%] h-[70%] md:w-[50%] md:h-[80%] relative overflow-hidden mt-20 md:mt-0">
            <img 
              src="https://plus.unsplash.com/premium_photo-1676677522894-ecc12895dde5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Bridal Beauty" 
              className="w-full h-full object-cover object-top opacity-60 mix-blend-multiply filter contrast-125 grayscale-[20%]"
            />
            {/* Gradient mask to blend image into background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1EA] via-transparent to-[#F6F1EA]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F6F1EA] via-transparent to-[#F6F1EA]"></div>
         </div>
      </motion.div>

      <div className="relative z-10 text-center px-4 mt-20 md:mt-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center space-x-4 mb-6"
        >
           <span className="text-[10px] md:text-xs font-montserrat tracking-[0.2em] uppercase text-[#0B132B]/60">ESTD</span>
           {/* Simple abstract clover/emblem representing the logo's mark */}
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B132B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 3.314 6 12 6 12s6-8.686 6-12c0-3.314-2.686-6-6-6z" />
              <path d="M12 22c3.314 0 6-2.686 6-6 0-3.314-6-12-6-12s-6 8.686-6 12c0 3.314 2.686 6 6 6z" />
           </svg>
           <span className="text-[10px] md:text-xs font-montserrat tracking-[0.2em] uppercase text-[#0B132B]/60">2022</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-[#0B132B] mb-4 tracking-wider leading-tight"
        >
          THE CHARMING <br/> SALON
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-montserrat text-sm md:text-base tracking-[0.3em] uppercase text-[#0B132B]/70 mb-12"
        >
          Exclusive Bridal Makeup by Neelam Verma
        </motion.p>

        <motion.a 
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="group flex items-center space-x-3 text-xs font-montserrat tracking-[0.2em] uppercase text-[#0B132B] border-b border-[#0B132B] pb-2 hover:text-[#B59A7A] hover:border-[#B59A7A] transition-colors"
        >
          <span>Reserve Your Date</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}

function HighlightMarquee() {
  return (
    <div className="bg-[#0B132B] text-[#F6F1EA] py-4 overflow-hidden flex whitespace-nowrap border-y border-[#B59A7A]/30">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex space-x-12 items-center text-xs md:text-sm font-montserrat tracking-[0.2em] uppercase"
      >
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="flex items-center"><Star size={14} className="mr-2 text-[#B59A7A]" /> Our Brides Our Pride</span>
            <span className="flex items-center"><MapPin size={14} className="mr-2 text-[#B59A7A]" /> Dashrathpuri | Janakpuri | Paschim Vihar</span>
            <span className="flex items-center"><Phone size={14} className="mr-2 text-[#B59A7A]" /> +91 99991 44746</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0.5"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 md:order-1">
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-[#B59A7A] mb-4"
          >
            The Artist Behind The Brush
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-4xl md:text-5xl text-[#0B132B] mb-8 leading-tight"
          >
            Meet Neelam Verma
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 font-montserrat text-sm md:text-base leading-relaxed text-[#0B132B]/80 font-light"
          >
            <p>
              Welcome to <strong>The Charming Salon</strong>, where bridal dreams are meticulously crafted into reality. Founded by acclaimed makeup artist Neelam Verma, our studio is a sanctuary dedicated exclusively to the art of bridal beauty.
            </p>
            <p>
              We understand that your wedding day is a defining moment. That is why we specialize <em>entirely</em> in bridal makeup and readiness. We do not just apply makeup; we design a timeless, radiant aesthetic that enhances your natural elegance and complements your bridal attire flawlessly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <img 
              src={logo} 
              alt="Neelam Verma Signature" 
              className="filter grayscale contrast-200 brightness-100 mix-blend-multiply bg-transparent" 
            />
          </motion.div>
        </div>

        <div className="order-1 md:order-2 overflow-hidden h-[600px] relative rounded-t-full border border-[#0B132B]/10 p-2">
          <motion.div style={{ y: imageY }} className="w-full h-[130%] -top-[15%] relative rounded-t-full overflow-hidden">
            <img 
              src="https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Salon Interior and Makeup Setup" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-[#0B132B]/5 mix-blend-overlay"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const services = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#B59A7A] mb-6" strokeWidth={1} />,
      title: "Signature Bridal Makeup",
      desc: "Our core specialty. Traditional, Airbrush, or HD makeup techniques tailored to your skin, ensuring you look flawless in person and in high-definition photography."
    },
    {
      icon: <Camera className="w-8 h-8 text-[#B59A7A] mb-6" strokeWidth={1} />,
      title: "Pre-Wedding & Engagement",
      desc: "Set the tone for your grand event. We create soft, glamorous, or thematic looks perfect for your Roka, Engagement, or Pre-wedding photoshoots."
    },
    {
      icon: <Gem className="w-8 h-8 text-[#B59A7A] mb-6" strokeWidth={1} />,
      title: "Complete Readiness",
      desc: "Beyond just makeup. Includes intricate hair styling, floral adornments, advanced draping (Saree/Lehenga), and pre-bridal skin consultations."
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h3 className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-[#B59A7A] mb-4">Bridal Offerings</h3>
          <h2 className="font-cinzel text-4xl md:text-5xl text-[#0B132B]">Exclusively For The Bride</h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((srv, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-10 border border-[#0B132B]/10 hover:border-[#B59A7A] transition-colors duration-500 bg-[#F6F1EA] group">
              {srv.icon}
              <h4 className="font-cinzel text-2xl text-[#0B132B] mb-4 group-hover:text-[#B59A7A] transition-colors">{srv.title}</h4>
              <p className="font-montserrat text-sm text-[#0B132B]/70 leading-relaxed font-light">{srv.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Portfolio() {
  const images = [
    "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610276347233-2ab70fc71da8?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610173826014-d131b02d69ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <section id="portfolio" className="py-32 max-w-7xl mx-auto px-6">
       <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-[#B59A7A] mb-4">Portfolio</h3>
            <h2 className="font-cinzel text-4xl md:text-5xl text-[#0B132B]">Our Brides, <br/> Our Pride</h2>
          </div>
          {/* <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-xs font-montserrat tracking-[0.1em] uppercase text-[#0B132B] border-b border-[#0B132B] pb-1 hover:text-[#B59A7A] hover:border-[#B59A7A] transition-colors">
            <Instagram size={14} />
            <span>Follow on Instagram</span>
          </a> */}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((src, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: i * 0.1 }}
               className={`overflow-hidden relative group ${i === 3 ? 'md:col-span-2' : ''}`}
             >
                <div className="w-full h-[500px] overflow-hidden">
                  <img 
                    src={src} 
                    alt={`Beautiful Bride ${i+1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter contrast-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <span className="font-cinzel text-2xl text-[#F6F1EA]">The Details</span>
                </div>
             </motion.div>
          ))}
       </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus(null), 5000);
    e.target.reset();
  };

  return (
    <section id="contact" className="py-32 bg-[#0B132B] text-[#F6F1EA]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-[10px] font-montserrat tracking-[0.3em] uppercase text-[#B59A7A] mb-4">Get In Touch</h3>
          <h2 className="font-cinzel text-4xl md:text-5xl mb-8">Book Your Consultation</h2>
          
          <p className="font-montserrat text-sm leading-relaxed text-[#F6F1EA]/70 font-light mb-12 max-w-md">
            Since we focus exclusively on brides, our calendar fills up quickly during wedding seasons. Reach out to schedule a trial or consultation.
          </p>

          <div className="space-y-8 font-montserrat font-light items-start text-left">
            <div className="flex items-start space-x-6">
              <MapPin className="w-6 h-6 text-[#B59A7A] shrink-0 mt-1" strokeWidth={1} />
              <div className='items-start'>
                <h4 className="font-cinzel items-start text-xl mb-2">Studio Location</h4>
                <p className="text-[#F6F1EA]/70 text-sm">RZ/F3, Vijay Enclave, Dashrathpuri<br/>Delhi, India</p>
                <p className="text-[#B59A7A] text-[10px] mt-2 uppercase tracking-[0.1em]">Serving: Dashrathpuri | Janakpuri | Paschim Vihar</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <Phone className="w-6 h-6 text-[#B59A7A] shrink-0 mt-1" strokeWidth={1} />
              <div>
                <h4 className="font-cinzel text-xl mb-2">Direct Line</h4>
                <p className="text-[#F6F1EA]/70 text-sm">+91 99991 44746</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <Mail className="w-6 h-6 text-[#B59A7A] shrink-0 mt-1" strokeWidth={1} />
              <div>
                <h4 className="font-cinzel text-xl mb-2">Email</h4>
                <a href="mailto:thecharmingsalon@gmail.com" className="text-[#F6F1EA]/70 text-sm hover:text-[#B59A7A] transition-colors">thecharmingsalon@gmail.com</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#F6F1EA] p-10 md:p-14 text-[#0B132B]"
        >
          <h4 className="font-cinzel text-2xl mb-8 text-center">Inquiry Form</h4>
          <form onSubmit={handleSubmit} className="space-y-6 font-montserrat">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.1em] uppercase mb-2 text-[#0B132B]/60">Full Name</label>
                <input type="text" required className="w-full bg-transparent border-b border-[#0B132B]/20 py-2 focus:border-[#0B132B] outline-none transition-colors rounded-none" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.1em] uppercase mb-2 text-[#0B132B]/60">Phone Number</label>
                <input type="tel" required className="w-full bg-transparent border-b border-[#0B132B]/20 py-2 focus:border-[#0B132B] outline-none transition-colors rounded-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.1em] uppercase mb-2 text-[#0B132B]/60">Wedding Date</label>
              <input type="date" required className="w-full bg-transparent border-b border-[#0B132B]/20 py-2 focus:border-[#0B132B] outline-none transition-colors rounded-none" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.1em] uppercase mb-2 text-[#0B132B]/60">Event Details</label>
              <textarea rows="3" required className="w-full bg-transparent border-b border-[#0B132B]/20 py-2 focus:border-[#0B132B] outline-none transition-colors resize-none rounded-none" placeholder="Engagement, Wedding, Reception..."></textarea>
            </div>
            
            <button type="submit" className="w-full bg-[#0B132B] text-[#F6F1EA] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#B59A7A] transition-colors duration-300 mt-4">
              Send Request
            </button>
            
            {formStatus === 'success' && (
               <p className="text-center text-sm mt-4 text-[#B59A7A]">Inquiry sent successfully. Neelam will contact you shortly.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080d1e] text-[#F6F1EA]/50 py-12 border-t border-[#F6F1EA]/10 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-cinzel text-xl text-[#F6F1EA] tracking-widest mb-2">THE CHARMING SALON</h2>
          <p className="text-[10px] uppercase tracking-[0.2em]">Makeup, Hair & Beauty • Estd 2022</p>
        </div>
        
        <div className="flex space-x-6">
          {/* <a href="#" className="hover:text-[#B59A7A] transition-colors"><Instagram size={20} strokeWidth={1.5} /></a> */}
          {/* <a href="#" className="hover:text-[#B59A7A] transition-colors"><Facebook size={20} strokeWidth={1.5} /></a> */}
          <a href="mailto:thecharmingsalon@gmail.com" className="hover:text-[#B59A7A] transition-colors"><Mail size={20} strokeWidth={1.5} /></a>
        </div>
      </div>
      <div className="text-center mt-12 text-[10px] uppercase tracking-[0.1em]">
        &copy; {new Date().getFullYear()} The Charming Salon. All Rights Reserved.
      </div>
    </footer>
  );
}