import { useEffect, useRef, useState } from "react";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Bot, BrainCircuit, CheckCircle2, Database, FileKey2, Globe2, HeartHandshake, MessageSquareWarning, ShieldCheck, Siren, UserRound, UsersRound, Wrench } from "lucide-react";
import SectionHeader from "../../shared/SectionHeader";
import FAQSection from "../../shared/FAQSection";
import { agenticRisks, attackCategories, boundaries, deliverables, engagementModels, engagementSteps, llmRisks, redTeamFailures, redTeamFaqs, severityRows } from "./RedTeamingContent";

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { rootMargin: "0px 0px -8%", threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`rt-reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
};

const DataTable = ({ headers, rows, minWidth = 880 }: { headers: readonly string[]; rows: readonly (readonly string[])[]; minWidth?: number }) => (
  <div className="max-w-full overflow-x-auto rounded-[1.75rem] border border-border bg-card" tabIndex={0} role="region" aria-label={`${headers[0]} table`}>
    <table className="w-full border-collapse text-left" style={{ minWidth }}>
      <thead className="bg-[#101a2c] text-white"><tr>{headers.map((header) => <th key={header} scope="col" className="border-r border-white/10 px-5 py-4 font-heading text-sm font-bold last:border-r-0">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`} className="border-t border-border transition-colors hover:bg-primary/[.035]">{row.map((cell, cellIndex) => <td key={cellIndex} className={`border-r border-border px-5 py-4 align-top text-sm leading-6 last:border-r-0 ${cellIndex === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

export const RedTeamingMotionStyles = () => <style>{`
  .rt-reveal{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease}.rt-reveal.is-visible{opacity:1;transform:none}
  .rt-trace{stroke-dasharray:12 12;animation:rtTrace 10s linear infinite}.rt-pulse{transform-box:fill-box;transform-origin:center;animation:rtPulse 2.8s ease-in-out infinite}.rt-scan{animation:rtScan 4.8s ease-in-out infinite}
  @keyframes rtTrace{to{stroke-dashoffset:-240}}@keyframes rtPulse{50%{transform:scale(1.12);opacity:.72}}@keyframes rtScan{0%,100%{transform:translateX(-8%);opacity:.15}50%{transform:translateX(88%);opacity:.65}}
  @media(prefers-reduced-motion:reduce){.rt-reveal{opacity:1;transform:none}.rt-trace,.rt-pulse,.rt-scan{animation:none}}
`}</style>;

export const RedTeamDefinition = () => (
  <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Behaviour, not infrastructure" title="What AI Red Teaming Is" gradientText="— and What It Isn't" subtitle="A red team attempts to make the complete AI system fail, then turns every confirmed success into reproducible engineering evidence."/><Reveal className="mx-auto max-w-7xl">
    <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start"><div className="lg:sticky lg:top-32"><span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-primary">The deliverable</span><p className="mt-5 font-heading text-3xl font-bold leading-tight md:text-4xl">A list of attacks that worked—not a score and not a pass mark.</p><p className="mt-5 text-base leading-8 text-muted-foreground">Each finding contains the exact input sequence, observed output, severity, reproduction confidence and what an attacker gains.</p></div><div className="overflow-hidden rounded-[2rem] border border-border">
      {[
        ["Bias & fairness audit", "Does it treat groups differently?", "Distributions, metrics and sample sizes", "/ai-data-services/model-testing/bias-fairness-audit"],
        ["AI red teaming", "Can it be made to fail?", "Successful, reproducible attacks", ""],
        ["LLM evaluation", "How well does it do the intended job?", "Quality scores against a rubric", "/ai-data-services/model-testing/llm-evaluation"],
        ["Penetration testing", "Can infrastructure be compromised?", "Not an eQOURSE service", ""],
      ].map(([name, question, evidence, href], index) => <div key={name} className={`grid gap-2 border-b border-border p-6 last:border-b-0 sm:grid-cols-[1fr_1.25fr_1fr] ${index === 1 ? "bg-[#101a2c] text-white" : "bg-card"}`}><h3 className={`font-heading text-lg font-bold ${index === 1 ? "text-teal-300" : ""}`}>{href ? <Link to={href} className="hover:text-primary">{name}</Link> : name}</h3><p className={index === 1 ? "text-white/75" : "text-muted-foreground"}>{question}</p><p className={`text-sm font-semibold ${index === 1 ? "text-amber-300" : "text-primary"}`}>{evidence}</p></div>)}
    </div></div>
  </Reveal></div></section>
);

const FrameworkBlock = ({ id, title, intro, rows }: { id: string; title: string; intro: string; rows: readonly (readonly string[])[] }) => (
  <Reveal className="mb-12 last:mb-0" ><div id={id} className="scroll-mt-32"><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h3 className="font-heading text-2xl font-bold md:text-3xl">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{intro}</p></div><span className="shrink-0 font-mono text-[11px] uppercase tracking-[.16em] text-primary">Last reviewed: August 2026</span></div><DataTable headers={["Code", "Risk", "How we test it"]} rows={rows} minWidth={940}/></div></Reveal>
);

export const FrameworksSection = () => (
  <section className="bg-muted/35 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Named framework coverage" title="Frameworks We" gradientText="Test Against" subtitle="Every engagement maps findings to at least one recognised framework; most map to two."/><div className="mx-auto max-w-7xl"><FrameworkBlock id="owasp-llm-top-10" title="OWASP Top 10 for LLM Applications (2025)" intro="Coverage spans direct model behaviour, retrieved content, output handling and excessive agency." rows={llmRisks}/><FrameworkBlock id="owasp-agentic-top-10" title="OWASP Top 10 for Agentic Applications (2026)" intro="If a system plans, calls tools or runs unattended, the LLM list no longer covers the complete surface." rows={agenticRisks}/><Reveal className="rounded-[2rem] border border-primary/20 bg-primary/5 p-7 md:p-9"><h3 id="nist-ai-rmf-iso-42001" className="scroll-mt-32 font-heading text-2xl font-bold">NIST AI RMF &amp; ISO/IEC 42001</h3><p className="mt-4 max-w-4xl leading-7 text-muted-foreground">Findings are mapped to the NIST AI Risk Management Framework functions—<strong className="text-foreground">Govern, Map, Measure and Manage</strong>. For teams working toward ISO/IEC 42001, the method statement and evidence pack can serve as measurement evidence within the management system.</p></Reveal></div></div></section>
);

const attackSurfaceLayers = [
  { label: "Prompt & context", risk: "Direct jailbreaks and multi-turn pressure", icon: MessageSquareWarning },
  { label: "Retrieval", risk: "Indirect injection and poisoned sources", icon: Database },
  { label: "Model & guardrails", risk: "Policy bypass and harmful output", icon: BrainCircuit },
  { label: "Tools & permissions", risk: "Unsafe calls and excessive agency", icon: Wrench },
  { label: "Memory & downstream state", risk: "Persistent poisoning and reused compromise", icon: FileKey2 },
] as const;

const AttackSurfaceDiagram = () => (
  <div role="img" aria-label="An adversarial input can enter at prompt, retrieval, model, tools or memory layers. Testing follows the path through the system to the resulting impact." className="p-2 sm:p-4">
    <div className="flex items-center gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-amber-200">
      <Siren className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div><p className="text-xs font-bold uppercase tracking-[.16em]">Adversarial entry</p><p className="mt-1 text-xs text-white/65">Prompt · upload · retrieved content · tool response</p></div>
    </div>
    <div className="ml-7 h-5 border-l-2 border-dashed border-amber-300/60" aria-hidden="true" />
    <div className="space-y-2">
      {attackSurfaceLayers.map(({ label, risk, icon: Icon }, index) => (
        <div key={label} className="relative grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.045] px-3 py-3.5 sm:grid-cols-[2.75rem_8.5rem_1fr] sm:px-4">
          <div className={`grid h-10 w-10 place-items-center rounded-xl ${index === 3 ? "bg-amber-300 text-[#101a2c]" : "bg-teal-300/10 text-teal-300"}`}><Icon className="h-5 w-5" aria-hidden="true" /></div>
          <p className="text-sm font-bold text-white">{label}</p>
          <p className="col-start-2 text-xs leading-5 text-white/60 sm:col-start-3">{risk}</p>
          {index < attackSurfaceLayers.length - 1 && <span className="absolute -bottom-3 left-[1.85rem] z-10 grid h-4 w-4 place-items-center rounded-full bg-[#101a2c] text-teal-300 sm:left-[2.1rem]" aria-hidden="true"><ArrowDown className="h-3 w-3" /></span>}
        </div>
      ))}
    </div>
    <div className="ml-7 h-5 border-l-2 border-dashed border-amber-300/60" aria-hidden="true" />
    <div className="flex items-center gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3">
      <span className="rt-pulse h-3 w-3 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
      <div><p className="text-xs font-bold uppercase tracking-[.16em] text-amber-200">Observed consequence</p><p className="mt-1 text-xs text-white/65">Data exposure · unsafe action · persistent state · user harm</p></div>
    </div>
    <p className="mt-4 text-center text-xs leading-5 text-white/50">An attack may enter at any layer. We trace it until the consequence ends.</p>
  </div>
);

export const AttackSurfaceSection = () => (
  <section id="attack-surface" className="scroll-mt-32 bg-[#101a2c] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader light label="Human adversarial coverage" title="What We" gradientText="Actually Try" subtitle="The target is the whole system: its guardrails, context, retrieval, tools and memory—not an isolated base model."/><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><Reveal className="rounded-[2rem] border border-white/10 bg-white/[.035] p-3 sm:p-5"><AttackSurfaceDiagram/></Reveal><Reveal className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">{attackCategories.map(([title, text], index) => <article key={title} id={index < 4 ? title.toLowerCase().replace(/[^a-z]+/g,"-").replace(/(^-|-$)/g,"") : undefined} className={`p-5 md:p-6 ${index === 2 ? "bg-amber-400/10" : "bg-[#101a2c]"}`}><span className="font-mono text-[10px] text-teal-300">0{index + 1}</span><h3 className="mt-3 font-heading text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p></article>)}</Reveal></div></div></section>
);

export const MultilingualSection = () => (
  <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Native authoring changes the result" title="The Multilingual" gradientText="Attack Surface" subtitle="Safety training is uneven across languages. An attack that fails in English can succeed in translation—but only when the attack itself is written naturally."/><div className="mx-auto max-w-7xl"><Reveal className="grid overflow-hidden rounded-[2rem] border border-border lg:grid-cols-[.78fr_1.22fr]"><div className="bg-[#101a2c] p-8 text-white md:p-10"><p className="font-mono text-xs uppercase tracking-[.18em] text-teal-300">Published 2026 research</p><div className="mt-8 grid grid-cols-2 gap-7"><div><strong className="font-heading text-5xl text-white">59.8%</strong><p className="mt-2 text-sm text-white/55">mean jailbreak rate from automated translated attacks</p></div><div><strong className="font-heading text-5xl text-amber-300">75.8%</strong><p className="mt-2 text-sm text-white/55">with native-speaking human red teamers</p></div></div><p className="mt-8 text-xs leading-6 text-white/45">The cited study covered Afrikaans, Kiswahili, isiXhosa and isiZulu. These percentages evidence the language mechanism; they are not measurements of Indian languages.</p></div><div className="bg-card p-8 md:p-10"><h3 className="font-heading text-2xl font-bold">What native speakers find that translation doesn't</h3><div className="mt-6 divide-y divide-border">{[["Register & honorifics","Social hierarchy encoded in grammar can make a request read as legitimate."],["Code-mixing","Hinglish, Tanglish and Benglish cross gaps between guardrail sets."],["Transliteration","Romanised and native-script versions can be unrelated to a tokenizer."],["Cultural harm","Caste-coded language, communal framing, local slurs and dog-whistles need market context."],["Idiom & indirection","Native speakers know how to ask without naming the prohibited intent."]].map(([t,d]) => <div key={t} className="grid gap-2 py-4 sm:grid-cols-[.55fr_1fr]"><h4 className="font-semibold text-foreground">{t}</h4><p className="text-sm leading-6 text-muted-foreground">{d}</p></div>)}</div></div></Reveal><Reveal className="mt-8 border-y border-border py-7 text-center"><p className="font-heading text-2xl font-bold">30+ global languages. 12+ Indian languages. Native authoring—not translation from an English master.</p><p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese and Urdu, plus romanised and code-mixed variants. If a requested language is not currently staffed, we say so.</p></Reveal></div></div></section>
);

const FlowArrow = ({ agentic = false }: { agentic?: boolean }) => <ArrowRight className={`h-5 w-5 shrink-0 rotate-90 sm:rotate-0 ${agentic ? "text-amber-500" : "text-primary/55"}`} aria-hidden="true" />;

const BlastRadiusDiagram = () => {
  const chatbotSteps = [
    { label: "Unsafe response", detail: "Model produces bad output", icon: Bot },
    { label: "User sees it", detail: "A person decides what happens next", icon: UserRound },
  ];
  const agenticSteps = [
    { label: "Unsafe decision", detail: "Model selects a harmful action", icon: BrainCircuit },
    { label: "Tool executes", detail: "Permission turns text into action", icon: Wrench },
    { label: "State changes", detail: "Data, memory or a system is altered", icon: Database },
    { label: "Impact spreads", detail: "Later users or agents inherit it", icon: Siren },
  ];
  return <div role="img" aria-label="A chatbot failure stops at a user who can decide whether to act. An agentic failure can select and execute a tool, change system state and spread downstream.">
    <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
      <div className="rounded-3xl border border-primary/25 bg-primary/[.045] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><div><p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-primary">Chatbot failure</p><p className="mt-1 text-xs text-muted-foreground">Output remains advisory</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Human decision gate</span></div>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {chatbotSteps.map(({ label, detail, icon: Icon }, index) => <div key={label} className="contents"><div className="min-w-0 flex-1 rounded-2xl border border-primary/15 bg-white p-4"><Icon className="h-5 w-5 text-primary" aria-hidden="true"/><p className="mt-3 text-sm font-bold text-foreground">{label}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></div>{index < chatbotSteps.length - 1 && <FlowArrow/>}</div>)}
        </div>
      </div>
      <div className="rounded-3xl border border-amber-400/35 bg-amber-50/70 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><div><p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-amber-700">Agentic failure</p><p className="mt-1 text-xs text-muted-foreground">Output can become an executed event</p></div><span className="rounded-full bg-amber-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900">Larger blast radius</span></div>
        <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          {agenticSteps.map(({ label, detail, icon: Icon }, index) => <div key={label} className="contents"><div className={`min-w-0 flex-1 rounded-2xl border p-3.5 ${index === agenticSteps.length - 1 ? "border-amber-400 bg-amber-100" : "border-amber-300/50 bg-white"}`}><Icon className={`h-5 w-5 ${index === agenticSteps.length - 1 ? "rt-pulse text-amber-600" : "text-amber-600"}`} aria-hidden="true"/><p className="mt-3 text-sm font-bold text-foreground">{label}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{detail}</p></div>{index < agenticSteps.length - 1 && <FlowArrow agentic/>}</div>)}
        </div>
      </div>
    </div>
    <div className="mt-5 flex items-start justify-center gap-2 rounded-2xl bg-[#101a2c] px-5 py-4 text-center text-sm text-white"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true"/><p><strong>Testing rule:</strong> follow every successful failure through tools, memory and downstream systems until its consequence ends.</p></div>
  </div>;
};

export const AgenticAndComparison = () => (
  <>
    <section id="agentic-blast-radius" className="scroll-mt-32 bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Actions change the consequence" title="If Your System Takes Actions," gradientText="the Surface Is Different" subtitle="Once a system plans, remembers or calls tools, a bad output can become an irreversible downstream event."/><div className="mx-auto max-w-7xl"><Reveal className="rounded-[2rem] border border-border bg-white p-4 shadow-soft md:p-8"><BlastRadiusDiagram/></Reveal><Reveal className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">{[["Blast radius","A successful injection produces an executed action, not only bad text."],["Persistence","Memory poisoning planted today can fire next week for a different user."],["Chained failure","One plausible bad output becomes trusted input to the next step or agent."]].map(([t,d],i)=><article key={t} className="bg-card p-7"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-4 font-heading text-xl font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</Reveal><p className="mt-7 rounded-2xl bg-amber-50 p-6 text-sm leading-7 text-amber-950"><strong>Human-in-the-loop is not a control until it has been tested.</strong> We test whether confirmation can be buried in a batch, weakened by reviewer fatigue or phrased so the person approves something other than what they read.</p></div></div></section>
    <section id="human-vs-automated" className="scroll-mt-32 bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Complementary, not competing" title="Human Red Teaming and Automated Scanning" gradientText="Do Different Jobs" subtitle="Scanners provide continuous regression coverage. People find novel failures specific to the system in front of them."/><div className="mx-auto max-w-6xl"><DataTable headers={["Dimension","Automated scanning","Human red teaming"]} rows={[["Finds","Known attack families at scale","Novel failures specific to your system"],["Coverage","Thousands of templates per run","Tens to low hundreds of deliberate probes"],["Best used for","Regression testing and broad first-pass coverage","Pre-launch assurance and capability changes"],["Multi-turn","Mostly single-shot or scripted","The core method"],["Novel attacks","None by definition","The entire point"],["Cost per finding","Low for known issues; infinite for unknown ones","Higher per hour; the route to unknown issues"],["Cadence","Continuous, in CI","Periodic, at milestones"]]} minWidth={850}/><p className="mt-7 text-center text-base font-semibold">The sensible programme runs both: scanners in the pipeline, human red teams at launch and major capability changes.</p></div></div></section>
  </>
);

export const EngagementMethod = () => (
  <section className="bg-[#101a2c] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader light label="Authorised, logged, reproducible" title="How We Run" gradientText="an Engagement" subtitle="A first engagement against one system in two or three languages typically runs 6–7 weeks. Add roughly one week per additional language."/><div className="mx-auto max-w-7xl"><svg viewBox="0 0 1100 120" role="img" aria-labelledby="flow-title flow-desc" className="mb-5 hidden w-full lg:block"><title id="flow-title">Six-step red team engagement flow</title><desc id="flow-desc">Scope, threat model, attack-set construction, adversarial sessions, triage and reporting.</desc><path d="M65 60H1035" stroke="currentColor" strokeWidth="3" className="text-white/15"/><path d="M65 60H1035" stroke="hsl(170 82% 55%)" strokeWidth="3" className="rt-trace"/>{engagementSteps.map((_,i)=><g key={i}><circle cx={65+i*194} cy="60" r="18" fill={i===3?"hsl(35 92% 52%)":"hsl(170 82% 38%)"}/><text x={65+i*194} y="65" textAnchor="middle" fontSize="12" fill="white">{i+1}</text></g>)}</svg><ol className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{engagementSteps.map(([n,t,w,d],i)=><li key={n} className={`p-7 ${i===3?"bg-amber-400/10":"bg-[#101a2c]"}`}><div className="flex items-center justify-between"><span className="font-mono text-xs text-teal-300">{n}</span><span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">{w}</span></div><h3 className="mt-5 font-heading text-lg font-bold">{t}</h3><p className="mt-3 text-sm leading-6 text-white/60">{d}</p></li>)}</ol><p className="mt-7 text-center text-sm text-white/60">Successful attacks are immediately re-run. If it worked once and cannot be repeated, it is a note—not a finding.</p></div></div></section>
);

export const SeverityAndWellbeing = () => (
  <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Impact × effort × confidence" title="How We Rate" gradientText="What We Find" subtitle="Severity reflects what an attack achieves and how hard it is to run—not how alarming the output looks."/><div className="mx-auto max-w-6xl"><DataTable headers={["Severity","Criteria","Handling"]} rows={severityRows} minWidth={850}/><p className="mt-6 text-center text-sm leading-6 text-muted-foreground">Every finding carries reproduction confidence. A result that succeeds 10/10 times is a different engineering priority from one that succeeds 2/10.</p></div></div></section>
    <section className="bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><Reveal><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary">People are part of the method</p><h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-5xl">Our Red Team Bench—<span className="text-gradient">and How We Look After It</span></h2><p className="mt-5 leading-8 text-muted-foreground">Red teaming means repeatedly eliciting content a safety policy exists to prevent, then reading it closely enough to document. That cost must be managed for both people and evidence quality.</p><div className="mt-7 divide-y divide-border border-y border-border">{["Trained and briefed red teamers—not random assignment","Exposure limits and rotation away from sustained harmful-content sessions","Opt-out without penalty from any harm category","Counselling access and a named lead for check-ins","Logged, reviewed sessions for the most severe categories","Restricted handling under ISO 27001 controls and agreed destruction"].map((item)=><div key={item} className="flex gap-3 py-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary"/><span className="text-sm font-semibold">{item}</span></div>)}</div><p className="mt-6 text-sm text-muted-foreground">These are the same safeguards that govern our <Link to="/ai-data-services/annotation-labeling/content-moderation" className="font-semibold text-primary hover:underline">content moderation annotation</Link> work.</p></Reveal><Reveal className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft"><picture><source srcSet="/assets/ai-data/model-testing/red-teaming/red-team-wellbeing.avif" type="image/avif"/><img src="/assets/ai-data/model-testing/red-teaming/red-team-wellbeing.webp" alt="Red team lead running a scheduled wellbeing check-in with the testing team" width="1200" height="675" loading="lazy" decoding="async" className="aspect-video w-full object-cover"/></picture><div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-300/25 to-transparent rt-scan"/><div className="border-t border-border p-5"><p className="flex items-center gap-2 text-sm font-bold"><HeartHandshake className="h-5 w-5 text-primary"/>Wellbeing controls are engagement controls.</p></div></Reveal></div></div></section>
  </>
);

export const DeliverablesAndFailureModes = () => (
  <>
    <section id="report-contents" className="scroll-mt-32 bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Reproducible engineering evidence" title="What" gradientText="You Get" subtitle="A complete evidence pack your ML, security and governance teams can use without reconstructing the engagement."/><Reveal className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{deliverables.map(([t,d],i)=><article key={t} className={`p-6 ${i===1?"bg-[#101a2c] text-white":"bg-card"}`}><FileKey2 className={`h-5 w-5 ${i===1?"text-amber-300":"text-primary"}`}/><span className="float-right font-mono text-[10px] text-primary">0{i+1}</span><h3 className="mt-5 font-heading text-lg font-bold">{t}</h3><p className={`mt-3 text-sm leading-6 ${i===1?"text-white/60":"text-muted-foreground"}`}>{d}</p></article>)}</Reveal><p className="mx-auto mt-7 max-w-4xl rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center text-sm font-semibold">The coverage matrix includes the gaps: what was out of scope, what time did not allow, and what was attempted without success.</p></div></section>
    <section className="bg-[#101a2c] py-20 text-white md:py-24"><div className="container mx-auto px-4"><SectionHeader light label="Quality failure patterns" title="Where Red Teaming" gradientText="Goes Wrong"/><div className="mx-auto max-w-7xl [&_td]:!text-white/65 [&_th]:!text-white [&>div]:!border-white/10 [&>div]:!bg-[#101a2c]"><DataTable headers={["Failure","What happens","How we avoid it"]} rows={redTeamFailures} minWidth={920}/></div></div></section>
  </>
);

export const BoundariesAndEngagement = () => (
  <>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Scope integrity" title="What We" gradientText="Do Not Do" subtitle="These boundaries protect the client, the testing team and the meaning of the report."/><Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border">{boundaries.map(([t,d],i)=><article key={t} className="grid gap-3 border-b border-border bg-card p-6 last:border-b-0 md:grid-cols-[.12fr_.55fr_1.2fr] md:items-start"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="font-heading text-lg font-bold">{t}</h3><p className="text-sm leading-7 text-muted-foreground">{d}</p></article>)}</Reveal></div></section>
    <section className="bg-muted/35 py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Choose the right cadence" title="How to" gradientText="Engage"/><Reveal className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">{engagementModels.map(([t,time,d],i)=><article key={t} className="bg-card p-7"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-5 font-heading text-xl font-bold">{t}</h3><p className="mt-2 text-xs font-bold uppercase tracking-wider text-amber-600">{time}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</Reveal><div className="mt-8 text-center"><Link to="/contact-us" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-soft">Scope a Red Team Engagement <ArrowRight className="h-4 w-4"/></Link></div></div></section>
  </>
);

export const WhyRelatedFaq = () => (
  <>
    <section className="bg-[#edf8f5] py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Why eQOURSE" title="The Human Layer" gradientText="Tooling Cannot Staff"/><Reveal className="mx-auto grid max-w-7xl gap-x-8 border-y border-border md:grid-cols-2">{[[UsersRound,"Human red teamers—not a scanner with a services wrapper"],[Globe2,"30+ languages with native authoring and 12+ Indian languages"],[Siren,"Cultural-harm coverage beyond a US-centric safety policy"],[ShieldCheck,"ISO 9001 and ISO 27001 certified restricted handling"],[HeartHandshake,"Documented wellbeing safeguards throughout the engagement"],[FileKey2,"Attack sets delivered to strengthen your own regression suite"]].map(([Icon,text],i)=>{const C=Icon as typeof UsersRound;return <div key={String(text)} className="flex gap-4 border-b border-border py-6"><C className="h-5 w-5 shrink-0 text-primary"/><span className="text-sm font-semibold">{String(text)}</span><span className="ml-auto font-mono text-[10px] text-primary">0{i+1}</span></div>})}</Reveal></div></section>
    <section className="bg-background py-20 md:py-24"><div className="container mx-auto px-4"><SectionHeader label="Connected services" title="Related" gradientText="AI Data Services"/><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">{[
      ["AI Bias & Fairness Audit","Measure group-level disparities and representational harm.","/ai-data-services/model-testing/bias-fairness-audit"],
      ["LLM & RLHF Annotation","Build alignment, preference and safety-evaluation data.","/ai-data-services/annotation-labeling/llm-rlhf-annotation"],
      ["Content Moderation Annotation","Create and operate policy-led safety taxonomies.","/ai-data-services/annotation-labeling/content-moderation"],
      ["LLM Training Data Curation","Filter, decontaminate and trace the training corpus.","/ai-data-services/cleaning-validation/llm-data-curation"],
      ["LLM Evaluation","Quality, groundedness and task scoring.","/ai-data-services/model-testing/llm-evaluation"],
      ["ASR & Speech Model Testing","WER, CER, accent and acoustic-segment testing.","/ai-data-services/model-testing/asr-speech-model-testing"],
    ].map(([t,d,href])=><article key={t} className="bg-card p-6"><h3 className="font-heading text-lg font-bold">{href?<Link to={href} className="transition-colors hover:text-primary">{t}</Link>:t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p>{href&&<Link to={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Explore service <ArrowRight className="h-4 w-4"/></Link>}</article>)}</div></div></section>
    <RelatedBlogs />
    <FAQSection faqs={redTeamFaqs.map(([question,answer])=>({question,answer}))} label="AI red teaming FAQs" title="Frequently Asked Questions"/>
  </>
);
