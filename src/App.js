import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import schoolLogo from './logo.png';
import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Icônes modernes (vous pouvez les remplacer par des icônes SVG réelles)
const PremiumApp = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      const sections = ['accueil', 'apropos', 'formations', 'admissions', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    // Animation on scroll
    const setupAnimations = () => {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observerRef.current.observe(el);
      });
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(setupAnimations, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  // Gestion du formulaire de contact
const handleContactSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  console.log('Données du formulaire:', contactForm);
  console.log('URL Supabase:', supabaseUrl);
  console.log('Clé Supabase:', supabaseAnonKey ? 'Définie' : 'Non définie');

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          formation_interested: contactForm.formation,
          message: contactForm.message
        }
      ])
      .select();

    console.log('Réponse Supabase:', { data, error });

    if (error) {
      console.error('Erreur Supabase détaillée:', error);
      throw error;
    }

    // Success
    alert('Message envoyé avec succès ! Nous vous recontacterons rapidement.');
    
    // Reset du formulaire
    setContactForm({
      name: '',
      email: '',
      phone: '',
      formation: '',
      message: ''
    });

  } catch (error) {
    console.error('Erreur complète:', error);
    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
  } finally {
    setIsSubmitting(false);
  }
};

const handleInputChange = (e) => {
  const { id, value } = e.target;
  setContactForm(prev => ({
    ...prev,
    [id]: value
  }));
};
const [contactForm, setContactForm] = useState({
  name: '',
  email: '',
  phone: '',
  formation: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
  // Données pour les formations
  const formations = [
    {
      icon: '💻',
      badge: 'Populaire',
      title: 'Informatique & Réseaux',
      features: ['Administration systèmes et réseaux', 'Développement web et mobile', 'Cybersécurité', 'Cloud Computing'],
      duration: '2 ans',
      diploma: 'BAC+2',
      color: '#6366f1'
    },
    {
      icon: '📊',
      title: 'Gestion & Management',
      features: ['Comptabilité et finance', 'Management des organisations', 'Marketing digital', 'Entrepreneuriat'],
      duration: '2 ans',
      diploma: 'BAC+2',
      color: '#10b981'
    },
    {
      icon: '🌐',
      title: 'Digital & Marketing',
      features: ['Communication digitale', 'Réseaux sociaux', 'E-commerce', 'Data analytics'],
      duration: '1 an',
      diploma: 'Certification',
      color: '#f59e0b'
    },
    {
      icon: '🎓',
      badge: 'Nouveau',
      title: 'Formations Professionnelles',
      features: ['Formations courtes et intensives', 'Certifications professionnelles', 'Formation en alternance', 'Reconversion professionnelle'],
      duration: '3-6 mois',
      diploma: 'Certificat',
      color: '#ef4444'
    },
    {
      icon: '🎓',
      title: 'Licence Professionnelle',
      features: ['Gestion et optimisation logistique', 'Management opérationnel', 'Systèmes informatiques appliqués', 'Gestion des stocks'],
      duration: '3 ans',
      diploma: 'BAC',
      color: '#8b5cf6'
    },
    {
      icon: '🎓',
      badge: 'Nouveau 2025',
      title: 'Master Professionnel',
      features: ['Gestion stratégique RH', 'Leadership et changement', 'Transformation digitale', 'Logistique avancée'],
      duration: '2 ans',
      diploma: 'BAC+3',
      color: '#ec4899'
    }
  ];

  return (
    <div className="premium-app">
      {/* Navigation Premium */}
      <header className={`premium-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
          <div className="logo-wrapper">
            <div className="logo-simple">
                <img src={schoolLogo} alt="Groupe Ipirnet" className="logo-img" />
              </div>
              <div className="logo-text">
                <h1>Groupe Ipirnet</h1>
                <span>Excellence Éducative</span>
              </div>
            </div>

            <nav className={`premium-nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <div className="nav-background"></div>
              <ul>
                {['accueil', 'apropos', 'formations', 'admissions', 'contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item}`}
                      className={activeSection === item ? 'active' : ''}
                      onClick={() => scrollToSection(item)}
                    >
                      <span className="nav-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                      <div className="nav-line"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button 
              className={`premium-menu-toggle ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section Extraordinaire */}
      <section id="accueil" className="premium-hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="container">
          <div className="hero-content animate-on-scroll">
            <div className="hero-badge-glow">
              <span>Établissement d'Enseignement Supérieur</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Bienvenue au</span>
              <span className="title-highlight">Groupe Ipirnet</span>
            </h1>
            <p className="hero-description">
              Votre partenaire pour une éducation de qualité et une formation professionnelle d'excellence au Maroc
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-glow-primary"
                onClick={() => scrollToSection('formations')}
              >
                <span>Découvrir nos formations</span>
                <div className="btn-glow"></div>
              </button>
              <button 
                className="btn-glow-secondary"
                onClick={() => scrollToSection('contact')}
              >
                <span>Nous contacter</span>
              </button>
            </div>
            <div className="hero-stats">
              {[
                { number: '15+', text: 'Années d\'expérience' },
                { number: '500+', text: 'Étudiants formés' },
                { number: '95%', text: 'Taux de réussite' },
              ].map((stat, index) => (
                <div key={index} className="stat-card">
                  <h3>{stat.number}</h3>
                  <p>{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
        </div>
      </section>

      {/* À Propos Section Ultra Moderne */}
{/* À Propos Section - Version Créative et Immersive */}
<section id="apropos" className="creative-about">
  <div className="creative-background">
    <div className="floating-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
    </div>
  </div>
  
  <div className="container">
    <div className="section-header creative-header animate-on-scroll">
      <h2 className="section-title creative-title">
        <span className="title-word">Notre</span>
        <span className="title-word">Histoire</span>
      </h2>
      <p className="section-subtitle creative-subtitle">
        Une aventure éducative qui transforme les rêves en réalités
      </p>
    </div>
    
    {/* Timeline Interactive */}
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      {[
        {
          year: "2009",
          title: "Fondation",
          description: "Création du Groupe Ipirnet avec une vision innovante de l'éducation",
          icon: "🚀",
          side: "left"
        },
        {
          year: "2015", 
          title: "Expansion",
          description: "Ouverture de nouveaux programmes et partenariats stratégiques",
          icon: "📈",
          side: "right"
        },
        {
          year: "2020",
          title: "Transformation Digitale",
          description: "Intégration des technologies modernes dans notre pédagogie",
          icon: "💻",
          side: "left"
        },
        {
          year: "2024",
          title: "Excellence",
          description: "Reconnu comme référence dans l'enseignement supérieur au Maroc",
          icon: "🏆",
          side: "right"
        }
      ].map((item, index) => (
        <div key={index} className={`timeline-item ${item.side} animate-on-scroll`}>
          <div className="timeline-marker">
            <div className="marker-glow"></div>
            <div className="marker-icon">{item.icon}</div>
          </div>
          <div className="timeline-content">
            <div className="timeline-year">{item.year}</div>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Cartes 3D Interactives */}
    <div className="interactive-cards-grid">
      {[
        {
          icon: "🎯",
          title: "Notre Mission",
          description: "Fournir une éducation de qualité qui prépare les étudiants à exceller dans leurs carrières",
          color: "#6366f1",
          rotation: "-2deg"
        },
        {
          icon: "🔭",
          title: "Notre Vision", 
          description: "Devenir une référence dans l'enseignement supérieur au Maroc",
          color: "#10b981",
          rotation: "1deg"
        },
        {
          icon: "💎",
          title: "Nos Valeurs",
          description: "Excellence, Innovation, Professionnalisme, Ouverture internationale",
          color: "#f59e0b",
          rotation: "-1deg"
        }
      ].map((card, index) => (
        <div 
          key={index}
          className="interactive-card animate-on-scroll"
          style={{ 
            '--card-color': card.color,
            '--card-rotation': card.rotation
          }}
        >
          <div className="card-inner">
            <div className="card-front">
              <div className="card-icon" style={{ backgroundColor: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <div className="card-hint">Cliquer pour découvrir</div>
            </div>
            <div className="card-back">
              <p>{card.description}</p>
              <div className="card-decoration"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Galerie des Réalisations */}
<div className="achievements-gallery">
  <div className="gallery-header animate-on-scroll">
    <h3>Nos Réalisations en Chiffres</h3>
  </div>
  <div className="gallery-grid">
    {[
      { number: "15+", label: "Ans d'Expérience", icon: "📅", animation: "countUp" },
      { number: "500+", label: "Étudiants Formés", icon: "🎓", animation: "pulse" },
      { number: "95%", label: "Taux de Réussite", icon: "⭐", animation: "bounce" },
      { number: "50+", label: "Partenaires", icon: "🤝", animation: "spin" }
    ].map((achievement, index) => (
      <div 
        key={index} 
        className="achievement-item animate-on-scroll"
        data-animation={achievement.animation}
      >
        <div className="achievement-icon">{achievement.icon}</div>
        <div className="achievement-number">
          {achievement.number} {/* Affiche directement le nombre */}
        </div>
        <div className="achievement-label">{achievement.label}</div>
        <div className="achievement-glow"></div>
      </div>
    ))}
  </div>
</div>
    {/* Carte Interactive des Points Forts */}
{/* Carte Interactive des Points Forts - Version Organisée */}
<div className="infrastructure-modern">
  <div className="container">
    <h2 className="section-title">Notre Écosystème d'Excellence</h2>
    <div className="features-grid">
      {[
        {
          title: "Innovation",
          subtitle: "Pédagogie tournée vers l'avenir",
          description: "Des méthodes d'apprentissage innovantes pour préparer aux métiers de demain"
        },
        {
          title: "Groupe Ipimet",
          subtitle: "Au cœur de l'excellence",
          description: "Un groupe éducatif reconnu pour la qualité de sa formation"
        },
        {
          title: "Partenariats",
          subtitle: "Réseau étendu d'entreprises partenaires",
          description: "Des collaborations solides avec les acteurs majeurs du secteur"
        },
        {
          title: "Enseignants",
          subtitle: "Experts passionnés dédiés à votre réussite",
          description: "Une équipe pédagogique expérimentée et engagée"
        }
      ].map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-subtitle">{feature.subtitle}</p>
          <p className="feature-description">{feature.description}</p>
          <div className="feature-hover-effect"></div>
        </div>
      ))}
    </div>
  </div>
</div>
  </div>
</section>

      {/* Formations Section Premium */}
      <section id="formations" className="premium-formations">
        <div className="formations-background">
          <div className="bg-grid"></div>
        </div>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Nos Formations</h2>
            <p className="section-subtitle">Des programmes adaptés aux besoins du marché</p>
          </div>
          <div className="formations-grid">
            {formations.map((formation, index) => (
              <div 
                key={index} 
                className="formation-card-premium animate-on-scroll"
                style={{ '--accent-color': formation.color }}
              >
                <div className="card-glow-effect"></div>
                <div className="card-header">
                  <div className="card-icon" style={{ backgroundColor: formation.color }}>
                    {formation.icon}
                  </div>
                  {formation.badge && (
                    <div className="card-badge" style={{ backgroundColor: formation.color }}>
                      {formation.badge}
                    </div>
                  )}
                </div>
                <h3>{formation.title}</h3>
                <ul className="formation-features">
                  {formation.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="formation-duration">
                  <span>Durée: {formation.duration}</span>
                  <span>Diplôme: {formation.diploma}</span>
                </div>
                <button className="btn-card" style={{ '--btn-color': formation.color }}>
                  Voir le programme
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Section Innovante */}
      <section id="admissions" className="premium-admissions">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Processus d'Admission</h2>
            <p className="section-subtitle">Rejoignez notre communauté étudiante</p>
          </div>
          <div className="admissions-process">
            {[
              { step: '1', title: 'Dépôt de dossier', description: 'Rassemblez et déposez votre dossier de candidature complet en ligne ou sur place' },
              { step: '2', title: 'Entretien de motivation', description: 'Participez à un entretien avec notre équipe pédagogique pour discuter de votre projet' },
              { step: '3', title: 'Tests d\'admission', description: 'Passez les tests nécessaires selon la formation choisie' },
              { step: '4', title: 'Inscription définitive', description: 'Finalisez votre inscription après acceptation de votre candidature' }
            ].map((item, index) => (
              <div key={index} className="process-step animate-on-scroll">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                {index < 3 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Moderne */}
      <section id="contact" className="premium-contact">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Nous sommes à votre écoute</p>
          </div>
          <div className="contact-content">
            <div className="contact-info animate-on-scroll">
              <h3>Informations de contact</h3>
              <div className="contact-items">
                {[
                  { icon: '📍', title: 'Adresse', content: 'boulevard hassan 2, lot Essafi, Imm 1, Berrechid, Morocco' },
                  { icon: '📞', title: 'Téléphone', content: '+212 5 22 32 72 13' },
                  { icon: '✉️', title: 'Email', content: 'ipirnet.fp@gmail.com' }
                ].map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-form animate-on-scroll">
              <form className="modern-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="name" 
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required 
                    />
                    <label htmlFor="name">Nom complet *</label>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required 
                    />
                    <label htmlFor="email">Email *</label>
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    id="phone" 
                    value={contactForm.phone}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="phone">Téléphone</label>
                </div>
                <div className="form-group">
                  <select 
                    id="formation"
                    value={contactForm.formation}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="informatique">Informatique & Réseaux</option>
                    <option value="gestion">Gestion & Management</option>
                    <option value="digital">Digital & Marketing</option>
                  </select>
                  <label htmlFor="formation">Formation intéressée</label>
                </div>
                <div className="form-group">
                  <textarea 
                    id="message" 
                    rows="5" 
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <label htmlFor="message">Message *</label>
                </div>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="premium-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img src={schoolLogo} alt="Groupe Ipirnet" />
                <div>
                  <h3>Groupe Ipirnet</h3>
                  <p>Excellence en éducation et formation professionnelle</p>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                {['accueil', 'apropos', 'formations', 'admissions', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => scrollToSection(item)}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📍 boulevard hassan 2, Berrechid</p>
              <p>📞 +212 5 22 32 72 13</p>
              <p>✉️ ipirnet.fp@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Groupe Ipirnet. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumApp;