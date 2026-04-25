import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/5 mt-12 bg-bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} Muhammad Reyka Agastya Divaputra. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-text-secondary hover:text-accent transition-colors">Home</Link>
            <Link href="/about" className="text-sm text-text-secondary hover:text-accent transition-colors">About</Link>
            <Link href="/experience" className="text-sm text-text-secondary hover:text-accent transition-colors">Experience</Link>
            <Link href="/projects" className="text-sm text-text-secondary hover:text-accent transition-colors">Projects</Link>
            <Link href="/contact" className="text-sm text-text-secondary hover:text-accent transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
