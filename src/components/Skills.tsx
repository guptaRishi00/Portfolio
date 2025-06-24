import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaDatabase,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

interface Skill {
  id: number;
  name: string;
  percentage: number;
  icon: JSX.Element;
  color: string;
}

const skills: Skill[] = [
  {
    id: 1,
    name: "HTML",
    percentage: 95,
    icon: <FaHtml5 className="text-3xl" />,
    color: "#e34c26",
  },
  {
    id: 2,
    name: "CSS",
    percentage: 90,
    icon: <FaCss3Alt className="text-3xl" />,
    color: "#264de4",
  },
  {
    id: 3,
    name: "JavaScript",
    percentage: 85,
    icon: <FaJs className="text-3xl" />,
    color: "#f0db4f",
  },
  {
    id: 4,
    name: "React",
    percentage: 88,
    icon: <FaReact className="text-3xl" />,
    color: "#61dafb",
  },
  {
    id: 5,
    name: "TypeScript",
    percentage: 80,
    icon: <SiTypescript className="text-3xl" />,
    color: "#007acc",
  },
  {
    id: 6,
    name: "Node.js",
    percentage: 75,
    icon: <FaNodeJs className="text-3xl" />,
    color: "#68a063",
  },
  {
    id: 7,
    name: "MySQL",
    percentage: 78,
    icon: <FaDatabase className="text-3xl" />,
    color: "#00758f",
  },
  {
    id: 8,
    name: "Git",
    percentage: 85,
    icon: <FaGitAlt className="text-3xl" />,
    color: "#f1502f",
  },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${skill.percentage}%`,
        transition: { duration: 1.5, ease: "easeOut" },
      });
    }
  }, [controls, isInView, skill.percentage]);

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="text-xl" style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <h3 className="text-lg font-medium">{skill.name}</h3>
        </div>
        <span className="font-bold">{skill.percentage}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          ref={ref}
          className="h-full rounded-full"
          style={{
            backgroundColor: skill.color,
            boxShadow: hovered ? `0 0 10px ${skill.color}` : "none",
          }}
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 0,
    },
    active: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      opacity: 0.2,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  };

  const enterSkills = () => setCursorVariant("active");
  const leaveSkills = () => setCursorVariant("default");

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Custom cursor follower */}
      <motion.div
        className="custom-cursor bg-primary fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
          <p className="max-w-3xl mx-auto text-lg">
            I've honed my skills in various technologies and tools over the
            years. Here's an overview of my technical expertise.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2"
          onMouseEnter={enterSkills}
          onMouseLeave={leaveSkills}
        >
          {skills.map((skill) => (
            <SkillBar key={skill.id} skill={skill} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Other Skills & Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Framer Motion",
              "Docker",
              "Next.js",
              "Jenkins",
              "REST API",
              "Redux",
              "Tailwind CSS",
              "Ansible",
              "AWS",
            ].map((tool) => (
              <div
                key={tool}
                className="px-4 py-2 rounded-full bg-opacity-10 bg-primary text-primary border border-primary hover:bg-primary hover:text-white transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
