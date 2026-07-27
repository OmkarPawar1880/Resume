import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      heroRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current.children,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.5,
        },
        "-=0.3"
      );
  }, heroRef);

  return () => ctx.revert();
}, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 ref={titleRef}>
          Build Job-Winning Resumes with <span>AI Precision</span>
        </h1>

        <p ref={subtitleRef}>
          Create professional, ATS-friendly resumes in minutes using AI-powered
          tools designed to help you stand out and get hired faster.
        </p>

        <div className="hero-buttons" ref={buttonsRef}>
          <button className="btn-primary">Create Your Resume</button>
          <button className="btn-secondary">Build with Templates</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
