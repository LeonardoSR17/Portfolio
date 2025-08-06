"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Code2,
  User,
  MessageCircle,
  Home,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ContactForm } from "@/components/contact-form" // Removido, pois o formulário não será mais renderizado

interface PetalData {
  id: number
  left: number
  delay: number
  duration: number
  pushed: boolean
  pushDirection: "left" | "right" | null
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [petals, setPetals] = useState<PetalData[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  const t = {
    pt: {
      home: "Home",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      greeting: "Olá, eu sou",
      name: "Leonardo S. Ruschel",
      subtitle: "Estudante de Análise e Desenvolvimento de Sistemas apaixonado por tecnologia e inovação",
      viewProjects: "Ver Projetos",
      contactMe: "Contato",
      aboutTitle: "Sobre Mim",
      journeyTitle: "Minha Jornada",
      journeyText:
        "Tenho 20 anos e curso Análise e Desenvolvimento de Sistemas no 4º semestre do Cesuca. Participo do Projeto Metamorfose Digital, onde atuo com conserto de hardware e ensino de tecnologia para jovens do CRAS, junto a professores da área de TI. Também tenho experiência com JavaScript e tecnologias voltadas ao desenvolvimento web. Meu primeiro contato com programação foi em 2022, no programa Usina de Talentos do Senac-RS, e desde então sigo me aprofundando na área. No tempo livre, gosto de estudar, ler sobre fantasia, ficção e filosofia, desenhar e praticar exercícios. Estou sempre em busca de novos conhecimentos e desafios que me ajudem a evoluir como desenvolvedor e como pessoa.",
      downloadPortfolio: "Baixar Currículo PDF",
      usedTech: "Tecnologias Usadas",
      careerGoals: "Objetivos de Carreira",
      goal1: "Tornar-me um desenvolvedor Junior Profissionalmente",
      goal2: "Contribuir para projetos open source",
      goal3: "Especializar-me em arquitetura de software",
      projectsTitle: "Meus Projetos",
      projectEditorTitle: "Editor de Texto",
      projectEditorDesc:
        "Esta aplicação é um editor de texto simples, com foco em usabilidade e responsividade. Utiliza ícones do Boxicons e permite exportar arquivos nos formatos .txt e .pdf.",
      codeButton: "Código",
      demoButton: "Demo",
      contactTitle: "Vamos Conversar!",
      contactSubtitle: "Entre em Contato",
      contactText: "Estou sempre aberto a novas oportunidades e colaborações. Vamos criar algo incrível juntos!",
      email: "Email",
      footer: "© 2025 Leonardo S. Ruschel. Feito com ❤️ e muito código!",
    },
    en: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      greeting: "Hello, I'm",
      name: "Leonardo S. Ruschel",
      subtitle: "Systems Analysis and Development student passionate about technology and innovation",
      viewProjects: "View Projects",
      contactMe: "Contact",
      aboutTitle: "About Me",
      journeyTitle: "My Journey",
      journeyText:
        "I'm 20 years old and studying Systems Analysis and Development in the 4th semester at Cesuca. I participate in the Digital Metamorphosis Project, where I work with hardware repair and technology education for young people from CRAS, alongside IT professors. I also have experience with JavaScript and web development technologies. My first contact with programming was in 2022, in the Senac-RS Talent Factory program, and since then I've been deepening my knowledge in the field. In my free time, I enjoy studying, reading about fantasy, fiction and philosophy, drawing and exercising. I'm always looking for new knowledge and challenges that help me evolve as a developer and as a person.",
      downloadPortfolio: "Download Resume PDF",
      usedTech: "Technologies Used",
      careerGoals: "Career Goals",
      goal1: "Become a Junior Developer Professionally",
      goal2: "Contribute to open source projects",
      goal3: "Specialize in software architecture",
      projectsTitle: "My Projects",
      projectEditorTitle: "Text Editor",
      projectEditorDesc:
        "This application is a simple text editor, focused on usability and responsiveness. It uses Boxicons icons and allows exporting files in .txt and .pdf formats.",
      codeButton: "Code",
      demoButton: "Demo",
      contactTitle: "Let's Talk!",
      contactSubtitle: "Get In Touch",
      contactText: "I'm always open to new opportunities and collaborations. Let's create something amazing together!",
      email: "Email",
      footer: "© 2025 Leonardo S. Ruschel. Made with ❤️ and lots of code!",
    },
  }[language]

  // Inicializar pétalas
  useEffect(() => {
    const initialPetals: PetalData[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      pushed: false,
      pushDirection: null,
    }))
    setPetals(initialPetals)
  }, [])

  // Rastrear posição do mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Leonardo_Ruschel_Curriculo.pdf" // Caminho corrigido
    link.download = "Leonardo_Ruschel_Curriculo.pdf"
    link.click()
  }

  const handlePetalInteraction = (petalId: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const petalCenterX = rect.left + rect.width / 2
    const mouseX = event.clientX

    // Determinar direção do empurrão baseado na posição do mouse
    const pushDirection = mouseX < petalCenterX ? "left" : "right"

    setPetals((prev) => prev.map((petal) => (petal.id === petalId ? { ...petal, pushed: true, pushDirection } : petal)))

    // Resetar a pétala após a animação
    setTimeout(() => {
      setPetals((prev) =>
        prev.map((petal) =>
          petal.id === petalId
            ? {
                ...petal,
                pushed: false,
                pushDirection: null,
                left: Math.random() * 100,
                delay: 0,
                duration: 8 + Math.random() * 4,
              }
            : petal,
        ),
      )
    }, 600)
  }

  const projects = [
    {
      title: t.projectEditorTitle,
      desc: t.projectEditorDesc,
      tech: ["Javascript", "CSS", "Html"],
      codeLink: "https://github.com/LeonardoSR17/Editor-de-Texto",
      demoLink: "https://leonardosr17.github.io/Editor-de-Texto/",
    },
  ]

  const technologies = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "CSS", "Html"]

  const goals = [t.goal1, t.goal2, t.goal3]

  const navItems = [
    { id: "home", label: t.home, icon: Home },
    { id: "about", label: t.about, icon: User },
    { id: "projects", label: t.projects, icon: Code2 },
    { id: "contact", label: t.contact, icon: MessageCircle },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen relative ${darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
        {/* Pétalas interativas */}
        <div className="falling-petals-container">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className={`falling-petal ${petal.pushed ? "pushed" : ""} ${
                petal.pushDirection ? `push-${petal.pushDirection}` : ""
              }`}
              style={{
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
              }}
              onMouseEnter={(e) => handlePetalInteraction(petal.id, e)}
              onClick={(e) => handlePetalInteraction(petal.id, e)}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
            darkMode ? "bg-black/95 border-gray-800" : "bg-white/95 border-gray-200"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div></div>

              <div className="hidden md:flex space-x-8">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "pt" ? "en" : "pt")}>
                  <span className="text-xs font-bold">{language === "pt" ? "EN" : "PT"}</span>
                </Button>

                <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="px-4 py-4 space-y-2 sm:space-y-3">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Home */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="manga-panel p-4 sm:p-6 md:p-8 rounded-2xl mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 manga-title-spaced">
                {t.greeting}
                <span className="block text-pink-500 manga-glow-text">{t.name}</span>
              </h1>
              <p
                className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 font-medium px-2 ${darkMode ? "text-gray-200" : "text-gray-600"}`}
              >
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Button
                onClick={() => scrollTo("projects")}
                className="manga-button-primary px-6 sm:px-8 py-3 text-base sm:text-lg font-bold rounded-xl w-full sm:w-auto"
              >
                {t.viewProjects}
              </Button>
              <Button
                onClick={() => scrollTo("contact")}
                variant="outline"
                className="manga-button px-6 sm:px-8 py-3 text-base sm:text-lg font-bold rounded-xl w-full sm:w-auto"
              >
                {t.contactMe}
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className={`py-12 sm:py-16 md:py-20 px-4 ${darkMode ? "bg-black/90" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 manga-title-spaced">
              {t.aboutTitle}
            </h2>

            <div className="space-y-8 md:space-y-12">
              <div className="manga-panel p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 manga-section-title">{t.journeyTitle}</h3>
                <p
                  className={`text-base sm:text-lg mb-6 leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-600"}`}
                >
                  {t.journeyText}
                </p>

                <Button
                  onClick={downloadCV}
                  className="manga-button-primary w-full flex items-center justify-center space-x-2 py-3 text-base font-bold"
                >
                  <Download size={20} />
                  <span>{t.downloadPortfolio}</span>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <Card className={`manga-card ${darkMode ? "bg-gray-900/80" : "bg-gray-50"}`}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl font-semibold manga-section-title">{t.usedTech}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 manga-tag ${
                            darkMode
                              ? "bg-gray-800 text-pink-200 hover:bg-pink-600 hover:text-white"
                              : "bg-white text-gray-700 hover:bg-pink-600 hover:text-white"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`manga-card ${darkMode ? "bg-gray-900/80" : "bg-white"}`}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl font-semibold manga-section-title">
                      {t.careerGoals}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className={`space-y-2 sm:space-y-3 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      {goals.map((goal, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={`py-12 sm:py-16 md:py-20 px-4 ${darkMode ? "bg-black/95" : "bg-gray-50"}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 manga-title-spaced">
              {t.projectsTitle}
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`manga-card transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    darkMode ? "bg-gray-900/80" : "bg-white"
                  }`}
                >
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl font-semibold">{project.title}</CardTitle>
                    <p className={`text-sm sm:text-base ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      {project.desc}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium manga-tag ${
                            darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="manga-button flex items-center justify-center space-x-2 bg-transparent w-full sm:w-auto"
                      >
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                          <span>{t.codeButton}</span>
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="manga-button-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
                      >
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          <span>{t.demoButton}</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`py-12 sm:py-16 md:py-20 px-4 ${darkMode ? "bg-black/90" : "bg-white"}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 manga-title-spaced">
              {t.contactTitle}
            </h2>

            <div className="manga-panel p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 manga-section-title">
                {t.contactSubtitle}
              </h3>
              <p className={`text-base sm:text-lg mb-6 sm:mb-8 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                {t.contactText}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* Email Item (não clicável) */}
                <div
                  className={`manga-card p-4 flex items-center space-x-3 sm:space-x-4 ${
                    darkMode ? "bg-gray-900/80" : "bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base">{t.email}</p>
                    <p className={`text-sm sm:text-base break-all ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      leonardosruschel@gmail.com
                    </p>
                  </div>
                </div>

                {/* GitHub Item (com borda inicial e mais destaque) */}
                <a
                  href="https://github.com/LeonardoSR17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`manga-card p-4 flex items-center space-x-3 sm:space-x-4 transition-all duration-300 cursor-pointer group
                    ${
                      darkMode
                        ? "hover:bg-pink-600/20 hover:shadow-[10px_10px_0px_#ec4899]"
                        : "hover:bg-pink-50 hover:shadow-[10px_10px_0px_#000]"
                    }
                    hover:-translate-x-2 hover:-translate-y-2
                  `}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Github className="text-white" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base group-hover:text-pink-600 transition-colors duration-300">
                      GitHub
                    </p>
                    <p
                      className={`text-sm sm:text-base break-all transition-colors duration-300 ${
                        darkMode ? "text-gray-200 group-hover:text-pink-300" : "text-gray-600 group-hover:text-pink-700"
                      }`}
                    >
                      LeonardoSR17
                    </p>
                  </div>
                  <ExternalLink
                    size={16}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      darkMode ? "text-pink-400" : "text-pink-600"
                    }`}
                  />
                </a>

                {/* LinkedIn Item (com borda inicial e mais destaque) */}
                <a
                  href="https://linkedin.com/in/leonardo-s-ruschel-450310323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`manga-card p-4 flex items-center space-x-3 sm:space-x-4 transition-all duration-300 cursor-pointer group
                    ${
                      darkMode
                        ? "hover:bg-pink-600/20 hover:shadow-[10px_10px_0px_#ec4899]"
                        : "hover:bg-pink-50 hover:shadow-[10px_10px_0px_#000]"
                    }
                    hover:-translate-x-2 hover:-translate-y-2
                  `}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base group-hover:text-pink-600 transition-colors duration-300">
                      LinkedIn
                    </p>
                    <p
                      className={`text-sm sm:text-base break-all transition-colors duration-300 ${
                        darkMode ? "text-gray-200 group-hover:text-pink-300" : "text-gray-600 group-hover:text-pink-700"
                      }`}
                    >
                      Leonardo S. Ruschel
                    </p>
                  </div>
                  <ExternalLink
                    size={16}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      darkMode ? "text-pink-400" : "text-pink-600"
                    }`}
                  />
                </a>
              </div>

              {/* A seção de "Envie uma Mensagem" foi removida daqui. */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 px-4 border-t-3 ${
            darkMode ? "bg-black border-pink-500 text-pink-200" : "bg-gray-50 border-gray-300 text-gray-600"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="manga-title-clean font-medium">{t.footer}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
