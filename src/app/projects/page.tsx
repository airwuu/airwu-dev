"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedHeading, AnimatedText } from "@/components/ui/animated-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Catppuccin Mocha colors for categories and tags
const categoryColors = {
  web: { bg: "#89b4fa", textBg: "bg-[#89b4fa]/20", text: "text-[#89b4fa]" },
  hardware: { bg: "#f5c2e7", textBg: "bg-[#f5c2e7]/20", text: "text-[#f5c2e7]" },
  game: { bg: "#cba6f7", textBg: "bg-[#cba6f7]/20", text: "text-[#cba6f7]" },
  other: { bg: "#a6e3a1", textBg: "bg-[#a6e3a1]/20", text: "text-[#a6e3a1]" },
};

const techColors = {
  react: "bg-[#89b4fa]/20 text-[#89b4fa]",
  typescript: "bg-[#74c7ec]/20 text-[#74c7ec]",
  javascript: "bg-[#f9e2af]/20 text-[#f9e2af]",
  node: "bg-[#a6e3a1]/20 text-[#a6e3a1]",
  aws: "bg-[#f5c2e7]/20 text-[#f5c2e7]",
  vue: "bg-[#94e2d5]/20 text-[#94e2d5]",
  database: "bg-[#cba6f7]/20 text-[#cba6f7]",
  python: "bg-[#f9e2af]/20 text-[#f9e2af]",
  firebase: "bg-[#f38ba8]/20 text-[#f38ba8]",
  mongo: "bg-[#74c7ec]/20 text-[#74c7ec]",
  default: "bg-[#b4befe]/20 text-[#b4befe]",
};

// Helper function to get color for technology
const getTechColor = (tech: string) => {
  const lowerTech = tech.toLowerCase();
  if (lowerTech.includes("react")) return techColors.react;
  if (lowerTech.includes("next")) return techColors.node;
  if (lowerTech.includes("typescript")) return techColors.typescript;
  if (lowerTech.includes("node")) return techColors.node;
  if (lowerTech.includes("vue")) return techColors.vue;
  if (lowerTech.includes("python")) return techColors.python;
  if ((lowerTech.includes("aws") || lowerTech.includes("cloud")) || (lowerTech.includes("gemini"))) return techColors.aws;
  if (lowerTech.includes("firebase")) return techColors.firebase;
  if (lowerTech.includes("mongo") || lowerTech.includes("db")) return techColors.mongo;
  return techColors.default;
};

// Helper to get glare color based on project category
const getGlareColor = (category: string) => {
  switch (category) {
    case "web": return "rgba(137, 180, 250, 0.8)";   // blue
    case "mobile": return "rgba(245, 194, 231, 0.8)"; // pink
    case "ai": return "rgba(203, 166, 247, 0.8)";     // mauve
    case "iot": return "rgba(166, 227, 161, 0.8)";    // green
    default: return "rgba(180, 190, 254, 0.8)";       // lavender
  }
};

// Define the project type
type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  highlights: string[];
  link: string;
};

// Project data
const projects: Project[] = [
  {
    id: 0,
    title: "ucmmm",
    description: "An open-source alternative menu website that efficiently provides more accurate food information",
    category: "web",
    technologies: ["React", "Typescript", "CF Workers", "CF D1", "Next.js"],
    highlights: [
      "Designed SQL database, API endpoints, and UI",
      "Served an average of 1.14k users per month (2024)",
      "Decreased average menu viewing time by 60%",
    ],
    link: "https://github.com/airwuu/ucmmm",
  },
  {
    id: 1,
    title: "Fabrik Arm",
    description: "An implmentation of FABRIK inverse kinematics on a physical robot arm with a custom GUI control interface",
    category: "hardware",
    technologies: ["Python", "Matplotlib", "Adafruit", "Serial"],
    highlights: [
      "Implemented algorithm to find relative angles",
      "Built graphical control interface for arm control",
      "Released project for relay race at a STEM camp",
    ],
    link: "https://github.com/airwuu/fabrik-arm",
  },
  {
    id: 2,
    title: "Storyscape",
    description: "An educational web app that uses semantic voice analysis to better reading comprehension in kids",
    category: "web",
    technologies: ["React", "Firebase", "Typescript", "Gemini", "HumeAI"],
    highlights: [
      "Utilized semantic analysis on voice inflections",
      "Used Gemini to dynamically create themed lessons",
      "Won Google Prize amongst 353 project submissions",
    ],
    link: "https://github.com/catfeeshing/storyscape",
  },
  // {
  //   id: 3,
  //   title: "airwu.dev",
  //   description: "this website.",
  //   category: "web",
  //   technologies: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS"],
  //   highlights: [
  //     "Implemented 2.5D visual effects",
  //     "Created smooth page transitions",
  //     "Built responsive layouts for all screen sizes",
  //   ],
  //   link: "#",
  // },
  {
    id: 4,
    title: "eggstronaut",
    description: "A space physics based adventure through the cosmos to get back to your ship before time runs out.",
    category: "game",
    technologies: ["GDscript", "Godot"],
    highlights: [
      "Worked primarily on physics and world generation",
      "Managed a team of 10 people in the GMTK 2024",
      "Placed in the top 7% out of 7604 submissions",
      
    ],
    link: "https://github.com/game-dev-besties/chicken-game",
  },
  {
    id: 5,
    title: "Croppy Deals",
    description: "Markeplace website that connects SJV farmers to local buyers",
    category: "web",
    technologies: ["React", "Typescript", "Tailwind", "Firebase"],
    highlights: [
      "Designed and primarily worked on frontend UI",
      "Recruited and managed the team during Hackathon",
      "Won ~$3120 in winnings at HackMerced IX",
    ],
    link: "https://github.com/airwuu/croppydeals",
  },
  {
    id: 6,
    title: "MooGuard",
    description: "Effortlessly manage cattle with digital tagging powered by tiny machine learning",
    category: "hardware",
    technologies: ["Tensorflow", "React", "Next.js", "MongoDB", "Auth0"],
    highlights: [
      "Created data and imprinted weights to neural net ",
      "Real-time inference on EdgeTPU after quantization",
      "Won 1st place and ~$800 prizes in AgriTech Track",
    ],
    link: "https://github.com/airwuu/MooGuard",
  },
  {
    id: 7,
    title: "Tetris Clone",
    description: "I got addicted to Tetris in highschool so I decided that I would clone it!",
    category: "game",
    technologies: ["Java"],
    highlights: [
      "Standard bags, rotations, piece placement preview",
      "Working local leaderboard and levels!",
      "Lots and lots of abstractions and polymorphism",
    ],
    link: "https://github.com/airwuu/Tetris",
  },
  {
    id: 8,
    title: "Tic Tac Toe AI",
    description: "A fully playable CLI game because I wanted to play Tic Tac Toe but I had no friends :(",
    category: "game",
    technologies: ["C++"],
    highlights: [
      "Built an AI that will never lose",
      "Demonstrated knowledge of graphs ",
      "Had some fun? At least a little bit.",
    ],
    link: "https://github.com/airwuu/tictactoe_ai",
  },
  {
    id: 9,
    title: "Rufina (UCM Bot)",
    description: "The predecessor to ucmmmm. I wanted a quick easy way to compile and compare different UCM menus!",
    category: "other",
    technologies: ["Typescript"],
    highlights: [
      "Built using  ES6 modules madness",
      "I didn't use a template (mistake but also learned)",
      "A bunch of my friends really liked using it!",
    ],
    link: "https://github.com/airwuu/UCM-Bot",
  },
  {
    id: 10,
    title: "air-tab",
    description: "A quick React app to override the ugly default new tab page for myself",
    category: "other",
    technologies: ["Javascript", "React", "Tailwindcss"],
    highlights: [
      "Smoooth animations",
      "My personal bookmarks",
      "It's air themed! airwu.dev used to be air themed too",
    ],
    link: "https://github.com/airwuu/air-tab",
  },
  {
    id: 11,
    title: "dots",
    description: "my personal dotfiles for nixos.... currently on pause as I have switched over to Arch (temporarily of course)",
    category: "other",
    technologies: ["Shell", "Nix", "others"],
    highlights: [
      "My programs and configs for them",
      "Hyprland config (i wrote it from scratch so its bad)",
      "One git clone away from having my system basically",
    ],
    link: "https://github.com/airwuu/dots",
  },
];

// Animation variants with optimized settings
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075, // Slightly faster stagger
      delayChildren: 0.05,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced distance for better performance
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Slightly faster animation
      ease: "easeOut",
    },
  },
};

export default function ProjectsPage() {
  // For client-side rendering
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Memoize filtering with useCallback to optimize performance
  const filterProjects = useCallback((category: string) => {
    if (category === "all") {
      return projects;
    }
    return projects.filter(project => project.category === category);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setFilteredProjects(filterProjects(category));
  }, [filterProjects]);

  useEffect(() => {
    setMounted(true);
    // Initial filtering
    setFilteredProjects(filterProjects(selectedCategory));
  }, [filterProjects, selectedCategory]);

  if (!mounted) return null;

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <AnimatedHeading
          text="My Projects"
          className="text-4xl md:text-5xl lg:text-6xl mb-4"
        />
        <AnimatedText
          text="A showcase of my best work and creative projects"
          className="text-xl text-muted-foreground"
          type="words"
          animationVariant="fade"
          delay={0.2}
        />
      </div>

      {/* Project Categories */}
      <div className="mb-10">
        <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2"
            >
              <TabsList className="bg-card/30 backdrop-blur-md border border-white/5">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:text-primary data-[state=active]:bg-primary/20"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="data-[state=active]:text-[#89b4fa] data-[state=active]:bg-[#89b4fa]/20"
                >
                  Web
                </TabsTrigger>
                <TabsTrigger
                  value="hardware"
                  className="data-[state=active]:text-[#f5c2e7] data-[state=active]:bg-[#f5c2e7]/20"
                >
                  Hardware
                </TabsTrigger>
                <TabsTrigger
                  value="game"
                  className="data-[state=active]:text-[#cba6f7] data-[state=active]:bg-[#cba6f7]/20"
                >
                  Games
                </TabsTrigger>
                <TabsTrigger
                  value="other"
                  className="data-[state=active]:text-[#a6e3a1] data-[state=active]:bg-[#a6e3a1]/20"
                >
                  Other
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <ProjectGrid projects={filteredProjects} />
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={fadeInUp} layout>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Get colors based on project category
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] ||
    { textBg: "bg-primary/20", text: "text-primary" };

  const glareColor = getGlareColor(project.category);

  return (
    <TiltCard
      className="h-full"
      tiltStrength={5} // Reduced tilt strength for better performance
      glareOpacity={0.08} // Added subtle glare effect
      glareColor={glareColor}
      hoverScale={1.03}
      borderGlow={true}
    >
      <Card className="h-full overflow-hidden bg-card/30 backdrop-blur-sm border-white/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className={`px-2 py-1 text-xs rounded-full ${categoryColor.textBg} ${categoryColor.text}`}>
              {project.category}
            </div>
          </div>
          <CardDescription className="text-muted-foreground/90">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-xs rounded-full ${getTechColor(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Highlights</h4>
            <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
              {project.highlights.map((highlight, i) => (
                <li key={i}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <motion.a
            href={project.link}
            target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-accent hover:bg-accent/90 text-primary-foreground w-full`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            View Project
          </motion.a>
        </CardFooter>
      </Card>
    </TiltCard>
  );
}
