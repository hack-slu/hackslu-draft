import React, { useState, useEffect } from "react";
import "./HackSLU.css";
import { useParticles, ParticleEffect } from "./ParticleSystem";

export default function HackSLU() {
  const [showNav, setShowNav] = useState(false);
  const [selectedItem, setSelectedItem] = useState('signup'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use particle system hook
  const particles = useParticles(50);

  // images for sliders
  const slides = [
    { id: 1, url: 'src/assets/images/image1.jpg', alt: 'image1' },
    { id: 2, url: 'src/assets/images/image2.jpg', alt: 'image2' },
    { id: 3, url: 'src/assets/images/image5.jpg', alt: 'image3' },
    { id: 4, url: 'src/assets/images/image3.jpg', alt: 'image4' },
    { id: 5, url: 'src/assets/images/image4.jpg', alt: 'image5' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Particle Effect */}
      <ParticleEffect particles={particles} />

      {/* background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(100, 100, 100, 0.4) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          backgroundColor: '#000000'
        }}
      ></div>

      {/* navbar */}
      <nav className={`fixed w-full bg-black text-white shadow-lg z-50 border-b-4 border-blue-600 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="src/assets/mascot.png" 
              alt="HackSLU Logo" 
              className="w-10 h-10 rounded-lg flex-shrink-0"
            />
          <h1 className="text-2xl font-black text-white">HackSLU 2026</h1>
          </div>
          <div className="flex space-x-6">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:text-blue-400 transition-colors cursor-pointer font-semibold"
            >
              about
            </a>
            <a 
              href="#signup" 
              onClick={(e) => scrollToSection(e, 'signup')}
              className="hover:text-blue-400 transition-colors cursor-pointer font-semibold"
            >
              signup
            </a>
            <a 
              href="#faq" 
              onClick={(e) => scrollToSection(e, 'faq')}
              className="hover:text-blue-400 transition-colors cursor-pointer font-semibold"
            >
              faq
            </a>
            <a 
              href="#sponsors" 
              onClick={(e) => scrollToSection(e, 'sponsors')}
              className="hover:text-blue-400 transition-colors cursor-pointer font-semibold"
            >
              sponsors
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:text-blue-400 transition-colors cursor-pointer font-semibold"
            >
              contact
            </a>
          </div>
        </div>
      </nav>

      {/* home */}
      <section id="home" className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="text-center space-y-8 relative z-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <img 
              src="src/assets/mascot.png" 
              alt="HackSLU Logo" 
              className="w-32 h-32 rounded-lg flex-shrink-0"
            />
            <h1 className="text-8xl font-black text-blue-500 animate-pulse">
              hackSLU
            </h1>
          </div>
          
          {/* Navigation menu */}
          <nav className="flex flex-col space-y-3 text-3xl">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              onMouseEnter={() => setSelectedItem('about')}
              className="hover:text-blue-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <span className={`mr-3 transition-all text-2xl ${selectedItem === 'about' ? 'text-blue-400 animate-pulse opacity-100' : 'opacity-0'}`}>►</span>
              <span className={selectedItem === 'about' ? 'text-blue-400' : ''}>about</span>
            </a>            
            <a 
              href="#signup" 
              onClick={(e) => scrollToSection(e, 'signup')}
              onMouseEnter={() => setSelectedItem('signup')}
              className="hover:text-blue-400 transition-all cursor-pointer flex items-center justify-center group"
            >
              <span className={`mr-3 transition-all text-2xl ${selectedItem === 'signup' ? 'text-blue-400 animate-pulse opacity-100' : 'opacity-0'}`}>►</span>
              <span className={selectedItem === 'signup' ? 'text-blue-400' : ''}>signup</span>
            </a>
            <a 
              href="#faq" 
              onClick={(e) => scrollToSection(e, 'faq')}
              onMouseEnter={() => setSelectedItem('faq')}
              className="hover:text-blue-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <span className={`mr-3 transition-all text-2xl ${selectedItem === 'faq' ? 'text-blue-400 animate-pulse opacity-100' : 'opacity-0'}`}>►</span>
              <span className={selectedItem === 'faq' ? 'text-blue-400' : ''}>faq</span>
            </a>            
            <a 
              href="#sponsors" 
              onClick={(e) => scrollToSection(e, 'sponsors')}
              onMouseEnter={() => setSelectedItem('sponsors')}
              className="hover:text-blue-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <span className={`mr-3 transition-all text-2xl ${selectedItem === 'sponsors' ? 'text-blue-400 animate-pulse opacity-100' : 'opacity-0'}`}>►</span>
              <span className={selectedItem === 'sponsors' ? 'text-blue-400' : ''}>sponsors</span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              onMouseEnter={() => setSelectedItem('contact')}
              className="hover:text-blue-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <span className={`mr-3 transition-all text-2xl ${selectedItem === 'contact' ? 'text-blue-400 animate-pulse opacity-100' : 'opacity-0'}`}>►</span>
              <span className={selectedItem === 'contact' ? 'text-blue-400' : ''}>contact</span>
            </a>
          </nav>
        </div>
      </section>

      {/* about */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-white">
        <h3 className="text-3xl font-bold text-center mb-6">About</h3>
        <p className="mt-2 text-lg text-center mb-12">
          HackSLU 2026 is our annual student-run hackathon bringing together creative thinkers, designers, and developers. Below are the 
          images from HackSLU 2025!
        </p>

        {/* Image Slider */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative h-[32rem] overflow-hidden rounded-lg">
            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* signup */}
      <section id="signup" className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-white">
        <h3 className="text-3xl font-bold text-center mb-6">Sign Up</h3>
        <p className="text-center mb-8 text-lg">Ready to join the adventure? Sign up now!</p>
        <div className="flex justify-center">
          <a
            href="https://example_link.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-white">
        <h3 className="text-3xl font-bold text-center mb-8">FAQ</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-xl">Who can participate?</h4>
            <p className="mt-2 text-lg">All students are welcome, no prior experience needed!</p>
          </div>

          <div>
            <h4 className="font-semibold text-xl">Is there a cost?</h4>
            <p className="mt-2 text-lg">Nope! It's completely free to participate.</p>
          </div>

          <div>
            <h4 className="font-semibold text-xl">Is HackSLU 2026 in person?</h4>
            <p className="mt-2 text-lg">Yes, it will be held on Saint Louis University's campus.</p>
          </div>
        </div>
      </section>

      {/* sponsors */}
      <section id="sponsors" className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-white">
        <h3 className="text-3xl font-bold text-center mb-6">Sponsors</h3>
        <p className="text-center text-lg">We're grateful for our amazing sponsors who make this event possible.</p>
        <div className="mt-8 space-y-4 text-center">
          <p className="text-xl font-semibold">Sponsor 1</p>
          <p className="text-xl font-semibold">Sponsor 2</p>
          <p className="text-xl font-semibold">Sponsor 3</p>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-white">
        <h3 className="text-3xl font-bold text-center mb-6">Contact Us</h3>
        <p className="text-center text-lg">Have questions? Reach out to our team:</p>
        <div className="text-center mt-4">
          <a href="mailto:hackslu@slu.edu" className="text-blue-400 underline text-xl font-semibold hover:text-blue-300">
            hackslu@slu.edu
          </a>
        </div>
      </section>

      {/* footer */}
      <footer className="text-center py-8 bg-black text-white">
        <p className="text-lg">© 2026 HackSLU</p>
      </footer>
    </div>
  );
}