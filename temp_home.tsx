import React, { useState } from 'react';
import './home.css';

const Home: React.FC = () => {
  // Estado para el carrusel de testimonios
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // Estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Datos de testimonios
  const testimonials = [
    {
      id: 1,
      name: "María González",
      title: "Paciente de Kinesiología",
      testimonial: "Después de 6 meses de dolor crónico en la espalda, Eukinesia me ayudó a recuperar mi movilidad completamente. El equipo es profesional y muy dedicado.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711377/photo-1534528741775-53994a69daeb_tfeheq.webp"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      title: "Deportista Amateur",
      testimonial: "Gracias a la rehabilitación deportiva en Eukinesia, pude volver a correr después de una lesión de rodilla. Excelente atención y resultados.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1507003211169-0a1dd7228f2d_wu0yay.webp"
    },
    {
      id: 3,
      name: "Ana Silva",
      title: "Paciente de Fisioterapia",
      testimonial: "El tratamiento personalizado que recibí en Eukinesia superó mis expectativas. Ahora puedo realizar mis actividades diarias sin dolor.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1438761681033-6461ffad8d80_jtef54.webp"
    },
    {
      id: 4,
      name: "Roberto Méndez",
      title: "Paciente de Terapia Manual",
      testimonial: "La terapia manual que recibí en Eukinesia fue increíble. Me ayudó a aliviar tensiones que tenía desde hace años.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1472099645785-5658abf4ff4e_zakvw7.webp"
    },
    {
      id: 5,
      name: "Patricia López",
      title: "Paciente de Rehabilitación Neurológica",
      testimonial: "El equipo de Eukinesia me ayudó a recuperar la movilidad después de un accidente. Su dedicación y profesionalismo son excepcionales.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711317/photo-1544005313-94ddf0286df2_qicg9u.webp"
    },
    {
      id: 6,
      name: "Diego Fernández",
      title: "Atleta Profesional",
      testimonial: "Como deportista profesional, necesito el mejor cuidado. Eukinesia me ha ayudado a mantener mi rendimiento y prevenir lesiones.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1500648767791-00dcc994a43e_alwlur.webp"
    }
  ];

  // Funciones para el carrusel
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
    return testimonials.slice(currentTestimonialIndex, currentTestimonialIndex + 3);
  };

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura del header
      const offset = 0; // Espacio adicional que queremos
      const elementPosition = element.offsetTop - headerHeight - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
         
         {/* Main navigation */}
         <nav className="main-nav">
           <div className="logo">
             <div className="logo-icon"></div>
             <span className="company-name">Eukinesia</span>
           </div>
           
           {/* Menú hamburguesa para móviles */}
           <button 
             className="mobile-menu-toggle"
             onClick={toggleMobileMenu}
             aria-label="Toggle mobile menu"
           >
             <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
             <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
             <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
           </button>

           {/* Enlaces de navegación */}
           <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>INICIO</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>NOSOTROS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>SERVICIOS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('treatments'); }}>TRATAMIENTOS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }}>TESTIMONIOS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACTO</a>
           </div>
           
           <div 
             className="phone-contact"
             onClick={() => window.open('https://wa.me/5492233445600?text=Hola! Me gustaría agendar una cita en Eukinesia', '_blank')}
             style={{ cursor: 'pointer' }}
           >
             <i className="fas fa-phone"></i>
             <span>¡Llámanos! +54 9 223 344-5600</span>
           </div>
         </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
                   <div className="hero-text">
           <h1 className="hero-title">
             Eukinesia Kinesiología <span className="highlight">Centro de salud</span>
           </h1>
           <h2 className="hero-subtitle">Centro de Kinesiología Integral</h2>
           <p className="hero-description">
             En Eukinesia nos especializamos en tratamientos personalizados para mejorar tu calidad de vida. Nuestro equipo de profesionales está comprometido con tu recuperación y bienestar.
           </p>
           <button 
             className="cta-button"
             onClick={() => window.open('https://wa.me/5492233445600?text=Hola! Me gustaría agendar una cita en Eukinesia', '_blank')}
           >
             Agendar Cita <i className="fas fa-arrow-right"></i>
           </button>
         </div>
          <div className="hero-image">
            <img 
              src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753901745/imagen_inicio_hmbpa7.webp" 
              alt="Kinesiología profesional" 
              className="hero-main-image"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="about" className="experience-section">
        <div className="experience-content">
          <div className="experience-images">
            <div className="experience-image-container">
              <img 
                src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753901745/sillon_ufrc6z.webp"
                alt="Kinesiología profesional" 
                className="kinesiologia-main-image"
              />
              <div className="experience-badge">
                <span>15 Años de Experiencia</span>
              </div>
            </div>
          </div>
           <div className="experience-text">
             <h2 className="experience-title">Ayudamos a Pacientes a Recuperar su Movilidad</h2>
             <p className="experience-description">
               Nuestro equipo de kinesiólogos especializados trabaja con dedicación para brindar tratamientos efectivos y personalizados que mejoren la calidad de vida de nuestros pacientes.
             </p>
             <div className="features">
               <div className="feature">
                 <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                 <div className="feature-content">
                   <h3>Profesionales Certificados</h3>
                   <p>Nuestro equipo cuenta con certificaciones y especializaciones en diferentes áreas de la kinesiología.</p>
                 </div>
               </div>
               <div className="feature">
                 <div className="feature-icon"><i className="fas fa-award"></i></div>
                 <div className="feature-content">
                   <h3>Centro Reconocido</h3>
                   <p>Eukinesia ha sido reconocida por su excelencia en el tratamiento y rehabilitación de pacientes.</p>
                 </div>
               </div>
               <div className="feature">
                 <div className="feature-icon"><i className="fas fa-heart"></i></div>
                 <div className="feature-content">
                   <h3>Atención Personalizada</h3>
                   <p>Cada paciente recibe un tratamiento único y personalizado adaptado a sus necesidades específicas.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="services" className="why-choose-section">
        <div className="why-choose-content">
                   <div className="why-choose-text">
           <h3 className="section-subtitle tamañoTexto">POR QUÉ ELEGIRNOS</h3>
           <h2 className="section-title">Tratamientos Personalizados para tu Salud</h2>
           <p className="section-description">
             En Eukinesia creemos que cada paciente es único. Por eso desarrollamos tratamientos personalizados que se adaptan a tus necesidades específicas y objetivos de recuperación.
           </p>
           <div className="video-showcase">
             <div className="play-button">
               <i className="fas fa-play"></i>
             </div>
             <span>VER VIDEO</span>
           </div>
         </div>
                     <div className="services-grid">
             <div className="service-card blue">
               <div className="service-icon"><i className="fas fa-running"></i></div>
               <h3>Kinesiología Deportiva</h3>
               <p>Especialistas en rehabilitación deportiva y prevención de lesiones para atletas y deportistas</p>
             </div>
             <div className="service-card white">
               <div className="service-icon"><i className="fas fa-heartbeat"></i></div>
               <h3>Fisioterapia</h3>
               <p>Tratamientos especializados para recuperar la movilidad y reducir el dolor</p>
             </div>
             <div className="service-card white">
               <div className="service-icon"><i className="fas fa-brain"></i></div>
               <h3>Rehabilitación Neurológica</h3>
               <p>Terapias especializadas para pacientes con condiciones neurológicas</p>
             </div>
             <div className="service-card blue">
               <div className="service-icon"><i className="fas fa-hands"></i></div>
               <h3>Terapia Manual</h3>
               <p>Técnicas manuales avanzadas para aliviar tensiones y mejorar la función</p>
             </div>
           </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="treatments" className="process-section">
        <div className="process-content">
          <div className="process-header">
            <h2 className="process-title">Nuestro proceso de trabajo</h2>
            <p className="process-subtitle">
              Aprende cómo nuestro equipo de profesionales te ayuda a recuperar tu movilidad y mejorar tu calidad de vida
            </p>
          </div>
          
          <div className="process-cards">
            <div className="process-card">
              <div className="card-image">
                <img 
                  src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753905047/primer-plano-fisioterapeuta-que-trata-paciente-clinica_37714-1511_pijnif.webp" 
                  alt="Evaluación inicial" 
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-step">Paso 01</span>
                  <span className="card-category">Evaluación</span>
                </div>
                <h3 className="card-title">Evaluación Inicial Completa</h3>
                <p className="card-excerpt">
                  Realizamos una evaluación exhaustiva de tu condición, incluyendo historial médico, examen físico y análisis detallado de tus objetivos de recuperación.
                </p>
                <div className="card-author">
                  <div className="author-avatar">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="author-info">
                    <span className="author-name">Dr. María González</span>
                    <span className="author-title">Kinesióloga Especialista</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="process-card">
              <div className="card-image">
                <img 
                  src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753905048/doctor-ayudando-al-paciente-rehabilitacion_23-2150321626_kowx5a.webp" 
                  alt="Diagnóstico personalizado" 
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-step">Paso 02</span>
                  <span className="card-category">Diagnóstico</span>
                </div>
                <h3 className="card-title">Diagnóstico Personalizado</h3>
                <p className="card-excerpt">
                  Desarrollamos un diagnóstico específico y creamos un plan de tratamiento personalizado adaptado a tus necesidades únicas y objetivos.
                </p>
                <div className="card-author">
                  <div className="author-avatar">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="author-info">
                    <span className="author-name">Dr. Carlos Rodríguez</span>
                    <span className="author-title">Fisioterapeuta Senior</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="process-card">
              <div className="card-image">
                <img 
                  src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753905048/1_remiiv.webp" 
                  alt="Tratamiento especializado" 
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-step">Paso 03</span>
                  <span className="card-category">Tratamiento</span>
                </div>
                <h3 className="card-title">Tratamiento Especializado</h3>
                <p className="card-excerpt">
                  Aplicamos técnicas avanzadas de kinesiología y fisioterapia para tratar tu condición de manera efectiva, segura y personalizada.
                </p>
                <div className="card-author">
                  <div className="author-avatar">
                    <i className="fas fa-hands"></i>
                  </div>
                  <div className="author-info">
                    <span className="author-name">Ana Silva</span>
                    <span className="author-title">Terapeuta Manual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section id="blog" className="testimonials-section">
        <div className="testimonials-content">
          <div className="testimonials-header">
            <h3 className="section-subtitle tamañoTexto">TESTIMONIOS</h3>
            <p className="section-description">
              Experiencias reales de personas que transformaron su vida a través de nuestros tratamientos de kinesiología
            </p>
          </div>
          
          {/* Carrusel de testimonios */}
          <div className="testimonials-carousel">
            {/* Flecha izquierda */}
            <button 
              onClick={prevTestimonial}
              className="carousel-arrow carousel-arrow-left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {/* Flecha derecha */}
            <button 
              onClick={nextTestimonial}
              className="carousel-arrow carousel-arrow-right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Contenedor de testimonios */}
            <div className="testimonials-container">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${currentTestimonialIndex}`} 
                  className="testimonial-card"
                  style={{
                    animation: slideDirection === 'right' 
                      ? 'slideInRight 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                      : 'slideInLeft 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animationFillMode: 'both',
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="testimonial-image">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="testimonial-avatar"
                    />
                  </div>
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-title">{testimonial.title}</p>
                  <p className="testimonial-text">"{testimonial.testimonial}"</p>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores de página */}
            <div className="carousel-indicators">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonialIndex(i * 3)}
                  className={`carousel-indicator ${
                    Math.floor(currentTestimonialIndex / 3) === i 
                      ? 'active' 
                      : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <div className="contact-header">
            <h3 className="section-subtitle tamañoTexto">CONTÁCTANOS</h3>
            <p className="section-description">
              Estamos aquí para ayudarte a recuperar tu movilidad y mejorar tu calidad de vida. 
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
            </p>
          </div>

          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Ubicación</h4>
                  <p>Av. Principal 123, Santiago<br />Región Metropolitana, Chile</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Teléfono</h4>
                  <p>+56 9 1234 5678<br />+56 2 2345 6789</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>info@eukinesia.cl<br />citas@eukinesia.cl</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-details">
                  <h4>Horarios</h4>
                  <p>Lunes a Viernes: 8:00 - 20:00<br />Sábados: 9:00 - 14:00</p>
                </div>
              </div>

              <div className="contact-map">
                <h4>Nuestra Ubicación</h4>
                <div className="map-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.524985689549!2d-57.563028424756915!3d-38.011538845366026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584df79bcf0321d%3A0xfaeb85df0a681824!2sEukinesia%20kinesiolog%C3%ADa!5e0!3m2!1ses!2sar!4v1753900500123!5m2!1ses!2sar" 
                    width="100%" 
                    height="280" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>

            <div className="contact-form-container">
              <div className="form-header">
                <h3>Envíanos un mensaje</h3>
                <p>Completa el formulario y nos pondremos en contacto contigo</p>
              </div>
              
              <form className="contact-form">
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-user"></i>
                    Información Personal
                  </h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        <i className="fas fa-user"></i>
                        Nombre
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required 
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        <i className="fas fa-user"></i>
                        Apellido
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required 
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        <i className="fas fa-envelope"></i>
                        Email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">
                        <i className="fas fa-phone"></i>
                        Teléfono
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-stethoscope"></i>
                    Servicios de Interés
                  </h4>
                  <div className="service-options">
                    <div className="service-option">
                      <input type="radio" id="kinesiologia" name="service" value="kinesiologia-deportiva" />
                      <label htmlFor="kinesiologia">
                        <i className="fas fa-running"></i>
                        <span>Kinesiología Deportiva</span>
                      </label>
                    </div>
                    <div className="service-option">
                      <input type="radio" id="fisioterapia" name="service" value="fisioterapia" />
                      <label htmlFor="fisioterapia">
                        <i className="fas fa-heartbeat"></i>
                        <span>Fisioterapia</span>
                      </label>
                    </div>
                    <div className="service-option">
                      <input type="radio" id="neurologica" name="service" value="rehabilitacion-neurologica" />
                      <label htmlFor="neurologica">
                        <i className="fas fa-brain"></i>
                        <span>Rehabilitación Neurológica</span>
                      </label>
                    </div>
                    <div className="service-option">
                      <input type="radio" id="manual" name="service" value="terapia-manual" />
                      <label htmlFor="manual">
                        <i className="fas fa-hands"></i>
                        <span>Terapia Manual</span>
                      </label>
                    </div>
                    <div className="service-option">
                      <input type="radio" id="postural" name="service" value="evaluacion-postural" />
                      <label htmlFor="postural">
                        <i className="fas fa-user-check"></i>
                        <span>Evaluación Postural</span>
                      </label>
                    </div>
                    <div className="service-option">
                      <input type="radio" id="consulta" name="service" value="consulta-general" />
                      <label htmlFor="consulta">
                        <i className="fas fa-question-circle"></i>
                        <span>Consulta General</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-comment"></i>
                    Tu Mensaje
                  </h4>
                  <div className="form-group">
                    <label htmlFor="message">
                      <i className="fas fa-comment"></i>
                      Cuéntanos sobre tu condición
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Describe tu condición, síntomas o consulta específica..."
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="privacy" required />
                      <span className="custom-checkbox"></span>
                      <span className="checkbox-text">
                        Acepto la <a href="#">política de privacidad</a> y el tratamiento de mis datos personales
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    <i className="fas fa-paper-plane"></i>
                    <span>Enviar Mensaje</span>
                  </button>
                  <p className="form-note">
                    <i className="fas fa-clock"></i>
                    Te responderemos en menos de 24 horas
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para comenzar tu recuperación?</h2>
          <p>Únete a cientos de pacientes que ya han mejorado su calidad de vida con nosotros</p>
          <div className="cta-buttons">
            <button 
              className="cta-primary"
              onClick={() => window.open('https://wa.me/5492233445600?text=Hola! Me gustaría agendar una cita en Eukinesia', '_blank')}
            >
              <i className="fas fa-calendar-check"></i>
              Agendar Cita
            </button>
            <button className="cta-secondary">
              <i className="fas fa-phone"></i>
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon"></div>
                <span className="company-name">Eukinesia</span>
              </div>
              <p className="footer-tagline">
                Mejorando la calidad de vida a través de la kinesiología integral y tratamientos personalizados.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h3 className="footer-heading">Servicios</h3>
                <ul className="footer-list">
                  <li><a href="#">Kinesiología Deportiva</a></li>
                  <li><a href="#">Fisioterapia</a></li>
                  <li><a href="#">Rehabilitación Neurológica</a></li>
                  <li><a href="#">Terapia Manual</a></li>
                  <li><a href="#">Evaluación Postural</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Atención</h3>
                <ul className="footer-list">
                  <li><a href="#">Agendar Cita</a></li>
                  <li><a href="#">Consultas Online</a></li>
                  <li><a href="#">Urgencias</a></li>
                  <li><a href="#">Horarios</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Centro</h3>
                <ul className="footer-list">
                  <li><a href="#">Sobre Nosotros</a></li>
                  <li><a href="#">Nuestro Equipo</a></li>
                  <li><a href="#">Instalaciones</a></li>
                  <li><a href="#">Testimonios</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Legal</h3>
                <ul className="footer-list">
                  <li><a href="#">Términos de Servicio</a></li>
                  <li><a href="#">Política de Privacidad</a></li>
                  <li><a href="#">Aviso Legal</a></li>
                  <li><a href="#">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <p className="footer-copyright">
              © 2025 Eukinesia Centro de Kinesiología. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;