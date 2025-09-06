"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Github, Linkedin, ExternalLink, Code, Palette, Server, Smartphone } from "lucide-react"

// Helper for dynamic icons - (Keep this function as is from the previous version)
const getSkillIcon = (skillName: string, color: string) => {
  const iconProps = { width: 32, height: 32, color: color };
  switch (skillName.toLowerCase()) {
    case "mongodb":
      return <svg viewBox="0 0 24 24" {...iconProps} fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>;
    case "express":
      return <svg viewBox="0 0 24 24" {...iconProps} fill="currentColor"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/></svg>;
    case "react":
    case "react native":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><circle cx="16" cy="16" r="2.7" /><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)" /><ellipse cx="16" cy="16" rx="11" ry="4.2" /></svg>;
    case "node.js":
      return <svg viewBox="0 0 256 250.3" {...iconProps} fill="currentColor"><path d="M128 0C94.3 0 64.2 14.3 40.1 38.3 16 62.3 1.8 92.4 1.8 126.1c0 33.7 14.3 63.8 38.3 87.9s54.2 38.3 87.9 38.3c33.7 0 63.8-14.3 87.9-38.3s38.3-54.2 38.3-87.9c0-33.7-14.3-63.8-38.3-87.9C191.8 14.3 161.7 0 128 0zm-.6 230.9c-27.3 0-52.4-11.2-70.7-29.2-18.1-17.9-29.5-42.9-29.5-69.9s11.4-52.1 29.5-70c18.3-17.9 43.4-29.2 70.7-29.2s52.4 11.2 70.7 29.2c18.1 17.9 29.5 42.9 29.5 70s-11.4 52.1-29.5 69.9c-18.3 18.1-43.4 29.3-70.7 29.3z" /><path d="M121.8 72.8l-41.2 23.8v47.6l41.2 23.8 41.2-23.8V96.6zm32.1 66.9l-33.2 19.2v-38.3l33.2-19.2zM120.7 128l-33.2-19.2 33.2-19.2 33.2 19.2z" /></svg>;
    case "next.js":
      return <svg viewBox="0 0 128 128" {...iconProps} fill="currentColor"><circle cx="64" cy="64" r="64" /><path fill="#fff" d="M94.33 107.71H82.95l-34.8-50.49v46.3H36.77V25.88h11.38l34.8 50.49V29.9h11.38Z" /></svg>;
    case "javascript":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="#000"><path fill={color} d="M0 0h32v32H0z" /><path d="M21.43 24.09a2.16 2.16 0 01-1.59-.64 2.41 2.41 0 01-.63-1.74v-9H17.2v9q0 1.52 1 2.35a3.27 3.27 0 002.51.83q1.44 0 2.43-.83a2.44 2.44 0 001-2.35v-9h-2.01v9q0 .92-.63 1.5a2.1 2.1 0 01-1.6.57zm-10.06 0a2.16 2.16 0 01-1.59-.64 2.41 2.41 0 01-.63-1.74v-9H7.14v9q0 1.52 1 2.35a3.27 3.27 0 002.51.83q1.44 0 2.43-.83a2.44 2.44 0 001-2.35v-9H12.1v9q0 .92-.63 1.5a2.1 2.1 0 01-1.6.57z" /></svg>;
    case "typescript":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><path d="M0 0h32v32H0z" /><path fill="#fff" d="M24.4 10.4h-4.8V9H18v1.4h-3.2v1.4h3.2v11.8h1.6V13.2h4.8V11.8h-3.2v-1.4h3.2zM14 24.6a4.6 4.6 0 01-4.6-4.6c0-2.6 2.1-4.6 4.6-4.6s4.6 2.1 4.6 4.6a4.6 4.6 0 01-4.6 4.6zm0-7.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z" /></svg>;
    case "html5":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><path d="M4 2h24l-2.2 25L16 30l-9.8-2.8L4 2zm20.1 7.3H11.4l.4 4.2h11.9l-.8 9.3-5.8 1.6-5.8-1.6-.4-4h-4l.5 6.5L16 26l7.5-2.1.9-10.2-.1-.4z" /></svg>;
    case "css3":
      return <svg viewBox="0 0 32 32" {...iconProps} fill={color}><path fill="#fff" d="M4 2h24l-2.2 25L16 30l-9.8-2.8L4 2zm20.1 7.3H11.4l.4 4.2h11.9l-.8 9.3-5.8 1.6-5.8-1.6-.4-4h-4l.5 6.5L16 26l7.5-2.1.9-10.2-.1-.4z" /></svg>;
    case "git":
      return <svg viewBox="0 0 128 128" {...iconProps} fill="#F05032"><circle cx="64" cy="64" r="64"/><path fill="#fff" d="M94 64c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/><text x="64" y="84" textAnchor="middle" fontSize="48" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="bold">G</text></svg>;
    case "sql":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><ellipse cx="16" cy="8" rx="12" ry="4" /><path d="M4 10v12c0 2.2 5.4 4 12 4s12-1.8 12-4V10c0 2.2-5.4 4-12 4s-12-1.8-12-4z" /><ellipse cx="16" cy="22" rx="12" ry="4" /><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">SQL</text></svg>;
    case "flutter":
      return <svg viewBox="0 0 24 24" {...iconProps} fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 0 .54-1.503 2.234 2.234 0 0 0-.54-1.503l-3.46-3.46a.75.75 0 0 0-1.06 0l-3.46 3.46a2.236 2.236 0 0 0 0 3.006l3.46 3.46a.75.75 0 0 0 1.06 0l3.46-3.46zm-1.06 1.503L12 15.067l-1.17-1.56a.75.75 0 0 0-1.06 0l-1.17 1.56-1.17-1.56a.75.75 0 0 0-1.06 0L5.36 12.004a.75.75 0 0 0 0-1.06l1.17-1.56 1.17 1.56a.75.75 0 0 0 1.06 0l1.17-1.56 1.17 1.56a.75.75 0 0 0 1.06 0l1.17-1.56 1.17 1.56a.75.75 0 0 0 1.06 0l1.17-1.56a.75.75 0 0 0 0 1.06z"/></svg>;
    case "postgresql":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm8 24H8V8h16v16z"/><path d="M12 10h8v2h-8zm0 4h8v2h-8zm0 4h6v2h-6z"/></svg>;
    case "mysql":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><ellipse cx="16" cy="8" rx="12" ry="4"/><path d="M4 10v12c0 2.2 5.4 4 12 4s12-1.8 12-4V10c0 2.2-5.4 4-12 4s-12-1.8-12-4z"/><ellipse cx="16" cy="22" rx="12" ry="4"/><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">MySQL</text></svg>;
    case "aws":
      return <svg viewBox="0 0 32 32" {...iconProps} fill="currentColor"><path d="M16 2L2 8v16l14 6 14-6V8L16 2zm0 2.83l11.09 4.67L16 17.17 4.91 9.5 16 4.83zM4 10.24l12 7.76v10.76l-12-5.1V10.24zm16 0v13.42l12-5.1V10.24l-12 7.76z"/></svg>;
    default:
      return <Code {...iconProps} />;
  }
};


export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        document.documentElement.className = newTheme;
      }
      return newTheme;
    });
  };

  const skills = useMemo(() => [
    { name: "Flutter", color: "#02569B", category: "Mobile" },
    { name: "MongoDB", color: "#4DB33D", category: "Database" },
    { name: "PostgreSQL", color: "#336791", category: "Database" },
    { name: "MySQL", color: "#4479A1", category: "Database" },
    { name: "Express", color: "#000000", category: "Backend" },
    { name: "React", color: "#61DAFB", category: "Frontend" },
    { name: "Node.js", color: "#339933", category: "Backend" },
    { name: "Next.js", color: "#000000", category: "Frontend" },
    { name: "React Native", color: "#61DAFB", category: "Mobile" },
    { name: "JavaScript", color: "#F7DF1E", category: "Language" },
    { name: "TypeScript", color: "#3178C6", category: "Language" },
    { name: "Git", color: "#F05032", category: "Tools" },
    { name: "AWS", color: "#FF9900", category: "Cloud" },
  ], []);

  const projects = useMemo(() => [
    {
      title: "EditorsHub: Freelance Platform for Clients & Editors",
      description:
        "A full-stack freelance platform connecting clients with editors, featuring real-time chat, Stripe payments, and role-based dashboards.",
      tags: ["React", "Vite", "Node.js", "Express", "Supabase", "MongoDB", "Socket.io", "Stripe"],
      highlights: ["Real-time chat", "Stripe payments", "JWT Auth", "Role-based access"],
      github: "https://github.com/mamee13/EditorsHub",
      demo: "https://editors-hub.vercel.app/",
      // image field is no longer used for display but can be kept for data purposes
      // image: "/placeholder-editorshub.png"
    },
    {
      title: "WKU Construction Management System (CMS)",
      description:
        "A comprehensive CMS for Wolkite University with 5 user roles, enabling real-time collaboration, progress tracking, and secure file sharing.",
      tags: ["React", "Node.js", "Express", "MongoDB", "MERN", "Socket.io"],
      highlights: ["Multi-role access", "Real-time chat", "Progress tracking", "File sharing"],
      github: "https://github.com/mamee13/Construction_Management_System-CMS-_For_WKU",
      // image: "/placeholder-wku-cms.png"
    },
    {
      title: "Fullstack Blog Website",
      description: "A modern blog platform built with Next.js and Node.js, supporting user auth, post creation, and interactions like likes & comments.",
      tags: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
      highlights: ["User Auth", "CRUD blog posts", "Like/Comment system", "Responsive UI"],
      github: "https://github.com/mamee13/blog_website",
      demo: "https://blog-website-l3ib.vercel.app/",
      // image: "/placeholder-blog.png"
    },
    {
      title: "Screen Recorder",
      description: "A Flutter-based screen recording app for Android devices. Easily record your screen with customizable settings including resolution, frame rate, bitrate, and audio inclusion.",
      tags: ["Flutter", "Android", "Mobile"],
      highlights: ["High-quality screen recording with multiple resolution options (480p, 720p, 1080p)", "Customizable FPS (24-60) and bitrate settings", "Audio recording option", "Countdown timer before recording starts", "Pause and resume functionality", "Recording history with playback", "Dark/Light theme support", "Onboarding for first-time users"],
      demo: "https://github.com/mamee13/screen_recorder",
    },
    {
      title: "Background Video Recorder",
      description: "A Flutter-based mobile application that allows you to record high-quality videos in the background on your Android or iOS device. Perfect for capturing moments without keeping the app open.",
      tags: ["Flutter", "Android", "iOS", "Mobile"],
      highlights: ["Background Recording: Record videos even when the app is minimized or the screen is locked.", "Camera Selection: Choose between front and back camera.", "Quality Options: Select from 480p, 720p, or 1080p resolution.", "Recording History: View and manage your recorded videos.", "Persistent Notification: Stay informed about recording status.", "Permissions Management: Easy permission handling for camera, microphone, and storage."],
      demo: "https://github.com/mamee13/screen_recorder",
    },
    {
      title: "CliClock",
      description: "Cliclock is a sleek and intuitive mobile app built with Flutter, designed to help you manage time effectively. Whether you need a precise clock, a countdown timer, or customizable settings.",
      tags: ["Flutter", "Mobile"],
      highlights: ["Digital Clock: Accurate time display with customizable themes", "Timer: Set countdown timers for various tasks", "Themes: Choose from beautiful UI's with Google Fonts integration", "Settings: Personalize your experience with theme and preference options", "Contact: Easy access to support and feedback"],
      demo: "https://github.com/mamee13/Cliclock",
    },
  ], []);

  const stats = useMemo(() => [
    { value: "6+", label: "Projects Completed", icon: <Code className="w-6 h-6 text-primary" /> },
    { value: "3+", label: "Years of Experience", icon: <Palette className="w-6 h-6 text-primary" /> },
    { value: "Flutter", label: "Primary Stack for mobile app development", icon: <Server className="w-6 h-6 text-primary" /> },
    { value: "MERN", label: "Primary Stack for web app development", icon: <Smartphone className="w-6 h-6 text-primary" /> },
  ], []);

  if (!isMounted) {
    return null; 
  }

  const MotionCard = motion(Card);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 space-y-8 md:space-y-0">
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-slate-300 dark:border-slate-700 shadow-xl">
                <AvatarImage src="/profile.jpg" alt="Mamaru Yirga" />
                <AvatarFallback className="text-4xl">MY</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
              >
                Mamaru Yirga
              </motion.h1>
              <motion.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-primary dark:text-primary-light mt-1"
              >
                Mobile app and Fullstack Developer
              </motion.p>
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 flex space-x-3"
              >
                <Button variant="ghost" size="icon" asChild className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light">
                  <a href="https://github.com/mamee13" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <Github className="h-6 w-6" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light">
                  <a href="https://linkedin.com/in/mamee1313" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light">
                  <a href="mailto:mamaruyirga1394@gmail.com" aria-label="Send Email">
                    <Mail className="h-6 w-6" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button onClick={toggleTheme} variant="outline" className="shadow-md">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
          </motion.div>
        </header>

        <nav className="mb-12 sticky top-4 z-10 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <div className="flex justify-center space-x-1 md:space-x-2">
            {["about", "skills", "projects", "contact"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-md transition-all duration-300 ease-out ${
                  activeTab === tab ? 'text-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-primary dark:bg-primary-light rounded-md z-[-1]"
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </Button>
            ))}
          </div>
        </nav>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-[400px]"
            >
              {activeTab === "about" && (
                <section id="about" className="space-y-8">
                  <MotionCard layout className="bg-white dark:bg-slate-800/50 shadow-lg border border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-white">About Me</CardTitle>
                    </CardHeader>
                    <CardContent className="text-lg space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        I'm Mamaru Yirga, a passionate Mobile App Developer (Flutter) and Fullstack website
                        Developer dedicated to crafting clean, functional, and user-centric digital experiences. My
                        expertise spans Flutter and MERN stack (MongoDB, Express, React, Node.js) and Next.js for
                        performant web applications.
                      </p>
                      <p>
                        My development philosophy is rooted in understanding user needs, designing practical solutions, and writing maintainable code. I thrive on tackling real-world problems and continuously expanding my skillset.
                      </p>
                      <p>
                        Currently, I'm focused on contributing to impactful projects, collaborating with talented teams, and embracing complex challenges in both web and mobile domains.
                      </p>
                    </CardContent>
                  </MotionCard>
                  <MotionCard layout className="bg-white dark:bg-slate-800/50 shadow-lg border border-slate-200 dark:border-slate-700">
                    <CardHeader>
                       <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((stat) => (
                          <motion.div 
                            key={stat.label} 
                            className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex justify-center mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-primary dark:text-primary-light">{stat.value}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </MotionCard>
                </section>
              )}

              {activeTab === "skills" && (
                <section id="skills">
                   <MotionCard layout className="bg-white dark:bg-slate-800/50 shadow-lg border border-slate-200 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-white">Skills & Technologies</CardTitle>
                      <CardDescription>My technical toolkit for building modern applications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {skills.map((skill) => (
                          <motion.div
                            key={skill.name}
                            className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="w-16 h-16 flex items-center justify-center mb-3 rounded-full bg-slate-200 dark:bg-slate-600 group-hover:bg-primary/10 dark:group-hover:bg-primary-light/20 transition-colors">
                              {getSkillIcon(skill.name, theme === 'dark' ? skill.color : (skill.color === '#000000' ? '#333333' : skill.color) )}
                            </div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{skill.name}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </MotionCard>
                </section>
              )}

              {activeTab === "projects" && (
                <section id="projects" className="space-y-8">
                   <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-white">My Recent Work</CardTitle>
                      <CardDescription>Here are a few projects I've worked on.</CardDescription>
                    </CardHeader>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                      <MotionCard
                        key={project.title}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden rounded-xl"
                      >
                        {/* Image removed from here */}
                        <CardHeader className="pt-6"> {/* Adjusted padding */}
                          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 flex-grow">
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.description}
                          </p>
                          {project.highlights && (
                            <div>
                              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                Key Features:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {project.highlights.slice(0,3).map((highlight) => (
                                  <span key={highlight} className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.slice(0,5).map((tag) => (
                              <span key={tag} className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex space-x-3 p-4 bg-slate-50 dark:bg-slate-800 border-t dark:border-slate-700">
                          {project.github && (
                            <Button variant="outline" size="sm" className="flex-1 group" asChild>
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.demo && (
                            <Button variant="default" size="sm" className="flex-1 group" asChild>
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </MotionCard>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "contact" && (
                <section id="contact">
                  <MotionCard layout className="bg-white dark:bg-slate-800/50 shadow-lg border border-slate-200 dark:border-slate-700">
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-white">Get in Touch</CardTitle>
                      <CardDescription className="mt-2 text-lg">
                        I'm excited to connect! Whether you have a project, an opportunity, or just want to chat about tech.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="max-w-xl mx-auto space-y-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">Contact Details</h3>
                                <a href="mailto:mamaruyirga1394@gmail.com" className="flex items-center space-x-3 group">
                                    <Mail className="w-6 h-6 text-primary dark:text-primary-light group-hover:scale-110 transition-transform" />
                                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">mamaruyirga1394@gmail.com</span>
                                </a>
                                <a href="https://github.com/mamee13" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                                    <Github className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors group-hover:scale-110" />
                                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">github.com/mamee13</span>
                                </a>
                                <a href="https://linkedin.com/in/mamee1313" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors group-hover:scale-110" />
                                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">linkedin.com/in/mamee1313</span>
                                </a>
                            </div>

                            <div className="space-y-4 pt-0 md:pt-10">
                                <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary-light/90 dark:text-slate-900 flex items-center justify-center">
                                    <a href="mailto:mamaruyirga1394@gmail.com">
                                    <Mail className="w-5 h-5 mr-2" /> Send an Email
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" asChild className="w-full flex items-center justify-center">
                                    <a href="https://linkedin.com/in/mamee1313" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-5 h-5 mr-2" /> Connect on LinkedIn
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-6">
                            I look forward to hearing from you!
                        </p>
                    </CardContent>
                  </MotionCard>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Mamaru Yirga. All rights reserved.
            </p>
        </footer>

      </div>
    </div>
  );
}
