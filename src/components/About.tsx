import { useState } from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

interface TimelineItem {
  id: number;
  title: string;
  location: string;
  description: string;
  date: string;
  icon: "education" | "work" | "project";
}

interface FlipCardItem {
  id: number;
  title: string;
  content: string;
  emoji: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Bachelor of Computer Applications",
    location: "Dibrugarh University",
    description:
      "Completed BCA with a solid foundation in computer science, software development, and web technologies.",
    date: "2019 – 2022",
    icon: "education",
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    location: "NIELIT",
    description:
      "Developed responsive web pages using HTML, CSS, JavaScript, and React.js, enhancing user experience and performance.",
    date: "Apr – Jul 2022",
    icon: "work",
  },
  {
    id: 3,
    title: "MCA in Cloud & DevOps",
    location: "Chandigarh University",
    description:
      "Pursuing MCA with specialization in Cloud and DevOps. Gained experience with Docker, Jenkins, and AWS.",
    date: "2023 – 2025",
    icon: "education",
  },
  {
    id: 4,
    title: "Software Developer Intern",
    location: "SoftExEdge",
    description:
      "Worked with React.js, Gatsby, Next.js, and Tailwind CSS to build performant, responsive web applications.",
    date: "Jun – Aug 2024",
    icon: "work",
  },
  {
    id: 5,
    title: "Open Source Contributor",
    location: "GitHub",
    description:
      "Contributing to open-source projects and building a personal portfolio focused on full-stack and cloud-native applications.",
    date: "2025 – Present",
    icon: "project",
  },
];

const funFacts: FlipCardItem[] = [
  {
    id: 1,
    title: "Code Explorer",
    content:
      "I've written code in over 8 programming languages but JavaScript remains my favorite!",
    emoji: "💻",
  },
  {
    id: 2,
    title: "Coffee Enthusiast",
    content:
      "My daily routine includes at least 3 cups of coffee while coding.",
    emoji: "☕",
  },
  {
    id: 3,
    title: "Night Owl",
    content: "My most productive coding hours are between 10 PM and 2 AM.",
    emoji: "🦉",
  },
  {
    id: 4,
    title: "Fitness Buff",
    content:
      "I balance my coding life with regular workouts and outdoor activities.",
    emoji: "🏋️‍♂️",
  },
];

const FlipCard = ({ item }: { item: FlipCardItem }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card-container h-64 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className={`flip-card relative w-full h-full cursor-pointer transition-transform duration-500 transform-gpu ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front side */}
        <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl p-6 glass-effect flex flex-col items-center justify-center">
          <div className="text-5xl mb-4">{item.emoji}</div>
          <h3 className="text-xl font-bold text-primary">{item.title}</h3>
          <p className="text-sm mt-2">Click to flip</p>
        </div>

        {/* Back side */}
        <div className="flip-card-back absolute w-full h-full backface-hidden rounded-xl p-6 bg-primary text-white rotate-y-180 flex flex-col items-center justify-center">
          <p className="text-center">{item.content}</p>
          <p className="text-sm mt-4">Click to flip back</p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
          <p className="max-w-3xl mx-auto text-lg text-justify">
            I’m a passionate full-stack web developer with a strong foundation
            in TypeScript, React, Node.js, and modern cloud technologies. I
            specialize in building responsive, scalable, and secure web
            applications, leveraging tools like AWS, Docker, and CI/CD
            pipelines. With a keen eye for design and a DevOps mindset, I turn
            creative ideas into seamless, production-ready digital experiences.
          </p>
        </motion.div>

        {/* Timeline section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-10 text-center"
          >
            My Journey
          </motion.h3>

          <VerticalTimeline lineColor="var(--primary-color)">
            {timelineItems.map((item) => (
              <VerticalTimelineElement
                key={item.id}
                className="vertical-timeline-element"
                contentStyle={{
                  background: "var(--card-color)",
                  color: "var(--text-color)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  padding: "2rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--card-color)",
                }}
                date={item.date}
                iconStyle={{
                  background: "var(--primary-color)",
                  color: "#fff",
                }}
                icon={
                  item.icon === "education" ? (
                    <FaGraduationCap />
                  ) : item.icon === "work" ? (
                    <FaBriefcase />
                  ) : (
                    <FaCode />
                  )
                }
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <h4 className="text-primary">{item.location}</h4>
                <p>{item.description}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        {/* Fun facts section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center">
            Fun Facts About Me
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funFacts.map((fact) => (
              <FlipCard key={fact.id} item={fact} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .flip-card-container {
          perspective: 1000px;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default About;
