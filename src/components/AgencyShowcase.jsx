import React from 'react';
import {
  Code,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle,
  MessageSquare,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

export default function AgencyShowcase({ id = 'services-section' }) {
  const services = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: 'AI & Autonomous Systems',
      description:
        'Custom generative AI models, agentic workflows, LLM fine-tuning, and intelligent automation designed to accelerate business productivity.',
      tags: ['Agentic Workflows', 'LLMs', 'Predictive ML', 'RAG Pipelines'],
    },
    {
      icon: <Code className="w-6 h-6 text-pink-600" />,
      title: 'Next-Gen Web & Mobile Engineering',
      description:
        'Ultra-fast, scalable web and mobile applications developed with React, React Native, Vite, Node, and cloud-native frameworks.',
      tags: ['React & Next.js', 'High Performance', 'PWAs', 'Cross-Platform'],
    },
    {
      icon: <Layers className="w-6 h-6 text-orange-500" />,
      title: 'Cloud Architecture & DevOps',
      description:
        'Enterprise-grade Google Cloud, AWS, Kubernetes, and CI/CD pipelines engineered for 99.99% uptime, security, and elasticity.',
      tags: ['Google Cloud', 'Microservices', 'Kubernetes', 'Zero Trust'],
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: 'Cinematic Design & Brand Experience',
      description:
        'Immersive digital experiences, award-winning UI/UX architectures, motion systems, and 3D web visualizations that convert.',
      tags: ['GSAP Motion', 'UI/UX Design Systems', 'Interactive 3D', 'WebGL'],
    },
  ];

  const metrics = [
    { label: 'Solutions Delivered', value: '150+' },
    { label: 'Client Satisfaction', value: '99.8%' },
    { label: 'Average ROI Acceleration', value: '3.4x' },
    { label: 'Production Uptime SLA', value: '99.99%' },
  ];

  return (
    <section id={id} className="relative bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Digital Solutions Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-['Outfit'] mb-6">
            Architecting the Future of{' '}
            <span className="digeetro-gradient-text">Enterprise Technology</span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
            At DIGEETRO DIGITAL SOLUTIONS, we bridge imaginative creativity with rigorous engineering. Every project begins with a handshake of trust and ends in measurable market leadership.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((srv, idx) => (
            <div
              key={`srv-${idx}`}
              className="group p-8 rounded-3xl bg-neutral-50/70 border border-neutral-200/70 hover:border-purple-300 hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-neutral-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {srv.icon}
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-purple-700 transition-colors">
                {srv.title}
              </h3>

              <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-normal">
                {srv.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {srv.tags.map((tag, tIdx) => (
                  <span
                    key={`tag-${idx}-${tIdx}`}
                    className="text-[11px] font-semibold text-neutral-600 bg-white px-2.5 py-1 rounded-md border border-neutral-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* The Handshake Philosophy: Trust & Partnership */}
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-8 sm:p-12 md:p-16 mb-20 relative overflow-hidden shadow-2xl">
          {/* Subtle brand glow behind card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-3 block">
                The Core Philosophy
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 font-['Outfit']">
                Trust Begins with a Handshake. Success is Built in Execution.
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                Our opening stickmen animation is not merely visual flair—it reflects our founding principle. Long before code is deployed or architectures are drawn, great digital breakthroughs begin with human understanding and mutual trust.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-800">
                {metrics.map((m, mIdx) => (
                  <div key={`metric-${mIdx}`}>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-['Outfit']">
                      {m.value}
                    </div>
                    <div className="text-xs text-neutral-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-0.5 mb-4 shadow-lg">
                <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-pink-400" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Ready to Build Together?</h4>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                Schedule an exploratory strategic discovery call with our engineering and design leads.
              </p>
              <a
                href="#contact"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md text-center"
              >
                Start Your Partnership
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact" className="max-w-4xl mx-auto rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-['Outfit'] mb-2">
              Get in Touch with DIGEETRO
            </h3>
            <p className="text-neutral-600 text-sm">
              Tell us about your digital ambition, vision, or challenges.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for reaching out to DIGEETRO DIGITAL SOLUTIONS! Our strategic team will connect with you within 24 hours.');
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                Project Scope / Message
              </label>
              <textarea
                rows="4"
                required
                placeholder="Briefly describe what you're looking to build (e.g. AI platform, web application, complete rebranding)..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Message to DIGEETRO</span>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs">
          <div className="flex items-center gap-3">
            <img
              src="/assets/digeetro-logo.jpg"
              alt="DIGEETRO Logo"
              className="w-8 h-8 object-contain rounded"
            />
            <span className="font-semibold text-neutral-800">
              © {new Date().getFullYear()} DIGEETRO DIGITAL SOLUTIONS. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-purple-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-purple-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-purple-600 cursor-pointer">Security Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
