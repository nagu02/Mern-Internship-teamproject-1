import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Menu, X, Instagram, Mail, Phone, MapPin, Calendar, Trophy, Users, Target, Rocket, Home, Award, Zap, MessageSquare, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';

// Three.js Minimalistic Background Component
const MinimalThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Minimal geometric shapes
    const geometries = [];
    const materials = [];
    const meshes = [];

    // Create floating geometric shapes
    for (let i = 0; i < 8; i++) {
      let geometry;
      const rand = Math.random();
      
      if (rand < 0.33) {
        geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
      } else if (rand < 0.66) {
        geometry = new THREE.OctahedronGeometry(0.5);
      } else {
        geometry = new THREE.IcosahedronGeometry(0.5);
      }

      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xff6b00 : i % 3 === 1 ? 0x00d9ff : 0xffe500,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      
      geometries.push(geometry);
      materials.push(material);
      meshes.push(mesh);
      scene.add(mesh);
    }

    // Minimal particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera movement
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;

      // Rotate shapes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.003 * (index % 2 === 0 ? 1 : -1);
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Rotate particles slowly
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

// Home Section
const HomeSection = () => {
  return (
    <div className="section-content home-section">
      <div className="home-content">
        <div className="logo-minimal">
          <span className="logo-number">5</span>
          <span className="logo-text">RINGS</span>
        </div>
        <h1 className="home-title">Multi Sports Facility</h1>
        <p className="home-tagline">Everyone is our customer</p>
        <div className="home-stats-minimal">
          <div className="stat-minimal">
            <Trophy size={28} />
            <div>
              <h3>6+</h3>
              <p>Sports</p>
            </div>
          </div>
          <div className="stat-minimal">
            <Users size={28} />
            <div>
              <h3>1000+</h3>
              <p>Members</p>
            </div>
          </div>
          <div className="stat-minimal">
            <Calendar size={28} />
            <div>
              <h3>8</h3>
              <p>Years</p>
            </div>
          </div>
        </div>
        <button className="cta-minimal">
          Explore <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

// About Section
const AboutSection = () => {
  return (
    <div className="section-content about-section">
      <div className="content-wrapper">
        <h2 className="section-title-minimal">Our Story</h2>
        
        <div className="timeline-minimal">
          <div className="timeline-item-minimal">
            <span className="year">2018</span>
            <p>Started journey in Sports industry</p>
          </div>
          <div className="timeline-item-minimal">
            <span className="year">2021</span>
            <p>Inaugurated "5Rings" as Multi Sports facility</p>
          </div>
          <div className="timeline-item-minimal">
            <span className="year">2024</span>
            <p>Stepped into "Sports tech"</p>
          </div>
          <div className="timeline-item-minimal">
            <span className="year">2025</span>
            <p>Stepped into "Food tech"</p>
          </div>
          <div className="timeline-item-minimal">
            <span className="year">2026</span>
            <p>New Facility in Ayanambakkam, Chennai</p>
          </div>
        </div>

        <div className="vision-mission-minimal">
          <div className="vm-card-minimal">
            <Target size={32} />
            <h3>Vision</h3>
            <p>Everyone is our customer. Sports - Venue | School | Club. Digital automation & promotions.</p>
          </div>
          <div className="vm-card-minimal">
            <Rocket size={32} />
            <h3>Mission</h3>
            <p>Multi sports as family's one stop. Geographical supervening. System automation & monitoring.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sports Section with Images
const SportsSection = () => {
  const sports = [
    { 
      name: 'Kick-Boxing', 
      image: 'https://www.estilomma.com/images/noticias/thumbnails/que%CC%81%20es%20el%20kick%20boxing_thumb_1300x725.jpg',
      description: 'High-intensity combat sport'
    },
    { 
      name: 'Table Tennis', 
      image: 'https://myindianthings.com/cdn/shop/products/6_6a696cd2-72a0-4d15-849e-2f63d94573c8_700x.jpg?v=1672682055',
      description: 'Fast-paced indoor sport'
    },
    { 
      name: 'Football', 
      image: 'https://www.laprensaoriente.info/wp-content/uploads/2020/06/Futbol_Cuando1.jpg',
      description: 'The beautiful game'
    },
    { 
      name: 'Cricket', 
      image: 'https://i.pinimg.com/736x/04/3e/1c/043e1c43cdd93d134b04ac0731622dcb.jpg',
      description: 'Gentleman\'s game'
    },
    { 
      name: 'Silambam', 
      image: 'https://images.jdmagicbox.com/v2/comp/mumbai/t7/022pxx22.xx22.240812143255.u9t7/catalogue/silambam-mumbai-mulund-west-mumbai-gyms-zq7nooe6d4.jpg',
      description: 'Traditional martial art'
    },
    { 
      name: 'Archery', 
      image: 'https://www.outfit4events.cz/images/palette/shared/www/multimedia/demontaz-luku-01.1443294657.1716893196.jpg.webp',
      description: 'Precision & focus'
    }
  ];

  const SportCard = ({ sport, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return (
      <div 
        ref={cardRef}
        className="sport-card-minimal"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="sport-image-wrapper">
          <img src={sport.image} alt={sport.name} />
          <div className="sport-overlay"></div>
        </div>
        <div className="sport-info">
          <h3>{sport.name}</h3>
          <p>{sport.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="section-content sports-section">
      <div className="content-wrapper">
        <h2 className="section-title-minimal">Sports We Offer</h2>
        <div className="sports-grid-minimal">
          {sports.map((sport, index) => (
            <SportCard key={index} sport={sport} index={index} />
          ))}
        </div>

        <div className="partners-minimal">
          <h3>Our Partners</h3>
          <div className="partners-list">
            <span>FC-TAMILIONS</span>
            <span>HAMMERPRO KICKBOXING</span>
            <span>MAK TABLE TENNIS</span>
            <span>KING STAR CRICKET</span>
            <span>ROYAL KINGS ARCHERY</span>
            <span>SILAMBAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Facilities Section
const FacilitiesSection = () => {
  const features = [
    { icon: <Award size={24} />, title: 'Sports Infrastructure', desc: 'World-class facilities' },
    { icon: <Users size={24} />, title: 'Coaching & Training', desc: 'Expert guidance' },
    { icon: <Trophy size={24} />, title: 'Guest Play', desc: 'Flexible memberships' },
    { icon: <Target size={24} />, title: 'Corporate Events', desc: 'Team building' },
    { icon: <Zap size={24} />, title: 'Refreshments', desc: 'Healthy options' },
    { icon: <Award size={24} />, title: 'Sports Items', desc: 'Quality gear' }
  ];

  return (
    <div className="section-content facilities-section">
      <div className="content-wrapper">
        <h2 className="section-title-minimal">What We Provide</h2>
        
        <div className="features-grid-minimal">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card-minimal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="upcoming-minimal">
          <h3>Coming Soon</h3>
          <div className="upcoming-grid-minimal">
            <div className="upcoming-item">
              <h4>Indoor</h4>
              <p>Fencing • Kalari Adimurai</p>
            </div>
            <div className="upcoming-item">
              <h4>Outdoor</h4>
              <p>Cricket Nets • Volleyball • Kabadi • Karate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Section
const ContactSection = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if credentials are configured
    if (!serviceId || !templateId || !publicKey || 
        serviceId.includes('your_') || templateId.includes('your_') || publicKey.includes('your_')) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
      console.error('EmailJS credentials not configured. Please add them to .env file.');
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        form.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        setSubmitStatus('error');
        setIsSubmitting(false);
        console.error('EmailJS error:', error);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <div className="section-content contact-section">
      <div className="content-wrapper">
        <h2 className="section-title-minimal">Get In Touch</h2>
        
        <div className="contact-grid-minimal">
          <div className="contact-info-minimal">
            <h3>FIVERINGS SPORTS PVT LTD</h3>
            
            <div className="info-item">
              <MapPin size={20} />
              <div>
                <h4>Registered Office</h4>
                <p>#7A, Sivasakthi Colony, Villivakkam, Chennai 600049</p>
              </div>
            </div>
            
            <div className="info-item">
              <MapPin size={20} />
              <div>
                <h4>Sports Facility</h4>
                <p>#90, 1st Main Road, Ambattur Industrial Estate, Chennai 600058</p>
              </div>
            </div>
            
            <div className="info-item">
              <Phone size={20} />
              <p>+91 91502 77760</p>
            </div>
            
            <div className="info-item">
              <Mail size={20} />
              <p>info@5rings.in</p>
            </div>
            
            <div className="info-item">
              <Instagram size={20} />
              <p>@5rings_Sports</p>
            </div>

            <div className="whatsapp-box-minimal">
              <div className="whatsapp-header">
                <MessageCircle size={24} className="whatsapp-icon" />
                <h4>WhatsApp Us</h4>
              </div>
              <a href="https://wa.me/919150277760" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                Start Chat
              </a>
            </div>

            <div className="instagram-box-minimal">
              <div className="instagram-header">
                <Instagram size={24} className="instagram-icon" />
                <h4>Follow Us</h4>
              </div>
              <a href="https://www.instagram.com/5rings_sports?igsh=N3hsZGFydnN0YW05" target="_blank" rel="noopener noreferrer" className="instagram-button">
                Visit Instagram
              </a>
            </div>
          </div>
          
          <div className="contact-form-minimal">
            {submitStatus === 'success' && (
              <div className="alert-minimal alert-success">
                ✓ Message sent successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert-minimal alert-error">
                ✗ Failed to send. Please try again.
              </div>
            )}
            
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name="user_name" placeholder="Name" required />
              <input type="email" name="user_email" placeholder="Email" required />
              <input type="tel" name="user_phone" placeholder="Phone" required />
              <select name="sport" required>
                <option value="">Select Sport</option>
                <option>Kick-Boxing</option>
                <option>Table Tennis</option>
                <option>Football</option>
                <option>Cricket</option>
                <option>Silambam</option>
                <option>Archery</option>
              </select>
              <textarea name="message" placeholder="Message" rows="4" required></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navigation
const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <Award size={18} /> },
    { id: 'sports', label: 'Sports', icon: <Trophy size={18} /> },
    { id: 'facilities', label: 'Facilities', icon: <Zap size={18} /> },
    { id: 'contact', label: 'Contact', icon: <MessageSquare size={18} /> }
  ];

  return (
    <nav className="nav-minimal">
      <div className="nav-content">
        <div className="nav-logo-minimal">
          <span>5</span>RINGS
        </div>
        
        <div className={`nav-links-minimal ${isMobileMenuOpen ? 'open' : ''}`}>
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        <button 
          className="nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch(activeSection) {
      case 'home': return <HomeSection />;
      case 'about': return <AboutSection />;
      case 'sports': return <SportsSection />;
      case 'facilities': return <FacilitiesSection />;
      case 'contact': return <ContactSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="app-minimal">
      <MinimalThreeBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main-content">
        {renderSection()}
      </main>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #FF6B00;
          --secondary: #00D9FF;
          --accent: #FFE500;
          --bg-dark: #0a0a0a;
          --bg-darker: #050505;
          --text: #ffffff;
          --text-muted: #999999;
          --border: rgba(255, 255, 255, 0.1);
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--bg-darker);
          color: var(--text);
          overflow-x: hidden;
          line-height: 1.6;
        }

        .app-minimal {
          position: relative;
          min-height: 100vh;
        }

        /* Three.js Background */
        .three-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .three-background canvas {
          display: block;
        }

        /* Navigation */
        .nav-minimal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo-minimal {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .nav-logo-minimal span {
          color: var(--primary);
        }

        .nav-links-minimal {
          display: flex;
          gap: 0.5rem;
        }

        .nav-link {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: var(--primary);
          background: rgba(255, 107, 0, 0.1);
          border-color: var(--primary);
        }

        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          padding-top: 80px;
        }

        .section-content {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .content-wrapper {
          max-width: 1200px;
          width: 100%;
        }

        .section-title-minimal {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 3rem;
          text-align: center;
          letter-spacing: -0.02em;
        }

        /* Home Section */
        .home-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .logo-minimal {
          font-size: 6rem;
          font-weight: 900;
          margin-bottom: 1rem;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .logo-number {
          color: var(--primary);
        }

        .logo-text {
          color: var(--text);
        }

        .home-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-muted);
        }

        .home-tagline {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          color: var(--text-muted);
          font-style: italic;
        }

        .home-stats-minimal {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .stat-minimal {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .stat-minimal:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
          border-color: var(--primary);
        }

        .stat-minimal svg {
          color: var(--primary);
        }

        .stat-minimal h3 {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-minimal p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .cta-minimal {
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem 3rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .cta-minimal:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
        }

        /* Timeline */
        .timeline-minimal {
          max-width: 600px;
          margin: 0 auto 4rem;
        }

        .timeline-item-minimal {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-left: 3px solid var(--primary);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .timeline-item-minimal:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .timeline-item-minimal .year {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--primary);
          min-width: 80px;
        }

        /* Vision Mission */
        .vision-mission-minimal {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .vm-card-minimal {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .vm-card-minimal:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-10px);
          border-color: var(--primary);
        }

        .vm-card-minimal svg {
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .vm-card-minimal h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        /* Sports Grid */
        .sports-grid-minimal {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .sport-card-minimal {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .sport-image-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .sport-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sport-card-minimal:hover img {
          transform: scale(1.1);
        }

        .sport-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
        }

        .sport-info {
          padding: 1.5rem;
        }

        .sport-info h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .sport-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        /* Partners */
        .partners-minimal {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        .partners-minimal h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .partners-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .partners-list span {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid var(--primary);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);
          transition: all 0.3s ease;
        }

        .partners-list span:hover {
          background: rgba(255, 107, 0, 0.2);
          transform: translateY(-2px);
        }

        /* Features Grid */
        .features-grid-minimal {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card-minimal {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card-minimal:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-10px);
          border-color: var(--primary);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 107, 0, 0.1);
          border-radius: 12px;
          color: var(--primary);
        }

        .feature-card-minimal h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .feature-card-minimal p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        /* Upcoming */
        .upcoming-minimal h3 {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .upcoming-grid-minimal {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .upcoming-item {
          padding: 2rem;
          background: rgba(0, 217, 255, 0.05);
          border: 1px solid var(--secondary);
          border-radius: 12px;
        }

        .upcoming-item h4 {
          color: var(--secondary);
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .upcoming-item p {
          color: var(--text-muted);
        }

        /* Contact */
        .contact-grid-minimal {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }

        .contact-info-minimal h3 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--primary);
        }

        .info-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }

        .info-item svg {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .info-item h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: var(--secondary);
        }

        .info-item p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        /* WhatsApp Box */
        .whatsapp-box-minimal {
          margin-top: 2.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.12), rgba(37, 211, 102, 0.05));
          border: 2px solid rgba(37, 211, 102, 0.4);
          border-radius: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .whatsapp-box-minimal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #25D366, #20ba58);
        }

        .whatsapp-box-minimal:hover {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(37, 211, 102, 0.1));
          border-color: rgba(37, 211, 102, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.25);
        }

        .whatsapp-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .whatsapp-icon {
          color: #25D366;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(37, 211, 102, 0.3));
        }

        .whatsapp-header h4 {
          font-size: 1.2rem;
          margin: 0;
          color: #25D366;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .whatsapp-button {
          display: inline-block;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #25D366, #20ba58);
          color: white;
          text-align: center;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.98rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          letter-spacing: 0.3px;
          box-shadow: 0 6px 15px rgba(37, 211, 102, 0.25);
        }

        .whatsapp-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.4);
          background: linear-gradient(135deg, #1ecc5f, #1ab350);
        }

        .whatsapp-button:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(37, 211, 102, 0.25);
        }

        /* Instagram Box */
        .instagram-box-minimal {
          margin-top: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(217, 51, 137, 0.12), rgba(255, 107, 0, 0.08));
          border: 2px solid rgba(217, 51, 137, 0.4);
          border-radius: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .instagram-box-minimal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #D91E63, #FF6B00, #FFD600);
        }

        .instagram-box-minimal:hover {
          background: linear-gradient(135deg, rgba(217, 51, 137, 0.18), rgba(255, 107, 0, 0.12));
          border-color: rgba(217, 51, 137, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(217, 51, 137, 0.25);
        }

        .instagram-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .instagram-icon {
          color: #D91E63;
          flex-shrink: 0;
          animation: igGlow 2s ease-in-out infinite;
        }

        @keyframes igGlow {
          0%, 100% {
            filter: drop-shadow(0 2px 4px rgba(217, 51, 137, 0.3));
          }
          50% {
            filter: drop-shadow(0 2px 8px rgba(255, 107, 0, 0.4)) drop-shadow(0 0 4px rgba(255, 214, 0, 0.2));
          }
        }

        .instagram-header h4 {
          font-size: 1.2rem;
          margin: 0;
          background: linear-gradient(135deg, #D91E63, #FF6B00, #FFD600);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .instagram-button {
          display: inline-block;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #D91E63, #FF6B00);
          color: white;
          text-align: center;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.98rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          letter-spacing: 0.3px;
          box-shadow: 0 6px 15px rgba(217, 51, 137, 0.25);
        }

        .instagram-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(217, 51, 137, 0.4);
          background: linear-gradient(135deg, #c41549, #e55a00);
        }

        .instagram-button:active {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(217, 51, 137, 0.25);
        }

        /* Form */
        .contact-form-minimal {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        .contact-form-minimal input,
        .contact-form-minimal select,
        .contact-form-minimal textarea {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .contact-form-minimal input:focus,
        .contact-form-minimal select:focus,
        .contact-form-minimal textarea:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .contact-form-minimal button {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .contact-form-minimal button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
        }

        .contact-form-minimal button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Alerts */
        .alert-minimal {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .alert-success {
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid var(--secondary);
          color: var(--secondary);
        }

        .alert-error {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid var(--primary);
          color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links-minimal {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 70%;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 6rem 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 1px solid var(--border);
          }

          .nav-links-minimal.open {
            transform: translateX(0);
          }

          .nav-toggle {
            display: block;
          }

          .logo-minimal {
            font-size: 4rem;
          }

          .section-title-minimal {
            font-size: 2rem;
          }

          .sports-grid-minimal,
          .features-grid-minimal,
          .contact-grid-minimal {
            grid-template-columns: 1fr;
          }

          .home-stats-minimal {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
