
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const exampleModels = [
  {
    name: "Sample Cube",
    path: "/src/assets/models/sample-cube.glb",
    description: "A simple cube placeholder. Replace with your own .glb/.gltf file."
  }
  // Add additional models for showcase
];

const Library = () => (
  <div className="w-full min-h-screen bg-gradient-to-b from-black via-blue-950 to-indigo-950 flex flex-col items-center">
    <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center p-12 pt-32 max-w-3xl text-white z-10">
      <h2 className="text-4xl font-bold mb-4">3D Model Library</h2>
      <p className="text-lg mb-8">Browse and pick from the demonstration 3D assets, or add your own!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
        {exampleModels.map((m, i) => (
          <div key={i} className="rounded-xl bg-black/50 backdrop-blur-md border border-white/10 p-6">
            <h3 className="text-xl font-bold text-indigo-300 mb-1">{m.name}</h3>
            <p className="mb-3 text-white/80">{m.description}</p>
            <div className="flex items-center gap-3">
              <code className="bg-white/10 px-3 py-1 rounded text-sm">{m.path}</code>
              {/* Could add "Preview" button to render in modal viewer */}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Library;
