import React, { useEffect, useState } from 'react';
import './land.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrSearch } from 'react-icons/gr'; // Correct import statement
import { Link } from 'react-router-dom';


function Land() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Bootstrap Offcanvas Navbar */}
      <Navbar
        className={`navbar navbar-inverse navbar-dark navbar-expand-lg fixed-top ${
          isSticky ? 'sticky' : ''
        }`}
      >
        <Container fluid className="navbar-inner">
          <Navbar.Brand className="navbar-brand logo001" href="#"></Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`offcanvas offcanvas-end F ${
              isSticky ? 'sticky' : ''
            }`}
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">
                <span className="logo005">Tez</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"/agencys"} className="nav-link" href="#about">
                    All Agenceies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/alert"} className="nav-link" href="#SPONSORED">
                    Alert window
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#PARTNER">
                    Sponsor Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Home section */}
      <section className="home" id="home">
        <div className="max-width">
          <div className="home-content">
            <div className="committeeBanner-container1">
              <span className="logo">Tez</span>
              <div className="line2"></div>
              <h1>Resque Agency Ainder</h1>
            </div>
            <div className="text-2">Connect with <span> Us.</span> <br /></div>
            <div className="text-3">
              Questions/information about the MUN:
              <a href="#">support@Tez.in</a>
            </div>
          </div>
          <div className="colored-cover"></div>
        </div>
      </section>

      {/* Who Are We section */}
      <section className="who-are-we">
        <h2>Who Are We?</h2>
        <p>We are a dedicated team of professionals passionate about making a positive impact on our community. Our mission is to...</p>
        <p>At [Your Company Name], we believe in...</p>
        {/* Add more content as needed */}
      </section>

      {/* Features section */}
      <section className="features">
        <div className="feature">
          <i className="GrSearch"></i>
          <h2>Find Nearby Rescue Agencies</h2>
          <p>Quickly locate and connect with rescue agencies in your area.</p>
        </div>
        <div className="feature">
          <i className="fas fa-phone"></i>
          <h2>Emergency Contact</h2>
          <p>Get immediate assistance by contacting emergency services.</p>
        </div>
        <div className="feature">
          <i className="fas fa-hands-helping"></i>
          <h2>Assistance and Support</h2>
          <p>We're here to assist you and provide support during emergencies.</p>
        </div>
      </section>

      {/* Call to Action section */}
      <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Contact us now for immediate assistance.</p>
        <a href="contact.html" className="btn">Contact Us</a>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container1">
          <div className="container1-i1">
            <span className="logo001">Tez</span>
            <div className="line1"></div>
            <h1>Rescue Agency Finder</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, omnis
            eos aperiam eius dicta ea libero nostrum illo! Fugiat, officia!
          </p>
          <button className="registerBtn btn-2 hover-slide-right">
            <span>CONTACT US</span>
          </button>
          <p>&copy;Tez.in 2023 All rights reserved</p>
        </div>

        <div className="footer-container2"></div>
      </footer>
    </div>
  );
}

export default Land;
