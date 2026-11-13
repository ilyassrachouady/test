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
import { faqs, services, site, expertiseCards } from "@/lib/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <a aria-label="Accueil HYB Prévention Conseil" href="#top" className={`brand ${inverted ? "brand-invert" : ""}`}>
      <span className="brand-icon" aria-hidden="true"><Image src="/hyb-mark.svg" width={29} height={29} alt="" /></span>
      <span>HYB <span className="brand-tight">Prévention</span><span className="brand-dot">.</span></span>
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
              <Image src="/hyb-mark.svg" width={42} height={42} alt="" /><span>HYB Prévention<span className="accent">.</span></span>
            </motion.div>
            <div className="intro-caption">RESTEZ BIEN CONSEILLÉ!</div>
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
  const links = [["À propos", "#about"], ["Services", "#services"], ["Expertises", "#reviews"], ["FAQ", "#faq"]];
  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="nav-shell layout-wrap">
        <Brand />
        <nav aria-label="Navigation principale" className="nav-desktop">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button button-orange nav-cta" href="#contact">Nous contacter <ArrowUpRight size={16} strokeWidth={2} /></a>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" className="menu-button" type="button" onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.nav id="mobile-nav" className="nav-mobile" aria-label="Navigation mobile"
          initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .25 }}>
          {links.map(([label, href], i) => <a key={href} style={{ animationDelay: `${i * 40}ms` }} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}
          <a className="button button-orange" href="#contact" onClick={() => setOpen(false)}>Nous contacter <ArrowUpRight size={17} /></a>
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
          <Image src="/images/hero.webp" alt="Visuel de présentation à remplacer par une photo d’un milieu de travail" fill sizes="(max-width: 768px) 100vw, 1440px" priority quality={85} className="hero-image" />
        </motion.div>
        <div className="hero-gradient" />
      </div>
      <div className="hero-grid-text">
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: 1.05, ease }}>
          <span className="hero-eyebrow-dot" /> SANTÉ & SÉCURITÉ AU TRAVAIL <span className="hero-eyebrow-line" /> QUÉBEC
        </motion.div>
        <h1 id="hero-heading" className="hero-title">
          <span className="headline-clip"><motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.0, ease }}>La prévention</motion.span></span>
          <span className="headline-clip"><motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.12, ease }}>au cœur de votre</motion.span></span>
          <span className="headline-clip"><motion.span className="accent" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: .95, delay: 1.24, ease }}>entreprise.</motion.span></span>
        </h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: 1.55, ease }}>{site.description}</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: 1.68, ease }}>
          <a className="button button-orange" href="#contact">Nous contacter <ArrowUpRight size={17} /></a>
          <a className="button button-white" href="#services">Nos services <ArrowRight size={17} /></a>
        </motion.div>
        <motion.div className="hero-rating" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.8, ease }}>
          <div className="hero-avatar-stack" aria-hidden="true"><span><ShieldCheck size={18} /></span><span><BadgeCheck size={18} /></span><span><Heart size={17} /></span></div>
          <div className="rating-text"><div><strong>Depuis 2012</strong><span className="rating-stars">✦</span></div><span>Formation, prévention SST et conseils RH</span></div>
        </motion.div>
      </div>
      <a className="hero-scroll" href="#trust" aria-label="Faire défiler pour découvrir nos services"><span>DÉCOUVRIR</span><ArrowDown size={16} /></a>
      <span className="hero-index">01 — 07</span>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust-bar" id="trust" aria-label="Nos engagements">
      <div className="layout-wrap trust-inner">
        <div className="trust-heading">La sécurité avant tout.<br /><span>Un partenaire à vos côtés.</span></div>
        <div className="trust-logos" aria-label="Domaines d’intervention">
          <div><ShieldCheck size={24} /> PRÉVENTION SST</div>
          <div><Clock3 size={24} /> FORMATIONS</div>
          <div><Leaf size={24} /> CONSEILS RH</div>
          <div><Heart size={24} /> PROXIMITÉ</div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats section-space" aria-labelledby="stats-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>NOTRE SAVOIR-FAIRE</SectionTag><h2 id="stats-heading" className="section-title">L’expérience au service<br /><span className="text-muted">de votre sécurité.</span></h2></Reveal>
        <div className="stats-grid">
          {[
            ["14", "+", "Années en formation", "Formateur de gestionnaires depuis 2012"],
            ["12", "+", "Années en prévention", "Conseil RH et SST depuis 2014"],
            ["250", "+", "Employés supervisés", "Expérience de terrain du fondateur"],
            ["3", "", "Domaines complémentaires", "Prévention SST · RH · Formation"],
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
  const points = ["Conseils en santé et sécurité du travail", "Formations pratiques et adaptées", "Accompagnement des gestionnaires", "Approche ancrée dans la réalité des PME"];
  return (
    <section id="about" className="about section-space" aria-labelledby="about-heading">
      <div className="layout-wrap about-grid">
        <div className="about-photo-wrap">
          <Reveal className="about-photo-main"><Image src="/images/about-main.webp" alt="Visuel de présentation, à remplacer par une photo d’équipe HYB" fill sizes="(max-width: 800px) 95vw, 540px" className="img-cover" /></Reveal>
          <Reveal className="about-photo-inset" delay={.18}><Image src="/images/about-side.webp" alt="Visuel de présentation, à remplacer par une photo de formation HYB" fill sizes="220px" className="img-cover" /></Reveal>
          <motion.div className="about-sticker" whileHover={{ rotate: 10, scale: 1.06 }}><Sparkles size={25} /><span>Restez bien<br />conseillé!</span></motion.div>
        </div>
        <div className="about-content">
          <Reveal><SectionTag>À PROPOS DE HYB</SectionTag><h2 id="about-heading" className="section-title">La prévention qui <em>protège.</em><br />Des conseils qui <span className="text-muted">font avancer.</span></h2></Reveal>
          <Reveal delay={.1}><p className="section-copy">Fondée par Hygo Bisimwa, HYB Prévention Conseil accompagne les PME du Québec en santé et sécurité du travail, en gestion des ressources humaines et en formation. Une expertise nourrie par l’expérience concrète des milieux industriels et des relations de travail.</p></Reveal>
          <Reveal className="about-checklist" delay={.16}>{points.map(p => <div className="check-row" key={p}><span className="check-bubble"><Check size={17} strokeWidth={2.5} /></span>{p}</div>)}</Reveal>
          <Reveal delay={.23}><a href="#contact" className="button button-orange">Nous contacter <ArrowUpRight size={17} /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const cards = [
    { icon: CalendarDays, index: "01", title: "Échange initial", copy: "Présentez-nous votre entreprise et vos besoins en SST, RH ou formation." },
    { icon: Sparkles, index: "02", title: "Analyse des besoins", copy: "Nous ciblons les enjeux à traiter et les compétences à développer." },
    { icon: Heart, index: "03", title: "Solutions adaptées", copy: "Nous proposons des interventions et des formations selon votre réalité." },
    { icon: Clock3, index: "04", title: "Suivi et progression", copy: "Faites évoluer vos pratiques et les compétences de vos équipes." },
  ];
  return (
    <section className="process section-space" aria-labelledby="process-heading">
      <div className="layout-wrap">
        <Reveal className="section-center"><SectionTag>NOTRE APPROCHE</SectionTag><h2 id="process-heading" className="section-title">Des besoins aux solutions.<br /><span className="text-muted">Une approche en 4 étapes.</span></h2></Reveal>
        <div className="process-layout">
          <div className="process-stack">{cards.slice(0,2).map((c,i) => <ProcessCard key={c.index} {...c} delay={i*.08} />)}</div>
          <Reveal className="process-image" delay={.12}><Image src="/images/process.webp" alt="Visuel d’illustration du parcours de conseil" fill sizes="(max-width: 850px) 90vw, 500px" className="img-cover" /><div className="process-image-label"><Sparkles size={19} /> MIEUX PRÉVENIR. MIEUX GRANDIR.</div></Reveal>
          <div className="process-stack">{cards.slice(2).map((c,i) => <ProcessCard key={c.index} {...c} delay={.16+i*.08} />)}</div>
        </div>
        <Reveal className="process-bottom"><a href="#contact" className="button button-orange">Nous contacter <ArrowUpRight size={17} /></a></Reveal>
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
        <Reveal className="section-center"><SectionTag>NOS SERVICES</SectionTag><h2 id="services-heading" className="section-title">Des solutions concrètes<br /><span className="text-muted">pour votre organisation.</span></h2><p className="section-subcopy">SST, formations et ressources humaines pour les PME du Québec.</p></Reveal>
        <div className="services-grid">
          {services.map((s, i) => <Reveal className="service-card" key={s.name} delay={i * .12}>
            <div className="service-top"><div><span className="service-index">SERVICE / {s.number}</span><h3>{s.name}</h3><p>{s.short}</p></div><span className="service-spark">✳</span></div>
            <div className="service-image"><Image src={s.image} alt={`Illustration du service : ${s.name} (photo à actualiser)`} fill sizes="(max-width: 750px) 90vw, (max-width: 1000px) 45vw, 420px" className="img-cover" /></div>
            <ul className="service-list">{s.list.map(item => <li key={item}><span><Check size={12} strokeWidth={3} /></span>{item}</li>)}</ul>
            <a className="service-action" href="#contact"><span>Discuter du service</span><span className="service-arrow"><ArrowUpRight size={19} /></span></a>
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
        <Reveal className="section-center"><SectionTag>LA DÉMARCHE DE PRÉVENTION</SectionTag><h2 id="transform-heading" className="section-title">La prévention commence<br /><span className="text-muted">par une meilleure vision.</span></h2><p className="section-subcopy">Glissez le curseur pour comparer un environnement avant et après une démarche structurée.</p></Reveal>
        <Reveal className="compare-outer">
          <div className="comparison">
            <Image className="comparison-base" src="/images/room-before.webp" alt="Visuel illustratif avant mise en place de mesures SST" fill sizes="(max-width: 800px) 100vw, 1100px" />
            <div className="comparison-after" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
              <Image className="comparison-base" src="/images/room-after.webp" alt="Visuel illustratif après mise en place de mesures SST" fill sizes="(max-width: 800px) 100vw, 1100px" />
            </div>
            <span className="compare-label compare-label-before">AVANT</span><span className="compare-label compare-label-after">APRÈS</span>
            <div className="comparison-bar" style={{ left: `${value}%` }} aria-hidden="true"><span className="comparison-handle">‹&nbsp;&nbsp;›</span></div>
            <input aria-label="Comparer les étapes avant et après la prévention" aria-valuetext={`${value}% de l’image après visible`} className="compare-range" type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
          </div>
          <div className="compare-bottom"><div><span className="orange-tick" /> UNE DÉMARCHE ADAPTÉE AUX RISQUES</div><div>AVANT <span className="compare-bottom-arrow">↔</span> APRÈS</div></div>
        </Reveal>
      </div>
    </section>
  );
}

function Expertises() {
  return (
    <section id="reviews" className="reviews section-space" aria-labelledby="reviews-heading">
      <div className="layout-wrap">
        <Reveal className="reviews-head"><div><SectionTag>NOS EXPERTISES</SectionTag><h2 id="reviews-heading" className="section-title">Des compétences variées.<br /><span className="text-muted">Un même engagement.</span></h2></div><p>La prévention, la formation et le conseil RH se complètent pour accompagner vos équipes au quotidien.</p></Reveal>
        <div className="review-grid">
          {expertiseCards.map((t,i) => <Reveal className="review-card" key={t.name} delay={(i%3)*.08}>
            <div className="review-top"><span className="review-stars" aria-label="Expertise HYB">HYB • EXPERTISE</span><Quote size={21} strokeWidth={1.5} /></div>
            <blockquote>{t.quote}</blockquote>
            <div className="review-person"><span className="review-avatar"><ShieldCheck size={19} /></span><div><strong>{t.name}</strong><span>{t.service}</span></div><BadgeCheck size={17} className="review-check" /></div>
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
        <Reveal className="faq-heading"><SectionTag>FAQS</SectionTag><h2 id="faq-heading" className="section-title">Les réponses à<br />vos questions<span className="accent">.</span></h2><p>Une question sur la SST ou nos formations?</p><a href="#contact" className="button button-outline">Posez-nous votre question <ArrowUpRight size={17} /></a></Reveal>
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
        const body = `Bonjour HYB Prévention Conseil,\n\nJe souhaite discuter de vos services.\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nCourriel : ${data.email}\nService : ${data.service}\n\n${data.message}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Demande de renseignements — ${data.service}`)}&body=${encodeURIComponent(body)}`;
        setStatus("fallback");return;
      }
      throw new Error(result.error || "Impossible d’envoyer le message. Veuillez réessayer.");
    } catch(err) { setError(err instanceof Error ? err.message : "Impossible d’envoyer le message.");setStatus("error"); }
  }
  return (
    <section id="contact" className="contact section-space" aria-labelledby="contact-heading">
      <div className="layout-wrap contact-layout">
        <Reveal className="contact-info"><SectionTag>PARLONS DE VOS BESOINS</SectionTag><h2 id="contact-heading" className="section-title">Un milieu de travail<br /><em>plus sûr.</em></h2><p>Vous avez un projet de formation, un enjeu en SST ou un besoin en ressources humaines? Parlons de vos priorités pour déterminer l’accompagnement qui vous convient.</p>
          <div className="contact-details"><span>VOUS PRÉFÉREZ NOUS JOINDRE DIRECTEMENT?</span><a href={`tel:${site.phone.replace(/\D/g, "")}`}><Phone size={18} />{site.phone}</a><a href={`mailto:${site.email}`}><Mail size={18} />{site.email}</a></div>
          <div className="contact-small-note"><Sparkles size={23} /> Restez bien<br />conseillé!</div>
        </Reveal>
        <Reveal className="form-card" delay={.12}>
          <div className="form-header"><div><span>PARLONS-EN</span><h3>Parlez-nous de votre entreprise.</h3></div><span className="form-arrow"><ArrowUpRight size={22} /></span></div>
          <form onSubmit={submit}>
            <div className="form-row"><label>Nom complet <span>*</span><input required maxLength={100} autoComplete="name" placeholder="Votre nom" value={data.name} onChange={e=>setData({...data,name:e.target.value})}/></label><label>Téléphone<input type="tel" maxLength={60} autoComplete="tel" placeholder="(514) 000-0000" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})}/></label></div>
            <label>Adresse courriel <span>*</span><input required type="email" maxLength={200} autoComplete="email" placeholder="vous@entreprise.ca" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/></label>
            <label>Quel service vous intéresse? <span>*</span><span className="select-wrap"><select required value={data.service} onChange={e=>setData({...data,service:e.target.value})}><option value="">Choisir un service</option><option>Prévention &amp; SST</option><option>Formations sur mesure</option><option>Conseils en RH</option><option>Autre demande</option></select><ChevronDown size={16} aria-hidden="true" /></span></label>
            <label>Précisez vos besoins<textarea maxLength={2500} rows={3} placeholder="Votre secteur, vos enjeux, vos objectifs de formation..." value={data.message} onChange={e=>setData({...data,message:e.target.value})} /></label>
            <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>setData({...data,website:e.target.value})}/></label>
            <button className="button button-orange form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : "Envoyer ma demande"} <ArrowUpRight size={18} /></button>
            <div className="form-status" role="status" aria-live="polite">
              {status === "sent" && <span className="form-success">Merci! Votre demande a bien été envoyée.</span>}
              {status === "fallback" && <span>Votre application de courriel devrait ouvrir un message prêt à envoyer. Veuillez l’envoyer pour finaliser votre demande.</span>}
              {status === "error" && <span className="form-error">{error} Vous pouvez aussi <a href={`mailto:${site.email}`}>nous écrire directement.</a></span>}
            </div>
            <p className="form-footnote"><ShieldCheck size={15} /> Vos renseignements servent uniquement à répondre à votre demande.</p>
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
        <div className="footer-top"><div><Brand inverted /><p>SST, ressources humaines et formation.<br />Restez bien conseillé!</p></div><div className="footer-links"><div><h3>Explorer</h3><a href="#about">À propos</a><a href="#services">Nos services</a><a href="#reviews">Expertises</a><a href="#faq">FAQ</a></div><div><h3>Contact</h3><a href="#contact">Nous contacter</a><a href={`mailto:${site.email}`}>Écrivez-nous</a><a href={`tel:${site.phone.replace(/\D/g,"")}`}>Appelez-nous</a></div></div></div>
        <div className="footer-big" aria-hidden="true">HYB<span>.</span></div>
        <div className="footer-bottom"><span>© {year} HYB Prévention Conseil. Tous droits réservés.</span><span>Restez bien conseillé. <Heart size={13} fill="currentColor" /></span><a href="#top">RETOUR EN HAUT ↑</a></div>
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
      <main><Hero /><Trust /><Stats /><About /><Process /><Services /><BeforeAfter /><Expertises /><FAQ /><Contact /></main>
      <Footer />
    </>
  );
}
