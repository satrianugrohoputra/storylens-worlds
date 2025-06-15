
const Footer = () => (
  <footer className="w-full mt-12 py-4 flex flex-col items-center bg-gradient-to-t from-black/70 via-transparent to-transparent text-white/70 text-xs tracking-wide z-20">
    <div className="flex items-center gap-2">
      © {new Date().getFullYear()} StoryLens 3D &mdash; Built with{" "}
      <a
        href="https://lovable.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="story-link text-indigo-300 hover:text-indigo-400 underline"
      >
        Lovable
      </a>
    </div>
  </footer>
);

export default Footer;
