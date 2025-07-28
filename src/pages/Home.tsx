import React, { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0); // 0 = primera pregunta abierta por defecto
  
  // Estados para testimonios
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Datos de testimonios
  const testimonials = [
    {
      id: 1,
      name: "María González",
      title: "Paciente de Fisioterapia",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711377/photo-1534528741775-53994a69daeb_tfeheq.webp",
      testimonial: "Excelente atención profesional. Me ayudaron a recuperar la movilidad después de mi lesión. El equipo es muy dedicado y los resultados fueron increíbles."
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      title: "Deportista",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1507003211169-0a1dd7228f2d_wu0yay.webp",
      testimonial: "Como deportista, necesitaba rehabilitación específica. El tratamiento personalizado me permitió volver a competir en solo 3 meses. Altamente recomendado."
    },
    {
      id: 3,
      name: "Ana Martínez",
      title: "Paciente de Rehabilitación",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1438761681033-6461ffad8d80_jtef54.webp",
      testimonial: "Después de mi cirugía, la rehabilitación fue fundamental. El equipo me guió paso a paso y ahora me siento mejor que nunca. Muy profesionales."
    },
    {
      id: 4,
      name: "Roberto Silva",
      title: "Paciente de Terapia Manual",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1472099645785-5658abf4ff4e_zakvw7.webp",
      testimonial: "Sufría de dolores crónicos de espalda. Con la terapia manual logré una mejora significativa. El tratamiento fue muy efectivo y profesional."
    },
    {
      id: 5,
      name: "Laura Fernández",
      title: "Paciente de Pilates",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711317/photo-1544005313-94ddf0286df2_qicg9u.webp",
      testimonial: "El pilates terapéutico cambió mi vida. Mejoré mi postura y eliminé los dolores que tenía. El ambiente es muy acogedor y profesional."
    },
    {
      id: 6,
      name: "Miguel Torres",
      title: "Paciente de Evaluación Postural",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1500648767791-00dcc994a43e_alwlur.webp",
      testimonial: "La evaluación postural fue muy completa. Identificaron problemas que no sabía que tenía y me dieron un plan de tratamiento muy efectivo."
    }
  ];

  // Funciones para el carrusel de testimonios
  const nextTestimonial = () => {
    setSlideDirection('right');
    setCurrentTestimonialIndex((prev) => 
      prev + 3 >= testimonials.length ? 0 : prev + 3
    );
  };

  const prevTestimonial = () => {
    setSlideDirection('left');
    setCurrentTestimonialIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3
    );
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentTestimonialIndex;
    const endIndex = Math.min(startIndex + 3, testimonials.length);
    return testimonials.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect para cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Si el menú está abierto Y el clic NO fue en el menú ni en el botón hamburguesa
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false); // Cerrar menú
      }
    };

    // Controlar scroll del body cuando el menú está abierto
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open'); // Bloquear scroll
    } else {
      document.body.classList.remove('menu-open'); // Permitir scroll
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Función para cerrar menú al hacer clic en un enlace
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100;
      const elementPosition = element.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // Cerrar menú móvil automáticamente
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .carousel-arrow {
          transition: all 0.3s ease;
        }
        
        .carousel-arrow:hover {
          transform: scale(1.1);
        }
        
        .carousel-item {
          transition: all 0.3s ease;
        }
      `}</style>

      <style>{`
        /* Prevenir scroll cuando el menú móvil está abierto */
        body.menu-open {
          overflow: hidden;
        }

        /* Efecto hover en el botón hamburguesa */
        .hamburger-button:hover span {
          background-color: #059669;
        }

        /* Efecto de desenfoque en el menú */
        .mobile-menu {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      {/* Header */}
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Logo</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#inicio" className="text-blue-600 font-medium">Inicio</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#servicios" className="text-gray-700 hover:text-blue-600 font-medium">Servicios</a>
              <a href="#pages" className="text-gray-700 hover:text-blue-600 font-medium">Pages</a>
              <a href="#shop" className="text-gray-700 hover:text-blue-600 font-medium">Shop</a>
              <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium">Contacto</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="hamburger-button lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            >
              {/* Línea superior - se rota 45° y se mueve hacia abajo cuando está abierto */}
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              
              {/* Línea media - se desvanece cuando está abierto */}
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              
              {/* Línea inferior - se rota -45° y se mueve hacia arriba cuando está abierto */}
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Right Side Icons and Info */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search and Cart Icons */}
              <div className="flex items-center space-x-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <FaCartShopping className="w-6 h-6 text-gray-600" />
              </div>

              {/* Emergency Call */}
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Llamada de emergencia</p>
                  <p className="text-sm font-bold text-gray-900">+54 223 123-4567</p>
                </div>
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.65 3 4.19C3 13.16 10.84 21 19.81 21c.54 0 .99-.45.99-.99v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>

              {/* Appointment Button */}
              <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
                <span>Reserva online</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor del menú móvil */}
      <div 
        className={`mobile-menu fixed top-0 left-0 w-full h-full z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`} 
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Enlaces del menú */}
          <ul className="space-y-6 text-gray-700 font-semibold text-xl">
            <li onClick={() => scrollToSection('inicio')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Inicio</li>
            <li onClick={() => scrollToSection('about')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">About</li>
            <li onClick={() => scrollToSection('servicios')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Servicios</li>
            <li onClick={() => scrollToSection('pages')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Pages</li>
            <li onClick={() => scrollToSection('shop')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Shop</li>
            <li onClick={() => scrollToSection('blog')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Blog</li>
            <li onClick={() => scrollToSection('contacto')} className="hover:text-green-600 cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Contacto</li>
          </ul>
        </div>
      </div>

      {/* Hero Section - Exact Mediox Style */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-200 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Side - Text and Video */}
            <div className="space-y-8">
              {/* Service Badge */}
              <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                24/7 Servicios de Emergencia
              </div>

              {/* Main Headline */}
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Kinesiologos
                  <br />
                  <span className="text-blue-600">Mar del Plata</span>
                </h2>
                
                {/* Video Thumbnail - Floating */}
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-100 cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={openVideo}
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Recuperá tu bienestar con atención profesional y cercana.
              Creamos planes personalizados, apostando a la excelencia y al trabajo en equipo. Nos enfocamos en tu progreso real, paso a paso.
              </p>

              {/* CTA Button */}
              <button className="bg-blue-500 text-white px-8 py-4 rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
                <span>Ver Todos los Servicios</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>

              {/* Floating Icons */}
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Image and Info Box */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-blue-600 font-semibold">Profesional</p>
                        <p className="text-blue-500 text-sm">Kinesióloga</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box - Floating */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">100% Loved &</p>
                      <p className="text-sm font-semibold text-gray-900">Satisfied Patients</p>
                    </div>
                  </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753722759/photo-1559839734-2b71ea197ec2_ottz27.webp"
                  alt="Equipo médico en consulta"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                {/* Experience Overlay */}
                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">25+</div>
                    <div className="text-sm opacity-90">Años de experiencia</div>
                    <div className="text-sm opacity-90">en servicios médicos</div>
                  </div>
                  {/* Stethoscope Icon Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* About Us Header */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <span className="text-blue-500 font-medium text-sm">Sobre Nosotros</span>
              </div>

              {/* Main Title */}
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  La mejor atención médica
                  <br />
                  <span className="text-blue-600">para ti desde 2002</span>
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full ml-2"></span>
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              {/* Statistics */}
              <div className="flex items-center space-x-8 py-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-1">89%</div>
                  <div className="text-gray-700 text-sm">Proyectos médicos</div>
                  <div className="text-gray-700 text-sm">exitosos</div>
                </div>
                <div className="w-px h-16 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-1">100%</div>
                  <div className="text-gray-700 text-sm">Pacientes</div>
                  <div className="text-gray-700 text-sm">satisfechos</div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2 group">
                <span>Conoce más</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Profile Card */}
              <div className="flex items-center space-x-4 pt-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-100">
                  <img
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753722759/photo-1559839734-2b71ea197ec2_ottz27.webp"
                    alt="Alexsia Jorgina"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Alexsia Jorgina</div>
                  <div className="text-gray-600 text-sm">Co. Fundadora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Enhanced Images */}
            <div className="relative">
              {/* Main Circular Image with Enhanced Effects */}
              <div className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[420px] md:w-[420px] md:h-[520px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl p-1">
                  <div className="w-full h-full rounded-3xl overflow-hidden bg-white p-1">
                    <img
                      src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753722980/photo-1571019613454-1cb2f99b2d8b_bdmqqy.webp"
                      alt="Equipo médico profesional"
                      className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                
                {/* Enhanced Secondary Circular Image */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white transform hover:scale-110 transition-all duration-500 hover:rotate-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
                  <img
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753722979/photo-1612349317150-e413f6a5b16d_rj6tje.webp"
                    alt="Médico sonriente"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Enhanced Decorative Medical Icons */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div className="absolute top-1/2 -right-6 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-6 left-1/4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce animation-delay-1000">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute top-1/4 -left-10 sm:-left-20 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-600">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Content */}
            <div className="space-y-10">
              {/* Enhanced Section Header */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 animate-pulse"></div>
                </div>
                <div>
                  <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Por qué elegirnos</span>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-1"></div>
                </div>
              </div>

              {/* Enhanced Main Title with Navigation Dots */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
                    Atención kinesiológica
                    </span>
                    <br />
                    <span className="text-gray-800">constante y confiable</span>
                  </h2>
                  <div className="flex space-x-2 pt-4">
                    <div className="w-3 h-3 bg-blue-300 rounded-full transition-all duration-300 hover:bg-blue-500 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full transition-all duration-300 hover:bg-blue-700 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-blue-300 rounded-full transition-all duration-300 hover:bg-blue-500 cursor-pointer"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Service Points */}
              <div className="space-y-6 lg:space-y-8">
                {/* Point 1 - Enhanced */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="relative flex items-start space-x-6 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Cuidado Compasivo y Experto</h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        Nuestro equipo de profesionales de la salud dedicados combina años de experiencia con un compromiso genuino de proporcionar la mejor atención posible a cada paciente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 2 - Enhanced */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="relative flex items-start space-x-6 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">Enfoque Centrado en el Paciente</h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        El compromiso del personal es nuestra estrella polar. Diseñamos cada tratamiento pensando en las necesidades específicas de cada paciente para lograr los mejores resultados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 3 - Enhanced */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className="relative flex items-start space-x-6 p-6 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Planes de Tratamiento Personalizados</h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        Desarrollamos estrategias de tratamiento únicas para cada paciente, utilizando las técnicas más avanzadas y efectivas para garantizar una recuperación óptima.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="pt-6">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Descubre más sobre nosotros</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Equipo Profesional</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Nuestro <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Equipo</span> Profesional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conoce a nuestros especialistas altamente calificados y comprometidos con tu salud y bienestar integral
            </p>
          </div>

          {/* Clean Professional Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Dra. María González",
                specialty: "Fisioterapeuta Especialista",
                experience: "15 años de experiencia",
                education: "Lic. en Kinesiología - UNLP",
                certifications: ["Terapia Manual", "Pilates Clínico", "Rehabilitación Deportiva"],
                specialties: ["Dolor de espalda", "Lesiones deportivas", "Rehabilitación post-quirúrgica"],
                availability: "Lunes a Viernes",
                image: "👩‍⚕️",
                color: "blue"
              },
              {
                name: "Dr. Carlos Rodríguez",
                specialty: "Kinesiólogo Deportivo",
                experience: "12 años de experiencia",
                education: "Lic. en Kinesiología - UBA",
                certifications: ["Kinesiología Deportiva", "Entrenamiento Funcional", "Punción Seca"],
                specialties: ["Lesiones deportivas", "Prevención de lesiones", "Rendimiento atlético"],
                availability: "Lunes a Sábados",
                image: "👨‍⚕️",
                color: "green"
              },
              {
                name: "Dra. Ana Martínez",
                specialty: "Rehabilitación Neurológica",
                experience: "18 años de experiencia",
                education: "Lic. en Kinesiología - UNMDP",
                certifications: ["Neurología Clínica", "Bobath", "Vojta"],
                specialties: ["Ictus", "Esclerosis múltiple", "Lesiones medulares"],
                availability: "Martes a Viernes",
                image: "👩‍⚕️",
                color: "purple"
              }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  {/* Header with Avatar */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                      {member.image}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm mb-1">{member.specialty}</p>
                    <p className="text-gray-500 text-xs">{member.experience}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                                         {/* Education */}
                     <div>
                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-left">Formación</p>
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                           </svg>
                         </div>
                         <p className="text-sm text-gray-700">{member.education}</p>
                       </div>
                     </div>

                     {/* Certifications */}
                     <div>
                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-left">Certificaciones</p>
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                           </svg>
                         </div>
                         <div className="flex flex-wrap gap-1">
                           {member.certifications.map((cert, certIndex) => (
                             <span key={certIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                               {cert}
                             </span>
                           ))}
                         </div>
                       </div>
                     </div>

                     {/* Specialties */}
                     <div>
                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-left">Especialidades</p>
                       <div className="flex items-start space-x-3">
                         <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                           </svg>
                         </div>
                         <div className="space-y-1">
                           {member.specialties.map((specialty, specIndex) => (
                             <div key={specIndex} className="flex items-center space-x-2">
                               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                               <span className="text-sm text-gray-600">{specialty}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>

                     {/* Availability */}
                     <div>
                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-left">Disponibilidad</p>
                       <div className="flex items-center space-x-3">
                         <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                           <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <p className="text-sm text-gray-700">{member.availability}</p>
                       </div>
                     </div>
                  </div>

                  {/* Footer with Actions */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Ver Perfil
                      </button>
                      <button className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01.293.707l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Call to Action */}
          <div className="text-center">
            <div className="relative bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white bg-opacity-90 text-blue-600 px-6 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Consulta Gratuita</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">¿Necesitas atención personalizada?</h3>
                <p className="text-white text-opacity-90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nuestro equipo está listo para ayudarte. Agenda tu consulta gratuita y descubre cómo podemos mejorar tu calidad de vida con tratamientos personalizados.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <span>Agendar Consulta</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
                    <span>Ver Horarios</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20 bg-white md:rounded-none rounded-3xl mx-4 md:mx-0">
        <div className="max-w-7xl mx-auto px-8">
                      <div id="testimonials-header" className="animate-on-scroll text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros pacientes</h2>
              <p className="text-lg sm:text-xl text-gray-600">Experiencias reales de personas que transformaron su vida a través de la kinesiología profesional</p>
            </div>
          
          {/* Carrusel de testimonios */}
          <div className="relative">
            {/* Flecha izquierda */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 carousel-arrow cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button 
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200 carousel-arrow cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contenedor de testimonios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-8 lg:px-16 carousel-container">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${currentTestimonialIndex}`} 
                  className="text-center carousel-item"
                  style={{
                    animation: slideDirection === 'right' 
                      ? 'slideInRight 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                      : 'slideInLeft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animationFillMode: 'both',
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{testimonial.title}</p>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="flex justify-center">
                    <div className="flex text-gray-900">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonialIndex(i * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonialIndex / 3) === i 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
          </div>
          
          <div className="space-y-0">
            {[
              {
                question: "¿Qué tratamientos de kinesiología ofrecen?",
                answer: "Ofrecemos una amplia gama de tratamientos incluyendo fisioterapia, rehabilitación deportiva, terapia manual, rehabilitación neurológica, pilates terapéutico y evaluación postural. Cada tratamiento se personaliza según las necesidades específicas del paciente."
              },
              {
                question: "¿Cuánto tiempo dura una sesión de tratamiento?",
                answer: "Las sesiones de tratamiento tienen una duración de 45 a 60 minutos, dependiendo del tipo de terapia y las necesidades específicas del paciente. La primera consulta puede extenderse hasta 90 minutos para incluir la evaluación completa."
              },
              {
                question: "¿Necesito una orden médica para recibir tratamiento?",
                answer: "Sí, es recomendable contar con una orden médica para recibir tratamiento de kinesiología. Esto nos permite conocer el diagnóstico y trabajar en conjunto con tu médico para obtener los mejores resultados."
              },
              {
                question: "¿Trabajan con obras sociales y prepagas?",
                answer: "Sí, trabajamos con la mayoría de las obras sociales y prepagas. Te recomendamos consultar previamente con tu cobertura médica para confirmar los requisitos específicos y la cobertura disponible."
              },
              {
                question: "¿Cuántas sesiones necesito para ver resultados?",
                answer: "El número de sesiones varía según el diagnóstico, la gravedad de la condición y la respuesta individual del paciente. Generalmente, se recomiendan entre 8 a 12 sesiones para ver mejoras significativas."
              },
              {
                question: "¿Ofrecen atención de emergencia?",
                answer: "Sí, ofrecemos atención de emergencia para casos urgentes. Contamos con un equipo disponible para atender situaciones que requieren intervención inmediata de kinesiología."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <div 
                  className="flex items-start justify-between cursor-pointer py-6 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-8 flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300">
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${openFAQ === index ? 'rotate-45' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6 pl-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  Estamos aquí para ayudarte. Agenda tu consulta y comienza tu camino hacia el bienestar.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ubicación</h3>
                    <p className="text-gray-600">Mar del Plata, Buenos Aires</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01.293.707l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <p className="text-gray-600">+54 223 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@kinesiologosmdp.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Agenda tu Consulta</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Seleccionar servicio</option>
                      <option>Fisioterapia</option>
                      <option>Kinesiología Deportiva</option>
                      <option>Rehabilitación Neurológica</option>
                      <option>Terapia Manual</option>
                      <option>Pilates Terapéutico</option>
                      <option>Evaluación Postural</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Mensaje (opcional)"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Enviar Consulta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Kinesiólogos MDP</h3>
                  <p className="text-sm text-gray-400">Cuidado profesional</p>
                </div>
              </div>
              <p className="text-gray-400">
                Comprometidos con tu salud y bienestar desde 2010.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fisioterapia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kinesiología Deportiva</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rehabilitación Neurológica</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terapia Manual</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipo Médico</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mar del Plata, BA</li>
                <li>+54 223 123-4567</li>
                <li>info@kinesiologosmdp.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kinesiólogos MDP. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button 
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/sVyVxKt0UBE?autoplay=1&rel=0" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 