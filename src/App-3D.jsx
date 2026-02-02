import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Menu, X, Instagram, Mail, Phone, MapPin, Calendar, Trophy, Users, Target, Rocket } from 'lucide-react';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};

// Three.js 3D Background Component
const ThreeBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xff6b00,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Create floating rings (5Rings logo inspired)
    const rings = [];
    const ringColors = [0xff6b00, 0x00d9ff, 0xffe500, 0xff0080, 0x00ff88];
    
    for (let i = 0; i < 5; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      
      ring.position.x = (i - 2) * 1.5;
      ring.position.y = Math.sin(i) * 2;
      ring.position.z = -3;
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      
      rings.push(ring);
      scene.add(ring);
    }

    // Create 3D sports equipment
    // Football
    const footballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const footballMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const football = new THREE.Mesh(footballGeometry, footballMaterial);
    football.position.set(-3, 2, -2);
    scene.add(football);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      // Animate rings
      rings.forEach((ring, index) => {
        ring.rotation.x += 0.01 * (index + 1);
        ring.rotation.y += 0.005 * (index + 1);
        ring.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5;
      });

      // Animate football
      football.rotation.x += 0.02;
      football.rotation.y += 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement parallax
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

// Hero Section Component with 3D
const Hero = () => {
  const scrollY = useScrollAnimation();
  
  return (
    <section className="hero">
      <ThreeBackground />
      
      <div className="container hero-content">
        <div className="hero-text">
          <div className="logo-section" data-aos="zoom-in">
            <div className="logo-circle"></div>
            <h1 className="logo-text">
              <span className="number">5</span>RINGS
            </h1>
          </div>
          <h2 className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
            Multi Sports Facility
          </h2>
          <p className="hero-tagline" data-aos="fade-up" data-aos-delay="300">
            Everyone is our customer
          </p>
          <div className="hero-cta" data-aos="fade-up" data-aos-delay="400">
            <button className="btn-primary btn-3d">
              Explore Now <ChevronRight size={20} />
            </button>
            <button className="btn-secondary btn-3d">
              Book a Slot
            </button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-card card-3d" data-aos="flip-left" data-aos-delay="200">
            <Trophy size={32} />
            <h3>6+</h3>
            <p>Sports Offered</p>
          </div>
          <div className="stat-card card-3d" data-aos="flip-left" data-aos-delay="400">
            <Users size={32} />
            <h3>1000+</h3>
            <p>Active Members</p>
          </div>
          <div className="stat-card card-3d" data-aos="flip-left" data-aos-delay="600">
            <Calendar size={32} />
            <h3>Since 2018</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
};

// Interactive 3D Sport Card Component
const SportCard3D = ({ sport, icon, index }) => {
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
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
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
      className="sport-card sport-card-3d" 
      data-aos="fade-up"
      data-aos-delay={index * 100}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="sport-icon">{icon}</div>
      <h3>{sport}</h3>
      <div className="card-shine"></div>
    </div>
  );
};

// About Section Component
const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">Welcome To Our Company</h2>
        </div>
        
        <div className="about-grid">
          <div className="about-content" data-aos="fade-right">
            <div className="timeline">
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="100">
                <div className="timeline-year">2018</div>
                <p>Started journey in Sports industry</p>
              </div>
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="200">
                <div className="timeline-year">2021</div>
                <p>Inaugurated "5Rings" as Multi Sports facility with the mantra "Everyone is our customer"</p>
              </div>
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="300">
                <div className="timeline-year">2024</div>
                <p>Stepped into "Sports tech"</p>
              </div>
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="400">
                <div className="timeline-year">2025</div>
                <p>Stepped into "Food tech"</p>
              </div>
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="500">
                <div className="timeline-year">2026</div>
                <p>New Facility in Ayanambakkam, Chennai</p>
              </div>
            </div>
          </div>
          
          <div className="about-visual" data-aos="fade-left">
            <div className="importance-card card-3d">
              <h3>Importance of Sports</h3>
              <div className="benefits-grid">
                <div className="benefit">Promote Physical Fitness</div>
                <div className="benefit">Develop Teamwork & Discipline</div>
                <div className="benefit">Reduce Stress</div>
                <div className="benefit">Encourage Social Interaction</div>
                <div className="benefit">Improve Concentration</div>
                <div className="benefit">Foster Sense of Sportsmanship</div>
                <div className="benefit">Promote National Pride</div>
                <div className="benefit">Promote Diversity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Vision & Mission Component
const VisionMission = () => {
  return (
    <section className="vision-mission">
      <div className="container">
        <div className="vm-grid">
          <div className="vm-card vision-card card-3d" data-aos="zoom-in-right">
            <Target className="vm-icon" size={48} />
            <h3>Vision</h3>
            <ul>
              <li>Everyone is our customer</li>
              <li>Sports - Venue | School | Club</li>
              <li>Digital automation & Club promotions</li>
              <li>Sale of Sports goods & wellness refreshments</li>
              <li>Branding & Franchising</li>
            </ul>
          </div>
          
          <div className="vm-card mission-card card-3d" data-aos="zoom-in-left">
            <Rocket className="vm-icon" size={48} />
            <h3>Mission</h3>
            <ul>
              <li>Multi sports - as family's one stop</li>
              <li>Geographical Supervening</li>
              <li>Automation of system & monitoring</li>
              <li>Local, District, State & National Matches</li>
              <li>Skill Developments & Affiliations</li>
              <li>Internships & Certifications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Founder Section Component
const Founder = () => {
  return (
    <section className="founder" id="team">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">Leadership</span>
          <h2 className="section-title">Meet The Founder</h2>
        </div>
        
        <div className="founder-grid">
          <div className="founder-card card-3d" data-aos="flip-up">
            <div className="founder-image-placeholder">
              <Users size={80} />
            </div>
            <h3>Radhakrishnan N</h3>
            <p className="founder-title">MD & Founder</p>
            <p className="founder-email">info@5rings.in</p>
            
            <div className="founder-bio">
              <h4>Passion of Sports</h4>
              <p>Son of Weaver, Graduate in Commerce, Career in Chartered Accountant profession, Articled assistant of CA Firm, Internal Auditor of Automobile MNC, Self Employed Consultant and Accountant, Interest in Games, Passionate in Sports - stepped in "5Rings - Multi Sports Facility"</p>
            </div>
          </div>
          
          <div className="team-members" data-aos="fade-left">
            <h4>Key Persons</h4>
            <div className="member-list">
              <div className="member-item" data-aos="fade-left" data-aos-delay="100">Radhakrishnan N</div>
              <div className="member-item" data-aos="fade-left" data-aos-delay="200">Ashokkumar H</div>
              <div className="member-item" data-aos="fade-left" data-aos-delay="300">Suriyaraaj K</div>
              <div className="member-item" data-aos="fade-left" data-aos-delay="400">Rishikumar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sports Section Component with 3D Cards
const Sports = () => {
  const sports = [
    { name: 'Kick-Boxing', icon: '🥊' },
    { name: 'Table Tennis', icon: '🏓' },
    { name: 'Football', icon: '⚽' },
    { name: 'Cricket', icon: '🏏' },
    { name: 'Silambam', icon: '🥋' },
    { name: 'Archery', icon: '🏹' }
  ];
  
  const partners = [
    'FC-TAMILIONS',
    'HAMMERPRO KICKBOXING',
    'MAK TABLE TENNIS',
    'KING STAR CRICKET',
    'ROYAL KINGS ARCHERY',
    'SILAMBAM'
  ];
  
  return (
    <section className="sports" id="sports">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Sports Available</h2>
        </div>
        
        <div className="sports-grid">
          {sports.map((sport, index) => (
            <SportCard3D key={index} sport={sport.name} icon={sport.icon} index={index} />
          ))}
        </div>
        
        <div className="partners-section" data-aos="fade-up">
          <h3>Sports Club Partners</h3>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="partner-badge"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Facilities Component
const Facilities = () => {
  const features = [
    'Sports Infrastructure',
    'Coaching & Training',
    'Guest Play & Memberships',
    'Corporate Events & Matches',
    'Sale of Refreshments',
    'Sale of Sports Items'
  ];
  
  return (
    <section className="facilities" id="facilities">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">What We Provide</span>
          <h2 className="section-title">Facility Features</h2>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card card-3d"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
              <h3>{feature}</h3>
            </div>
          ))}
        </div>
        
        <div className="upcoming-section">
          <h3 data-aos="fade-down">Upcoming Services</h3>
          <div className="upcoming-grid">
            <div className="upcoming-card card-3d" data-aos="zoom-in-right">
              <h4>Indoor Facility</h4>
              <ul>
                <li>Fencing</li>
                <li>Kalari Adimurai</li>
              </ul>
            </div>
            <div className="upcoming-card card-3d" data-aos="zoom-in-left">
              <h4>Outdoor Facility</h4>
              <ul>
                <li>Cricket Nets</li>
                <li>Volleyball</li>
                <li>Kabadi</li>
                <li>Karate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Future Vision Component
const FutureVision = () => {
  const stages = [
    {
      title: 'Stage #1',
      description: 'Slot Booking App: Listing of Multiple sports, Venues & Creation of Active users Data Base - Chennai & TN'
    },
    {
      title: 'Stage #2',
      description: 'Coaching & Connecting App: Listing of Sports & Professionals where students connect & get trained'
    },
    {
      title: 'Stage #3',
      description: 'Connection Module where sportsmen host, club, organise, fixtures etc'
    },
    {
      title: 'Stage #4',
      description: 'Yourselves do - identify, list, locate, evaluate, record, review & market'
    }
  ];
  
  return (
    <section className="future-vision">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">Innovation</span>
          <h2 className="section-title">Future Vision</h2>
          <p className="section-subtitle">Sports - Tech</p>
        </div>
        
        <div className="vision-content">
          <div className="vision-description" data-aos="fade-right">
            <p><strong>Slot Booking App</strong> facilitates booking of sports venues by blocking particular time period where they can use for Guest Play, Events, Tournaments, Matches, etc.</p>
            <p><strong>Coaching Module</strong> will help academies can monitor students, coaches, attendance, collect fees, maintain expenses, reporting, adhering compliances, interaction with parents, promotional videos, performance upload, etc.</p>
            <p><strong>Connecting Module</strong> where sportsmen host their sport for public team, split payment, organize tournaments, creating fixtures, etc.</p>
            <p><strong>Listing Module</strong> enable to list coaches themselves online, where easy and able to locate students and parents about coaching profession, experience, testimonials, reviews, venue facilities, etc.</p>
          </div>
          
          <div className="stages-grid">
            {stages.map((stage, index) => (
              <div 
                key={index} 
                className="stage-card card-3d"
                data-aos="flip-right"
                data-aos-delay={index * 100}
              >
                <div className="stage-number">{stage.title}</div>
                <p>{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        form.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        console.log('Email send failed:', error.text);
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-down">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Visit & Play</h2>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <h3>FIVERINGS SPORTS PVT LTD</h3>
            
            <div className="info-group">
              <MapPin size={24} />
              <div>
                <h4>Registered Office</h4>
                <p>#7A, Sivasakthi Colony, Villivakkam, Chennai 600049</p>
              </div>
            </div>
            
            <div className="info-group">
              <MapPin size={24} />
              <div>
                <h4>Sports Facility</h4>
                <p>#90, 1st Main Road, Ambattur Industrial Estate, Chennai 600058</p>
              </div>
            </div>
            
            <div className="info-group">
              <Phone size={24} />
              <div>
                <p>(91) 9150277760</p>
              </div>
            </div>
            
            <div className="info-group">
              <Mail size={24} />
              <div>
                <p>info@5rings.in</p>
              </div>
            </div>
            
            <div className="info-group">
              <Instagram size={24} />
              <div>
                <p>@5rings_Sports</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form card-3d" data-aos="fade-left">
            <h3>Send us a message</h3>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-error">
                ❌ Failed to send message. Please try again or email us directly.
              </div>
            )}
            
            <form ref={form} onSubmit={sendEmail}>
              <input 
                type="text" 
                name="user_name" 
                placeholder="Your Name" 
                required 
              />
              <input 
                type="email" 
                name="user_email" 
                placeholder="Your Email" 
                required 
              />
              <input 
                type="tel" 
                name="user_phone" 
                placeholder="Your Phone" 
                required 
              />
              <select name="sport" required>
                <option value="">Select Sport</option>
                <option value="Kick-Boxing">Kick-Boxing</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Silambam">Silambam</option>
                <option value="Archery">Archery</option>
              </select>
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="4" 
                required
              ></textarea>
              <button 
                type="submit" 
                className="btn-primary btn-3d" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <span className="nav-number">5</span>RINGS
        </div>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#about">About</a>
          <a href="#sports">Sports</a>
          <a href="#facilities">Facilities</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
        
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

// Initialize AOS (Animate On Scroll) animations
const initAOS = () => {
  useEffect(() => {
    // AOS configuration
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// Main App Component
const App = () => {
  initAOS();

  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <VisionMission />
      <Founder />
      <Sports />
      <Facilities />
      <FutureVision />
      <Contact />
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 5Rings Sports Pvt Ltd. All rights reserved.</p>
          <p>www.5rings.in</p>
        </div>
      </footer>
      
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
          --dark: #0A0E27;
          --darker: #050714;
          --light: #F8F9FA;
          --gradient-1: linear-gradient(135deg, #FF6B00 0%, #FF0080 100%);
          --gradient-2: linear-gradient(135deg, #00D9FF 0%, #0066FF 100%);
          --gradient-3: linear-gradient(135deg, #FFE500 0%, #FF6B00 100%);
        }
        
        body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--darker);
          color: var(--light);
          overflow-x: hidden;
          line-height: 1.6;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Three.js Background */
        .three-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .three-background canvas {
          display: block;
        }

        /* AOS Animations */
        [data-aos] {
          opacity: 0;
          transition: all 0.8s ease;
        }

        [data-aos].aos-animate {
          opacity: 1;
        }

        [data-aos="fade-up"] {
          transform: translateY(50px);
        }

        [data-aos="fade-up"].aos-animate {
          transform: translateY(0);
        }

        [data-aos="fade-down"] {
          transform: translateY(-50px);
        }

        [data-aos="fade-down"].aos-animate {
          transform: translateY(0);
        }

        [data-aos="fade-left"] {
          transform: translateX(-50px);
        }

        [data-aos="fade-left"].aos-animate {
          transform: translateX(0);
        }

        [data-aos="fade-right"] {
          transform: translateX(50px);
        }

        [data-aos="fade-right"].aos-animate {
          transform: translateX(0);
        }

        [data-aos="zoom-in"] {
          transform: scale(0.8);
        }

        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
        }

        [data-aos="flip-left"] {
          transform: perspective(2500px) rotateY(-100deg);
        }

        [data-aos="flip-left"].aos-animate {
          transform: perspective(2500px) rotateY(0);
        }

        [data-aos="flip-up"] {
          transform: perspective(2500px) rotateX(-100deg);
        }

        [data-aos="flip-up"].aos-animate {
          transform: perspective(2500px) rotateX(0);
        }

        /* 3D Card Effects */
        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
        }

        .card-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .card-3d:hover::before {
          transform: translateX(100%);
        }

        .card-3d:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(255, 107, 0, 0.3);
        }

        /* 3D Buttons */
        .btn-3d {
          transform-style: preserve-3d;
          transition: all 0.3s ease;
          position: relative;
        }

        .btn-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          border-radius: inherit;
          transform: translateZ(-5px);
          filter: brightness(0.7);
        }

        .btn-3d:hover {
          transform: translateY(-5px) translateZ(10px);
        }

        .btn-3d:active {
          transform: translateY(-2px) translateZ(5px);
        }
        
        /* Navigation */
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s ease;
        }
        
        .navigation.scrolled {
          background: rgba(10, 14, 39, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        
        .nav-number {
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.2rem;
        }
        
        .nav-links {
          display: flex;
          gap: 2.5rem;
        }
        
        .nav-links a {
          color: var(--light);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
          color: var(--primary);
        }
        
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-1);
          transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after {
          width: 100%;
        }
        
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--light);
          cursor: pointer;
        }
        
        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8rem 0 4rem;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .logo-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gradient-1);
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .logo-circle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--darker);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 107, 0, 0); }
        }
        
        .logo-text {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
        }
        
        .number {
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 6rem;
        }
        
        .hero-subtitle {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: var(--gradient-2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-tagline {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          font-style: italic;
        }
        
        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 4rem;
        }
        
        .btn-primary {
          background: var(--gradient-1);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 0, 0.5);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--light);
          border: 2px solid var(--primary);
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: var(--primary);
          transform: translateY(-3px);
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary);
        }
        
        .stat-card svg {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        .stat-card h3 {
          font-size: 2.5rem;
          font-weight: 900;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .stat-card p {
          opacity: 0.8;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        
        .scroll-dot {
          width: 30px;
          height: 50px;
          border: 2px solid var(--primary);
          border-radius: 25px;
          position: relative;
        }
        
        .scroll-dot::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          animation: scroll 2s ease-in-out infinite;
        }
        
        @keyframes scroll {
          0% { transform: translate(-50%, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, 20px); opacity: 0; }
        }
        
        /* Section Styling */
        section {
          padding: 6rem 0;
          position: relative;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-tag {
          display: inline-block;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .section-subtitle {
          font-size: 1.3rem;
          opacity: 0.8;
        }
        
        /* About Section */
        .about {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .timeline {
          position: relative;
          padding-left: 3rem;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--gradient-1);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 2rem;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -3.5rem;
          top: 0.5rem;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: var(--primary);
          border: 3px solid var(--darker);
          box-shadow: 0 0 20px rgba(255, 107, 0, 0.5);
        }
        
        .timeline-year {
          font-size: 1.5rem;
          font-weight: 900;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .importance-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
        }
        
        .importance-card h3 {
          font-size: 2rem;
          margin-bottom: 2rem;
          background: var(--gradient-2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .benefit {
          background: rgba(0, 217, 255, 0.1);
          padding: 1rem;
          border-radius: 15px;
          border: 1px solid rgba(0, 217, 255, 0.2);
          text-align: center;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .benefit:hover {
          background: rgba(0, 217, 255, 0.2);
          transform: translateY(-5px) scale(1.05);
        }
        
        /* Vision Mission */
        .vision-mission {
          background: var(--dark);
        }
        
        .vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        
        .vm-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 3rem;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .vm-card:hover {
          transform: translateY(-10px);
        }
        
        .vision-card {
          border-color: var(--primary);
        }
        
        .vision-card:hover {
          background: rgba(255, 107, 0, 0.1);
          box-shadow: 0 20px 60px rgba(255, 107, 0, 0.3);
        }
        
        .mission-card {
          border-color: var(--secondary);
        }
        
        .mission-card:hover {
          background: rgba(0, 217, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 217, 255, 0.3);
        }
        
        .vm-icon {
          margin-bottom: 1.5rem;
          color: var(--primary);
        }
        
        .mission-card .vm-icon {
          color: var(--secondary);
        }
        
        .vm-card h3 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .vm-card ul {
          list-style: none;
        }
        
        .vm-card li {
          padding: 0.8rem 0;
          padding-left: 2rem;
          position: relative;
        }
        
        .vm-card li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--primary);
          font-weight: 900;
        }
        
        .mission-card li::before {
          color: var(--secondary);
        }
        
        /* Founder Section */
        .founder {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .founder-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
        
        .founder-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
          text-align: center;
        }
        
        .founder-image-placeholder {
          width: 150px;
          height: 150px;
          margin: 0 auto 2rem;
          border-radius: 50%;
          background: var(--gradient-1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .founder-card h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .founder-title {
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .founder-email {
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        
        .founder-bio {
          text-align: left;
          background: rgba(0, 0, 0, 0.3);
          padding: 2rem;
          border-radius: 20px;
        }
        
        .founder-bio h4 {
          color: var(--accent);
          margin-bottom: 1rem;
        }
        
        .team-members {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
        }
        
        .team-members h4 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--secondary);
        }
        
        .member-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .member-item {
          background: rgba(0, 217, 255, 0.1);
          padding: 1.5rem;
          border-radius: 15px;
          border-left: 4px solid var(--secondary);
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .member-item:hover {
          background: rgba(0, 217, 255, 0.2);
          transform: translateX(10px);
        }
        
        /* Sports Section */
        .sports {
          background: var(--dark);
        }
        
        .sports-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .sport-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
          animation: fadeInUp 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        
        .sport-card-3d {
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateX(0) rotateY(0);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .sport-card:hover {
          border-color: var(--primary);
          background: rgba(255, 107, 0, 0.1);
          box-shadow: 0 20px 60px rgba(255, 107, 0, 0.4);
        }
        
        .sport-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 20px rgba(255, 107, 0, 0.5));
          transition: all 0.3s ease;
        }
        
        .sport-card:hover .sport-icon {
          transform: scale(1.2) rotate(10deg);
        }
        
        .sport-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .sport-card:hover .card-shine {
          left: 100%;
        }
        
        .partners-section h3 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          background: var(--gradient-3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .partner-badge {
          background: var(--gradient-3);
          color: var(--dark);
          padding: 1.5rem;
          border-radius: 20px;
          text-align: center;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }
        
        .partner-badge:hover {
          transform: scale(1.1) rotate(2deg);
          box-shadow: 0 10px 30px rgba(255, 229, 0, 0.3);
        }
        
        /* Facilities Section */
        .facilities {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient-1);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover::before {
          transform: scaleX(1);
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(255, 107, 0, 0.3);
        }
        
        .feature-number {
          font-size: 3rem;
          font-weight: 900;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        
        .upcoming-section h3 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .upcoming-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .upcoming-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid var(--secondary);
          border-radius: 25px;
          padding: 3rem;
        }
        
        .upcoming-card h4 {
          font-size: 1.8rem;
          color: var(--secondary);
          margin-bottom: 1.5rem;
        }
        
        .upcoming-card ul {
          list-style: none;
        }
        
        .upcoming-card li {
          padding: 0.8rem 0;
          padding-left: 2rem;
          position: relative;
        }
        
        .upcoming-card li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 1.2rem;
        }
        
        /* Future Vision */
        .future-vision {
          background: var(--dark);
        }
        
        .vision-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        
        .vision-description p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .vision-description strong {
          color: var(--primary);
        }
        
        .stages-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .stage-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          border-left: 5px solid var(--accent);
          transition: all 0.3s ease;
        }
        
        .stage-card:hover {
          transform: translateX(10px);
          background: rgba(255, 229, 0, 0.1);
          box-shadow: 0 10px 30px rgba(255, 229, 0, 0.3);
        }
        
        .stage-number {
          font-weight: 900;
          color: var(--accent);
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        
        /* Contact Section */
        .contact {
          background: rgba(255, 255, 255, 0.02);
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        
        .contact-info h3 {
          font-size: 2rem;
          margin-bottom: 2rem;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .info-group {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          align-items: flex-start;
        }
        
        .info-group svg {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }
        
        .info-group h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--secondary);
        }
        
        .contact-form {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3rem;
        }
        
        .contact-form h3 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        
        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1rem 1.5rem;
          color: var(--light);
          font-size: 1rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .contact-form button {
          width: 100%;
        }
        
        .contact-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Alert Messages */
        .alert {
          padding: 1rem 1.5rem;
          border-radius: 15px;
          margin-bottom: 1.5rem;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .alert-success {
          background: rgba(0, 217, 255, 0.2);
          border: 1px solid var(--secondary);
          color: var(--secondary);
        }
        
        .alert-error {
          background: rgba(255, 107, 0, 0.2);
          border: 1px solid var(--primary);
          color: var(--primary);
        }
        
        /* Footer */
        .footer {
          background: var(--darker);
          padding: 2rem 0;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer p {
          opacity: 0.8;
          margin: 0.5rem 0;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .about-grid,
          .vm-grid,
          .vision-content,
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          .founder-grid {
            grid-template-columns: 1fr;
          }
          
          .sports-grid,
          .features-grid,
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 70%;
            background: var(--dark);
            flex-direction: column;
            padding: 6rem 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          
          .nav-links.open {
            transform: translateX(0);
          }
          
          .nav-toggle {
            display: block;
          }
          
          .logo-text {
            font-size: 3rem;
          }
          
          .number {
            font-size: 4rem;
          }
          
          .hero-subtitle {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .sports-grid,
          .features-grid,
          .partners-grid,
          .upcoming-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
