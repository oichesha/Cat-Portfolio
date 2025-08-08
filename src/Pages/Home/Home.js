import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const catBreeds = [
    {
      name: "Persian",
      image: "🐱",
      description: "Known for their long, luxurious coats and sweet personalities.",
      traits: ["Calm", "Affectionate", "Indoor cats"]
    },
    {
      name: "Siamese",
      image: "😺",
      description: "Intelligent and vocal cats with striking blue eyes.",
      traits: ["Talkative", "Social", "Playful"]
    },
    {
      name: "Maine Coon",
      image: "😸",
      description: "Large, gentle giants with tufted ears and bushy tails.",
      traits: ["Gentle", "Large", "Friendly"]
    }
  ];

  const catFacts = [
    "Cats sleep 12-16 hours per day",
    "A group of cats is called a 'clowder'",
    "Cats have 32 muscles in each ear",
    "A cat's purr can help heal bones"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % catFacts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCareClick = (careType) => {
    if (careType === 'Nutrition') {
      navigate('/nutrition');
    }
    // Add more navigation cases for other care types if needed
  };

  return (
    <div className="cat-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            🐾 Purrfect Cats
          </div>
          
          <div className="nav-menu">
            {['Home', 'Breeds', 'Care', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Cat Paradise 🐱
          </h1>
          <p className="hero-subtitle">
            Discover the wonderful world of our feline friends
          </p>
          <button
            onClick={() => scrollToSection('breeds')}
            className="hero-button"
          >
            Explore Cat Breeds
          </button>
        </div>
      </section>

      {/* Cat Facts Slider */}
      <section className="facts-section">
        <div className="facts-container">
          <h3 className="facts-title">
            🎯 Did You Know?
          </h3>
          <div className="facts-content">
            {catFacts[currentSlide]}
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section id="breeds" className="breeds-section">
        <div className="section-container">
          <h2 className="section-title">
            Popular Cat Breeds
          </h2>
          
          <div className="breeds-grid">
            {catBreeds.map((breed, index) => (
              <div key={breed.name} className="breed-card">
                <div className="breed-image">
                  {breed.image}
                </div>
                <h3 className="breed-name">
                  {breed.name}
                </h3>
                <p className="breed-description">
                  {breed.description}
                </p>
                <div className="breed-traits">
                  {breed.traits.map((trait) => (
                    <span key={trait} className="trait-tag">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Section */}
      <section id="care" className="care-section">
        <div className="section-container">
          <h2 className="section-title">
            Cat Care Essentials
          </h2>
          
          <div className="care-grid">
            {[
              { icon: '🥘', title: 'Nutrition', desc: 'High-quality cat food appropriate for age and health' },
              { icon: '🏥', title: 'Health Care', desc: 'Regular vet visits and vaccinations' },
              { icon: '🧸', title: 'Play Time', desc: 'Interactive toys and daily exercise' },
              { icon: '🛁', title: 'Grooming', desc: 'Regular brushing and nail trimming' }
            ].map((item) => (
              <div 
                key={item.title} 
                className={`care-card ${item.title === 'Nutrition' ? 'clickable' : ''}`}
                onClick={() => handleCareClick(item.title)}
                style={item.title === 'Nutrition' ? { cursor: 'pointer' } : {}}
              >
                <div className="care-icon">
                  {item.icon}
                </div>
                <h3 className="care-title">
                  {item.title}
                </h3>
                <p className="care-description">{item.desc}</p>
                {item.title === 'Nutrition' && (
                  <div className="click-hint">Click to learn more →</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-container">
          <h2 className="section-title">
            Cat Gallery
          </h2>
          
          <div className="gallery-grid">
            {['😺', '😸', '😹', '😻', '🙀', '😿', '😾', '🐱'].map((cat, index) => (
              <div key={index} className="gallery-item">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="contact-title">
            Get in Touch
          </h2>
          <p className="contact-subtitle">
            Have questions about cats? We'd love to hear from you!
          </p>
          
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>info@purrfectcats.com</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <h3>Phone</h3>
              <p>+1 (555) MEOW-CAT</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <h3>Location</h3>
              <p>Cat Paradise City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            🐾 Made with ❤️ for cat lovers everywhere
          </p>
          <p className="footer-copyright">
            © 2025 Purrfect Cats. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;