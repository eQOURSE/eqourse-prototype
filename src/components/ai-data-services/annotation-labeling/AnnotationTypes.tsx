import { useState } from "react";
import { Type, Eye, Mic, ThumbsUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const categories = [
  {
    id: "nlp",
    icon: Type,
    title: "NLP Annotation",
    items: [
      { name: "Named Entity Recognition (NER)", desc: "Person, org, location, date, custom entity tagging" },
      { name: "Sentiment Analysis", desc: "Positive, negative, neutral, and aspect-level sentiment" },
      { name: "Text Classification", desc: "Topic, intent, category, and multi-label classification" },
      { name: "Relation Extraction", desc: "Entity relationships, coreference resolution" },
      { name: "Machine Translation Post-Editing", desc: "Quality assessment and correction of MT output" },
      { name: "Summarization & Paraphrasing", desc: "Abstractive/extractive summary and fluency rating" },
    ],
  },
  {
    id: "cv",
    icon: Eye,
    title: "Computer Vision",
    items: [
      { name: "Bounding Box Annotation", desc: "2D and 3D object detection across image & video" },
      { name: "Semantic Segmentation", desc: "Pixel-level class labeling for scene understanding" },
      { name: "Instance Segmentation", desc: "Individual object masking within the same class" },
      { name: "Polygon & Polyline Annotation", desc: "Precise contour tracing for irregular shapes" },
      { name: "Keypoint & Landmark Detection", desc: "Facial landmarks, pose estimation, joint positions" },
      { name: "3D Point Cloud / LiDAR", desc: "Cuboid and segmentation labels for autonomous driving" },
      { name: "Image Classification & Tagging", desc: "Scene, object, and attribute-level labels" },
    ],
  },
  {
    id: "audio",
    icon: Mic,
    title: "Audio Annotation",
    items: [
      { name: "Speech Transcription", desc: "Verbatim and normalized transcription across dialects" },
      { name: "Speaker Diarization", desc: "Who spoke when — multi-speaker segmentation" },
      { name: "Emotion & Tone Detection", desc: "Sentiment, stress, and emotional state labeling" },
      { name: "Audio Event Classification", desc: "Environmental sounds, music, speech vs. non-speech" },
      { name: "Phonetic Transcription", desc: "IPA-level annotation for pronunciation modeling" },
    ],
  },
  {
    id: "rlhf",
    icon: ThumbsUp,
    title: "RLHF & LLM",
    items: [
      { name: "Response Ranking", desc: "Pairwise comparison and preference ranking for RLHF" },
      { name: "Instruction Following", desc: "Quality rating of model responses to prompts" },
      { name: "Safety & Toxicity Labeling", desc: "Harmful content detection and severity classification" },
      { name: "Factual Accuracy Verification", desc: "Ground-truth checking of model-generated claims" },
    ],
  },
];

const AnnotationTypes = () => {
  const [activeTab, setActiveTab] = useState("nlp");
  const { ref, isVisible } = useScrollReveal();
  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Annotation Types"
          title="Comprehensive"
          gradientText="Labeling Services"
          subtitle="Expert annotation across NLP, Computer Vision, Audio, and RLHF — covering every AI modality."
        />

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-xl p-1.5 gap-1 flex-wrap justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === cat.id
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content grid */}
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto reveal-up ${isVisible ? "visible" : ""}`}>
          {active.items.map((item, i) => (
            <div
              key={item.name}
              className="group p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnotationTypes;
