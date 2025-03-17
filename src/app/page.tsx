"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AnimatedHeading, AnimatedText } from "@/components/ui/animated-text"
import { TiltCard } from "@/components/ui/tilt-card"
import { Card, CardContent } from "@/components/ui/card"

// Catppuccin Mocha colors for skill cards
const skillColors = {
  frontend: {
    bg: "#89b4fa", // blue
    textBg: "bg-[#89b4fa]/10",
    glareColor: "rgba(137, 180, 250, 0.8)",
  },
  backend: {
    bg: "#a6e3a1", // green
    textBg: "bg-[#a6e3a1]/10",
    glareColor: "rgba(166, 227, 161, 0.8)",
  },
  uiux: {
    bg: "#f5c2e7", // pink
    textBg: "bg-[#f5c2e7]/10",
    glareColor: "rgba(245, 194, 231, 0.8)",
  },
  other: {
    bg: "#cba6f7", // mauve
    textBg: "bg-[#cba6f7]/10",
    glareColor: "rgba(203, 166, 247, 0.8)",
  },
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="container px-4 p-8 mx-auto max-w-7xl font-mono relative z-10">
        {/* Hero Section with Gradient Text */}
        <section className="flex flex-col items-center justify-center min-h-[70vh] text-center mb-24">
          <div className="mb-6">
            <div className="relative">
              <AnimatedHeading text="Aaron Wu" tag="h1" className="text-4xl md:text-6xl lg:text-7xl mb-6 " />

              {/* Subtitle with gradient text */}
              <div className="mt-4 relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute top-1 left-0 right-0 blur-md opacity-10"
                >
                  <span className="bg-gradient-to-r from-[#89b4fa] via-[#cba6f7] to-[#f5c2e7] bg-clip-text text-transparent text-xl md:text-2xl font-medium">
                    Programmer Student Tech Enthusiast a
                  </span>
                </motion.div>
                <AnimatedText
                  text="Programmer || Student || Tech Enthusiast"
                  className="bg-gradient-to-r from-[#89b4fa] via-[#cba6f7] to-[#f5c2e7] bg-clip-text text-transparent text-xl md:text-2xl font-medium"
                  type="words"
                  animationVariant="fade"
                  delay={0.3}
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10"
          >
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <a
                  href="#about"
                  className="bg-[#cba6f7] rounded-md px-6 py-3 text-[#1e1e2e] font-bold
                           hover:shadow-lg hover:shadow-[#cba6f7]/20 transition-all"
                >
                  Skills
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <a
                  href="#contact"
                  className="bg-[#89b4fa] rounded-md px-6 py-3 text-[#1e1e2e] font-bold
                           hover:shadow-lg hover:shadow-[#89b4fa]/20 transition-all"
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 mb-16 font-mono m-10 ">
          <AnimatedHeading text="🐈 About Me" className="text-3xl md:text-4xl mb-12 text-center" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Profile Information with colorful accents */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#f5c2e7] via-[#cba6f7] to-[#89b4fa] rounded-full opacity-70"></div>

              <div className="pl-4">
                <AnimatedText
                  text="I'm a passionate learner that dabbles in hardware, web development, programming, and anything that piques my interest!"
                  className="text-lg mb-6"
                  type="words"
                  once={true}
                />

                <AnimatedText
                  text="Starting from 5th grade, coding has been a core tool that I have employed to make the my world a little better at a time."
                  className="text-lg mb-6 text-muted-foreground"
                  type="words"
                  once={true}
                  delay={0.2}
                />
                <AnimatedText
                  text="My goal is to create solutions to problems through clean code and thoughtful design."
                  className="text-lg mb-6 text-muted-foreground"
                  type="words"
                  once={true}
                  delay={0.2}
                />

                <AnimatedText
                  text="Based in San Diego and Merced. I'm currently open to new opportunities and collaborations."
                  className="text-lg text-[#f5c2e7]"
                  type="words"
                  once={true}
                  delay={0.4}
                />
              </div>
            </div>

            {/* Skills Cards with catppuccin colors */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Languages",
                  skills: ["C", "C++", "Java", "Python", "Shell"],
                  color: skillColors.uiux,
                },

                {
                  title: "Other",
                  skills: ["Git", "Docker", "Unix"],
                  color: skillColors.other,
                },
                {
                  title: "Frontend",
                  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Cloudflare"],
                  color: skillColors.frontend,
                },
                {
                  title: "Backend",
                  skills: ["Node.js", "Express", "Hono.js", "CF D1", "SQL"],
                  color: skillColors.backend,
                },
              ].map((skillSet, index) => (
                <TiltCard
                  key={index}
                  tiltStrength={4}
                  glareOpacity={0.08}
                  glareColor={skillSet.color.glareColor}
                  hoverScale={1.02}
                  borderGlow={true}
                >
                  <Card className="h-full bg-card/30 backdrop-blur-sm border-white/5">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <span
                          className={`inline-block w-3 h-3 mr-2 rounded-full`}
                          style={{ backgroundColor: skillSet.color.bg }}
                        ></span>
                        {skillSet.title}
                      </h3>
                      <ul className="space-y-1">
                        {skillSet.skills.map((skill, idx) => (
                          <li
                            key={idx}
                            className={`text-sm text-muted-foreground pl-5 py-1 relative rounded ${skillSet.color.textBg}`}
                          >
                            <span
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 opacity-60"
                              style={{ backgroundColor: skillSet.color.bg }}
                            ></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 flex flex-col">
          <AnimatedHeading text="Get In Touch" className="text-3xl md:text-4xl mb-10 text-center" />

          <TiltCard
            className="max-w-lg mx-auto"
            tiltStrength={3}
            glareOpacity={0.1}
            glareColor="rgba(180, 190, 254, 0.8)" // Catppuccin lavender
            borderGlow={true}
          >
            <Card className="bg-card/30 backdrop-blur-sm border-white/5">
              <CardContent className="p-6">
                <div className="grid gap-4 py-4">
                  <div>
                    <p className="text-center text-lg mb-6">
                      Feel free to reach out if you want to collaborate or have any questions.
                    </p>
                    <div className="flex flex-col space-y-4 text-center">
                      <motion.a
                        href="mailto:wu@ucmerced.edu"
                        className="flex items-center justify-center text-lg hover:text-[#89b4fa] transition-colors"
                        whileHover={{ scale: 1.03, x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        wu@ucmerced.edu
                      </motion.a>
                      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                        {[
                          { name: "GitHub", color: "#cba6f7", link:"https://github.com/airwuu"},
                          { name: "LinkedIn", color: "#89b4fa", link:"https://linkedin.com/in/airwu" },
                          { name: "Discord", color: "#74c7ec", link:"#" },
                        ].map((platform, i) => (
                          <motion.a
                            key={platform.name}
                            href={platform.link}
                            target="_blank" rel="noopener noreferrer"
                            className="text-sm px-3 py-1 rounded-full transition-all"
                            style={{
                              borderColor: platform.color,
                              borderWidth: "1px",
                              borderStyle: "solid",
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: `${platform.color}20`,
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                          >
                            {platform.name}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </section>
      </div>
    </>
  )
}

