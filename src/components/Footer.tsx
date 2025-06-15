
const Footer = () => (
  <footer className="w-full mt-12 py-5 flex flex-col items-center bg-gradient-to-t from-black/80 via-transparent to-transparent text-white/70 text-xs tracking-wide z-20">
    <div>
      © {new Date().getFullYear()} StoryLens Worlds &mdash; Built with <a className="text-indigo-300 hover:underline" href="https://lovable.dev" target="_blank" rel="noopener noreferrer">Lovable</a>
    </div>
  </footer>
);

export default Footer;
