/**
 * Clinical Prism design reminder: Optimum Purple anchors the system; cyan is a scarce motion cue;
 * frosted panels must clarify hierarchy; white space and one-message-per-frame lead every composition.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Clipboard,
  Copy,
  Menu,
  MoveUpRight,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

const logoSrc = "/media/optimum-logo_331074c5.png";
const heroSrc = "/media/optimum-hero-clinic_fcbd1627.jpg";
const movementSrc = "/media/optimum-editorial-movement_398382a7.jpg";
const abstractSrc = "/media/optimum-glass-motion_62420156.jpg";
const motionMarkSrc = "/media/optimum-motion-mark_2fe10bff.png";

const palette = [
  { name: "Optimum Purple", hex: "#4B4895", usage: "25–35% · anchor" },
  { name: "Clinical Night", hex: "#171638", usage: "10–20% · depth" },
  { name: "Soft Iris", hex: "#7773C2", usage: "5–12% · support" },
  { name: "Rehab Cyan", hex: "#35BDD0", usage: "4–8% · motion" },
  { name: "Frost White", hex: "#FAFBFF", usage: "25–35% · space" },
  { name: "Lilac Mist", hex: "#EEEFFC", usage: "8–15% · glass" },
  { name: "Ink", hex: "#20203B", usage: "5–10% · reading" },
  { name: "Soft Coral", hex: "#DE685F", usage: "0–3% · signal" },
];

const principles = [
  ["01", "Logo-first recognition", "The circular purple mark stays fixed, legible, and confidently spaced."],
  ["02", "Glass has a job", "A frosted plane separates a message from its context. It is never empty decoration."],
  ["03", "One message per frame", "Each post, slide, or thumbnail moves the viewer through one idea and one next step."],
  ["04", "White space is trust", "Calm space gives clinical content room to be understood, not just noticed."],
];

const formatCards = [
  { eyebrow: "Feed post", title: "One signal.\nOne action.", kind: "feed" },
  { eyebrow: "Carousel", title: "Explain it\nwithout crowding it.", kind: "carousel" },
  { eyebrow: "Reel thumbnail", title: "Make the tap\nfeel obvious.", kind: "reel" },
  { eyebrow: "Story", title: "One prompt.\nOne response.", kind: "story" },
];

const approvalItems = [
  { key: "logo", label: "Logo use", detail: "Quiet placement and clear space are protected." },
  { key: "palette", label: "Palette weighting", detail: "Purple anchors, cyan moves, coral only signals." },
  { key: "glass", label: "Glass hierarchy", detail: "Panels are limited and always legible." },
  { key: "formats", label: "Format system", detail: "Posts, carousels, reels, and stories share one rhythm." },
] as const;

type ApprovalKey = (typeof approvalItems)[number]["key"];

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      <p>{label}</p>
    </div>
  );
}

function CopySwatch({ name, hex, usage }: (typeof palette)[number]) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(hex);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="swatch" onClick={copy} aria-label={`Copy ${name} colour ${hex}`}>
      <span className="swatch-color" style={{ background: hex }} />
      <span className="swatch-copy">
        <strong>{name}</strong>
        <small>{usage}</small>
      </span>
      <span className="swatch-hex">{copied ? <Check size={15} /> : <Copy size={14} />}{copied ? "Copied" : hex}</span>
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [approvals, setApprovals] = useState<Record<ApprovalKey, boolean>>({
    logo: true,
    palette: true,
    glass: true,
    formats: true,
  });
  const approvedCount = Object.values(approvals).filter(Boolean).length;
  const allApproved = approvedCount === approvalItems.length;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-enabled");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  const toggleApproval = (key: ApprovalKey) => setApprovals((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="brand-site">
      <div className="grain" />
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Optimum visual system home">
          <img src={logoSrc} alt="Optimum Physio movement logo" />
          <span>OPTIMUM <b>/</b> VISUAL SYSTEM</span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#direction" onClick={() => setMenuOpen(false)}>Direction</a>
          <a href="#palette" onClick={() => setMenuOpen(false)}>Palette</a>
          <a href="#glass" onClick={() => setMenuOpen(false)}>Glass rules</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>Applications</a>
        </nav>
        <a className="header-cta" href="#handoff">Client handoff <ArrowDownRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><Sparkles size={14} /> Brand system · Client presentation</div>
            <h1>A calmer system<br />for content that<br /><em>moves people.</em></h1>
            <p>Optimum Physio’s logo-led visual direction, rebuilt around clinical clarity, quiet glass, and a more recognisable social rhythm.</p>
            <a className="primary-link" href="#direction">Explore the direction <MoveUpRight size={17} /></a>
          </div>
          <div className="hero-visual reveal delay-1">
            <img className="hero-image" src={heroSrc} alt="A calm physiotherapy studio consultation" />
            <div className="hero-image-overlay" />
            <div className="hero-plate glass-dark">
              <span className="plate-kicker">SYSTEM PLATE · 01</span>
              <h2>Minimalism,<br />with a clinical pulse.</h2>
              <div className="plate-meta"><span>01—06</span><span>2026</span></div>
            </div>
            <div className="motion-arc" aria-hidden="true"><i /><i /><i /></div>
            <img className="hero-logo" src={logoSrc} alt="" />
          </div>
          <div className="hero-foot">
            <span>SCROLL TO REVIEW</span><ArrowDownRight size={18} />
            <p>OPTIMUM PURPLE <b>#4B4895</b></p>
          </div>
        </section>

        <section className="intro-section" id="direction">
          <div className="side-rail"><span>01</span><i /></div>
          <div className="intro-grid">
            <div className="intro-copy reveal">
              <SectionLabel number="01" label="The pivot" />
              <h2>From more noise<br />to more <em>signal.</em></h2>
              <p className="lead">The visual system keeps the energy Optimum already owns—purple, cyan, clinicians, movement—and removes the density that makes information compete with itself.</p>
            </div>
            <div className="pivot-card glass-light reveal delay-1">
              <div className="pivot-grid">
                <div><span className="micro-label">RETAIN</span><p>Logo equity, real clinicians, medical relevance, motion.</p></div>
                <div><span className="micro-label">REDUCE</span><p>Competing colours, dense footers, icon grids, poster-like clutter.</p></div>
                <div><span className="micro-label">INTRODUCE</span><p>Frosted hierarchy, shared spacing, decisive thumbnails, calm rhythm.</p></div>
              </div>
              <div className="pivot-line"><span>Existing energy</span><i /><strong>Controlled clarity</strong></div>
            </div>
          </div>
        </section>

        <section className="principles-section">
          <div className="principles-head reveal">
            <SectionLabel number="02" label="Visual principles" />
            <p>Every layout starts here. These rules are more important than any individual post template.</p>
          </div>
          <div className="principles-list">
            {principles.map(([number, title, copy]) => (
              <article className="principle reveal" key={number}>
                <span className="principle-number">{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <ArrowUpRight className="principle-arrow" size={18} />
              </article>
            ))}
          </div>
        </section>

        <section className="palette-section" id="palette">
          <div className="palette-content">
            <div className="palette-head reveal">
              <SectionLabel number="03" label="Core palette" />
              <h2>Purple owns the stage.<br /><em>Cyan shows the motion.</em></h2>
              <p>Click any value to copy it. In use, the palette is intentionally weighted: purple and frost white hold the system; cyan moves through it; coral only signals a specific moment.</p>
            </div>
            <div className="swatches reveal delay-1">
              {palette.map((item) => <CopySwatch key={item.hex} {...item} />)}
            </div>
          </div>
          <div className="palette-art reveal delay-2">
            <img src={abstractSrc} alt="Abstract purple and cyan glass motion artwork" />
            <div className="palette-art-note glass-dark"><span>RANGE OF MOTION</span><b>4–8%</b><small>cyan as a controlled cue</small></div>
          </div>
        </section>

        <section className="glass-section" id="glass">
          <div className="glass-top reveal">
            <SectionLabel number="04" label="Glass specification" />
            <div><h2>Glass has a job.</h2><p>It creates hierarchy over imagery and gives clinical information a legible, calm place to land.</p></div>
          </div>
          <div className="glass-demo">
            <div className="glass-stage reveal">
              <div className="stage-lines" />
              <div className="glass-token glass-surface-a"><span>01</span><b>Base</b><small>Quiet colour or softened photo</small></div>
              <div className="glass-token glass-surface-b"><span>02</span><b>Tint</b><small>White or lilac at controlled opacity</small></div>
              <div className="glass-token glass-surface-c"><span>03</span><b>Edge</b><small>One fine translucent border</small></div>
              <div className="glass-token glass-surface-d"><span>04</span><b>Depth</b><small>Blur and a soft, low shadow</small></div>
              <div className="glass-limit"><Plus size={14} /><span>MAX 2 MAJOR PANELS / FEED SLIDE</span></div>
            </div>
            <div className="glass-rules reveal delay-1">
              <div className="rule-card"><span>LIGHT GLASS</span><code>rgba(255,255,255,.62–.78)</code><p>Educational carousels, quote cards, service explainers.</p></div>
              <div className="rule-card purple-rule"><span>PURPLE GLASS</span><code>rgba(75,72,149,.72–.88)</code><p>Reel covers, clinician Q&A, direct hooks.</p></div>
              <div className="rule-card night-rule"><span>DARK GLASS</span><code>rgba(23,22,56,.72–.86)</code><p>Treatment process, portraits, high-contrast endings.</p></div>
            </div>
          </div>
        </section>

        <section className="type-section">
          <div className="type-header reveal">
            <SectionLabel number="05" label="Typography" />
            <p>The type system stays direct and human—confident in the hook, calm in the explanation.</p>
          </div>
          <div className="type-specimen reveal delay-1">
            <div className="specimen-main"><span className="micro-label">MANROPE · EXTRABOLD</span><h2>Make the next<br />step <em>clear.</em></h2></div>
            <div className="specimen-side"><span className="micro-label">DM SANS · REGULAR</span><p>Readable clinical context should feel like a considered conversation, not a wall of information.</p><span className="mono-sample">IBM PLEX MONO · UTILITY LABEL</span></div>
          </div>
          <div className="type-rule"><span>Sentence case</span><i /> <span>Short lines</span><i /> <span>One thought</span><i /> <span>Room to breathe</span></div>
        </section>

        <section className="applications-section" id="applications">
          <div className="applications-top">
            <div className="reveal"><SectionLabel number="06" label="Application system" /><h2>Designed to hold<br /><em>real content.</em></h2></div>
            <p className="reveal delay-1">The system is not an aesthetic overlay. It is a set of repeatable choices for feed posts, carousels, thumbnails, reels, stories, and the moments between them.</p>
          </div>
          <div className="format-grid">
            {formatCards.map((card, index) => (
              <article className={`format-card ${card.kind} reveal`} style={{ transitionDelay: `${index * 70}ms` }} key={card.kind}>
                <div className="format-top"><span>{card.eyebrow}</span><img src={logoSrc} alt="" /></div>
                <h3>{card.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <div className="format-bottom"><span>{String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={18} /></div>
              </article>
            ))}
          </div>
          <div className="application-feature">
            <div className="application-image reveal"><img src={movementSrc} alt="Clinician explaining a mobility movement in a bright studio" /><div className="image-fade" /></div>
            <div className="application-copy glass-light reveal delay-1">
              <span className="micro-label">IMAGE BEHAVIOUR</span>
              <h3>Keep the human moment<br />in the frame.</h3>
              <p>Use a real clinician, a consented patient movement, or a quiet clinic detail. The card clarifies the idea; it does not hide the care.</p>
              <div className="application-bullets"><span><Check size={15} /> Natural skin tones</span><span><Check size={15} /> One focal subject</span><span><Check size={15} /> Space for the message</span></div>
            </div>
          </div>
        </section>

        <section className="protocol-section">
          <div className="protocol-copy reveal"><SectionLabel number="07" label="Production protocol" /><h2>Every asset answers<br />a useful question.</h2><p>The system stays focused by asking what each post needs to make easier: understanding, expectation, action, or reassurance.</p></div>
          <div className="protocol-list reveal delay-1">
            {[
              ["01", "What is happening?", "Define the relevant movement, concern, process, or story."],
              ["02", "Why might it matter?", "Give clear, general context without overclaiming."],
              ["03", "What can I expect?", "Make the next part of the care journey more transparent."],
              ["04", "What is the next sensible step?", "Offer one action: save, ask, DM, or book."],
            ].map(([num, title, text]) => <div className="protocol-item" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </section>

        <section className="approval-section" id="approval">
          <div className="approval-orb approval-orb-a" />
          <div className="approval-orb approval-orb-b" />
          <div className="approval-copy reveal">
            <SectionLabel number="08" label="Client approval" />
            <h2>Lock the system<br />with <em>intent.</em></h2>
            <p>Use this checkpoint to make the visual decisions explicit. Approval is recorded locally in this presentation, ready to guide the next production step.</p>
            <div className="approval-progress" aria-label={`${approvedCount} of ${approvalItems.length} design decisions approved`}>
              <div className="approval-progress-top"><span>DESIGN DECISIONS</span><b>{approvedCount}/{approvalItems.length}</b></div>
              <div className="approval-track"><i style={{ width: `${(approvedCount / approvalItems.length) * 100}%` }} /></div>
            </div>
          </div>
          <div className="approval-panel glass-light reveal delay-1">
            <div className="approval-panel-head">
              <div><span className="micro-label">REVIEW STATUS</span><h3>{allApproved ? "System approved" : "Review in progress"}</h3></div>
              <span className={allApproved ? "approval-status approved" : "approval-status"}>{allApproved ? <Check size={14} /> : <Clipboard size={14} />}{allApproved ? "READY" : "REVIEW"}</span>
            </div>
            <div className="approval-list">
              {approvalItems.map((item) => (
                <button
                  className={approvals[item.key] ? "approval-item checked" : "approval-item"}
                  key={item.key}
                  onClick={() => toggleApproval(item.key)}
                  aria-pressed={approvals[item.key]}
                >
                  <span className="approval-check">{approvals[item.key] && <Check size={14} />}</span>
                  <span className="approval-item-copy"><b>{item.label}</b><small>{item.detail}</small></span>
                  <span className="approval-item-state">{approvals[item.key] ? "APPROVED" : "PENDING"}</span>
                </button>
              ))}
            </div>
            <div className="approval-note"><span>CLIENT NOTE</span><p>{allApproved ? "The visual system is ready to translate into the first Canva template suite." : "Select every decision that is approved before moving into template production."}</p></div>
          </div>
        </section>

        <section className="handoff-section" id="handoff">
          <div className="handoff-orb" />
          <img className="handoff-mark" src={motionMarkSrc} alt="Abstract Optimum movement mark" />
          <div className="handoff-copy reveal"><span className="micro-label">READY FOR HANDOFF</span><h2>One message.<br />One motion cue.<br /><em>One clear next step.</em></h2><p>Use this system to make Optimum Physio feel recognisable before the viewer reads a single caption.</p></div>
          <div className="handoff-card glass-dark reveal delay-1"><span>FINAL CHECK</span><ul><li><Check size={15} /> Clear, quiet logo placement</li><li><Check size={15} /> One focal message</li><li><Check size={15} /> Glass only where it helps</li><li><Check size={15} /> Mobile contrast checked</li></ul><a href="#top">Back to system <ArrowUpRight size={15} /></a></div>
        </section>
      </main>

      <footer className="site-footer"><span>OPTIMUM PHYSIO · VISUAL SYSTEM</span><span>CLIENT REVIEW · 2026</span><span>BUILT FOR A CALMER SOCIAL RHYTHM</span></footer>
    </div>
  );
}
