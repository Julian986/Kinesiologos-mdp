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
      testimonial: "Después de 6 meses de dolor crónico en la espalda, Kinesiología y Salud me ayudó a recuperar mi movilidad completamente. El equipo es profesional y muy dedicado.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711377/photo-1534528741775-53994a69daeb_tfeheq.webp"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      title: "Deportista Amateur",
      testimonial: "Gracias a la rehabilitación deportiva en Kinesiología y Salud, pude volver a correr después de una lesión de rodilla. Excelente atención y resultados.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1507003211169-0a1dd7228f2d_wu0yay.webp"
    },
    {
      id: 3,
      name: "Ana Silva",
      title: "Paciente de Fisioterapia",
      testimonial: "El tratamiento personalizado que recibí en Kinesiología y Salud superó mis expectativas. Ahora puedo realizar mis actividades diarias sin dolor.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1438761681033-6461ffad8d80_jtef54.webp"
    },
    {
      id: 4,
      name: "Roberto Méndez",
      title: "Paciente de Terapia Manual",
      testimonial: "La terapia manual que recibí en Kinesiología y Salud fue increíble. Me ayudó a aliviar tensiones que tenía desde hace años.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711316/photo-1472099645785-5658abf4ff4e_zakvw7.webp"
    },
    {
      id: 5,
      name: "Patricia López",
      title: "Paciente de Rehabilitación Neurológica",
      testimonial: "El equipo de Kinesiología y Salud me ayudó a recuperar la movilidad después de un accidente. Su dedicación y profesionalismo son excepcionales.",
      image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1753711317/photo-1544005313-94ddf0286df2_qicg9u.webp"
    },
    {
      id: 6,
      name: "Diego Fernández",
      title: "Atleta Profesional",
      testimonial: "Como deportista profesional, necesito el mejor cuidado. Kinesiología y Salud me ha ayudado a mantener mi rendimiento y prevenir lesiones.",
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

  // Logo fijo (logo alternativo elegido por la clienta)
  const primaryLogoUrl = 'https://res.cloudinary.com/dzoupwn0e/image/upload/v1762974732/logo_3_c3cdjz.webp';
  const altLogoUrl = 'https://res.cloudinary.com/dzoupwn0e/image/upload/v1762974732/logo2_qjhij8.webp';
  const logoSrc = altLogoUrl;
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    // Si falla la carga, volvemos al logo principal
    img.onerror = null;
    img.src = primaryLogoUrl;
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

  // Listado de obras sociales y prepagas atendidas
  const insuranceProviders: string[] = [
    "ACCORD SALUD",
    "AMEB BCO PROVINCIA",
    "AMECIN",
    "AMFFA",
    "AMSTERDAM SALUD",
    "AMTAR",
    "APRES SA",
    "APSOT",
    "ART  MUTUAL RURAL",
    "ASI",
    "ASOC. A. DE VOLANTES",
    "ASOC. ECLESIASTICA",
    "ASOC. MUTUAL DE PROTECCIÓN FAMILIAR (AMPF)",
    "AVALIAN",
    "BRINDAR SALUD",
    "CAMINOS PROTEGIDOS ART",
    "CASA (CAJA DE ABOGADOS)",
    "COLEGIO DE ESCRIBANOS",
    "COLONIA SUIZA",
    "COMEI (CAJA DE ODONTÓLOGOS)",
    "CRISTAL SALUD",
    "COOMARPES",
    "DASMI",
    "DASUTEN",
    "DOCTHOS",
    "E.W.HOPE",
    "ELEVAR",
    "EMSYS",
    "ENSALUD (OSTEL, OSEIV, OSOETSYL, OSPACP, OSPOCE, OSPIM, OSPCRA, OSSACRA)",
    "EXPERTA ART",
    "FEDERADA SALUD",
    "FUTBOLISTAS",
    "GALENO",
    "GLOBAL",
    "GRUPO SAN NICOLÁS (GSN)",
    "HOSPITAL ALEMÁN",
    "HOSPITAL ITALIANO",
    "IOMA",
    "IOSFA",
    "JERÁRQUICOS",
    "LA HOLANDO",
    "LA SEGUNDA ART",
    "LPF GRUPO LA PEQUEÑA FAMILIA",
    "LUIS PASTEUR",
    "MEDICUS",
    "MEDIFE",
    "MEDICAR WORK",
    "MOTOCICLISTAS",
    "MUTUAL 22 DE DICIEMBRE",
    "OAM",
    "OSCAP",
    "OSDE",
    "OSDEPYM",
    "OSDOP",
    "OSEPJANA",
    "OSETRA",
    "OSFATUN",
    "OPDEA",
    "OSAPM",
    "OSARPYH",
    "OSEIV",
    "OSOETSYL",
    "OSPA",
    "OSPACARP",
    "OSPACP",
    "OSPAGA",
    "OSPCRA",
    "OSPEDYC",
    "OSPENA",
    "OSPEP",
    "OSPEPBA",
    "OSPERCIN",
    "OSPERYHRA",
    "OSPESA",
    "OSPESCA",
    "OSPF",
    "OSPIA",
    "OSPIM",
    "OSPM",
    "OSPIT",
    "OSPOCE",
    "OSPSIP",
    "OSPICAL",
    "OSPL",
    "OSPTV",
    "OSPSA",
    "OSSACRA",
    "OSSEG",
    "OSTPCPHYARA",
    "PODER JUDICIAL",
    "PREVENCIÓN SALUD",
    "PRINAGE",
    "RAS",
    "RECONQUISTA ART",
    "RESPUESTA MÉDICA",
    "SANTA CLARA SALUD",
    "SAMI",
    "SMAI (POLICÍA FEDERAL)",
    "SUMA",
    "SANCOR SALUD",
    "SCIS S.A",
    "STAFF MÉDICO",
    "SWISS MEDICAL",
    "SWISS MEDICAL ART",
    "THEMA",
    "UNIÓN PERSONAL",
    "WHOPE",
    "22 DE DICIEMBRE"
  ];

  // Buscador de obras sociales (insensible a mayúsculas/acentos)
  const [insuranceQuery, setInsuranceQuery] = useState('');
  const normalizeString = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  const filteredInsuranceProviders = insuranceProviders.filter((name) =>
    normalizeString(name).includes(normalizeString(insuranceQuery))
  );

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
         
         {/* Main navigation */}
         <nav className="main-nav">
           <div className="logo">
             <div className={`logo-avatar alt`}>
               <img 
                 src={logoSrc}
                 alt="Kinesiología y Salud" 
                 className="logo-image"
                 onError={handleLogoError}
               />
             </div>
            <span className="company-name">Kinesiología y Salud</span>
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
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('insurances'); }}>TRATAMIENTOS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }}>TESTIMONIOS</a>
             <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACTO</a>
           </div>
           
                       <div 
              className="phone-contact"
              onClick={() => window.open('https://wa.me/5492236229774?text=Hola! Me gustaría agendar una cita en Kinesiología y Salud', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-phone"></i>
              <span>¡Llámanos! 223 622-9774</span>
            </div>
         </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
                   <div className="hero-text">
           <h1 className="hero-title">
           Kinesiología y Salud <br /><span className="highlight">Mar del Plata</span>
           </h1>
           <h2 className="hero-subtitle">Centro de Kinesiología Integral</h2>
           <p className="hero-description">
           En Kinesiología y Salud nos especializamos en tratamientos personalizados para mejorar tu calidad de vida. Somos un equipo de kinesiólogos comprometidos con tu recuperación y bienestar.
             Atendemos obras sociales y particulares
           </p>
           {/* <p className="hero-description">Atendemos obras sociales y particulares</p> */}
           <button 
             className="cta-button"
             onClick={() => window.open('https://wa.me/5492236229774?text=Hola! Me gustaría agendar una cita en Kinesiología y Salud', '_blank')}
           >
             Agendar Turno <i className="fas fa-arrow-right"></i>
           </button>
         </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="about" className="experience-section">
        <div className="experience-content">
          <div className="experience-images">
            <div className="experience-image-container">
              <img 
                src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1753996437/inicio2_bjajbr.webp"
                alt="Kinesiología profesional" 
                className="kinesiologia-main-image"
              />
              <div className="experience-badge">
                <span>15 Años de Experiencia</span>
              </div>
            </div>
          </div>
           <div className="experience-text">
             {/* <h2 className="experience-title">Ayudamos a Pacientes a Recuperar su Movilidad</h2> */}
            {/*  <p className="experience-description">
               Nuestro equipo de kinesiólogos especializados trabaja con dedicación para brindar tratamientos efectivos y personalizados que mejoren la calidad de vida de nuestros pacientes.
             </p> */}
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
                   <p>Kinesiología y Salud ha sido reconocido por su excelencia en el tratamiento y rehabilitación de pacientes.</p>
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
            {/* Mapa trasladado aquí desde la sección de Contacto */}
            <div className="contact-map">
              <div className="map-header">
                <span className="map-address">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  Catamarca 3299, Mar del Plata
                </span>
              </div>
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50297.585543587644!2d-57.63840865136716!3d-38.0098106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d97a28170277%3A0x1e418542dd2d3dc3!2sKinesiologos%20Mar%20del%20Plata!5e0!3m2!1ses!2sar!4v1763473547574!5m2!1ses!2sar" 
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
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="services" className="why-choose-section">
        <div className="why-choose-content">
                   <div className="why-choose-text">
           <h3 className="section-subtitle tamañoTexto">POR QUÉ ELEGIRNOS</h3>
           {/* <h2 className="section-title">Tratamientos Personalizados para tu Salud</h2> */}
           <p className="section-description">
          En Kinesiología y Salud creemos que cada paciente es único. Por eso aplicamos tratamientos adaptados a tu lesión, necesidades específicas y objetivos de recuperación.

Trabajamos con dedicación para brindar tratamientos efectivos y personalizados que mejoren la calidad de vida de nuestros pacientes.

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
              <p>Magnetoterapia, ultrasonido, electroestimulación, electroanalgesia, laserterapia e infrarrojo</p>
             </div>
             <div className="service-card white">
               <div className="service-icon"><i className="fas fa-brain"></i></div>
               <h3>Rehabilitación Neurológica</h3>
               <p>Terapias especializadas para pacientes con condiciones neurológicas</p>
             </div>
             <div className="service-card white">
               <div className="service-icon"><i className="fas fa-dumbbell"></i></div>
               <h3>Fisiokinesioterapia</h3>
               <p>Técnicas manuales, masajes, ejercicios y equipamiento de última generación</p>
             </div>
             <div className="service-card blue">
               <div className="service-icon"><i className="fas fa-balance-scale"></i></div>
               <h3>Rehabilitación Vestibular</h3>
               <p>Tratamiento para disminuir los mareos, vértigo e inestabilidad</p>
             </div>
             <div className="service-card white">
               <div className="service-icon"><i className="fas fa-band-aid"></i></div>
               <h3>Kinesiotaping</h3>
               <p>Cintas adhesivas especiales que se aplican para disminuir el dolor, reducir la inflamación, corregir problemas articulares, mejorar la circulación y las cicatrices sin limitar el movimiento articular.</p>
             </div>
             <div className="service-card blue">
               <div className="service-icon"><i className="fas fa-bone"></i></div>
               <h3>Rehabilitación Traumatológica</h3>
               <p>Tratamiento para lesiones del sistema musculoesquelético tales como esguinces, fracturas, desviaciones de columna, entre otras</p>
             </div>
           </div>
        </div>
      </section>

      {/* Insurances Section */}
      <section id="insurances" className="insurances-section">
        <div className="insurances-content">
          <div className="insurances-header">
            <h3 className="section-subtitle tamañoTexto">OBRAS SOCIALES Y PREPAGAS</h3>
            <p className="process-subtitle">
              Si tu cobertura no está en la lista, consultanos. También atendemos particulares.
            </p>
            <div className="insurances-search">
              <div className="search-field">
                <i className="fas fa-search" aria-hidden="true"></i>
                <input
                  type="text"
                  value={insuranceQuery}
                  onChange={(e) => setInsuranceQuery(e.target.value)}
                  placeholder="Buscar obra social o prepaga..."
                  aria-label="Buscar obra social o prepaga"
                />
              </div>
            </div>
          </div>
          <div className="insurances-grid">
            {filteredInsuranceProviders.length === 0 && (
              <div className="insurance-empty">
                <i className="fas fa-info-circle"></i>
                <span>No encontramos resultados para “{insuranceQuery}”. Probá con otro término.</span>
              </div>
            )}
            {filteredInsuranceProviders.map((provider) => (
              <div key={provider} className="insurance-card">
                <i className="fas fa-check-circle"></i>
                <span>{provider}</span>
              </div>
            ))}
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
                  <p>Catamarca 3299, Mar del Plata</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Teléfono</h4>
                  <p>+54 9 223 622-9774<br />+54 223 622-9774</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>info@kinesiologosmdp.com<br />citas@kinesiologosmdp.com</p>
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
                        placeholder="+54 9 223 622-9774"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-stethoscope"></i>
                    Servicio de Interés
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
              onClick={() => window.open('https://wa.me/5492236229774?text=Hola! Me gustaría agendar una cita en Kinesiología y Salud', '_blank')}
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
                <div className={`logo-avatar alt`}>
                  <img 
                    src={logoSrc}
                    alt="Kinesiología y Salud" 
                    className="logo-image"
                    onError={handleLogoError}
                  />
                </div>
                <span className="company-name">Kinesiología y Salud</span>
              </div>
              <p className="footer-tagline">
                Mejorando la calidad de vida a través de la kinesiología integral y tratamientos personalizados.
              </p>
              
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
              © 2025 Kinesiología y Salud Centro de Kinesiología. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Botón flotante de WhatsApp */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/5492236229774?text=Hola! Me gustaría agendar una cita en Kinesiología y Salud" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
};

export default Home; 