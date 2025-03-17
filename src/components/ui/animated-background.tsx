"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"

// Catppuccin Mocha Palette
const catppuccinColors = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
}

// Linux UI element types
type LinuxElementType = "terminal" | "window" | "tux" | "folder" | "command" | "package" | "vim" | "desktop"

interface LinuxElementProps {
  type: LinuxElementType
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  mouseX: any
  mouseY: any
  color?: string
  content?: string
  homeX: number
  homeY: number
  scrollY: number
  pathname: string
}

// Terminal window component
const TerminalWindow = ({
  size,
  color = catppuccinColors.mauve,
  content = "$ ls -la",
}: {
  size: number
  color?: string
  content?: string
}) => {
  return (
    <div
      className="rounded-md overflow-hidden flex flex-col"
      style={{
        width: size,
        height: size * 0.7,
        backgroundColor: catppuccinColors.crust,
        border: `1px solid ${catppuccinColors.surface0}`,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center px-2 py-1" style={{ backgroundColor: catppuccinColors.surface0 }}>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.red }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.yellow }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.green }}></div>
        </div>
        <div className="text-xs mx-auto" style={{ color: catppuccinColors.text, fontSize: `${size / 20}px` }}>
          bash
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-2 flex-1 flex flex-col justify-start">
        <div className="flex items-center">
          <span style={{ color: color, fontSize: `${size / 16}px` }}>air@airwu</span>
          <span style={{ color: catppuccinColors.text, fontSize: `${size / 16}px` }}>:</span>
          <span style={{ color: catppuccinColors.blue, fontSize: `${size / 16}px` }}>~</span>
          <span style={{ color: catppuccinColors.text, fontSize: `${size / 16}px` }}> $&nbsp; </span>
          <span style={{ color: catppuccinColors.text, fontSize: `${size / 16}px` }}>{content}</span>
        </div>
      </div>
    </div>
  )
}

// macOS style window component
const MacOSWindow = ({
  size,
  color = catppuccinColors.blue,
  content = "Linux Rules!",
}: {
  size: number
  color?: string
  content?: string
}) => {
  return (
    <div
      className="rounded-md overflow-hidden flex flex-col"
      style={{
        width: size,
        height: size * 0.75,
        backgroundColor: `${color}10`,
        backdropFilter: "blur(8px)",
        border: `1px solid ${color}30`,
        boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
      }}
    >
      {/* Window header */}
      <div className="flex items-center px-2 py-1" style={{ backgroundColor: `${color}20` }}>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.red }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.yellow }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catppuccinColors.green }}></div>
        </div>
        <div className="text-xs mx-auto" style={{ color: catppuccinColors.text, fontSize: `${size / 20}px` }}>
          notepad
        </div>
      </div>

      {/* Window content */}
      <div className="p-2 flex-1 flex items-center justify-center">
        <span style={{ color: color, fontSize: `${size / 12}px`, fontWeight: "bold" }}>{content}</span>
      </div>
    </div>
  )
}

// Tux penguin icon
const TuxIcon = ({ size }: { size: number }) => {
  return (
    <div className="flex items-center justify-center invisible md:visible lg:visible" style={{ width: size, height: size }}>
      {/* <svg viewBox="0 0 100 100" width={size} height={size}>
        <path
          d="M50,10 C30,10 25,30 25,40 C25,50 30,55 25,65 C20,75 10,80 15,90 C20,100 40,95 50,90 C60,95 80,100 85,90 C90,80 80,75 75,65 C70,55 75,50 75,40 C75,30 70,10 50,10 Z"
          fill="#000000"
        />
        <ellipse cx="35" cy="35" rx="5" ry="7" fill="white" />
        <ellipse cx="65" cy="35" rx="5" ry="7" fill="white" />
        <ellipse cx="35" cy="37" rx="2" ry="3" fill="black" />
        <ellipse cx="65" cy="37" rx="2" ry="3" fill="black" />
        <ellipse cx="50" cy="50" rx="10" ry="7" fill="#f9e2af" />
        <ellipse cx="50" cy="60" rx="5" ry="3" fill="#f38ba8" />
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
      >
        <path
          data-name="layer2"
          d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
          fill="#ffffff"
        ></path>
        <path
          data-name="layer1"
          d="M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z"
          fill="#202020"
        ></path>
      </svg>
    </div>
  )
}

// Folder icon
const FolderIcon = ({ size, color = catppuccinColors.yellow }: { size: number; color?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size * 0.8} height={size * 0.8}>
        <path
          d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
          fill={color}
        />
      </svg>
      <span style={{ color: catppuccinColors.text, fontSize: `${size / 8}px` }}>home</span>
    </div>
  )
}

// Command icon
const CommandIcon = ({
  size,
  color = catppuccinColors.green,
  command = "sudo",
}: {
  size: number
  color?: string
  command?: string
}) => {
  return (
    <div
      className="rounded-md flex items-center justify-center p-2"
      style={{
        width: size,
        height: size * 0.4,
        backgroundColor: `${color}20`,
        border: `1px solid ${color}40`,
      }}
    >
      <span style={{ color: color, fontSize: `${size / 8}px`, fontWeight: "bold" }}>{command}</span>
    </div>
  )
}

// Vim icon
const VimIcon = ({ size }: { size: number }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="rounded-md flex items-center justify-center"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          backgroundColor: "#019833",
          color: "white",
          fontSize: `${size / 4}px`,
          fontWeight: "bold",
        }}
      >
        Vim
      </div>
      <span style={{ color: catppuccinColors.text, fontSize: `${size / 8}px` }}>editor</span>
    </div>
  )
}

// Desktop environment icon
const DesktopIcon = ({
  size,
  color = catppuccinColors.mauve,
  name = "KDE",
}: {
  size: number
  color?: string
  name?: string
}) => {
  return (
    <div className="flex flex-col items-center justify-center invisible md:visible lg:visible" style={{ width: size, height: size }}>
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: color,
          color: "white",
          fontSize: `${size / 5}px`,
          fontWeight: "bold",
        }}
      >
        {name.substring(0, 1)}
      </div>
      <span style={{ color: catppuccinColors.text, fontSize: `${size / 8}px`, marginTop: "4px" }}>{name}</span>
    </div>
  )
}

// Package manager icon
const PackageIcon = ({
  size,
  color = catppuccinColors.red,
  name = "apt",
}: {
  size: number
  color?: string
  name?: string
}) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size * 0.7} height={size * 0.7}>
        <path
          d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5z"
          fill={color}
        />
      </svg>
      <span style={{ color: catppuccinColors.text, fontSize: `${size / 8}px` }}>{name}</span>
    </div>
  )
}

// Linux UI element component
const LinuxElement = ({
  type,
  x,
  y,
  size,
  rotation,
  duration,
  delay,
  mouseX,
  mouseY,
  color,
  content,
  homeX,
  homeY,
  scrollY,
  pathname,
}: LinuxElementProps) => {
  // Create a reference to the element
  const ref = useRef<HTMLDivElement>(null)

  // Calculate distance from mouse for repulsion effect
  const distance = useMotionValue(1000)

  // Create springs for smoother movement
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(0, springConfig)
  const springY = useSpring(0, springConfig)

  // Transform distance to repulsion strength (closer = stronger)
  const repulsionStrength = useTransform(distance, [0, 100, 200, 300], [40, 20, 5, 0])

  // Update distance and repulsion when mouse moves
  useEffect(() => {
    const updateDistance = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const elementX = rect.left + rect.width / 2
      const elementY = rect.top + rect.height / 2

      const dx = mouseX.get() - elementX
      const dy = mouseY.get() - elementY

      // Calculate Euclidean distance
      const dist = Math.sqrt(dx * dx + dy * dy)
      distance.set(dist)

      // Calculate repulsion direction (away from mouse)
      if (dist < 300) {
        const angle = Math.atan2(dy, dx)
        const repulsion = repulsionStrength.get()
        springX.set(-Math.cos(angle) * repulsion)
        springY.set(-Math.sin(angle) * repulsion)
      } else {
        // Slowly return to original position
        springX.set(0)
        springY.set(0)
      }
    }

    const unsubscribeX = mouseX.onChange(updateDistance)
    const unsubscribeY = mouseY.onChange(updateDistance)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, distance, repulsionStrength, springX, springY])

  // Render different Linux UI elements
  const renderElement = () => {
    switch (type) {
      case "terminal":
        return <TerminalWindow size={size} color={color} content={content} />
      case "window":
        return <MacOSWindow size={size} color={color} content={content} />
      case "tux":
        return <TuxIcon size={size} />
      case "folder":
        return <FolderIcon size={size} color={color} />
      case "command":
        return <CommandIcon size={size} color={color} command={content} />
      case "vim":
        return <VimIcon size={size} />
      case "desktop":
        return <DesktopIcon size={size} color={color} name={content} />
      case "package":
        return <PackageIcon size={size} color={color} name={content} />
      default:
        return null
    }
  }

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: `${homeX}%`,
        top: `${homeY}%`,
        opacity: 0.9,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
        x: springX,
        y: springY,
      }}
      initial={{ scale: 0.8, rotate: rotation }}
      animate={{
        scale: 1,
        rotate: [rotation - 2, rotation + 2, rotation - 1, rotation + 1, rotation],
        x: [0, 10, -5, 8, 0],
        y: [0, -8, 5, -3, 0],
        opacity: scrollY > 100 || pathname === "/experience" || pathname === "/projects" ? 0 : 0.9,
        translateY: scrollY > 0 ? -scrollY * (Math.random() * 0.5 + 0.2) : 0,
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
        opacity: { duration: 0.5 },
        translateY: { duration: 0.2 },
      }}
    >
      {renderElement()}
    </motion.div>
  )
}

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  // Track mouse position for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mouseX, mouseY])

  if (!isMounted) {
    return null
  }

  // Create Linux UI elements
  const elements: Omit<LinuxElementProps, "mouseX" | "mouseY" | "scrollY" | "pathname">[] = [
    // Top left area
    {
      type: "terminal",
      size: 140,
      x: 5,
      y: 10,
      rotation: 5,
      duration: 35,
      delay: 0,
      color: catppuccinColors.green,
      content: " neofetch",
      homeX: 5,
      homeY: 10,
    },
    {
      type: "vim",
      size: 60,
      x: 15,
      y: 25,
      rotation: 0,
      duration: 22,
      delay: 3.5,
      homeX: 15,
      homeY: 25,
    },

    // Top right area
    {
      type: "window",
      size: 180,
      x: 85,
      y: 15,
      rotation: 2,
      duration: 40,
      delay: 1,
      color: catppuccinColors.blue,
      content: "Linux > Windows",
      homeX: 85,
      homeY: 15,
    },
    {
      type: "desktop",
      size: 70,
      x: 80,
      y: 40,
      rotation: 0,
      duration: 20,
      delay: 2.5,
      color: catppuccinColors.mauve,
      content: "Hyprland",
      homeX: 80,
      homeY: 40,
    },

    // Bottom left area
    {
      type: "command",
      size: 100,
      x: 15,
      y: 75,
      rotation: 0,
      duration: 32,
      delay: 1.5,
      color: catppuccinColors.red,
      content: "sudo rm -rf /",
      homeX: 15,
      homeY: 82,
    },
    {
      type: "package",
      size: 60,
      x: 30,
      y: 90,
      rotation: 0,
      duration: 30,
      delay: 2,
      color: catppuccinColors.blue,
      content: "pacman",
      homeX: 7,
      homeY: 70,
    },

    // Bottom right area
    {
      type: "terminal",
      size: 120,
      x: 70,
      y: 80,
      rotation: 5,
      duration: 38,
      delay: 2,
      color: catppuccinColors.mauve,
      content: "\n nvim ~/.bashrc",
      homeX: 40,
      homeY: 75,
    },
    {
      type: "window",
      size: 160,
      x: 85,
      y: 85,
      rotation: -2,
      duration: 42,
      delay: 0.5,
      color: catppuccinColors.pink,
      content: "I use Arch btw :)",
      homeX: 75,
      homeY: 75,
    },

    // Left edge
    {
      type: "tux",
      size: 80,
      x: 5,
      y: 50,
      rotation: 0,
      duration: 25,
      delay: 2,
      homeX: 5,
      homeY: 50,
    },

    // Right edge
    {
      type: "folder",
      size: 70,
      x: 90,
      y: 60,
      rotation: 0,
      duration: 28,
      delay: 1,
      color: catppuccinColors.yellow,
      homeX: 90,
      homeY: 60,
    },

    // Top edge
    {
      type: "command",
      size: 90,
      x: 50,
      y: 5,
      rotation: 0,
      duration: 18,
      delay: 4,
      color: catppuccinColors.green,
      content: "grep -r 'TODO'",
      homeX: 50,
      homeY: 20,
    },
  ]

  // Add a center-free zone indicator (uncomment for debugging)
  // const CenterFreeZone = () => (
  //   <div
  //     className="absolute rounded-full border-2 border-dashed pointer-events-none"
  //     style={{
  //       left: "30%",
  //       top: "30%",
  //       width: "40%",
  //       height: "40%",
  //       borderColor: "rgba(255, 255, 255, 0.1)",
  //       zIndex: 0
  //     }}
  //   />
  // );

  return (
    <div
      className="fixed inset-0 w-full h-full opacity-65"
      style={{ zIndex: -1, backgroundColor: catppuccinColors.base }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#181825] via-[#1e1e2e] to-[#181825]" />

      {elements.map((element, index) => (
        <LinuxElement
          key={`element-${index}`}
          {...element}
          mouseX={mouseX}
          mouseY={mouseY}
          scrollY={scrollY}
          pathname={pathname}
        />
      ))}

      {/* Subtle glow spots */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] bg-[#cba6f7]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] bg-[#A020F0]/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/3 h-[200px] w-[200px] bg-[#f5c2e7]/5 rounded-full blur-[100px]" />
    </div>
  )
}

