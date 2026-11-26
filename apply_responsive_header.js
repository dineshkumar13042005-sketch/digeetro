const fs = require('fs');

function getResponsiveHeader(activePage) {
  const getNavClass = (name) => {
    return activePage === name
      ? 'text-neutral-950 font-bold hover:text-purple-600 transition-colors'
      : 'hover:text-purple-600 transition-colors';
  };

  return `function Header() {
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

        return (
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
              {/* Official Digeetro Logo in Front + DIGEETRO text */}
              <a href="index.html" className="flex items-center gap-2.5 sm:gap-3 group">
                <img
                  src="assets/digeetro-logo.jpg"
                  alt="DIGEETRO DIGITAL SOLUTIONS"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 duration-200 shadow-xs"
                />
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-neutral-950 font-['Outfit']">
                  DIGEETRO
                </span>
              </a>

              {/* Minimal Clean Text Nav for Desktop */}
              <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-neutral-700">
                <a href="index.html" className="${getNavClass('home')}">Home</a>
                <a href="services.html" className="${getNavClass('services')}">Services</a>
                <a href="work.html" className="${getNavClass('work')}">Work</a>
                <a href="about.html" className="${getNavClass('about')}">About</a>
                <a href="why-digeetro.html" className="${getNavClass('why-digeetro')}">Why Digeetro</a>
                <a href="contact.html" className="${getNavClass('contact')}">Contact</a>
              </nav>

              {/* Right Button & Mobile Hamburger Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="contact.html"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <span>Start a Project</span>
                  <span className="text-xs">→</span>
                </a>

                {/* Mobile Hamburger Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-200/80 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
                <a href="index.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'home' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>Home</a>
                <a href="services.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'services' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>Services</a>
                <a href="work.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'work' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>Work</a>
                <a href="about.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'about' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>About</a>
                <a href="why-digeetro.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'why-digeetro' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>Why Digeetro</a>
                <a href="contact.html" className={\`block px-4 py-2.5 rounded-xl text-sm font-bold \${'${activePage}' === 'contact' ? 'bg-purple-50 text-purple-700' : 'text-neutral-800 hover:bg-neutral-100'}\`}>Contact</a>
                <div className="pt-2 border-t border-neutral-100">
                  <a href="tel:7550180727" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs hover:bg-purple-100 transition-colors">
                    <IconPhone className="w-4 h-4" />
                    <span>Call Studio: 7550180727</span>
                  </a>
                </div>
              </div>
            )}
          </header>
        );
      }`;
}

// 1. Update services.html, work.html, about.html, why-digeetro.html, contact.html
const pages = [
  { file: 'services.html', active: 'services' },
  { file: 'work.html', active: 'work' },
  { file: 'about.html', active: 'about' },
  { file: 'why-digeetro.html', active: 'why-digeetro' },
  { file: 'contact.html', active: 'contact' }
];

pages.forEach(({ file, active }) => {
  let content = fs.readFileSync(file, 'utf8');
  const headerMatch = content.match(/function Header\(\)[\s\S]*?<\/header>\s*\);\s*\}/);
  if (headerMatch) {
    content = content.replace(headerMatch[0], getResponsiveHeader(active));
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated responsive Header in: ${file}`);
  }
});

// 2. Update index.html Header inside DigeetroHero or separate Header
let indexContent = fs.readFileSync('index.html', 'utf8');

// Also make StatsMetrics 5th item centered on mobile
indexContent = indexContent.replace(
  `<div key={i} className="flex items-center gap-3 px-2 sm:px-4 py-2">`,
  `<div key={i} className={\`flex items-center gap-3 px-2 sm:px-4 py-2 \${i === 4 ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''}\`}>`
);

// In index.html, replace the header inside DigeetroHero
const indexHeaderRegex = /<header className="pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-transparent">[\s\S]*?<\/header>/;
const indexNewHeader = `<header className="pt-4 sm:pt-6 pb-3 sm:pb-4 flex items-center justify-between border-b border-neutral-100">
                {/* Official Digeetro Logo in Front + DIGEETRO text */}
                <a href="index.html" className="flex items-center gap-2.5 sm:gap-3 group">
                  <img
                    src="assets/digeetro-logo.jpg"
                    alt="DIGEETRO DIGITAL SOLUTIONS"
                    className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 duration-200 shadow-xs"
                  />
                  <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-neutral-950 font-['Outfit']">
                    DIGEETRO
                  </span>
                </a>

                {/* Minimal Clean Text Nav for Desktop */}
                <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-neutral-700">
                  <a href="index.html" className="text-neutral-950 font-bold hover:text-purple-600 transition-colors">Home</a>
                  <a href="services.html" className="hover:text-purple-600 transition-colors">Services</a>
                  <a href="work.html" className="hover:text-purple-600 transition-colors">Work</a>
                  <a href="about.html" className="hover:text-purple-600 transition-colors">About</a>
                  <a href="why-digeetro.html" className="hover:text-purple-600 transition-colors">Why Digeetro</a>
                  <a href="contact.html" className="hover:text-purple-600 transition-colors">Contact</a>
                </nav>

                {/* Right Button & Mobile Hamburger Toggle */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <a
                    href="contact.html"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span>Start a Project</span>
                    <span className="text-xs">→</span>
                  </a>

                  {/* Mobile Hamburger Button */}
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors focus:outline-none cursor-pointer"
                    aria-label="Toggle Navigation Menu"
                  >
                    {mobileMenuOpen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </header>

              {/* Mobile Navigation Dropdown Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-200/80 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
                  <a href="index.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold bg-purple-50 text-purple-700">Home</a>
                  <a href="services.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-neutral-100">Services</a>
                  <a href="work.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-neutral-100">Work</a>
                  <a href="about.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-neutral-100">About</a>
                  <a href="why-digeetro.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-neutral-100">Why Digeetro</a>
                  <a href="contact.html" className="block px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-neutral-100">Contact</a>
                  <div className="pt-2 border-t border-neutral-100">
                    <a href="tel:7550180727" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs hover:bg-purple-100 transition-colors">
                      <IconPhone className="w-4 h-4" />
                      <span>Call Studio: 7550180727</span>
                    </a>
                  </div>
                </div>
              )}`;

indexContent = indexContent.replace(
  'function DigeetroHero({ onWatchOpeningStory }) {',
  'function DigeetroHero({ onWatchOpeningStory }) {\n        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);'
);
indexContent = indexContent.replace(indexHeaderRegex, indexNewHeader);
fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Updated responsive Header & Stats in index.html!');
