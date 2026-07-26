import React, { useEffect, useRef } from "react";
import gsap from "gsap";


const Header = () => {
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      navRef.current.children,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      "-=0.4"
    );
  }, []);

  return (
    <header className="header">
      <div className="logo" ref={logoRef}>
        CreateResume
      </div>

      <nav className="nav" ref={navRef}>
        <a href="#home">Home</a>
        <a href="#templates">Templates</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <button className="cta-btn">Get Started</button>
    </header>
  );
};

export default Header;