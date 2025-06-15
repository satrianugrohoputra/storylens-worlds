
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => (
  <div className="w-full min-h-screen bg-gradient-to-b from-black via-indigo-900 to-blue-950 flex flex-col items-center">
    <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center p-12 pt-32 max-w-2xl text-white z-10">
      <h2 className="text-4xl font-bold mb-4">About StoryLens 3D</h2>
      <p className="text-lg mb-4">
        StoryLens 3D is an interactive, scroll-driven storytelling framework—designed for immersive multimedia narratives that blend rich text, beautiful transitions, and live 3D elements.
      </p>
      <p className="text-base text-white/80 mb-2">
        - Built with React + TypeScript, Tailwind, <br />
        - 3D: React Three Fiber, Drei, and Framer Motion<br />
        - Demo models are placeholders (replace with your own in <code>/src/assets/models/</code>)
      </p>
      <p className="mt-6 text-sm text-white/50">
        © {new Date().getFullYear()} Lovable. All rights reserved.
      </p>
    </div>
    <Footer />
  </div>
);

export default About;
