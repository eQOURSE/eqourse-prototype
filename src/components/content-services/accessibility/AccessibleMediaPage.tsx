import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Image, Captions, AudioLines, Sigma, Table } from "lucide-react";

const relatedPages = [
  { title: "Document Remediation", href: "/document-content-remediation" },
  { title: "Assessment Accessibility", href: "/assessment-accessibility" },
  { title: "Assistive Tech Compatibility", href: "/assistive-technology-compatibility" },
  { title: "Standards Compliance", href: "/standards-compliance" },
  { title: "Audit & Compliance Support", href: "/audit-compliance-support" },
];

const AccessibleMediaPage = () => (
  <SubServicePageTemplate
    seoTitle="Accessible Media & Enhancements Services | eQOURSE"
    seoDescription="Inclusive multimedia services including alternative text authoring, closed captioning, transcripts, audio description, and accessible STEM notation (MathML)."
    seoCanonical="https://www.eqourse.com/accessible-media-enhancements"
    seoKeywords="accessible media services, alt text authoring, closed captioning for education, audio description services, MathML accessibility, accessible STEM content, multimedia accessibility"
    parentLabel="Accessibility"
    parentHref="/accessibility"
    currentLabel="Accessible Media & Enhancements"
    bannerImage="/assets/banners/content-services/accessibility/accessible-media-enhancements.png"
    bannerImageAlt="Accessible media and enhancements services banner showing alt text authoring, closed captioning, transcripts, audio description and MathML accessible STEM notation by eQOURSE"
    preHeadline="Accessible Media & Enhancements Services"
    headline="Accessible Media &"
    headlineAccent="Enhancements Services"
    subtext="Ensuring images, videos, and complex notations in your educational content are perceivable and understandable by all users through expert captioning, description, and semantic markup."
    ctaText="Enhance Your Media"
    introLabel="Our Expertise"
    introTitle="Making Multimedia Content"
    introGradient="Truly Inclusive"
    introDescription="We ensure every image, video, equation, and data table in your educational content is accessible-through expertly authored alt text, accurate captions, audio descriptions, and semantic STEM markup."
    introParagraphs={[
      "Visual and auditory media are central to modern education, but without proper alternatives and enhancements, they create significant barriers for learners with disabilities. Our team of accessibility specialists bridges this gap with context-aware, curriculum-aligned solutions.",
      "From concise alt text that captures the pedagogical intent of an image, to precisely synchronized closed captions and narrated audio descriptions, we ensure your multimedia assets deliver an equitable learning experience for every student."
    ]}
    stats={[
      { value: "99%+", label: "Caption Accuracy" },
      { value: "MathML", label: "STEM Accessible" },
      { value: "AD", label: "Audio Description" },
      { value: "WCAG", label: "Standards Aligned" },
    ]}
    servicesLabel="What We Deliver"
    servicesTitle="Accessible Media"
    servicesGradient="Services"
    services={[
      { icon: Image, title: "Alternative Text (Alt Text) Authoring", description: "Our subject matter experts craft concise, contextually accurate descriptions for images, charts, and graphs. We ensure the core pedagogical purpose of visual elements is accurately conveyed to users relying on screen readers." },
      { icon: Captions, title: "Closed Captioning & Transcripts", description: "We provide highly accurate, synchronized closed captions for video content and detailed text transcripts for both audio and video materials, ensuring critical learning content is accessible to users who are deaf or hard of hearing." },
      { icon: AudioLines, title: "Audio Description Services", description: "For video content where essential information is conveyed purely visually, we create and integrate audio descriptions that narrate crucial visual actions, text on screen, and scene changes during natural pauses in the primary audio." },
      { icon: Sigma, title: "Accessible STEM Notation (MathML)", description: "We specialize in rendering complex mathematical and scientific equations accessible. By utilizing MathML, we ensure that equations are logically interpreted by screen readers with appropriate mathematical syntax, not just read as flat text." },
      { icon: Table, title: "Complex Table Formatting", description: "We transform complex data tables (those with merged cells or multiple levels of headers) into accessible formats by programmatically linking data cells to their specific row and column headers, ensuring logical navigation for AT users." },
    ]}
    faqs={[
      { question: "Why can't I just use auto-generated alt text?", answer: "While AI-generated alt text is improving, it frequently lacks the necessary educational context. A photo of a cell might need a simple description in a history course, but requires detailed anatomical labeling in a biology text. Our experts author alt text based on the specific instructional purpose of the image." },
      { question: "Are auto-generated captions sufficient for compliance?", answer: "Rarely. Auto-captions often lack punctuation, struggle with technical vocabulary or accents, and generally fall short of the 99% accuracy rate typically required for compliance. We provide human-reviewed, highly accurate captioning to ensure equal access to information." },
      { question: "What is the difference between closed captions and audio descriptions?", answer: "Closed captions provide a text display of spoken words and essential non-speech sounds for users who cannot hear the audio. Audio description provides an additional audio track narrating essential visual information for users who cannot see the video." },
    ]}
    ctaHeadline="Ready to Make Your Media Accessible?"
    ctaSubtext="Contact our multimedia accessibility team for expert alt text, captioning, and audio description services."
    ctaButtonText="Enhance Your Media"
    relatedPages={relatedPages}
    relatedLabel="Explore More Accessibility Services"
  />
);

export default AccessibleMediaPage;
