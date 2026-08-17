/**
 * Client Brief design reminder: preserve the approved Clinical Prism identity, but make decisions,
 * dependencies, and source-backed content immediately legible. Glass clarifies; it never conceals.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Globe2,
  LockKeyhole,
  Menu,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import "./brief.css";
import "./brief-schedule.css";

const logoSrc = "/media/optimum-logo_331074c5.png";
const heroSrc = "/media/optimum-hero-clinic_fcbd1627.jpg";
const movementSrc = "/media/optimum-editorial-movement_398382a7.jpg";
const abstractSrc = "/media/optimum-glass-motion_62420156.jpg";

const calendarPosts = [
  {
    pillar: "Educational", date: "01 Sep", format: "Reel · 20–30 sec", hook: "Your 2 p.m. neck ache is not a posture-failure.",
    audience: "Desk workers with end-of-day neck stiffness.",
    brief: "Film a real desk setup. [LEAD CLINICIAN] demonstrates a short movement reset, a position change, and a simple screen-height check. Keep the message general and comfortable rather than prescriptive.",
    cta: "Save this for your next desk day. DM “DESK” to ask about a workstation or movement assessment.",
    note: "Use captions, a clear first-frame headline, and a final shot of the clinician pointing toward the DM prompt.",
    tone: "education",
  },
  {
    pillar: "Educational", date: "04 Sep", format: "Carousel · 7 slides", hook: "Knee pain on stairs? Rest is not always the whole answer.",
    audience: "Adults whose knees feel uncomfortable on stairs or when getting up from a chair.",
    brief: "Build the carousel around better questions: What activity is difficult? What changed? What can you currently tolerate? What is your goal? Close by explaining that assessment helps personalise the next step.",
    cta: "Comment “STAIRS” for the assessment checklist, or book via [BOOKING LINK].",
    note: "Keep each slide to one idea. Use a real stair or chair environment rather than a generic anatomy graphic.",
    tone: "education",
  },
  {
    pillar: "Educational", date: "08 Sep", format: "Carousel + Stories · 5–6 slides", hook: "Movement supports more than muscles.",
    audience: "Local community, adults interested in prevention, and current patients.",
    brief: "Localise the 2026 World PT Day theme through messages around starting where you are, building confidence, and asking for support. Use official World Physiotherapy campaign assets where relevant and do not amend official activity-guide materials.",
    cta: "Share this with someone building a more active routine. Book a movement-and-wellness conversation via [BOOKING LINK].",
    note: "Use #WorldPTDay in supporting Stories and retain the official campaign language where campaign assets are used.",
    tone: "education",
  },
  {
    pillar: "Patient Proof", date: "11 Sep", format: "Carousel · 6–8 slides", hook: "“I stopped planning my day around the stairs.”",
    audience: "Prospective patients needing reassurance that rehab is practical and person-centred.",
    brief: "With written consent, show the journey from starting challenge to personal goal, assessment, evolving plan, and functional win. Use the patient’s own words and avoid universal results claims.",
    cta: "If stairs, walking, work, or training is changing your day, DM “MOVE”.",
    note: "Use a consented patient photograph, quote card, or illustrated milestone sequence. Confirm approval of every word before publishing.",
    tone: "proof",
  },
  {
    pillar: "Modality", date: "15 Sep", format: "Reel · 25–35 sec", hook: "What actually happens during dry needling?",
    audience: "People who have heard about dry needling but do not know what happens in a session.",
    brief: "Show assessment first, explanation and consent, clean setup, a brief non-graphic procedure view, and discussion of response and next steps. State clearly that suitability is decided after assessment and that this is one option—not a stand-alone fix.",
    cta: "Book an assessment to discuss whether this or another approach fits your goals: [BOOKING LINK].",
    note: "If dry needling is not offered, replace it with a confirmed service such as IASTM, cupping, or electrotherapy. Confirm clinician credentials first.",
    tone: "modality",
  },
  {
    pillar: "Educational", date: "18 Sep", format: "Reel · 20–30 sec", hook: "A good gym day is not always a green light to double the load.",
    audience: "Active adults returning to the gym after a pain flare-up, injury, or long break.",
    brief: "Show three general readiness markers: the movement is comfortable enough to practise, technique remains controlled, and recovery is manageable by the next session. Include a squat or step-up modification without prescribing a full programme.",
    cta: "Save this before your next workout and share it with your training partner.",
    note: "Film on the gym floor or in a realistic training space. Let the clinician explain the why in one sentence.",
    tone: "education",
  },
  {
    pillar: "Patient Proof", date: "22 Sep", format: "Reel · 30–40 sec", hook: "The goal was not ‘perfect’—it was a weekend walk with confidence.",
    audience: "Adults who want to resume walking, family activities, or recreational movement.",
    brief: "Use a mini-documentary structure: patient goal, two or three rehabilitation moments, and an outcome tied to life participation. The clinician adds one sentence about adapting the plan around the patient’s response.",
    cta: "DM “WALK” to discuss a plan built around an activity you miss.",
    note: "Keep captions on throughout and publish only after written approval of the footage, wording, and final edit.",
    tone: "proof",
  },
  {
    pillar: "Modality", date: "25 Sep", format: "Carousel · 7 slides", hook: "Your first physio visit: what you will actually leave knowing.",
    audience: "First-time patients who are delaying care because they do not know what a first visit involves.",
    brief: "Cover the patient story, relevant history, movement assessment, shared goals, care options, first plan, and questions. Use genuine clinic photography and clinician–patient conversation.",
    cta: "Ready for a clear next step? Book your first assessment at [BOOKING LINK].",
    note: "This is the month’s principal direct-booking post. Check the booking link, phone number, clinic hours, and availability before scheduling.",
    tone: "modality",
  },
  {
    pillar: "Clinician Branding", date: "27 Sep", format: "Reel · 25–35 sec", hook: "Does a click or crack mean something was ‘fixed’?",
    audience: "Followers who need a reason to trust the person behind the practice.",
    brief: "[LEAD CLINICIAN] answers directly to camera. Explain that useful care looks at symptoms, movement, goals, and response over time—not one sound or treatment moment. Close with the clinic value: “We explain the why, then build the plan with you.”",
    cta: "Leave a question for next month’s clinician Q&A, or follow for practical movement guidance.",
    note: "Use a warm clinic setting, clean audio, and a lower-third with the clinician’s name and credentials.",
    tone: "clinician",
  },
  {
    pillar: "Patient Proof", date: "30 Sep", format: "Carousel · 6 slides", hook: "Progress in rehab is not only ‘pain-free.’ Here are three wins we celebrate.",
    audience: "Existing followers who need a final prompt to seek help in October.",
    brief: "Frame progress through function: completing a task with more confidence, recovering better after activity, and returning to a valued routine. Use a consented story or label a composite narrative clearly as an example.",
    cta: "Ready to work toward a goal that matters to you? Reserve an October assessment via [BOOKING LINK].",
    note: "End with a calm October availability message rather than urgency-based selling.",
    tone: "proof",
  },
] as const;

const approvalItems = [
  { key: "services", label: "Service menu & modality availability", detail: "Confirm exactly what can be named in the calendar." },
  { key: "clinicians", label: "Clinician names, credentials & scripts", detail: "Approve accurate roles, names, and final on-camera wording." },
  { key: "consent", label: "Written patient consent & final wording", detail: "Secure consent for every recognisable person and patient story." },
  { key: "contact", label: "City, booking link, contact & availability", detail: "Replace all placeholders before scheduling content." },
  { key: "accessibility", label: "Captions, alt text & visual accessibility", detail: "Prepare subtitles and accessible publishing assets." },
  { key: "clinical", label: "Clinical review of treatment descriptions", detail: "Confirm all exercise and modality claims before publication." },
] as const;

type ApprovalKey = (typeof approvalItems)[number]["key"];

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="brief-label"><span>{number}</span><i /><p>{label}</p></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(0);
  const [approvals, setApprovals] = useState<Record<ApprovalKey, boolean>>({ services: false, clinicians: false, consent: false, contact: false, accessibility: false, clinical: false });
  const post = calendarPosts[selectedPost];
  const approvalCount = Object.values(approvals).filter(Boolean).length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".brief-reveal"));
    if (reduced) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    document.documentElement.classList.add("brief-motion");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); document.documentElement.classList.remove("brief-motion"); };
  }, []);

  const toggleApproval = (key: ApprovalKey) => setApprovals((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="brief-site" id="top">
      <div className="brief-grain" />
      <header className="brief-header">
        <a className="brief-brand" href="#top"><img src={logoSrc} alt="Optimum Physio movement logo" /><span>OPTIMUM <b>/</b> CLIENT BRIEF</span></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Client brief navigation">
          <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
          <a href="#calendar" onClick={() => setMenuOpen(false)}>Calendar</a>
          <a href="#production" onClick={() => setMenuOpen(false)}>Production</a>
          <a href="#domain" onClick={() => setMenuOpen(false)}>Domain status</a>
        </nav>
        <a className="brief-brand-link" href="/brand-system">Brand system <ArrowUpRight size={15} /></a>
        <button className="brief-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main>
        <section className="brief-hero">
          <div className="brief-hero-orb orb-one" /><div className="brief-hero-orb orb-two" />
          <div className="brief-hero-copy brief-reveal">
            <div className="brief-eyebrow"><Sparkles size={14} /> Project brief · September 2026</div>
            <h1>A complete plan<br />for a clearer<br /><em>next step.</em></h1>
            <p>A working client brief that brings together Optimum’s approved visual system, complete September content calendar, production requirements, and website recovery decision.</p>
            <a className="brief-primary-link" href="#overview">Review the brief <ArrowDownRight size={17} /></a>
          </div>
          <div className="brief-hero-visual brief-reveal delay-1">
            <img src={heroSrc} alt="A calm physiotherapy studio consultation" />
            <div className="brief-hero-shade" />
            <div className="brief-cover-card"><span>PROJECT STATUS · 01</span><h2>10 posts.<br />1 brand system.<br />1 domain decision.</h2><div><b>SEP 2026</b><b>CLIENT REVIEW</b></div></div>
            <img className="brief-hero-logo" src={logoSrc} alt="" />
          </div>
          <div className="brief-hero-foot"><span>CONTENT · DOMAIN · PRODUCTION · APPROVAL</span><span>PREPARED FOR CLIENT REVIEW</span></div>
        </section>

        <section className="brief-overview" id="overview">
          <div className="brief-section-intro brief-reveal"><SectionLabel number="01" label="Executive status" /><h2>What is ready.<br />What needs a <em>decision.</em></h2></div>
          <div className="brief-status-grid">
            <article className="brief-status-card approved brief-reveal"><div><span>01</span><Check size={18} /></div><h3>Content strategy</h3><p>The full September programme, hooks, CTAs, scripts, production notes, and measurement framework are ready for client review.</p><b>READY TO APPROVE</b></article>
            <article className="brief-status-card approved brief-reveal delay-1"><div><span>02</span><Check size={18} /></div><h3>Visual Brand System</h3><p>The approved Clinical Prism direction remains available as a distinct reference for purple/cyan use, glass, layout, typography, and templates.</p><a href="/brand-system">OPEN BRAND SYSTEM <ArrowUpRight size={14} /></a></article>
            <article className="brief-status-card blocked brief-reveal delay-2"><div><span>03</span><CircleAlert size={18} /></div><h3>Website & domain</h3><p>The supplied audit found the public domain unreachable at the time of review. Domain ownership and DNS configuration require action first.</p><a href="#domain">REVIEW DOMAIN STATUS <ArrowDownRight size={14} /></a></article>
            <article className="brief-status-card waiting brief-reveal"><div><span>04</span><ShieldAlert size={18} /></div><h3>Authorised security testing</h3><p>The intended security test could not proceed because no live public endpoint was available. It remains deferred until the website is reachable.</p><b>DEPENDENT ON DOMAIN</b></article>
          </div>
        </section>

        <section className="brief-calendar" id="calendar">
          <div className="brief-calendar-head brief-reveal"><SectionLabel number="02" label="Full content calendar" /><div><h2>Every post,<br /><em>properly considered.</em></h2><p>The programme holds a 40 / 30 / 20 / 10 balance across education, patient proof, modality, and clinician branding. Select any post to review its complete creative direction.</p></div></div>
          <div className="brief-calendar-rail brief-reveal delay-1" role="tablist" aria-label="September content posts">
            {calendarPosts.map((item, index) => <button key={item.date} className={selectedPost === index ? `calendar-tab active ${item.tone}` : `calendar-tab ${item.tone}`} onClick={() => setSelectedPost(index)} role="tab" aria-selected={selectedPost === index}><span>{String(index + 1).padStart(2, "0")}</span><b>{item.date}</b><small>{item.pillar}</small></button>)}
          </div>
          <article className={`brief-post-detail ${post.tone} brief-reveal`}>
            <div className="brief-post-index"><span>POST</span><b>{String(selectedPost + 1).padStart(2, "0")}</b><i /></div>
            <div className="brief-post-top"><div><span className="brief-pill">{post.pillar}</span><h3>{post.hook}</h3></div><p><CalendarDays size={15} /> {post.date} · {post.format}</p></div>
            <div className="brief-post-grid">
              <div className="brief-field"><span>TARGET AUDIENCE</span><p>{post.audience}</p></div>
              <div className="brief-field"><span>FORMAT</span><p>{post.format}</p></div>
              <div className="brief-field wide"><span>SCRIPT / CREATIVE BRIEF</span><p>{post.brief}</p></div>
              <div className="brief-field cta-field"><span>CTA</span><p>{post.cta}</p></div>
              <div className="brief-field note-field"><span>PRODUCTION NOTE</span><p>{post.note}</p></div>
            </div>
            <div className="brief-detail-foot"><span>SEPTEMBER 2026 CONTENT PROGRAMME</span><button onClick={() => setSelectedPost((current) => (current + 1) % calendarPosts.length)}>Next post <ChevronRight size={16} /></button></div>
          </article>
        </section>

        <section className="brief-architecture">
          <div className="brief-architecture-copy brief-reveal"><SectionLabel number="03" label="Content architecture" /><h2>The mix<br /><em>does the work.</em></h2><p>Education earns trust at the top of the funnel. Proof, treatment clarity, and clinician presence progressively reduce the uncertainty around booking.</p></div>
          <div className="brief-pillar-stack brief-reveal delay-1"><div className="pillar-item education"><b>40%</b><span>Educational</span><small>Preventive reels and carousels.</small></div><div className="pillar-item proof"><b>30%</b><span>Patient proof</span><small>Consent-led recovery stories.</small></div><div className="pillar-item modality"><b>20%</b><span>Modality</span><small>Treatment and first-visit transparency.</small></div><div className="pillar-item clinician"><b>10%</b><span>Clinician branding</span><small>Human expertise, clear explanation.</small></div></div>
          <div className="brief-flow brief-reveal delay-2"><span>CAMPAIGN FLOW</span><div><b>01</b><p>Start with relevance</p></div><i /><div><b>02</b><p>Build awareness</p></div><i /><div><b>03</b><p>Build confidence</p></div><i /><div><b>04</b><p>Remove uncertainty</p></div><i /><div><b>05</b><p>Convert thoughtfully</p></div></div>
        </section>

        <section className="brief-caption-system">
          <div className="brief-caption-image brief-reveal"><img src={movementSrc} alt="A clinician explaining a movement in a bright studio" /><div /></div>
          <div className="brief-caption-copy brief-reveal delay-1"><SectionLabel number="04" label="Caption & CTA framework" /><h2>Match the ask<br />to the <em>intent.</em></h2><p>Every caption follows one sequence: a hook, useful context, an appropriate boundary, and one clear next step.</p><div className="brief-cta-list"><article><span>01</span><div><h3>Save or share</h3><p>Educational reels and carousels.</p><b>“Save this for your next desk day.”</b></div></article><article><span>02</span><div><h3>Comment or DM keyword</h3><p>Patient stories and audience research.</p><b>“DM ‘MOVE’ to ask how to book an assessment.”</b></div></article><article><span>03</span><div><h3>Book now</h3><p>First-visit and treatment spotlight posts.</p><b>“Book an assessment at [BOOKING LINK].”</b></div></article></div></div>
        </section>

        <section className="brief-boundary"><div className="brief-boundary-art" style={{ backgroundImage: `url(${abstractSrc})` }} /><div className="brief-boundary-copy brief-reveal"><span className="brief-eyebrow"><LockKeyhole size={14} /> DM boundary template</span><blockquote>“Thank you for getting in touch. We cannot assess or diagnose through social messages, but we can help you arrange an appointment to discuss your goals with a physiotherapist. You can book here: [BOOKING LINK].”</blockquote><p>This remains the public-message boundary throughout the calendar. It keeps social conversations helpful without turning them into individual diagnosis.</p></div></section>

        <section className="brief-production" id="production">
          <div className="brief-production-head brief-reveal"><SectionLabel number="05" label="Production & approval" /><div><h2>Make the month<br /><em>real, efficiently.</em></h2><p>A prepared shoot day protects quality. The three-batch plan makes the content efficient to capture and straightforward to approve.</p></div></div>
          <div className="brief-batch-grid">
            <article className="batch-card brief-reveal"><span>BATCH A · EDUCATION</span><h3>Posts 1, 2, 3 & 6</h3><p>One half-day with desk, stair, chair, and gym setups. Capture vertical video plus stills for covers.</p></article>
            <article className="batch-card dark brief-reveal delay-1"><span>BATCH B · TRUST & PROCESS</span><h3>Posts 4, 5, 7, 8, 9 & 10</h3><p>Film patient and clinician content only after consent. Capture reception, assessment, conversation, and treatment details.</p></article>
            <article className="batch-card cyan brief-reveal delay-2"><span>BATCH C · STORIES</span><h3>Publishing-day support</h3><p>Record short, low-edit clips for polls, Q&As, clinic walkthroughs, and World PT Day reminders.</p></article>
          </div>
          <div className="brief-approval-grid">
            <div className="brief-approval-copy brief-reveal"><h3>Client inputs<br />before production.</h3><p>Mark an item as confirmed as it becomes available. This review state is held locally in the presentation.</p><div className="brief-approval-progress"><span>{approvalCount} / {approvalItems.length} CONFIRMED</span><i><b style={{ width: `${(approvalCount / approvalItems.length) * 100}%` }} /></i></div></div>
            <div className="brief-approval-list brief-reveal delay-1">{approvalItems.map((item) => <button className={approvals[item.key] ? "brief-approval-item done" : "brief-approval-item"} key={item.key} onClick={() => toggleApproval(item.key)} aria-pressed={approvals[item.key]}><span>{approvals[item.key] ? <Check size={15} /> : ""}</span><div><b>{item.label}</b><small>{item.detail}</small></div><em>{approvals[item.key] ? "CONFIRMED" : "PENDING"}</em></button>)}</div>
          </div>
        </section>

        <section className="brief-domain" id="domain">
          <div className="brief-domain-head brief-reveal"><SectionLabel number="06" label="Website, domain & security status" /><h2>Recovery before<br /><em>testing.</em></h2><p>The website condition audit establishes a clear operational sequence: first clarify or restore the public domain; then build and verify the live website; only then can the authorised security-testing stage meaningfully proceed.</p></div>
          <div className="brief-domain-status brief-reveal delay-1"><div className="domain-status-title"><span><Globe2 size={18} /> VERIFIED STATUS</span><b>PUBLIC DOMAIN UNREACHABLE<br />AT TIME OF AUDIT</b></div><div className="domain-facts"><p><strong>DNS:</strong> The apex and `www` hostnames did not resolve through the tested public DNS path.</p><p><strong>HTTPS:</strong> No server endpoint was available, so HTTPS and TLS could not be established.</p><p><strong>Security test:</strong> The planned authorised external security test could not proceed because there was no reachable public website to test.</p></div></div>
          <div className="brief-charge-note brief-reveal"><CircleAlert size={20} /><div><span>CLIENT DECISION REQUIRED</span><h3>We will reconfigure the domain, or may need to purchase it again if it is no longer recoverable.</h3><p>Domain recovery or purchase, together with the deferred authorised security-testing stage, will require additional charges. No cost amount is assumed in this brief.</p></div></div>
          <div className="brief-recovery-roadmap">
            {[['01','Confirm ownership','Check the registrar account, renewal status, nameservers, DNS zone, and the intended canonical domain.'],['02','Reconfigure or purchase','Point a recoverable domain to the selected host, or confirm availability and purchase suitability if it is no longer registered.'],['03','Build & verify','Launch the healthcare website, then confirm HTTPS, contact actions, booking flow, responsive behaviour, accessibility, and backups.'],['04','Authorise security test','Once a real public endpoint exists and approval is in place, schedule the agreed security-testing scope.']].map(([number,title,copy]) => <article className="roadmap-step brief-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="brief-measurement">
          <div className="brief-measurement-copy brief-reveal"><SectionLabel number="07" label="Measurement framework" /><h2>Measure the<br /><em>right progress.</em></h2></div>
          <div className="brief-metrics brief-reveal delay-1"><article><span>01</span><h3>Awareness</h3><p><b>Track</b> Reach, non-follower reach, Reel views, profile visits.</p><small><b>October decision</b> Keep the strongest hook and topic.</small></article><article><span>02</span><h3>Education</h3><p><b>Track</b> Saves, shares, carousel completion, useful comments.</p><small><b>October decision</b> Turn the most-saved topic into a follow-up.</small></article><article><span>03</span><h3>Enquiries</h3><p><b>Track</b> Booking-link taps, DM keywords, calls, enquiry-to-booking rate.</p><small><b>October decision</b> Repeat the clearest conversion route.</small></article><article><span>04</span><h3>Community</h3><p><b>Track</b> Q&A submissions, replies, patient-story responses.</p><small><b>October decision</b> Build FAQ and proof themes from recurring questions.</small></article></div>
        </section>

        <section className="brief-schedule">
          <div className="brief-schedule-stage">
            <span className="brief-schedule-ring ring-a" /><span className="brief-schedule-ring ring-b" />
            <div className="brief-schedule-copy brief-reveal"><SectionLabel number="08" label="After approval" /><h2>Ready to put<br />the plan <em>on set?</em></h2><p>Once the content calendar, production requirements, and project direction are approved, choose a Shoot Meet with Machfold to plan the capture day.</p><div className="brief-schedule-meta"><span><b>120 MIN</b> SHOOT MEET</span><i /><span><b>MACHFOLD</b> VIA CAL.COM</span></div></div>
            <a className="brief-schedule-button brief-reveal delay-1" href="https://cal.com/machfold-ventures-vfsng6/shoot" target="_blank" rel="noreferrer"><span><CalendarDays size={18} /> BOOK A SHOOT MEET</span><ArrowUpRight size={19} /></a>
          </div>
        </section>

        <section className="brief-handoff"><div className="brief-handoff-orb" /><div className="brief-handoff-copy brief-reveal"><span className="brief-eyebrow"><ClipboardCheck size={14} /> Closing brief</span><h2>One calendar.<br />One website decision.<br /><em>One clear path forward.</em></h2><p>Review the post-level briefs, confirm production inputs, and resolve the domain decision before the next build and authorised testing stages.</p></div><div className="brief-handoff-card brief-reveal delay-1"><span>NEXT CLIENT ACTIONS</span><ol><li><b>01</b> Approve content calendar and production requirements.</li><li><b>02</b> Confirm domain ownership or approve repurchase/reconfiguration.</li><li><b>03</b> Provide clinic details, booking route, and consented assets.</li></ol><a href="/brand-system">View the preserved Brand System <ExternalLink size={15} /></a></div></section>
      </main>
      <footer className="brief-footer"><span>OPTIMUM PHYSIO · IN-DEPTH CLIENT BRIEF</span><span>SEPTEMBER 2026 CONTENT STRATEGY</span><span>BRAND SYSTEM PRESERVED SEPARATELY</span></footer>
    </div>
  );
}
