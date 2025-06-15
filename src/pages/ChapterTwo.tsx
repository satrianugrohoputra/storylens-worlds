
import React, { useState, useRef } from "react";
import PortalParallax from "../components/ChapterTwo/PortalParallax";
import FeatureCard from "../components/ChapterTwo/FeatureCard";
import ReflectionForm from "../components/ChapterTwo/ReflectionForm";
import { motion, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ChapterTwo() {
  const navigate = useNavigate();
  const reflectionRef = useRef<HTMLDivElement>(null);
  const reflectionInView = useInView(reflectionRef, { once: true, amount: 0.28 });

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-indigo-950 via-indigo-800/90 to-black font-sans overflow-x-hidden">
      {/* Portal Lottie/particles hero */}
      <header className="relative flex flex-col items-center justify-center min-h-[72vh] pt-20 pb-8 text-center z-10">
        <PortalParallax />
        <motion.h1
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2 mt-12 md:mt-1"
        >
          <Typewriter text="Chapter 2: Through the Portal" delay={32} />
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.39 }}
          className="text-xl md:text-2xl font-medium text-indigo-200/95"
        >
          Step into new realities.
        </motion.h2>
      </header>
      {/* Portal effect section */}
      <main className="flex flex-col w-full max-w-4xl mx-auto gap-16 px-4 pb-20 relative z-20">
        <section>
          <h3 className="text-lg uppercase tracking-wide font-bold text-indigo-200/70 mb-6 text-center">
            Features Beyond the Portal
          </h3>
          <div className="flex flex-col md:flex-row gap-7 items-center justify-center">
            <FeatureCard
              icon="arrow-right"
              title="Perspective Shift"
              description="See the world anew."
            />
            <FeatureCard
              icon="star"
              title="Boundless Creativity"
              description="Imagine without limits."
            />
            <FeatureCard
              icon="bookmark"
              title="Infinite Paths"
              description="Choose your own journey."
            />
          </div>
        </section>
        {/* Reflection Form (animated in!) */}
        <section ref={reflectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={reflectionInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ReflectionForm />
          </motion.div>
        </section>
        {/* Navigation */}
        <section className="flex items-center justify-between gap-7 mt-8">
          <Button
            variant="secondary"
            size="lg"
            className="flex items-center gap-2 px-6 py-2 ring-0 hover:scale-105 transition-all"
            onClick={() => navigate("/chapter/1")}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Chapter 1
          </Button>
          <Button
            size="lg"
            className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-6 py-2 rounded-xl ring-2 ring-indigo-500/70 hover:scale-105 transition-all"
            onClick={() => window.location.href = "/"}
          >
            Next: Vision of Tomorrow
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </section>
      </main>
    </div>
  );
}

// Typewriter local helper
function Typewriter({ text, delay = 30 }: { text: string, delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  React.useEffect(() => {
    let i = 0;
    let timer: any;
    function type() {
      setDisplayed(text.slice(0, i + 1));
      if (i < text.length - 1) {
        i++;
        timer = setTimeout(type, delay);
      }
    }
    type();
    return () => clearTimeout(timer);
  }, [text, delay]);
  return <span>{displayed}<span className="blinking-cursor text-indigo-300">|</span></span>;
}
