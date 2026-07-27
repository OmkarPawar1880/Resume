import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Button from "/src/User/Components/Common/Button";
import Card from "/src/User/Components/Common/Card";

import "./Landing.css";

gsap.registerPlugin(ScrollTrigger);

// ==========================================================
// Static Data
// ==========================================================

const features = [
    {
        title: "ATS-Friendly Templates",
        description:
            "Create resumes optimized for Applicant Tracking Systems to increase your interview chances.",
    },
    {
        title: "Live Resume Preview",
        description:
            "See every change instantly with a real-time professional resume preview.",
    },
    {
        title: "One-Click PDF Download",
        description:
            "Generate high-quality PDF resumes with a single click.",
    },
    {
        title: "Easy Customization",
        description:
            "Edit personal details, education, experience, skills, and projects effortlessly.",
    },
    {
        title: "Professional Templates",
        description:
            "Choose from multiple modern and recruiter-approved resume templates.",
    },
    {
        title: "Secure Data Storage",
        description:
            "Your resume information is securely stored and available whenever you need it.",
    },
];

const templateList = [
    {
        id: 1,
        name: "Modern",
        description: "Clean and ATS-friendly professional resume.",
        image: "/src/assets/Templates/Modern Template - Copy.png",
    },
    {
        id: 2,
        name: "Classic",
        description: "Traditional layout suitable for all industries.",
        image: "/src/assets/Templates/Classic Resume Template - Copy.png",
    },
    {
        id: 3,
        name: "Creative",
        description: "Stylish design for designers and creative roles.",
        image: "/src/assets/Templates/Creative Resume Template - Copy.png",
    },
];

const testimonials = [
    {
        name: "Ananya Sharma",
        role: "Software Engineer",
        quote:
            "I landed three interviews in a week after switching to a resume built here. The ATS score checker made all the difference.",
    },
    {
        name: "Rohit Verma",
        role: "Marketing Lead",
        quote:
            "The live preview saved me so much time. I could see exactly how recruiters would see my resume as I typed.",
    },
    {
        name: "Priya Nair",
        role: "UX Designer",
        quote:
            "Clean templates, simple editing, instant PDF export. Everything I needed in one place.",
    },
];

const steps = [
    {
        number: "01",
        title: "Choose a Template",
        description: "Pick a professional, recruiter-approved layout.",
    },
    {
        number: "02",
        title: "Fill in Your Details",
        description: "Add your experience, education, and skills.",
    },
    {
        number: "03",
        title: "Download & Apply",
        description: "Export your resume as a PDF and start applying.",
    },
];

// ==========================================================
// Landing Page — Black & White Edition
// ==========================================================
const Landing = () => {

    const heroRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroImageRef = useRef(null);

    useEffect(() => {

        const ctx = gsap.context(() => {

            // ---- Hero entrance ----
            gsap.fromTo(
                heroContentRef.current.querySelectorAll(".animate-in"),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                heroImageRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: "power3.out" }
            );

            gsap.to(heroImageRef.current, {
                y: -12,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.2,
            });

            // ---- Generic scroll-reveal for every section ----
            const revealGroups = gsap.utils.toArray(".reveal-group");

            revealGroups.forEach((group) => {
                gsap.fromTo(
                    group.children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: group,
                            start: "top 85%",
                        },
                    }
                );
            });

        }, heroRef);

        return () => ctx.revert();

    }, []);

    return (
        <div className="landing">

            {/* ==========================================================
                Navbar
            ========================================================== */}

            <header className="navbar">

                <div className="navbar-logo">CreateResume</div>

                <nav className="navbar-links">
                    <a href="#features">Features</a>
                    <a href="#templates">Templates</a>
                    <a href="#testimonials">Reviews</a>
                </nav>

                <div className="navbar-actions">
                    <Link to="/login">
                        <Button variant="secondary" size="medium">
                            Log In
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="medium">
                            Get Started
                        </Button>
                    </Link>
                </div>

            </header>

            {/* ==========================================================
                Hero
            ========================================================== */}

            <section className="hero" ref={heroRef}>

                <div className="hero-content" ref={heroContentRef}>

                    <span className="hero-badge animate-in">
                        ATS-Friendly Resume Builder
                    </span>

                    <h1 className="animate-in">
                        Build a Resume That
                        <span> Stands Out</span>
                    </h1>

                    <p className="animate-in">
                        Craft clean, recruiter-approved resumes with a live
                        preview, multiple layouts, instant PDF export, and
                        built-in ATS optimization.
                    </p>

                    <div className="hero-buttons animate-in">
                        <Link to="/register">
                            <Button size="large">Get Started</Button>
                        </Link>
                        <Button variant="secondary" size="large">
                            Browse Templates
                        </Button>
                    </div>

                    <div className="hero-stats animate-in">
                        <div>
                            <h2>20+</h2>
                            <p>Templates</p>
                        </div>
                        <div>
                            <h2>95%</h2>
                            <p>ATS Score</p>
                        </div>
                        <div>
                            <h2>1000+</h2>
                            <p>Downloads</p>
                        </div>
                    </div>

                </div>

                <div className="hero-image" ref={heroImageRef}>
                    <div className="resume-preview">
                        <div className="Hero-resume-header"></div>
                        <div className="resume-line"></div>
                        <div className="resume-line"></div>
                        <div className="resume-line short"></div>
                        <div className="resume-section"></div>
                        <div className="resume-line"></div>
                        <div className="resume-line"></div>
                        <div className="resume-line short"></div>
                    </div>
                </div>

            </section>

            {/* ==========================================================
                Features
            ========================================================== */}

            <section className="features" id="features">

                <div className="section-header reveal-group">
                    <h2>Everything You Need to Build the Perfect Resume</h2>
                    <p>
                        Powerful tools that help students, professionals, and
                        job seekers create impressive resumes quickly.
                    </p>
                </div>

                <div className="features-grid reveal-group">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            title={feature.title}
                            className="feature-card"
                        >
                            <p>{feature.description}</p>
                        </Card>
                    ))}
                </div>

            </section>

            {/* ==========================================================
                How It Works
            ========================================================== */}

            <section className="how-it-works">

                <div className="section-header reveal-group">
                    <h2>How It Works</h2>
                    <p>Three simple steps to your next opportunity.</p>
                </div>

                <div className="steps-grid reveal-group">
                    {steps.map((step) => (
                        <div className="step-card" key={step.number}>
                            <span className="step-number">{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>

            </section>

            {/* ==========================================================
                Templates
            ========================================================== */}

            <section className="templates" id="templates">

                <div className="section-header reveal-group">
                    <h2>Professional Resume Templates</h2>
                    <p>
                        Choose from beautifully designed, recruiter-approved
                        resume templates.
                    </p>
                </div>

                <div className="templates-grid reveal-group">
                    {templateList.map((template) => (
                        <Card key={template.id} className="template-card">
                            <div className="template-image-wrap">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="template-image"
                                />
                            </div>
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <Button>Use Template</Button>
                        </Card>
                    ))}
                </div>

            </section>

            {/* ==========================================================
                Testimonials
            ========================================================== */}

            <section className="testimonials" id="testimonials">

                <div className="section-header reveal-group">
                    <h2>Trusted by Job Seekers Everywhere</h2>
                    <p>Real stories from people who found their next role.</p>
                </div>

                <div className="testimonials-grid reveal-group">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="testimonial-card">
                            <p className="testimonial-quote">
                                "{testimonial.quote}"
                            </p>
                            <div className="testimonial-author">
                                <span className="testimonial-name">
                                    {testimonial.name}
                                </span>
                                <span className="testimonial-role">
                                    {testimonial.role}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

            </section>

            {/* ==========================================================
                Call To Action
            ========================================================== */}

            <section className="cta reveal-group">
                <h2>Ready to Build Your Resume?</h2>
                <p>
                    Join thousands of job seekers who created a
                    professional, ATS-friendly resume in minutes.
                </p>
                <Link to="/register">
                    <Button size="large">Create Your Resume Now</Button>
                </Link>
            </section>

            {/* ==========================================================
                Footer
            ========================================================== */}

            <footer className="footer">

                <div className="footer-top">

                    <div className="footer-brand">
                        <h3>CreateResume</h3>
                        <p>Build professional resumes in minutes.</p>
                    </div>

                    <div className="footer-links">
                        <div>
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#templates">Templates</a>
                            <a href="#testimonials">Reviews</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Contact</a>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} CreateResume. All rights reserved.</p>
                </div>

            </footer>

        </div>
    );

};

export default Landing;
