"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUp, ArrowUpRight, Check,
  ChevronRight, Code2, Copy, ExternalLink, Globe2, Layers3, Linkedin,
  Mail, MapPin, Menu, Monitor, Play, Radio, Smartphone, Sparkles, X,
} from "lucide-react";

type Project = {
  id: string; number: string; name: string; category: string; description: string;
  image: string; imageAlt?: string; imageFrame?: "portrait"; screenshot?: boolean; color: string; tags: string[]; platforms: string[]; highlight: string;
  summary: string; features: string[]; stack: string[];
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
};

const projects: Project[] = [
  {
    id: "reader", number: "01", name: "Visualible Reader", category: "READING, WITHOUT LIMITS",
    description: "One reading experience. Every screen. Even offline.", image: "/assets/visualible-reader.png", color: "navy",
    imageAlt: "Visualible Reader book store with search, filters, and a grid of MeBook covers.", screenshot: true,
    tags: ["React Native", "Next.js", "SQLite"], platforms: ["mobile", "web"], highlight: "MOBILE · TABLET · WEB · DESKTOP",
    summary: "A cross-platform reading ecosystem that makes a reader’s library feel at home on mobile, tablet, web, Windows, and macOS.",
    features: ["Built and maintained a consistent reading experience across the React Native apps, Next.js website, and desktop applications.", "Implemented offline book downloads, local file handling, and SQLite-based storage so books stay accessible without a connection.", "Added an offline dictionary to help readers stay immersed while disconnected.", "Supported production releases and submissions across Google Play, App Store, Microsoft Store, and Mac App Store."],
    stack: ["React Native", "Next.js", "SQLite", "Local storage", "Windows", "macOS"],
  },
  {
    id: "livescore", number: "02", name: "LiveScorebyKickScore", category: "CLOSER TO THE GAME",
    description: "Real-time scores. Real communities. 50k users.", image: "/assets/kickscore.png", color: "navy",
    imageAlt: "KickScore fantasy football screen showing a team lineup on the pitch beneath the Build Dream Team heading.", imageFrame: "portrait", screenshot: true,
    tags: ["React Native", "Expo", "Firebase"], platforms: ["mobile", "web"], highlight: "50k ANDROID USERS",
    summary: "A live sports and entertainment app bringing football and basketball updates, personalised feeds, and fan communities together. Built as the sole developer.",
    features: ["Shipped to 50k Android and 100+ iOS users, reaching the Android milestone organically with zero paid acquisition.", "Delivered real-time scores using optimised API polling and efficient Redux Toolkit state management.", "Built follow relationships, personalised feeds, and club-based communities.", "Implemented one-to-one, group, and club chat with Firebase and FCM notifications, plus Firebase Analytics and AdMob monetisation."],
    stack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Firebase", "AdMob"],
  },
  {
    id: "veels", number: "03", name: "Veels", category: "PRESS PLAY ON POSSIBILITY",
    description: "An entire world of entertainment, in your pocket.", image: "/assets/veels.png", color: "black",
    imageAlt: "Three Veels mobile screens showing the web series library, home feed, and episode details.", screenshot: true,
    tags: ["React Native", "Agora", "AWS IVS"], platforms: ["mobile"], highlight: "STREAMING · PAYMENTS · LIVE",
    summary: "A full-featured OTT streaming app built from scratch for movies, web series, music, podcasts, and short-form video on Android and iOS.",
    features: ["Engineered a dual live-streaming architecture with low-latency Agora streams and scalable external broadcasting through AWS IVS.", "Built virtual gifting, Stripe bank integration, coin redemption, and native in-app purchases for premium content.", "Improved content delivery through media loading and caching optimisations.", "Owned development, QA, store submission, and deployment across Google Play and the App Store."],
    stack: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Agora SDK", "AWS IVS", "Stripe", "In-App Purchases"],
  },
  {
    id: "career", number: "04", name: "IIT Abu Dhabi Career Platform", category: "CONNECTING WHAT’S NEXT",
    description: "A shared space for careers, connections, and opportunity.", image: "/assets/iit-abu-dhabi.png", color: "blue",
    imageAlt: "IIT Abu Dhabi home feed showing an internship opportunity, profile completion, career tools, and suggested connections.", screenshot: true,
    gallery: [{ src: "/assets/iit-abu-dhabi-profile.png", alt: "IIT Abu Dhabi support profile with follow and connect buttons, career tools, and suggested connections.", caption: "Profile and connections", width: 1744, height: 923 }],
    tags: ["Next.js", "TypeScript", "Firebase"], platforms: ["web"], highlight: "CAREERS · COMMUNITY · CONNECTIONS",
    summary: "A career and community platform connecting students, recruiters, and administrators. Contributed to the full-stack platform and its communication features.",
    features: ["Contributed to a full-stack career platform built with Next.js, React, and TypeScript.", "Implemented Firebase Realtime Database chat and FCM push notifications, sharing messaging patterns with the mobile apps.", "Integrated Firebase Auth with role-based access for students, recruiters, and admins.", "Used JWT session management to support authenticated platform experiences."],
    stack: ["Next.js", "React", "TypeScript", "Firebase", "OpenAI API", "Tailwind CSS"],
  },
];

const skills = [
  { number: "01", name: "Mobile, made native.", description: "Smooth experiences on the screens people use most.", icon: Smartphone, tags: ["React Native", "Expo", "TypeScript", "React Navigation", "Redux Toolkit", "Zustand"] },
  { number: "02", name: "Beyond the small screen.", description: "Thoughtful web and desktop experiences that scale.", icon: Monitor, tags: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Windows & macOS"] },
  { number: "03", name: "The power underneath.", description: "Connected, real-time, and ready to work offline.", icon: Layers3, tags: ["Firebase", "Node.js", "REST APIs", "WebSockets", "SQLite", "React Query"] },
  { number: "04", name: "From build to launch.", description: "The details that turn working code into shipped products.", icon: Radio, tags: ["Git & GitHub Actions", "Xcode", "Android Studio", "Stripe", "Agora & AWS IVS", "Store releases"] },
];

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        node.textContent = `${Math.round(value * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, suffix]);
  return <span ref={ref}>{value}{suffix}</span>;
}

function HeroVisual() {
  return (
    <div className="hero-art" aria-label="Illustrative mobile app interfaces for a sports app and an offline reader" role="img">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="art-cross cross-one">+</div><div className="art-cross cross-two">+</div>
      <div className="phone phone-reader">
        <div className="phone-status"><span>9:41</span><span>▮▮▮ ▰</span></div>
        <div className="phone-camera" />
        <div className="reader-brand"><span className="reader-symbol">v.</span><span>visualible</span><Menu size={14} /></div>
        <div className="reader-greeting">A little escape,<br /><strong>a whole new world.</strong></div>
        <div className="book-art"><div className="book-sun" /><div className="book-hill hill-one" /><div className="book-hill hill-two" /><span>THE ART<br />OF SLOW<br /><i>LIVING</i></span><small>A LITTLE SPACE TO BREATHE</small></div>
        <div className="reader-book-title">The art of slow living</div>
        <div className="reading-progress"><span /></div>
        <div className="reader-progress-label"><span>Continue reading</span><span>68%</span></div>
        <div className="reader-bottom"><span>⌂<small>Home</small></span><span>▤<small>My library</small></span><span>⌕<small>Explore</small></span></div>
      </div>
      <div className="phone phone-score">
        <div className="phone-status"><span>9:41</span><span>▮▮▮ ▰</span></div>
        <div className="phone-camera" />
        <div className="score-brand"><span className="score-mark">k<span>⚡</span></span><span>kickscore<span className="score-brand-dot">.</span></span><div className="mini-avatar">P</div></div>
        <div className="score-greeting">For the love<br /><strong>of the game.</strong><span>YOUR DAILY DOSE OF SPORT</span></div>
        <div className="sport-tabs"><span className="sport-selected">⚽ Football</span><span>🏀 Basketball</span></div>
        <div className="match-card"><div className="match-top"><span>CHAMPIONS LEAGUE</span><span className="live-pill"><i />LIVE</span></div><div className="match-score"><span className="team-badge badge-blue">M</span><strong>2 <span>:</span> 1</strong><span className="team-badge badge-red">A</span></div><div className="team-names"><span>Manchester</span><span>67′</span><span>Arsenal</span></div><div className="match-line"><span /></div></div>
        <div className="score-feed-heading"><span>Your community</span><ArrowUpRight size={12} /></div>
        <div className="score-community"><div className="community-avatars"><i>J</i><i>A</i><i>R</i></div><span>Big game. Bigger conversations.<small>Join your club’s conversation →</small></span></div>
        <div className="score-bottom"><span><Globe2 size={15} /><small>Discover</small></span><span><Radio size={15} /><small>Live</small></span><span><Layers3 size={15} /><small>Clubs</small></span></div>
      </div>
      <div className="float-badge users-badge"><span className="badge-icon"><Sparkles size={18} /></span><div><strong>50k</strong><span>users and counting</span></div><span className="mini-chart">▂▃▅▆▇</span></div>
      <div className="float-badge platform-badge"><div className="platform-symbol"><Code2 size={17} /></div><div><strong>One codebase.</strong><span>Endless possibilities.</span></div></div>
      <span className="art-caption">A FEW PIXELS. A LOT OF POSSIBILITY.</span>
    </div>
  );
}

function ProjectImage({ project }: { project: Project }) {
  const image = <img src={project.image} width="720" height="500" alt={project.imageAlt ?? `${project.name} conceptual interface illustration`} loading="lazy" />;
  return project.imageFrame === "portrait" ? <span className="project-portrait">{image}</span> : image;
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const prior = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; dialog?.close(); prior?.focus(); };
  }, []);
  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dialog-inner">
        <button ref={closeRef} className="dialog-close icon-button" onClick={onClose} aria-label="Close project details"><X size={22} /></button>
        <div className={`dialog-image ${project.color}${project.screenshot ? " project-screenshot" : ""}`}><ProjectImage project={project} /></div>
        <div className="dialog-copy"><span className="eyebrow">PROJECT {project.number} / {project.category}</span><h2 id="project-title">{project.name}</h2><p className="dialog-summary">{project.summary}</p><h3>What I worked on</h3><ul>{project.features.map(feature => <li key={feature}><Check size={16} /><span>{feature}</span></li>)}</ul><h3>Built with</h3><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{project.gallery && <div className="project-gallery">{project.gallery.map(image => <figure key={image.src}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}</div>}{!project.screenshot && <p className="illustration-note">Interface illustrations are conceptual; project details are based on my production work.</p>}<a className="button button-dark" href={`mailto:pramodchakraworty618@gmail.com?subject=${encodeURIComponent(`Let’s talk about ${project.name}`)}`}>Let’s talk about this project<ArrowUpRight size={17} /></a></div>
      </div>
    </dialog>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [filter, setFilter] = useState("all");
  const [project, setProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => { clearInterval(interval); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.setAttribute("data-revealed", "true"); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuRef.current?.focus(); } };
    const handleOutside = (event: MouseEvent) => { if (!(event.target as HTMLElement).closest(".site-header")) setMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("click", handleOutside);
    return () => { document.removeEventListener("keydown", handleKey); document.removeEventListener("click", handleOutside); };
  }, [menuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("pramodchakraworty618@gmail.com");
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch { window.location.href = "mailto:pramodchakraworty618@gmail.com"; }
  };
  const visibleProjects = projects.filter(item => filter === "all" || item.platforms.includes(filter));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap container">
          {/* <a className="brand" href="#home" aria-label="Pramod Chakraworty home">pramod<span className="brand-dot">.</span><span className="brand-label">DEVELOPER & BUILDER</span></a> */}
          <nav id="main-navigation" className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            {[{ id: "work", label: "Work" }, { id: "about", label: "About" }, { id: "skills", label: "Toolkit" }, { id: "experience", label: "Experience" }].map(item => <a key={item.id} className={activeSection === item.id ? "active" : ""} aria-current={activeSection === item.id ? "location" : undefined} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a>
          </nav>
          <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
          <button ref={menuRef} className="menu-button icon-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <div className="intro-label"><span className="status-dot" />HELLO, I’M PRAMOD CHAKRAWORTY</div>
            <h1>Thoughtful code.<br />Real-world<br /><em>impact.</em><span className="headline-spark" aria-hidden="true">✳</span></h1>
            <p className="hero-description">I turn ideas into experiences people love.<br className="desktop-br" /> React Native & Next.js developer building for<br className="desktop-br" /> mobile, web, and everything in between.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDown size={17} /></a><a className="text-link resume-link" href="/Pramod_Chakraworty_Resume.pdf" download>Download résumé <ArrowDownToLine size={16} /></a></div>
            <div className="hero-location"><MapPin size={14} /><span>Indore, India</span><span className="location-divider" /><span>Building beyond boundaries</span></div>
          </div>
          <HeroVisual />
          <div className="hero-bottom"><a href="#work" className="scroll-note"><span><ArrowDown size={14} /></span>SCROLL TO EXPLORE</a><span className="hero-bottom-note">GOOD EXPERIENCES START WITH GOOD INTENTIONS.</span></div>
        </section>

        <div className="toolkit-strip" aria-label="Core technologies: React Native, Next.js, TypeScript, Expo, Firebase, and Redux">
          <div className="container strip-inner"><span className="strip-label">IDEAS, BUILT WITH</span><div className="strip-track-mask"><div className="strip-track">{[0, 1].map(copy => <div className="strip-set" key={copy} aria-hidden={copy === 1}>{[{ name: "React Native", glyph: "⚛" }, { name: "Next.js", glyph: "N" }, { name: "TypeScript", glyph: "TS" }, { name: "Expo", glyph: "Λ" }, { name: "Firebase", glyph: "♨" }, { name: "Redux", glyph: "◉" }].map(tech => <span className="strip-tech" key={tech.name}><b className={tech.name === "TypeScript" ? "ts-glyph" : ""}>{tech.glyph}</b>{tech.name}<i>✳</i></span>)}</div>)}</div></div></div>
        </div>

        <section id="work" className="work-section section-space container">
          <div className="section-heading" data-reveal><div><span className="eyebrow"><span className="tiny-dot" />SELECTED WORK / 01</span><h2>Built with care.<br /><em>Used in the real world.</em></h2></div><p>From the first line of code to the app store.<br />A few things I’ve helped bring to life.</p></div>
          <div className="work-toolbar" data-reveal><div className="project-filters" role="group" aria-label="Filter projects">{[{ id: "all", label: "All work", count: "04" }, { id: "mobile", label: "Mobile apps", count: "03" }, { id: "web", label: "Web & desktop", count: "03" }].map(item => <button key={item.id} className={filter === item.id ? "selected" : ""} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}<span>{item.count}</span></button>)}</div><span className="work-note"><span />SHIPPED, NOT JUST SIDE PROJECTS</span></div>
          <div className="project-grid" aria-live="polite">{visibleProjects.map((item, index) => <article key={item.id} className="project-card" data-reveal style={{ "--reveal-delay": `${index % 2 * 90}ms` } as React.CSSProperties}><button className={`project-art ${item.color}${item.screenshot ? " project-screenshot" : ""}`} onClick={() => setProject(item)} aria-label={`Explore ${item.name}`}><span className="project-number">/{item.number}</span><span className="project-highlight">{item.highlight}</span><ProjectImage project={item} /><span className="project-view">Explore project <ArrowUpRight size={17} /></span></button><div className="project-info"><div><span className="project-category">{item.category}</span><h3><button onClick={() => setProject(item)}>{item.name}</button></h3></div><button className="project-arrow icon-button" onClick={() => setProject(item)} aria-label={`Read about ${item.name}`}><ArrowUpRight size={24} /></button></div><p className="project-description">{item.description}</p><div className="tags project-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          <p className="project-footnote">A selection of production work.</p>
        </section>

        <section id="about" className="about-section">
          <div className="container about-grid">
            <div className="about-intro" data-reveal><span className="eyebrow"><span className="tiny-dot" />THE PERSON BEHIND THE PIXELS / 02</span><h2>Curious by nature.<br /><em>Developer by craft.</em></h2><div className="about-signature"><span>Pramod.</span><ArrowUpRight size={26} /></div><div className="about-location"><MapPin size={15} />BASED IN INDORE, INDIA</div></div>
            <div className="about-copy" data-reveal><p className="about-lead">I like making complex things<br className="desktop-br" /> feel <span>effortlessly simple.</span></p><p>I’m Pramod, a software developer working at Ideal IT Techno. I build across mobile, tablet, web, and desktop, with React Native and Next.js at the heart of my toolkit.</p><p>My work lives in the details: a book that opens without internet, a live score that arrives at the right moment, a video that just plays. I care about how the whole experience comes together, from architecture to the final store release.</p><p>With 1.6 years of production experience, I’ve owned products end to end, shipped across four app stores, and built apps that have reached more than 20,000 people.</p><a className="text-link" href="/Pramod_Chakraworty_Resume.pdf" download>A little more about my journey <ArrowDownToLine size={16} /></a></div>
            <div className="stats-row" data-reveal><div><strong><CountUp value={20} suffix="K+" /></strong><span>People using what I build</span></div><div><strong><CountUp value={4} /></strong><span>App stores shipped to</span></div><div><strong><CountUp value={3} /></strong><span>Production mobile apps owned</span></div><div className="stats-note"><Sparkles size={22} /><span>Small details.<br /><strong>Meaningful impact.</strong></span></div></div>
          </div>
        </section>

        <section id="skills" className="skills-section section-space container">
          <div className="section-heading" data-reveal><div><span className="eyebrow"><span className="tiny-dot" />MY TOOLKIT / 03</span><h2>The right tools.<br /><em>A builder’s mindset.</em></h2></div><p>Different platforms. The same attention to detail.<br />Here’s what I bring to the build.</p></div>
          <div className="skills-list">{skills.map(skill => <div className="skill-row" key={skill.number} data-reveal><span className="skill-number">{skill.number}</span><div className="skill-icon"><skill.icon size={24} strokeWidth={1.5} /></div><div className="skill-description"><h3>{skill.name}</h3><p>{skill.description}</p></div><div className="tags skill-tags">{skill.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>)}</div>
        </section>

        <section id="experience" className="experience-section">
          <div className="container experience-grid">
            <div className="experience-heading" data-reveal><span className="eyebrow"><span className="tiny-dot" />THE JOURNEY SO FAR / 04</span><h2>Learning.<br />Building.<br /><em>Shipping.</em></h2><p>Every release is a lesson.<br />Every challenge, a chance to grow.</p><a className="button button-outline-light" href="/Pramod_Chakraworty_Resume.pdf" download>Get the full résumé <ArrowDownToLine size={16} /></a></div>
            <div className="timeline">
              <article className="timeline-item" data-reveal><div className="timeline-marker"><span /></div><div className="timeline-top"><span className="timeline-label">PROFESSIONAL EXPERIENCE</span><span className="experience-pill">1.6 years</span></div><h3>Software Developer</h3><p className="company">Ideal IT Techno Pvt. Ltd. <ArrowUpRight size={15} /></p><span className="timeline-location">Indore, India · On-site</span><p className="timeline-text">Building production apps with React Native & Next.js, taking ownership from the first architectural decision to release day.</p><ul className="experience-points"><li><ChevronRight size={15} />Shipped apps reaching 50k active users.</li><li><ChevronRight size={15} />Built offline readers, real-time chat, and streaming.</li><li><ChevronRight size={15} />Owned releases across four app stores.</li><li><ChevronRight size={15} />Led end-to-end delivery of 3 mobile apps concurrently.</li></ul><div className="tags dark-tags"><span>React Native</span><span>Next.js</span><span>TypeScript</span><span>Firebase</span></div></article>
              <article className="timeline-item education-item" data-reveal><div className="timeline-marker"><span /></div><div className="timeline-top"><span className="timeline-label">WHERE IT STARTED</span><span className="education-date">2019 — 2023</span></div><h3>B.Tech, Information Technology</h3><p className="company">University Institute of Technology, RGPV</p><span className="timeline-location">Indore, India · July 2019 – June 2023</span></article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="contact-top" data-reveal><span className="eyebrow"><span className="tiny-dot" />GOOD THINGS START WITH A CONVERSATION</span><span className="contact-spark" aria-hidden="true">✳</span></div>
          <div className="contact-main" data-reveal><h2>Have something<br />in mind? <em>Let’s build it.</em></h2><a className="contact-arrow" href="mailto:pramodchakraworty618@gmail.com" aria-label="Email Pramod to start a conversation"><ArrowUpRight size={68} strokeWidth={1.2} /></a></div>
          <div className="contact-bottom" data-reveal><div><p className="contact-description">A new idea, an interesting opportunity, or just a hello.<br />I’d love to hear from you.</p><div className="email-row"><a href="mailto:pramodchakraworty618@gmail.com">pramodchakraworty618@gmail.com</a><button className="copy-button icon-button" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>{copied ? <Check size={17} /> : <Copy size={17} />}</button><span className="copy-status" role="status">{copied ? "Copied!" : ""}</span></div></div><div className="contact-links"><a href="https://www.linkedin.com/in/pramodchakraworty077" target="_blank" rel="noopener noreferrer"><Linkedin size={17} />LinkedIn<ArrowUpRight size={16} /></a><a href="tel:+917987311094"><Smartphone size={17} />+91 79873 11094<ArrowUpRight size={16} /></a></div></div>
        </section>
      </main>

      <footer className="site-footer container"><a className="footer-brand" href="#home">Pramod Chakraworty<span>.</span></a><p>Made with intention. Built with Next.js.<br className="mobile-br" /> © {new Date().getFullYear()} Pramod Chakraworty</p><span className="footer-time"><span className="status-dot" />{time ? `${time} IST` : "INDORE, INDIA"}</span><a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={17} /></a></footer>
      {project && <ProjectDialog project={project} onClose={() => setProject(null)} />}
    </>
  );
}
