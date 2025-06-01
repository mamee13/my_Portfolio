import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Database, Server, Cpu, Mail, Github, Linkedin, Briefcase, Calendar, ChevronRight } from 'lucide-react'

export default function EnhancedPortfolio() {
  const [activeTab, setActiveTab] = useState('about')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const skills = [
    { name: 'Python', icon: <Code2 className="w-4 h-4 mr-2" />, proficiency: 90 },
    { name: 'Node.js', icon: <Server className="w-4 h-4 mr-2" />, proficiency: 85 },
    { name: 'SQL', icon: <Database className="w-4 h-4 mr-2" />, proficiency: 80 },
    { name: 'Docker', icon: <Cpu className="w-4 h-4 mr-2" />, proficiency: 75 },
  ]

  const projects = [
    {
      title: 'Microservices E-commerce Platform',
      description: 'Architected and developed a complete microservices-based e-commerce platform handling 100k+ daily transactions with real-time inventory management, payment processing, and order fulfillment.',
      tags: ['Node.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis', 'RabbitMQ'],
      highlights: ['99.9% uptime', 'Sub-200ms response time', 'Auto-scaling']
    },
    {
      title: 'Real-time Analytics Dashboard API',
      description: 'Built a high-performance analytics API processing millions of events per day with real-time data aggregation, custom metrics, and interactive dashboard endpoints.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'ClickHouse', 'Apache Kafka', 'Docker'],
      highlights: ['10M+ events/day', 'Real-time processing', 'Custom metrics']
    },
    {
      title: 'AI-Powered Content Management System',
      description: 'Developed a sophisticated CMS with AI-driven content recommendations, automated tagging, and multi-tenant architecture serving 50+ enterprise clients.',
      tags: ['Go', 'PostgreSQL', 'Elasticsearch', 'AWS', 'TensorFlow', 'gRPC'],
      highlights: ['Multi-tenant', 'AI recommendations', '50+ clients']
    },
    {
      title: 'Blockchain Transaction Processor',
      description: 'Created a secure blockchain transaction processing system with smart contract integration, wallet management, and comprehensive audit trails.',
      tags: ['Rust', 'Solidity', 'PostgreSQL', 'Web3', 'Docker', 'Kubernetes'],
      highlights: ['Smart contracts', 'High security', 'Audit trails']
    },
    {
      title: 'Distributed File Storage System',
      description: 'Engineered a distributed file storage solution with automatic replication, data deduplication, and seamless scaling across multiple data centers.',
      tags: ['Go', 'MinIO', 'Consul', 'Prometheus', 'Grafana', 'Docker'],
      highlights: ['Auto-replication', 'Deduplication', 'Multi-datacenter']
    }
  ]

  const experience = [
    {
      title: 'Senior Backend Developer',
      company: 'Tech Innovators Inc.',
      period: 'Jan 2020 - Present',
      description: 'Leading backend development for scalable cloud applications.'
    },
    {
      title: 'Backend Developer',
      company: 'DataDriven Solutions',
      period: 'Mar 2017 - Dec 2019',
      description: 'Developed and maintained robust APIs and microservices.'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Nexus',
      period: 'Jun 2015 - Feb 2017',
      description: 'Assisted in building backend systems for various startup projects.'
    }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 ${theme}`}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Your Name" />
            <AvatarFallback>YN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Name</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Senior Backend Developer</p>
          <Button onClick={toggleTheme} variant="outline">
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </header>

        <nav className="flex justify-center space-x-4 mb-8">
          {['about', 'skills', 'projects', 'experience', 'contact'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'about' && (
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    I'm a passionate senior backend developer with 8 years of experience in building scalable and efficient server-side applications. 
                    My expertise lies in designing robust APIs, optimizing database performance, and implementing cloud-native solutions.
                    I thrive in challenging environments and am always eager to learn and apply new technologies to solve complex problems.
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'skills' && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center">
                          <Badge variant="secondary" className="text-sm py-1 px-2 mr-2">
                            {skill.icon}
                            {skill.name}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'projects' && (
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                        {project.highlights && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Achievements:</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.highlights.map((highlight, highlightIndex) => (
                                <Badge key={highlightIndex} variant="secondary" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {experience.map((job, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-0">
                        <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {job.period}
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'contact' && (
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:your.email@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      your.email@example.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      github.com/yourusername
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="w-5 h-5 mr-2" />
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      linkedin.com/in/yourusername
                    </a>
                  </div>
                  <form className="space-y-4 mt-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <Textarea placeholder="Your Message" />
                    <Button type="submit">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
