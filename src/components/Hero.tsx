import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Tech icons for the floating background
const techIcons = [
  { id: 1, name: 'HTML', top: '15%', left: '10%', delay: 0 },
  { id: 2, name: 'CSS', top: '25%', left: '75%', delay: 0.2 },
  { id: 3, name: 'JS', top: '60%', left: '15%', delay: 0.4 },
  { id: 4, name: 'React', top: '70%', left: '80%', delay: 0.6 },
  { id: 5, name: 'MySQL', top: '40%', left: '60%', delay: 0.8 },
  { id: 6, name: 'DSA', top: '20%', left: '40%', delay: 1 },
];

const Hero = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    if (!typingRef.current) return;

    const texts = ["Front-end Developer", "React Developer", "JavaScript Developer", "Web Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        if (typingRef.current) {
          typingRef.current.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        }
      } else {
        if (typingRef.current) {
          typingRef.current.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }
      }

      // Set typing speed
      if (isDeleting) {
        typingSpeed = 50; // Faster when deleting
      } else {
        typingSpeed = 100; // Normal speed when typing
      }

      // Check if word is complete
      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 1500; // Pause at the end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing new word
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);
  }, []);

  // Parallax effect for the floating elements
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const elements = containerRef.current?.querySelectorAll('.floating-icon');
      if (!elements) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
        gsap.to(el, {
          x: (x - 0.5) * 100 * speed,
          y: (y - 0.5) * 100 * speed,
          duration: 1,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Floating tech icons */}
      {techIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="floating-icon absolute text-xl sm:text-2xl font-bold text-opacity-20 z-0"
          style={{
            top: icon.top,
            left: icon.left,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 0.2, 
            y: 0,
            x: 0
          }}
          transition={{ 
            delay: icon.delay, 
            duration: 0.5
          }}
          data-speed={0.05 + Math.random() * 0.1}
        >
          <div className="animate-float text-primary">{icon.name}</div>
        </motion.div>
      ))}

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
            Hello, I'm <span className="gradient-text hover:scale-105 inline-block transition-transform">Jitender Giri</span> 👋
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl my-6 h-10">
            A <span ref={typingRef} className="text-primary font-medium"></span>
            <span ref={cursorRef} className="animate-typing-cursor">|</span> 🚀
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          I build beautiful, interactive, and responsive web applications with modern technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center gap-4"
        >
          <a 
            href="#contact"
            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
          <a 
            href="#projects"
            className="border-2 border-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex justify-center gap-6 mt-10"
        >
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-primary transition-colors"
            aria-label="Twitter Profile"
          >
            <FaTwitter />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <motion.div
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
            className="w-2 h-2 bg-primary rounded-full mt-2"
          />
        </div>
        <p className="text-sm mt-2 text-center">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero; 