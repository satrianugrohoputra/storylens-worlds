
import Navbar from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ChapterCard } from "../components/ChapterCard";
import Footer from "../components/Footer";
import { ParticleBackground } from "../components/ParticleBackground";

const chapters = [
  {
    title: "Chapter 1: Origins",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ex convallis, dictum ligula ac, lacinia quam. Mauris at tincidunt ex, sed tempus ex.",
      "Mauris tempus massa ut erat condimentum, eu ultrices sapien gravida. Proin pretium libero sed sapien efficitur, ut feugiat erat porta.",
    ],
    modelVariant: "cube" as const,
    reverse: false
  },
  {
    title: "Chapter 2: Discovery",
    paragraphs: [
      "Sed vel cursus lectus. Pellentesque et risus eget odio cursus tincidunt at eu lorem. Integer sit amet bibendum enim, in scelerisque nulla.",
      "Pellentesque vel fermentum velit, a malesuada ex. Aenean dictum tristique magna nec hendrerit. Duis maximus fermentum tortor, ac varius ex placerat ut.",
    ],
    modelVariant: "sphere" as const,
    reverse: true
  },
  {
    title: "Chapter 3: Vision",
    paragraphs: [
      "Curabitur cursus sem vel lacus pretium, et laoreet risus gravida. Fusce a nisl vitae sapien commodo pretium. In hac habitasse platea dictumst.",
      "Aenean posuere, nibh vitae pulvinar dictum, enim erat dignissim nulla, eget facilisis mauris risus eu erat. Etiam aliquam justo blandit tortor fermentum, in auctor elit blandit.",
    ],
    modelVariant: "torus" as const,
    reverse: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0C1029] via-indigo-900 to-black relative overflow-x-hidden selection:bg-indigo-300/60 selection:text-white">
      <ParticleBackground />
      <Navbar />
      <main className="pt-28">
        <Hero />
        <section className="max-w-6xl mx-auto w-full py-6" id="features">
          {chapters.map((ch, idx) => (
            <ChapterCard key={ch.title} {...ch} />
          ))}
        </section>
        <div id="contact" className="mb-16" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
