"use client";

import { motion } from "framer-motion";
import { AnimatedHeading, AnimatedText } from "@/components/ui/animated-text";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const tagColors = {
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

const getSkillColor = (skill: string) => {
  const lowerSkill = skill.toLowerCase();
  if (lowerSkill.includes("react")) return tagColors.react;
  if (lowerSkill.includes("typescript")) return tagColors.typescript;
  if (lowerSkill.includes("javascript") || lowerSkill.includes("jquery"))
    return tagColors.javascript;
  if (lowerSkill.includes("node") || lowerSkill.includes("express"))
    return tagColors.node;
  if (lowerSkill.includes("aws") || lowerSkill.includes("cloud"))
    return tagColors.aws;
  if (lowerSkill.includes("vue")) return tagColors.vue;
  if (
    lowerSkill.includes("mongo") ||
    lowerSkill.includes("sql") ||
    lowerSkill.includes("db")
  )
    return tagColors.database;
  return tagColors.default;
};

const experiences = [
  {
    id: 1,
    title: "CSE Tutor",
    company: "UC Merced - STEM Tutoring Hub",
    period: "2025 - Present",
    description:
      "Providing guidance to students in computer science topics, including programming, algorithms, and debugging.",
    skills: ["C", "C++", "Python", "Teaching", "Other"],
    highlights: [
      "Taught students about data structures and coding principles",
      "Explained important mathematical concepts for programming",
    ],
  },
  {
    id: 2,
    title: "Machine Learning Intern",
    company: "Wilsilica - Lumos Control",
    period: "2021 - 2022",
    description:
      "Developed prototypes for applications of human detection on smart lighting control, focusing on ML training for TinyML/EdgeTPU.",
    skills: ["Python", "Tensorflow", "Google Coral", "ML", "SSH"],
    highlights: [
      "Implemented 2 lighting control demos for company at local San Diego trade show",
      "Expanded on lighting control designs by combining a mix of location and gesture based controls",
      "Designed and trained convolutional neural networks for human detection and body segmentation",
    ],
  },
];

const education = [
  {
    id: 1,
    degree: "B.S. Computer Science and Engineering",
    institution: "University of California, Merced",
    period: "2023 - Present",
    description: "Currently learning more about computers...",
  },
  {
    id: 2,
    degree: "High School Diploma",
    institution: "Canyon Crest Academy",
    period: "2019 - 2023",
    description: "Shoutout to CCA! This place was amazing!",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function ExperiencePage() {
  return (
    <div className="container px-4 py-10 mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <AnimatedHeading
          text="Work Experience"
          className="text-4xl md:text-5xl lg:text-6xl mb-3"
        />
        <AnimatedText
          text="A journey through my professional career"
          className="text-xl text-muted-foreground"
          type="words"
          animationVariant="fade"
          delay={0.2}
        />
      </div>

      <div className="relative mb-20">
        <div className="absolute left-0 md:left-1/2 h-full w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent transform md:-translate-x-1/2" />

        <div className="relative space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "pl-5 md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                className="absolute left-0 md:left-[49.42%] w-3 h-3 rounded-full bg-accent transform md:-translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                viewport={{ once: true }}
              />

              <div
                className={`absolute left-6 md:static font-extrabold md:flex-1 mb-3 md:mb-0 md:text-center -translate-y-7 md:translate-y-0 md:px-6${
                  index % 2 === 0 ? "md:text-left " : "md:text-right "
                }`}
              >
                <div className="text-accent font-mono text-sm md:text-base">
                  {exp.period}
                </div>
              </div>

              <div className="w-full pl-8 md:pl-0 md:w-1/2 md:max-w-md md:px-6">
                <TiltCard
                  tiltStrength={4}
                  glareOpacity={0.08}
                  glareColor="rgba(245, 194, 231, 0.8)"
                  borderGlow={true}
                >
                  <Card className="bg-card/30 backdrop-blur-sm border-white/5 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-muted-foreground">
                        {exp.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{exp.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 py-1 text-xs rounded-full ${getSkillColor(
                              skill
                            )}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Key Achievements</h4>
                        <ul className="space-y-1 list-disc list-outside pl-5 text-sm text-muted-foreground">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-10 text-center">
        <AnimatedHeading
          text="Education"
          className="text-3xl md:text-4xl mb-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <TiltCard
              tiltStrength={3}
              glareOpacity={0.08}
              glareColor="rgba(203, 166, 247, 0.8)"
              borderGlow={true}
            >
              <Card className="h-full bg-card/30 backdrop-blur-sm border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {edu.institution}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {edu.period}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{edu.description}</p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
