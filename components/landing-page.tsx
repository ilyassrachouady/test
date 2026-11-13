"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  Mail,
  Menu,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { faqs, services, site, testimonials } from "@/lib/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <a aria-label="KlinUp homepage" href="#top" className={`brand ${inverted ? "brand-invert" : ""}`}>
      <span className="brand-icon" aria-hidden="true"><Sparkles size={20} strokeWidth={2.3} /></span>
      <span>Klin<span className="brand-tight">Up</span><span className="brand-dot">.</span></span>
    </a>
  );
}

function SectionTag({ children }: { children: ReactNode }) {
  return <div className="section-tag"><span className="tag-dot" />{children}</div>;
}

function Reveal({ children, className = "", delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -45px 0px" }}
      transition={{ duration: reduced ? 0 : 0.76, delay: reduced ? 0 : delay, ease }}
    >{children}</motion.div>
  );
}

function Intro() {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), reduced ? 50 : 1050);
    return () => window.clearTimeout(t);
  }, [reduced]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true" className="intro-screen"
          exit={{ y: "-105%" }}
          transition={{ duration: reduced ? 0.05 : 0.85, ease }}
        >
          <div className="intro-inner">
            <motion.div initial={{ opacity: 0, y: 17 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }} className="intro-logo">
              <Sparkles size={32} /><span>KlinUp<span className="accent">.</span></span>
            </motion.div>
            <div className="intro-caption">A FRESH START IS COMING</div>
          </div>
          <motion.div className="intro-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0.01 : 0.88, ease: "easeInOut" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);
  const links = [["About", "#about"], ["Services", "#services"], ["Reviews", "#reviews"], ["FAQs", "#faq"]];
  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="nav-shell layout-wrap">
        <Brand />
        <nav aria-label="Main navigation" className="nav-desktop">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button button-orange nav-cta" href="#contact">Book your cleaning <ArrowUpRight size={16} strokeWidth={2} /></a>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" className="menu-button" type="button" onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.nav id="mobile-nav" className="nav-mobile" aria-label="Mobile navigation"
          initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }}>
          {links.map(([label, href], i) => <a key={href} style={{ animationDelay: `${i * 40}ms` }} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}
          <a className="button button-orange" href="#contact" onClick={() => setOpen(false)}>Book your cleaning <ArrowUpRight size={17} /></a>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduced) { window.setTimeout(() => setCount(value), 0); return; }
    let id = 0;
    const start = performance.now();
    const duration = 1250;
    const tick = (time: number) => {
      const t = Math.min(1, (time - start) / duration);
      const progress = 1 - Math.pow(1 - t, 4);
      setCount(Math.round(progress * value));
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value, reduced]);
  return <span ref={ref} className="count" aria-label={`${value}${suffix}`}>{count}{suffix}</span>;
}

function Hero() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const y = useTransform(scrollY, [0, 900], [0, 170]);
  return (
    <section className="hero layout-wrap" aria-labelledby="hero-heading">
      <div className="hero-media">
        <motion.div className="hero-picture" style={reduced ? undefined : { y }}>
          <Image src="/images/hero.webp" alt="Professional cleaning team inside a freshly cleaned home" fill sizes="(max-width: 768px) 100vw, 1440px" priority quality={85} className="hero-image" />
        </motion.div>
        <div className="hero-gradient" />
      </div>
      <div className="hero-grid-text">
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: 1.05, ease }}>
          <span className="hero-eyebrow-dot" /> THE CLEAN HOME CLUB <span className="hero-eyebrow-line" /> MANHATTAN, NY
        </motion.div>
        <h1 id="hero-heading" className="hero-title">
          <span className="headline-clip"><motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.0, ease }}>Cleaning for</motion.span></span>
          <span className="headline-clip"><motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.12, ease }}>busy people in</motion.span></span>
          <span className="headline-clip"><motion.span className="accent" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.24, ease }}>Manhattan.</motion.span></span>
        </h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: 1.55, ease }}>{site.description}</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: 1.68, ease }}>
          <a className="button button-orange" href="#contact">Book your cleaning <ArrowUpRight size={17} /></a>
          <a className="button button-white" href="#services">See services <ArrowRight size={17} /></a>
        </motion.div>
        <motion.div className="hero-rating" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.8, ease }}>
          <div className="hero-avatar-stack" aria-hidden="true">{[1,2,3,4,5].map((n) => <Image key={n} src={`/images/person-${n}.webp`} alt="" width={35} height={35} />)}</div>
          <div className="rating-text"><div><strong>4.9 / 5</strong><span className="rating-stars">★★★★★</span></div><span>Sample customer rating · replace before launch</span></div>
        </motion.div>
      </div>
      <a className="hero-scroll" href="#trust" aria-label="Scroll to discover more"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
      <span className="hero-index">01 — 07</span>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust-bar" id="trust" aria-label="Our commitments">
      <div className="layout-wrap trust-inner">
        <div className="trust-heading">A different kind of clean.<br /><span>Built around your life.</span></div>
        <div className="trust-logos" aria-label="Reasons customers choose us">
          <div><ShieldCheck size={24} /> TRUSTED CARE</div>
          <div><Clock3 size={24} /> ON YOUR TIME</div>
          <div><Leaf size={24} /> MINDFUL PRODUCTS</div>
          <div><Heart size={24} /> THE LITTLE DETAILS</div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats section-space" aria-labelledby="stats-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>THE DETAILS MATTER</SectionTag><h2 id="stats-heading" className="section-title">The little things add up<br /><span className="text-muted">to a lot of peace of mind.</span></h2></Reveal>
        <div className="stats-grid">
          {[
            ["15", "+", "Service options & add-ons", "A clean tailored to every space"],
            ["97", "%", "Our sample satisfaction metric", "Replace with your verified data"],
            ["25", "+", "Neighborhoods within reach", "Flexible local service"],
            ["60", "+", "Attention-to-detail checklist", "The details never get skipped"],
          ].map(([number, suffix, label, hint], i) => (
            <Reveal key={label} className="stat-item" delay={i * .07}>
              <div className="stat-count"><Counter value={Number(number)} suffix={suffix} /></div>
              <div className="stat-label">{label}</div><div className="stat-hint">{hint}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = ["Experienced cleaners you can trust", "Fast, flexible & on-time service", "Thoughtful products for every surface", "Clear pricing with no surprises"];
  return (
    <section id="about" className="about section-space" aria-labelledby="about-heading">
      <div className="layout-wrap about-grid">
        <div className="about-photo-wrap">
          <Reveal className="about-photo-main"><Image src="/images/about-main.webp" alt="Cleaner working in a bright apartment" fill sizes="(max-width: 800px) 95vw, 540px" className="img-cover" /></Reveal>
          <Reveal className="about-photo-inset" delay={.18}><Image src="/images/about-side.webp" alt="A professional cleaning a countertop" fill sizes="220px" className="img-cover" /></Reveal>
          <motion.div className="about-sticker" whileHover={{ rotate: 10, scale: 1.06 }}><Sparkles size={25} /><span>A fresh<br />perspective.</span></motion.div>
        </div>
        <div className="about-content">
          <Reveal><SectionTag>ABOUT KLINUP</SectionTag><h2 id="about-heading" className="section-title">A clean you can <em>feel.</em><br />A team you can <span className="text-muted">trust.</span></h2></Reveal>
          <Reveal delay={.1}><p className="section-copy">At KlinUp, we believe a clean space changes everything. We bring careful attention, friendly faces, and reliable service to the places that matter most — your home, your time, your peace of mind.</p></Reveal>
          <Reveal className="about-checklist" delay={.16}>{points.map(p => <div className="check-row" key={p}><span className="check-bubble"><Check size={17} strokeWidth={2.5} /></span>{p}</div>)}</Reveal>
          <Reveal delay={.23}><a href="#contact" className="button button-orange">Book your cleaning <ArrowUpRight size={17} /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const cards = [
    { icon: CalendarDays, index: "01", title: "Book your clean", copy: "Tell us what you need and pick a time that fits your schedule." },
    { icon: Sparkles, index: "02", title: "We bring the good stuff", copy: "Your cleaner arrives ready, with the tools and care to get it done." },
    { icon: Heart, index: "03", title: "Come home to fresh", copy: "A thoughtfully cleaned space, reset and ready to enjoy." },
    { icon: Clock3, index: "04", title: "Keep it that way", copy: "Make clean a habit with easy recurring appointments." },
  ];
  return (
    <section className="process section-space" aria-labelledby="process-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>HOW IT WORKS</SectionTag><h2 id="process-heading" className="section-title">From booking to bliss.<br /><span className="text-muted">Easy as 1, 2, clean.</span></h2></Reveal>
        <div className="process-layout">
          <div className="process-stack">{cards.slice(0,2).map((c,i) => <ProcessCard key={c.index} {...c} delay={i*.08} />)}</div>
          <Reveal className="process-image" delay={.12}><Image src="/images/process.webp" alt="A couple enjoying their freshly cleaned living room" fill sizes="(max-width: 850px) 90vw, 500px" className="img-cover" /><div className="process-image-label"><Sparkles size={19} /> LESS MESS. MORE LIFE.</div></Reveal>
          <div className="process-stack">{cards.slice(2).map((c,i) => <ProcessCard key={c.index} {...c} delay={.16+i*.08} />)}</div>
        </div>
        <Reveal className="process-bottom"><a href="#contact" className="button button-orange">Book your cleaning <ArrowUpRight size={17} /></a></Reveal>
      </div>
    </section>
  );
}

function ProcessCard({ icon: Icon, index, title, copy, delay }: { icon: typeof CalendarDays; index: string; title: string; copy: string; delay: number }) {
  return <Reveal className="process-card" delay={delay}>
    <div className="process-card-top"><span className="process-icon"><Icon size={22} strokeWidth={1.8} /></span><span className="process-number">{index}</span></div>
    <div><h3>{title}</h3><p>{copy}</p></div>
  </Reveal>;
}

function Services() {
  return (
    <section id="services" className="services section-space" aria-labelledby="services-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>OUR SERVICES</SectionTag><h2 id="services-heading" className="section-title">Reliable cleaning services<br /><span className="text-muted">made for your life.</span></h2><p className="section-subcopy">A fresh start, whatever your space needs.</p></Reveal>
        <div className="services-grid">
          {services.map((s, i) => <Reveal className="service-card" key={s.name} delay={i * .12}>
            <div className="service-top"><div><span className="service-index">SERVICE / {s.number}</span><h3>{s.name}</h3><p>{s.short}</p></div><span className="service-spark">✳</span></div>
            <div className="service-image"><Image src={s.image} alt={`${s.name} service`} fill sizes="(max-width: 750px) 90vw, (max-width: 1000px) 45vw, 420px" className="img-cover" /></div>
            <ul className="service-list">{s.list.map(item => <li key={item}><span><Check size={12} strokeWidth={3} /></span>{item}</li>)}</ul>
            <a className="service-action" href="#contact"><span>Book this service</span><span className="service-arrow"><ArrowUpRight size={19} /></span></a>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [value, setValue] = useState(50);
  return (
    <section className="transformation section-space" aria-labelledby="transform-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>THE TRANSFORMATION</SectionTag><h2 id="transform-heading" className="section-title">The difference is<br /><span className="text-muted">in the details.</span></h2><p className="section-subcopy">Drag the handle to see what a fresh start can look like.</p></Reveal>
        <Reveal className="compare-outer">
          <div className="comparison">
            <Image className="comparison-base" src="/images/room-before.webp" alt="Living room before a full cleaning" fill sizes="(max-width: 800px) 100vw, 1100px" />
            <div className="comparison-after" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
              <Image className="comparison-base" src="/images/room-after.webp" alt="The same living room after cleaning" fill sizes="(max-width: 800px) 100vw, 1100px" />
            </div>
            <span className="compare-label compare-label-before">BEFORE</span><span className="compare-label compare-label-after">AFTER</span>
            <div className="comparison-bar" style={{ left: `${value}%` }} aria-hidden="true"><span className="comparison-handle">‹&nbsp;&nbsp;›</span></div>
            <input aria-label="Reveal cleaning before and after" aria-valuetext={`${value}% after image visible`} className="compare-range" type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
          </div>
          <div className="compare-bottom"><div><span className="orange-tick" /> A LITTLE LOVE GOES A LONG WAY</div><div>BEFORE <span className="compare-bottom-arrow">↔</span> AFTER</div></div>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="reviews section-space" aria-labelledby="reviews-heading">
      <div className="layout-wrap">
        <Reveal className="reviews-head"><div><SectionTag>TESTIMONIALS</SectionTag><h2 id="reviews-heading" className="section-title">Good words.<br /><span className="text-muted">Great feeling.</span></h2></div><p>Our favorite kind of feedback? Walking into a home that feels like new again. <span className="sample-note">Sample reviews for layout demonstration.</span></p></Reveal>
        <div className="review-grid">
          {testimonials.map((t,i) => <Reveal className="review-card" key={t.name} delay={(i%3)*.08}>
            <div className="review-top"><span className="review-stars" aria-label="5 stars">★★★★★</span><Quote size={21} strokeWidth={1.5} /></div>
            <blockquote>“{t.quote}”</blockquote>
            <div className="review-person"><Image src={t.image} alt="" width={44} height={44} /><div><strong>{t.name}</strong><span>{t.service}</span></div><BadgeCheck size={17} className="review-check" /></div>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [opened, setOpened] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <section id="faq" className="faq section-space" aria-labelledby="faq-heading">
      <div className="layout-wrap faq-layout">
        <Reveal className="faq-heading"><SectionTag>FAQS</SectionTag><h2 id="faq-heading" className="section-title">The good-to-<br />know stuff<span className="accent">.</span></h2><p>Still have a question? We’d love to help.</p><a href="#contact" className="button button-outline">Ask us anything <ArrowUpRight size={17} /></a></Reveal>
        <Reveal className="faq-items" delay={.1}>
          {faqs.map((item,i) => <div className={`faq-item ${opened === i ? "faq-open" : ""}`} key={item.q}>
            <button className="faq-question" aria-expanded={opened === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpened(opened === i ? null : i)}>
              <span>{String(i+1).padStart(2,"0")}</span><strong>{item.q}</strong><span className="faq-plus">{opened === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>{opened === i && <motion.div id={`faq-answer-${i}`} role="region" initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .27, ease: "easeInOut" }} className="faq-answer"><p>{item.a}</p></motion.div>}</AnimatePresence>
          </div>)}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error"|"fallback">("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({ name: "", phone: "", email: "", service: "", message: "", website: "" });
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending");setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (res.ok) { setStatus("sent");setData({ name: "", phone: "", email: "", service: "", message: "", website: "" });return; }
      if (result.code === "NOT_CONFIGURED") {
        const body = `Hi KlinUp,\n\nI'd like to request a cleaning.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Cleaning enquiry — ${data.service}`)}&body=${encodeURIComponent(body)}`;
        setStatus("fallback");return;
      }
      throw new Error(result.error || "Couldn't send your message. Please try again.");
    } catch(err) { setError(err instanceof Error ? err.message : "Couldn't send your message.");setStatus("error"); }
  }
  return (
    <section id="contact" className="contact section-space" aria-labelledby="contact-heading">
      <div className="layout-wrap contact-layout">
        <Reveal className="contact-info"><SectionTag>LET'S GET CLEANING</SectionTag><h2 id="contact-heading" className="section-title">Your spotless<br />home <em>awaits.</em></h2><p>Book a cleaning team that shows up, pays attention, and leaves your home feeling like a fresh start. Tell us a little about your space — we’ll take it from there.</p>
          <div className="contact-details"><span>DON'T LIKE FORMS? REACH OUT DIRECTLY.</span><a href={`tel:${site.phone.replace(/\D/g, "")}`}><Phone size={18} />{site.phone}</a><a href={`mailto:${site.email}`}><Mail size={18} />{site.email}</a></div>
          <div className="contact-small-note"><Sparkles size={23} /> A little cleaner.<br />A lot happier.</div>
        </Reveal>
        <Reveal className="form-card" delay={.12}>
          <div className="form-header"><div><span>START HERE</span><h3>Tell us about your space.</h3></div><span className="form-arrow"><ArrowUpRight size={22} /></span></div>
          <form onSubmit={submit}>
            <div className="form-row"><label>Full name <span>*</span><input required maxLength={100} autoComplete="name" placeholder="Your name" value={data.name} onChange={e=>setData({...data,name:e.target.value})}/></label><label>Phone number<input type="tel" maxLength={60} autoComplete="tel" placeholder="(555) 000-0000" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})}/></label></div>
            <label>Email address <span>*</span><input required type="email" maxLength={200} autoComplete="email" placeholder="you@example.com" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/></label>
            <label>Which service are you looking for? <span>*</span><span className="select-wrap"><select required value={data.service} onChange={e=>setData({...data,service:e.target.value})}><option value="">Select a service</option><option>Deep Cleaning</option><option>Move-Out Cleaning</option><option>Airbnb Turnover</option><option>Other</option></select><ChevronDown size={16} aria-hidden="true" /></span></label>
            <label>Anything else we should know?<textarea maxLength={2500} rows={3} placeholder="Tell us a little about your space, timeline, and what you'd like cleaned..." value={data.message} onChange={e=>setData({...data,message:e.target.value})} /></label>
            <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>setData({...data,website:e.target.value})}/></label>
            <button className="button button-orange form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my inquiry"} <ArrowUpRight size={18} /></button>
            <div className="form-status" role="status" aria-live="polite">
              {status === "sent" && <span className="form-success">Thanks! Your inquiry has been sent.</span>}
              {status === "fallback" && <span>Your email app should open with your inquiry ready to send. Please send that email to complete your request.</span>}
              {status === "error" && <span className="form-error">{error} You can also <a href={`mailto:${site.email}`}>email us directly.</a></span>}
            </div>
            <p className="form-footnote"><ShieldCheck size={15} /> Your information is only used to respond to your inquiry.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="layout-wrap">
        <div className="footer-top"><div><Brand inverted /><p>A clean space. A clearer mind.<br />Good things start at home.</p></div><div className="footer-links"><div><h3>Explore</h3><a href="#about">About us</a><a href="#services">Our services</a><a href="#reviews">Reviews</a><a href="#faq">FAQs</a></div><div><h3>Get in touch</h3><a href="#contact">Book a clean</a><a href={`mailto:${site.email}`}>Send an email</a><a href={`tel:${site.phone.replace(/\D/g,"")}`}>Give us a call</a></div></div></div>
        <div className="footer-big" aria-hidden="true">klinup<span>.</span></div>
        <div className="footer-bottom"><span>© {year} KlinUp. All rights reserved.</span><span>Made with care. <Heart size={13} fill="currentColor" /></span><a href="#top">BACK TO TOP ↑</a></div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: .001 });
  return (
    <>
      <Intro />
      <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: progress }} />
      <div id="top" />
      <Nav />
      <main><Hero /><Trust /><Stats /><About /><Process /><Services /><BeforeAfter /><Reviews /><FAQ /><Contact /></main>
      <Footer />
    </>
  );
}
