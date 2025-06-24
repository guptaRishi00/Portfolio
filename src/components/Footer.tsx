import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <a href="#home" className="text-2xl font-bold mb-2 block">
              <span className="gradient-text">Rishi</span>
              <span>.dev</span>
            </a>
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Rishi. All rights snatched from the poors.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-primary transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-4">
              <a
                href="https://github.com/guptaRishi00"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/rishi-gupta-669591273/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary bg-opacity-10 p-3 rounded-full hover:bg-primary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
