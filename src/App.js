import React, { useState, useEffect } from 'react';
import './App.css';
import schoolLogo from  './logo.png'; 
import heroImage from './ipPhoto.jpg';

const App = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
          <div className="logo-image">
              <img src={schoolLogo} alt="Groupe Ipirnet Logo" />
            </div>
            <div>
              <h1>Groupe Ipirnet</h1>
              <span>Excellence Éducative</span>
            </div>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li><a 
                href="#accueil" 
                className={activeSection === 'accueil' ? 'active' : ''} 
                onClick={() => scrollToSection('accueil')}
              >Accueil</a></li>
              <li><a 
                href="#apropos" 
                className={activeSection === 'apropos' ? 'active' : ''} 
                onClick={() => scrollToSection('apropos')}
              >À Propos</a></li>
              <li><a 
                href="#formations" 
                className={activeSection === 'formations' ? 'active' : ''} 
                onClick={() => scrollToSection('formations')}
              >Formations</a></li>
              <li><a 
                href="#admissions" 
                className={activeSection === 'admissions' ? 'active' : ''} 
                onClick={() => scrollToSection('admissions')}
              >Admissions</a></li>
              <li><a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''} 
                onClick={() => scrollToSection('contact')}
              >Contact</a></li>
            </ul>
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
<section id="accueil" className="hero">
  <div className="hero-container">
    <div className="hero-overlay">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Établissement d'Enseignement Supérieur</div>
          <h1>Bienvenue au Groupe Ipirnet</h1>
          <p>Votre partenaire pour une éducation de qualité et une formation professionnelle d'excellence au Maroc</p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('formations')}
            >Découvrir nos formations</button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('contact')}
            >Nous contacter</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>15+</h3>
              <p>Années d'expérience</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Étudiants formés</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Taux de réussite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* À Propos Section */}
      <section id="apropos" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">À Propos de Nous</h2>
            <p className="section-subtitle">Découvrez notre institution et notre mission éducative</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <div className="about-feature">
                <h3>Notre Mission</h3>
                <p>Le Groupe Ipirnet s'engage à fournir une éducation de qualité qui prépare nos étudiants à exceller dans leurs carrières respectives et à contribuer au développement du Maroc.</p>
              </div>
              <div className="about-feature">
                <h3>Notre Vision</h3>
                <p>Devenir une référence dans l'enseignement supérieur au Maroc, reconnue pour l'excellence de ses formations et le succès de ses diplômés.</p>
              </div>
              <div className="about-feature">
                <h3>Nos Valeurs</h3>
                <ul className="values-list">
                  <li>✓ Excellence académique</li>
                  <li>✓ Innovation pédagogique</li>
                  <li>✓ Professionnalisme</li>
                  <li>✓ Ouverture internationale</li>
                </ul>
              </div>
            </div>
            <div className="about-visual">
              <div className="visual-card">
                <div className="card-header">
                  <div className="card-icon">🏫</div>
                  <h4>Infrastructures Modernes</h4>
                </div>
                <p>Des campus équipés des dernières technologies pour un apprentissage optimal</p>
              </div>
              <div className="visual-card">
                <div className="card-header">
                  <div className="card-icon">👨‍🏫</div>
                  <h4>Enseignants Experts</h4>
                </div>
                <p>Un corps professoral composé de professionnels et d'experts dans leurs domaines</p>
              </div>
              <div className="visual-card">
                <div className="card-header">
                  <div className="card-icon">🤝</div>
                  <h4>Partenariats</h4>
                </div>
                <p>Des collaborations avec des entreprises pour une insertion professionnelle facilitée</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formations" className="formations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Formations</h2>
            <p className="section-subtitle">Des programmes adaptés aux besoins du marché</p>
          </div>
          <div className="formations-grid">
            <div className="formation-card">
              <div className="card-header">
                <div className="card-icon">💻</div>
                <div className="card-badge">Populaire</div>
              </div>
              <h3>Informatique & Réseaux</h3>
              <ul className="formation-features">
                <li>Administration systèmes et réseaux</li>
                <li>Développement web et mobile</li>
                <li>Cybersécurité</li>
                <li>Cloud Computing</li>
              </ul>
              <div className="formation-duration">
                <span>Durée: 2 ans</span>
                <span>Diplôme: BAC+2</span>
              </div>
              <button className="btn-outline">Voir le programme</button>
            </div>

            <div className="formation-card">
              <div className="card-header">
                <div className="card-icon">📊</div>
              </div>
              <h3>Gestion & Management</h3>
              <ul className="formation-features">
                <li>Comptabilité et finance</li>
                <li>Management des organisations</li>
                <li>Marketing digital</li>
                <li>Entrepreneuriat</li>
              </ul>
              <div className="formation-duration">
                <span>Durée: 2 ans</span>
                <span>Diplôme: BAC+2</span>
              </div>
              <button className="btn-outline">Voir le programme</button>
            </div>

            <div className="formation-card">
              <div className="card-header">
                <div className="card-icon">🌐</div>
              </div>
              <h3>Digital & Marketing</h3>
              <ul className="formation-features">
                <li>Communication digitale</li>
                <li>Réseaux sociaux</li>
                <li>E-commerce</li>
                <li>Data analytics</li>
              </ul>
              <div className="formation-duration">
                <span>Durée: 1 an</span>
                <span>Diplôme: Certification</span>
              </div>
              <button className="btn-outline">Voir le programme</button>
            </div>

            <div className="formation-card">
              <div className="card-header">
                <div className="card-icon">🔧</div>
                <div className="card-badge">Nouveau</div>
              </div>
              <h3>Formations Professionnelles</h3>
              <ul className="formation-features">
                <li>Formations courtes et intensives</li>
                <li>Certifications professionnelles</li>
                <li>Formation en alternance</li>
                <li>Reconversion professionnelle</li>
              </ul>
              <div className="formation-duration">
                <span>Durée: 3-6 mois</span>
                <span>Diplôme: Certificat</span>
              </div>
              <button className="btn-outline">Voir le programme</button>
            </div>
        <div className="formation-card"> 
          <div className="card-header">
            <div className="card-icon">🚛</div>
          </div>
          <h3>Licence Professionnelle</h3>
          <ul className="formation-features">
            <li>Gestion et optimisation de la chaîne logistique</li>
            <li>Management opérationnel et pilotage des équipes</li>
            <li>Systèmes d'information et outils informatiques appliqués</li>
            <li>Techniques de planification et gestion des stocks</li>
          </ul>
          <div className="formation-duration">
            <span>Durée : 3 ans</span>
            <span>Diplôme : BAC</span>
          </div>
          <button className="btn-outline">Voir le programme</button>
        </div>
      <div className="formation-card">
        <div className="card-header">
          <div className="card-icon">🎓</div>
         <div className="card-badge">Nouveau en 2025</div>
        </div>
        <h3>Master Professionnel</h3>
        <ul className="formation-features">
          <li>Gestion stratégique des ressources humaines</li>
          <li>Leadership et conduite du changement</li>
          <li>Transformation digitale et systèmes d'information</li>
          <li>Logistique avancée et prise de décision analytique</li>
        </ul>
        <div className="formation-duration">
          <span>Durée : 2 ans</span>
          <span>Diplôme : BAC+3</span>
        </div>
        <button className="btn-outline">Voir le programme</button>
      </div>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="admissions">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Processus d'Admission</h2>
            <p className="section-subtitle">Rejoignez notre communauté étudiante</p>
          </div>
          <div className="admissions-content">
            <div className="admissions-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Dépôt de dossier</h3>
                  <p>Rassemblez et déposez votre dossier de candidature complet en ligne ou sur place</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Entretien de motivation</h3>
                  <p>Participez à un entretien avec notre équipe pédagogique pour discuter de votre projet</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Tests d'admission</h3>
                  <p>Passez les tests nécessaires selon la formation choisie (culture générale, technique...)</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Inscription définitive</h3>
                  <p>Finalisez votre inscription après acceptation de votre candidature</p>
                </div>
              </div>
            </div>
            <div className="admissions-info">
              <div className="info-card">
                <h3>Prochaines Rentrées</h3>
                <ul>
                  <li>Septembre 2024</li>
                  <li>Janvier 2025</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Documents requis</h3>
                <ul>
                  <li>Copies des diplômes</li>
                  <li>Relevés de notes</li>
                  <li>CV et lettre de motivation</li>
                  <li>Photos d'identité</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="admissions-cta">
            <button className="btn-primary">Télécharger le dossier d'inscription</button>
            <p>Ou <a href="#contact">contactez-nous</a> pour plus d'informations</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Nous sommes à votre écoute</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Informations de contact</h3>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Adresse</h4>
                  <p>boulevard hassan 2\ lot Essafi \Imm 1, Berrechid, Morocco</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+212 5 22 32 72 13</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>ipirnet.fp@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div>
                  <h4>Réseaux sociaux</h4>
                  <div className="social-links">
                    <a href="https://web.facebook.com/people/Groupe-ipirnet/100066644283899/" target="_blank" rel="noopener noreferrer" className="social-link">
                      <span className="social-icon">📘</span>
                      Facebook
                    </a>
                    <a href="#" className="social-link">
                      <span className="social-icon">📷</span>
                      Instagram
                    </a>
                    <a href="#" className="social-link">
                      <span className="social-icon">💼</span>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-hours">
                <h4>Horaires d'ouverture</h4>
                <p>Lundi - Vendredi: 8h30 - 18h30</p>
                <p>Samedi: 9h00 - 13h00</p>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Envoyez-nous un message</h3>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input type="text" id="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="formation">Formation intéressée</label>
                  <select id="formation">
                    <option value="">Sélectionnez une formation</option>
                    <option value="informatique">Informatique & Réseaux</option>
                    <option value="gestion">Gestion & Management</option>
                    <option value="digital">Digital & Marketing</option>
                    <option value="professionnelle">Formation Professionnelle</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" className="btn-primary">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">🎓</div>
                <div>
                  <h3>Groupe Ipirnet</h3>
                  <p>Excellence en éducation et formation professionnelle</p>
                </div>
              </div>
              <p className="footer-description">
                Depuis plus de 15 ans, le Groupe Ipirnet forme les professionnels de demain avec des programmes adaptés aux besoins du marché marocain.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                <li><a href="#accueil" onClick={() => scrollToSection('accueil')}>Accueil</a></li>
                <li><a href="#apropos" onClick={() => scrollToSection('apropos')}>À Propos</a></li>
                <li><a href="#formations" onClick={() => scrollToSection('formations')}>Formations</a></li>
                <li><a href="#admissions" onClick={() => scrollToSection('admissions')}>Admissions</a></li>
                <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Formations</h4>
              <ul>
                <li><a href="#">Informatique & Réseaux</a></li>
                <li><a href="#">Gestion & Management</a></li>
                <li><a href="#">Digital & Marketing</a></li>
                <li><a href="#">Formations Professionnelles</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <div className="footer-contact">
                <p>📍 boulevard hassan 2\ lot Essafi \Imm 1, Berrechid, Morocco</p>
                <p>📞 +212 5 22 32 72 13</p>
                <p>✉️ ipirnet.fp@gmail.com</p>
              </div>
              <div className="footer-social">
                <a href="https://web.facebook.com/people/Groupe-ipirnet/100066644283899/" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Groupe Ipirnet. Tous droits réservés.</p>
            <div className="footer-links">
              <a href="#">Mentions légales</a>
              <a href="#">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;