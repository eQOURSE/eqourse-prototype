import { useEffect, useState } from "react";
import { ArrowRight, Shield, Globe, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const playVideo = () => setShowVideo(true);
    window.addEventListener("eqourse:play-about-video", playVideo);
    return () => window.removeEventListener("eqourse:play-about-video", playVideo);
  }, []);

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elevated relative aspect-video bg-black">
              {showVideo ? (
                <video
                  id="about-video-player"
                  className="absolute inset-0 w-full h-full border-0 object-cover"
                  src="https://cdn.eqourse.com/assets/homepage.mp4"
                  title="eQOURSE - Global AI Data and Learning Content Solutions Partner"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label="Play eQOURSE company video"
                >
                  <img
                    src="https://i.ytimg.com/vi/BglRq9Qu0RE/hqdefault.jpg"
                    alt="eQOURSE global AI data and learning content solutions video preview"
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                    <span className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-2xl opacity-20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
            {/* Certification badges */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-elevated hidden md:flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <div className="text-xs font-bold text-foreground">ISO Certified</div>
                <div className="text-[10px] text-muted-foreground">9001 & 27001</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Who Are We?</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Powering Production-Ready AI &amp; Global Learning - <span className="text-gradient">From Quality Data to Quality Content</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              eQOURSE is a dual-capability partner supporting artificial intelligence and learning teams through scalable data, content and assessment services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For <strong className="text-foreground">AI, ML and robotics teams</strong>, we deliver production-grade training data services—including custom dataset collection, expert annotation and labeling, data cleaning and validation, real-world model testing, and <Link to="/robotics-training-data-services" className="font-semibold text-primary hover:underline">Robotics &amp; Physical AI training data</Link>—across text, audio, image, video and multimodal robot-learning data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For learning organisations, we provide scalable content and assessment solutions to enterprises, governments, publishers, EdTech platforms, universities and NGOs across education, workforce training, certification and large-scale learning programmes.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" /> Singapore commercial HQ · India delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" /> 500+ Specialists
              </div>
            </div>
            <Button asChild className="bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all group">
              <Link to="/aboutus">
                Learn more about eQOURSE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
