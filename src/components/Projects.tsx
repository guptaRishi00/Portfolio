import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  category: "web" | "mobile" | "design" | "all";
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Service-Connect",
    description:
      "An online service platform, facilitating seamless interaction between users and workers.",
    longDescription:
      "A comprehensive solution built with React, Node.js, and MongoDB. Features include user authentication, service filtering, messaging, wishlist, payment processing, and an admin dashboard for user management.",
    image: "/project1.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    githubLink: "https://github.com/guptaRishi00/service-coonnect",
    liveLink: "https://service-coonnect.vercel.app/",
    category: "web",
  },
  {
    id: 1,
    title: "CI/CD Pipelines",
    description:
      " Implemented CI/CD pipelines to automate the build, testing, and deployment process of a Dockerized application, ensuring seamless and efficient deployment workflows.",
    longDescription:
      " Implemented CI/CD pipelines to automate the build, testing, and deployment process of a Dockerized application, ensuring seamless and efficient deployment workflows. Utilized Docker, Jenkins, and AWS to streamline deployment and monitoring",
    image:
      "https://images.unsplash.com/photo-1646627927863-19874c27316b?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["AWS", "Jenkins", "Docker", "Git", "Github"],
    githubLink:
      "https://github.com/guptaRishi00/devops-cicdpipeline-jenkins-docker",
    liveLink:
      "https://github.com/guptaRishi00/devops-cicdpipeline-jenkins-docker",
    category: "web",
  },
];

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClickOutside}
    >
      <motion.div
        ref={modalRef}
        className="bg-white dark:bg-dark max-w-3xl w-full rounded-xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">
            {project.title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {project.longDescription}
          </p>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-dark dark:text-light">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  setSelectedProject,
}: {
  project: Project;
  setSelectedProject: (project: Project) => void;
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden group h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
          <motion.button
            className="px-4 py-2 bg-white text-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            aria-label="GitHub repository"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            aria-label="Live demo"
          >
            <FaExternalLinkAlt className="text-xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "web" | "mobile" | "design">(
    "all"
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  const categories = [{ id: "all", name: "All Projects" }];

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
          <p className="max-w-3xl mx-auto text-lg">
            Here are some of the projects I've worked on. Each project
            represents a unique challenge and solution.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() =>
                setFilter(category.id as "all" | "web" | "mobile" | "design")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard
                  project={project}
                  setSelectedProject={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
