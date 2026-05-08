import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-white/5 mt-12 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-6">
            <Link href="/" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">Home</Link>
            <Link href="/about" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">About</Link>
            <Link href="/experience" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">Experience</Link>
            <Link href="/projects" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">Projects</Link>
            <Link href="/contact" className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">Contact</Link>
          </nav>
          <p className="text-xs sm:text-sm text-text-muted text-center">
            &copy; {currentYear} Muhammad Reyka Agastya Divaputra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
