import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFocused, setIsFocused] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setIsFocused(prev => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setIsFocused({});
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  // Particle animation for the background
  useEffect(() => {
    const canvas = document.getElementById('contact-particles') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(93, 63, 211, ${Math.random() * 0.3})`,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      });

      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <canvas id="contact-particles" className="absolute inset-0 z-0"></canvas>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
          <p className="max-w-3xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach out to me using the form below or through my contact information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <a 
                    href="mailto:contact@jitendergiri.com" 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    contact@jitendergiri.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <FaPhone className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <a 
                    href="tel:+1234567890" 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Location</h4>
                  <p className="text-gray-400">New Delhi, India</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/Jitender80" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/%F0%9D%99%85%F0%9D%99%9E%F0%9D%99%A9%F0%9D%99%9A%F0%9D%99%A3%F0%9D%99%99%F0%9D%99%9A%F0%9D%99%A7-%F0%9D%99%82%F0%9D%99%9E%F0%9D%99%A7%F0%9D%99%9E-573ab2257/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center"
              >
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-6 inline-block">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="glass-effect p-8 rounded-2xl"
                noValidate
              >
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        isFocused.name || formData.name 
                          ? 'text-xs text-primary -top-2 bg-dark px-1' 
                          : 'text-gray-400 top-3'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border rounded-lg p-3 outline-none focus:border-primary transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative">
                    <label 
                      htmlFor="email" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        isFocused.email || formData.email 
                          ? 'text-xs text-primary -top-2 bg-dark px-1' 
                          : 'text-gray-400 top-3'
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border rounded-lg p-3 outline-none focus:border-primary transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Subject Field */}
                  <div className="relative">
                    <label 
                      htmlFor="subject" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        isFocused.subject || formData.subject 
                          ? 'text-xs text-primary -top-2 bg-dark px-1' 
                          : 'text-gray-400 top-3'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border rounded-lg p-3 outline-none focus:border-primary transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div className="relative">
                    <label 
                      htmlFor="message" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        isFocused.message || formData.message 
                          ? 'text-xs text-primary -top-2 bg-dark px-1' 
                          : 'text-gray-400 top-3'
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border rounded-lg p-3 outline-none focus:border-primary transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-600'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full font-medium transition-colors w-full flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 