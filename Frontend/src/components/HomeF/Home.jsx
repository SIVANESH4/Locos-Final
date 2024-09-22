import React from "react";
import heroimg from "../../assets/heroimg1.png";
import { Link } from "react-router-dom";
import "./Home.css";
export const Home = () => {
  const services = [
    { name: "Electrical", description: "Reliable electrical services for installations and repairs." },
    { name: "Plumbing", description: "Expert plumbing services for residential and commercial needs." },
    { name: "Installation", description: "Professional installation services for all types of equipment." },
    { name: "Maintenance", description: "Regular maintenance services to keep your equipment running smoothly." },
    { name: "Television", description: "Television repair and installation services." },
    { name: "System", description: "Computer system repair and maintenance services." },
    { name: "AC", description: "Air conditioning installation and repair services." },
    { name: "RO", description: "RO water purifier installation and maintenance services." },
    { name: "Washing Machine", description: "Washing machine repair and maintenance services." },
    { name: "Refrigerator", description: "Refrigerator repair and maintenance services." },
    { name: "Microwave Oven", description:"Microwave Oven repair and maintenance services."},
    {name: "Cleaning",description:"Professional cleaning services for homes and offices."},
  ]
  return (
    <>
      <div id="home"className="home-page">
        <h3>LOCOS</h3>
        <section className="hero">
          <h1>
            Find the <span>Best Technicians</span>
          </h1>
          <h1>for Your Needs</h1>
          <p>
            Connect with local professionals for plumbing, electrical work,<br />
            cleaning, and more
          </p>
          <Link to='/admin'><button className="btn btn-dark">Get Started &rarr; </button></Link>
        </section>
        <section className="contact">
          <h5>Contact us</h5>
          <ul>
            <li>
              Email : support@locos.com
            </li>
            <li>Phone : 123456789</li>
          </ul>
          <ul className="social-media">
            <li>
              <i class="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i class="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i class="fa-brands fa-x-twitter"></i>
            </li>
            <li>
              <i class="fa-brands fa-linkedin-in"></i>
            </li>
          </ul>
        </section>
      </div>
      <div className="circle1"></div>

      <div className="white-space">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services-page">Services</a></li>
            <li><Link to='/signup' className="hs-link">Work with us</Link></li>
            <li><a href="#footer">About us</a></li>
            <Link to='/login'><button className="btn btn-dark">Login</button></Link>
          </ul>
        </nav>
        <img src={heroimg} alt="" />
      </div>
      <section className="benefit-section">
        <h2>Why Choose Us?</h2>
        <div className="cards-section">
          <div  className="cards">
            <i class="fa-solid fa-lock"></i>
            <h3>Secure Payments</h3>
            <p>
              Our platform ensures secure transactions with trusted payment
              gateways, protecting both freelancers and clients.
            </p>
          </div>
          <div  className="cards">
            <i class="fa-solid fa-user-tie"></i>
            <h3>Verified Professionals</h3>
            <p>
              We rigorously vet our freelancers to ensure you work with
              qualified and reliable professionals.
            </p>
          </div>
          <div  className="cards">
            <i class="fa-solid fa-ranking-star"></i>
            <h3>Quality Talent</h3>
            <p>
              Access a diverse pool of skilled freelancers with a range of
              expertise to meet your project needs.
            </p>
          </div>
          <div  className="cards">
            <i class="fa-solid fa-user-clock"></i>
            <h3>24/7 Support</h3>
            <p>
              Our dedicated support team is available around the clock to assist
              with any queries or issues.
            </p>
          </div>
          <div  className="cards">
            <i class="fa-solid fa-phone-volume"></i>
            <h3>Easy Communication</h3>
            <p>
              Seamlessly communicate with freelancers and clients through our
              integrated messaging system.
            </p>
          </div>
          <div  className="cards">
            <i class="fa-solid fa-comments"></i>
            <h3>Transparent Reviews</h3>
            <p>
              Read honest reviews and ratings from previous clients and
              freelancers to make informed decisions.
            </p>
          </div>
        </div>
      </section>
      <div id="services-page">
        <h1>Our Services</h1>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <Link to="/login"><button>Book Now</button></Link>
            </div>
          ))}
        </div>
      </div>
      <footer id="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              We are dedicated to connecting talented freelancers with clients
              seeking top-notch services. Our platform ensures a seamless
              experience for both freelancers and clients through a secure and
              user-friendly environment
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
             <Link to="/">  <li>
                <a href="#">Home</a>
              </li></Link>
              <li>
                <a href="#footer">About</a>
              </li>
              <li>
                <a href="#services-page">Services</a>
              </li>
              <li>
                <a href="#footer">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>
                Email: <a href="mailto:support@locos.com">support@locos.com</a>
              </li>
              <li>Phone: 123456789</li>
              <li>Address: 123 kk nagar, Madurai, India</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul className="social-media">
              <li>
                <a href="#" aria-label="Facebook">
                  <i class="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter">
                <i class="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Locos. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};
