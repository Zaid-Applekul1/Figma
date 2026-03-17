/**
 * LandingPage.tsx — AppleKul One Enhanced Landing Page
 *
 * Improvements:
 *  - Modern gradient backgrounds and glass-morphism effects
 *  - Enhanced animations and micro-interactions
 *  - Better visual hierarchy and spacing
 *  - Improved color scheme and contrast
 *  - Better responsive design
 *  - Enhanced CTA buttons with better visual feedback
 *  - Converted to Tailwind CSS
 */
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ─────────────────────────────────────────────────────────────
   Plan type
───────────────────────────────────────────────────────────── */
interface Plan {
  id: string;
  icon: string;
  name: string;
  role: string;
  monthlyPrice?: string;
  annualPrice?: string;
  origMonthly?: string;
  origAnnual?: string;
  annualTotal?: string;
  saveMonthly?: string;
  saveAnnual?: string;
  gst: string;
  desc: string;
  featured?: boolean;
  enterprise?: boolean;
  hasTrial: boolean;
  btnColor?: 'green' | 'blue' | 'purple';
  features: string[];
  contactSales?: boolean;
}

/* ─────────────────────────────────────────────────────────────
   Tab plan data
───────────────────────────────────────────────────────────── */
const TAB_PLANS: Record<string, { desc: string; plans: Plan[] }> = {
  individuals: {
    desc: 'Perfect for individual growers, solo farmers, and independent orchard owners.',
    plans: [
      {
        id: 'applekul-core',
        icon: '🌱',
        name: 'Applekul™ Core',
        role: 'Grower',
        monthlyPrice: '₹99',
        annualPrice: '₹99',
        annualTotal: '₹1,188',
        saveAnnual: 'Per Kanal / Year',
        gst: 'Incl. GST · ₹99/Kanal/Year · FREE for first 5 Kanals',
        desc: 'Small growers starting digital record-keeping. Dashboard, Finance, Assets & Network. Premium insights locked.',
        hasTrial: true,
        btnColor: 'green',
        features: [
          'Dashboard & Orchard Bounds',
          'Finance, Assets & Network',
          'Carbon, Market & University Modules',
          '🔒 CA Store, Prices, Grants (Locked)',
          '🔒 Satellite Imagery (Locked)',
          '🔒 Sense Dashboard (Locked)',
        ],
      },
      {
        id: 'applekul-satellite',
        icon: '🛰️',
        name: 'Applekul™ Satellite',
        role: 'Grower',
        monthlyPrice: '₹249',
        annualPrice: '₹249',
        annualTotal: '₹2,988/year',
        saveAnnual: 'Per Kanal / Year',
        gst: 'Incl. GST · ₹249/Kanal/Year',
        desc: 'Tech-forward growers wanting remote insights. Satellite imagery for macro-level orchard monitoring.',
        featured: true,
        hasTrial: true,
        btnColor: 'green',
        features: [
          'All Applekul™ Core features',
          '✅ Premium Insights Unlocked',
          '✅ Satellite Module (NDVI, Health, Biomass)',
          'Remote monitoring from space',
          'Overall orchard health tracking',
          'Moisture & biomass analysis',
        ],
      },
      {
        id: 'applekul-sense',
        icon: '🌡️',
        name: 'Applekul™ Sense',
        role: 'GrowerSense',
        monthlyPrice: '₹499',
        annualPrice: '₹499',
        annualTotal: '₹5,988/year',
        saveAnnual: 'Per Kanal / Year',
        gst: 'Incl. GST · ₹499/Kanal/Year',
        desc: 'Serious orchardists needing micro-climate data. Entry-level IoT integration with 11 environmental parameters.',
        hasTrial: true,
        btnColor: 'blue',
        features: [
          'All Applekul™ Satellite features',
          '✅ Sense Module & Hardware Dashboard',
          '✅ 11-Parameter Weather Data',
          'Air Temp, Humidity, Wind, Rainfall',
          'Atmospheric Pressure, Light Intensity',
          'Dew Point, ET0 Value & more',
        ],
      },
      {
        id: 'applekul-pro',
        icon: '🚀',
        name: 'Applekul™ Pro',
        role: 'GrowerPro',
        monthlyPrice: '₹999',
        annualPrice: '₹999',
        annualTotal: '₹11,988',
        saveAnnual: 'Per Kanal / Year',
        gst: 'Incl. GST · ₹999/Kanal/Year',
        desc: 'Large estates demanding total precision automation. Complete hardware ecosystem with AI camera integration.',
        enterprise: true,
        hasTrial: true,
        btnColor: 'purple',
        features: [
          'All Applekul™ Sense features',
          '✅ Devices Module (Full hardware sync)',
          '✅ Pro Weather Station Subscription',
          '✅ Deep Soil Metrics (6 Parameters)',
          '✅ Leaf Monitoring (2 Parameters)',
          '✅ AI Camera Integration',
          'Root-to-canopy visibility',
        ],
      },
    ],
  },
  business: {
    desc: 'The Intelligent Backbone of Your Orchard Enterprise. Interconnected digital ecosystem uniting suppliers, labs, logistics, experts, and buyers.',
    plans: [
      {
        id: 'supplier-mgmt',
        icon: '📦',
        name: 'Suppliers Management (ASM)',
        role: 'Supplier',
        gst: 'Incl. GST · Cancel anytime',
        desc: 'B2B hub for dealers & developers. Real-time inventory automation with bulk commerce and direct-to-grower marketplace integration.',
        hasTrial: true,
        contactSales: true,
        btnColor: 'green',
        features: [
          'Real-Time Inventory & Low-Stock Alerts',
          'Bulk Order Processing (Quotes, POs, Invoices)',
          'Direct-to-Grower Catalog Listing',
          'Vendor & Accounts Management',
          'Digital Purchase Orders',
          'Grower Network Integration',
          'Analytics & Sales Reports',
          'WhatsApp Order Notifications',
        ],
      },
      {
        id: 'transit-mgmt',
        icon: '🚛',
        name: 'Transit Management (ATM)',
        role: 'Transit',
        gst: 'Incl. GST · Cancel anytime',
        desc: 'Command center for agri-logistics. Live GPS tracking, AI route optimization, and digital manifests for perishable cargo.',
        hasTrial: true,
        contactSales: true,
        btnColor: 'green',
        features: [
          'Live GPS & Transit Monitoring',
          'AI-Driven Route Optimization',
          'Digital Bills of Lading',
          'Cold-Chain Temperature Integration',
          'Fleet & Driver Management',
          'Real-time ETA Updates',
          'Fuel & Maintenance Tracking',
          'Paperless Freight Documentation',
        ],
      },
      {
        id: 'lab-mgmt',
        icon: '🔬',
        name: 'Labs Management (ALM)',
        role: 'Lab',
        gst: 'Incl. GST · Cancel anytime',
        desc: 'Digital LIMS infrastructure for testing facilities. Barcode sample tracking, automated diagnostics, and secure client portals.',
        featured: true,
        hasTrial: true,
        contactSales: true,
        btnColor: 'blue',
        features: [
          'LIMS Integration & Barcode Tracking',
          'Sample Lifecycle Management',
          'Automated Diagnostic Reports',
          'Secure Grower Client Portal',
          'Historical Data Analytics',
          'Multi-year Trend Analysis',
          'Professional Branded Reports',
          'Multi-location Lab Support',
        ],
      },
      {
        id: 'expert-mgmt',
        icon: '👨‍🌾',
        name: 'Experts Management (AEM)',
        role: 'Expert',
        gst: 'Incl. GST · Cancel anytime',
        desc: 'Professional storefront for agronomists. Digital marketplace, smart scheduling, consultation history, and service contract management.',
        hasTrial: true,
        contactSales: true,
        btnColor: 'green',
        features: [
          'Digital Marketplace Storefront',
          'Smart Scheduling & Booking Calendar',
          'Consultation History & Notes',
          'Virtual & On-Site Visit Management',
          'Service Contract Management',
          'Digital Signing & Retainers',
          'Client Advisory Tracking',
          'Professional Profile & Ratings',
        ],
      },
      {
        id: 'workforce-mgmt',
        icon: '👷',
        name: 'Workforce Management (AWM)',
        role: 'Workforce',
        gst: 'Incl. GST · Cancel anytime',
        desc: 'Dynamic labor marketplace solving agricultural labor shortage. Verified worker profiles, on-demand sourcing, and digital payroll.',
        hasTrial: true,
        contactSales: true,
        btnColor: 'green',
        features: [
          'Verified Worker Profiles & Credentials',
          'On-Demand Shift Broadcasting',
          'Digital Timesheets & Clock-ins',
          'Automated Payroll Calculations',
          'Two-Way Rating System',
          'Skills & Certification Tracking',
          'Multi-orchard Deployment',
          'Performance Analytics Dashboard',
        ],
      },
      {
        id: 'buyers-marketplace',
        icon: '🛒',
        name: 'Buyers Marketplace (ABM)',
        role: 'Buyer',
        gst: 'Incl. GST · Premium trading access',
        desc: 'Premier digital trading floor connecting global wholesale buyers with verified growers. Direct procurement with complete traceability.',
        featured: true,
        hasTrial: true,
        contactSales: true,
        btnColor: 'blue',
        features: [
          'Direct Grower-to-Buyer Procurement',
          'Complete Quality & Traceability Records',
          'Live Market Bidding & Pricing Analytics',
          'Secure Digital Transactions & Escrow',
          'CA Store Grading Reports Access',
          'Diagnostic Lab Data Integration',
          'Orchard Origin Verification',
          'Automated Digital Invoicing',
        ],
      },
      {
        id: 'ca-store-mgmt',
        icon: '🏭',
        name: 'CA Store Management (ACM)',
        role: 'CAStore',
        gst: 'Incl. GST · Unlimited growers',
        desc: 'Enterprise facility management for controlled atmosphere cold storage. Bin-level tracking, climate monitoring, and grading logistics.',
        enterprise: true,
        hasTrial: true,
        contactSales: true,
        btnColor: 'purple',
        features: [
          'Granular Bin-Level Inventory Tracking',
          'Atmosphere Monitoring (O2, CO2, Temp)',
          'Grading & Sorting Workflow',
          'Multi-grower Account Management',
          'Chamber Climate Historical Logs',
          'Strategic Market Release Dispatch',
          'Quality Breakdown Analytics',
          'Loading Dock Logistics',
        ],
      },
    ],
  },
  cooperative: {
    desc: 'Empowering the next generation of Agricultural Scientists.',
    plans: [
      {
        id: 'student-pro',
        icon: '🎓',
        name: 'Student Pro',
        role: 'StudentPro',
        saveAnnual: 'Per Kanal / Year',
        annualPrice: '999',
        gst: 'Incl. GST · Applekul™ Pro features',
        desc: 'Full Applekul™ Pro access for students. Advanced satellite, IoT sensors, and AI camera integration.',
        featured: true,
        hasTrial: true,
        btnColor: 'green',
        features: [
          'All Applekul™ Pro features',
          'Satellite NDVI & Health Imagery',
          'Weather Station Integration',
          'Deep Soil & Leaf Monitoring',
          'AI Camera for Pest Detection',
          'Research Project Support',
          'Priority Academic Support',
        ],
      }
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   CheckIcon
───────────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-emerald-500/30">
    <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polyline points="1.5,5 4,7.5 8.5,2.5" />
    </svg>
  </div>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
const LandingPage: React.FC = () => {
  const router = useRouter();
  const [billing] = useState<'annual'>('annual');
  const [activeTab, setActiveTab] = useState<'individuals' | 'business' | 'cooperative'>('individuals');
  const [scrolled, setScrolled] = useState(false);

  // Placeholder logo URL - replace with actual logo path
  const logo = "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPlans = () => {
    document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentTab = TAB_PLANS[activeTab];
  const plans = currentTab.plans;

  const getPrice = (plan: Plan) => plan.annualPrice;
  const getOrigPrice = (plan: Plan) => plan.origAnnual ?? null;
  const getSave = (plan: Plan) => plan.saveAnnual ?? null;
  const getGst = (plan: Plan) =>
    plan.annualTotal
      ? `Incl. GST · ₹${plan.annualTotal.replace('₹','')} billed annually`
      : plan.gst;

  const handleFreeTrial = (plan: Plan) => {
    router.push('/signup');
  };

  const handleBuyNow = (plan: Plan) => {
    router.push('/payment');
  };

  const handleContactSales = () => {
    router.push('/signup');
  };

  const handleNavFreeTrial = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <div className="font-['Poppins',system-ui,-apple-system,sans-serif] overflow-x-hidden">
      {/* Custom animations and styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -22px) scale(1.08); }
          66% { transform: translate(-18px, 14px) scale(0.95); }
        }
        
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.78); }
        }
        
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes badge-pop {
          from { opacity: 0; transform: scale(0.6) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        
        @keyframes scroll-hint {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 16px rgba(16, 185, 129, 0); }
        }
        
        @keyframes tab-swap {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-up { animation: fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-blob-drift { animation: blob-drift 14s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2.2s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
        .animate-hero-float { animation: hero-float 4s ease-in-out infinite; }
        .animate-badge-pop { animation: badge-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both; }
        .animate-scroll-hint { animation: scroll-hint 2s ease-in-out infinite; }
        .animate-card-in { animation: card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-tab-swap { animation: tab-swap 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-gradient-shift { animation: gradient-shift 15s ease infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite 1s; }
        
        .bg-gradient-shift {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 30%, #d1fae5 60%, #a7f3d0 100%);
          background-size: 400% 400%;
        }
        
        .shimmer-bar {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.3) 25%, rgba(16, 185, 129, 0.8) 50%, rgba(16, 185, 129, 0.3) 75%);
          background-size: 600px 100%;
        }
        
        .grid-overlay {
          background-image: 
            linear-gradient(rgba(6, 78, 59, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 78, 59, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #064e3b, #059669, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
        }
        
        .btn-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-shimmer:hover::before {
          left: 100%;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ease-in-out bg-white/96 backdrop-blur-2xl border-b border-black/8 shadow-lg shadow-black/8 ${
        scrolled ? 'py-3 px-10 shadow-2xl shadow-black/12' : 'py-4 px-10'
      }`}>
        <a href="/" className="flex items-center gap-3 no-underline transition-transform duration-300 hover:scale-105">
          <img 
            src={logo} 
            alt="AppleKul" 
            className="h-20 w-auto object-contain rounded-xl shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/15" 
          />
          <span className="text-xl font-black text-emerald-900 tracking-tight">
            <span className="text-gradient animate-gradient-shift">AppleKul</span>{' '}
            <span className="text-emerald-500">One</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <button 
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 border-none cursor-pointer shadow-lg shadow-emerald-500/35 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 active:-translate-y-0.5 active:scale-98 relative overflow-hidden btn-shimmer"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button 
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 border-none cursor-pointer shadow-lg shadow-emerald-500/35 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 active:-translate-y-0.5 active:scale-98 relative overflow-hidden btn-shimmer"
            onClick={scrollToPlans}
          >
            See Plans
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-shift animate-gradient-shift" />
        
        {/* Floating blobs */}
        <div className="absolute w-96 h-96 rounded-full blur-3xl animate-blob-drift pointer-events-none opacity-60 bg-emerald-300/30 -top-40 -left-40" style={{ animationDuration: '16s' }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl animate-blob-drift pointer-events-none opacity-60 bg-emerald-800/40 -bottom-20 -right-20" style={{ animationDuration: '20s', animationDelay: '5s' }} />
        <div className="absolute w-72 h-72 rounded-full blur-3xl animate-blob-drift pointer-events-none opacity-60 bg-emerald-300/25 top-2/5 right-[8%]" style={{ animationDuration: '12s', animationDelay: '8s' }} />
        
        <div className="absolute inset-0 pointer-events-none grid-overlay opacity-40" />

        <div className="relative z-10 text-center px-6 pb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-emerald-600/12 border-2 border-emerald-600/25 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase text-emerald-600 mb-8 animate-badge-pop shadow-lg shadow-emerald-600/15 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-600/25">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500 animate-pulse-dot" />
            Now live — Orchard Intelligence Platform
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-gradient animate-gradient-shift">AppleKul</span>
            <span className="text-emerald-400 drop-shadow-lg"> One</span>
          </h1>

          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 mb-3 animate-fade-up leading-snug" style={{ animationDelay: '0.4s' }}>
            No more guess work — <span className="text-emerald-600 font-black relative">
              only daily insights
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-sm" />
            </span>
          </p>

          <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: '0.5s' }}>
            The complete orchard intelligence suite for growers, developers & cooperatives.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button 
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-[length:200%_200%] text-white text-lg font-extrabold border-none cursor-pointer shadow-xl shadow-emerald-500/45 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/60 active:-translate-y-0.5 active:scale-98 relative overflow-hidden btn-shimmer animate-gradient-shift"
              onClick={scrollToPlans}
            >
              ✨ Choose Your Plan
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 flex flex-wrap gap-0 justify-center bg-white/98 backdrop-blur-xl border-2 border-emerald-600/20 rounded-3xl p-6 max-w-3xl w-[calc(100%-3rem)] mx-auto shadow-2xl shadow-black/10 animate-fade-up transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/15" style={{ animationDelay: '0.7s' }}>
          {[
            { val: '₹0', lbl: 'First Month Free' },
            { val: '12', lbl: 'Intelligence Modules' },
            { val: '24/7', lbl: 'AI Monitoring' },
          ].map((s, i) => (
            <div key={s.lbl} className={`flex-1 min-w-[140px] text-center px-5 py-2.5 transition-transform duration-300 hover:scale-105 ${i < 2 ? 'border-r-2 border-emerald-600/15' : ''}`}>
              <div className="text-3xl font-black text-gradient leading-tight">{s.val}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1.5">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-hint cursor-pointer opacity-80 transition-opacity duration-300 hover:opacity-100" onClick={scrollToPlans}>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-600">Explore Plans</span>
          <div className="w-8 h-8 border-2 border-emerald-600 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
            ↓
          </div>
        </div>
      </section>

      {/* ══ PLANS ══ */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6" id="plans-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient tracking-tight mb-3">
              Choose your plan.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Transparent pricing for every stage of your orchard journey.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 border-b-4 border-gray-200 mb-12 overflow-x-auto">
            {[
              { id: 'individuals' as const, label: 'Growers' },
              { id: 'business' as const, label: 'Business' },
              { id: 'cooperative' as const, label: 'Academic & Public Sector Initiative' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`px-8 py-3.5 text-sm font-semibold whitespace-nowrap border-none cursor-pointer transition-all duration-300 ease-out relative ${
                  activeTab === tab.id
                    ? 'text-emerald-600 font-extrabold border-b-4 border-emerald-600 -mb-1'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-emerald-600/5 rounded-t-lg'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-500 transition-transform duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Tab description */}
          <div className="text-center mb-10 p-4 bg-gradient-to-r from-white to-green-50 border-2 border-green-200 rounded-2xl text-sm font-medium text-gray-700 animate-tab-swap shadow-lg shadow-black/6" key={activeTab}>
            <strong className="text-emerald-600 font-bold">
              {activeTab === 'individuals' && 'Individual Growers & Farmers'}
              {activeTab === 'business' && 'Agri-tech Businesses'}
              {activeTab === 'cooperative' && 'Students, Universities & Public Sector'}
            </strong>
            {' — '}{currentTab.desc}
          </div>

          {/* Billing info */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-8 bg-white border-2 border-gray-200 rounded-full px-8 py-3 text-sm font-semibold text-gray-800 shadow-lg shadow-black/8">
              <span className="font-bold text-gray-800">Annual plan, billed monthly</span>
            </div>
          </div>

          {/* Cards */}
          <div className={`grid gap-8 items-start animate-tab-swap ${
            activeTab === 'cooperative' && plans.length === 1 
              ? 'justify-center grid-cols-1 max-w-lg mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`} key={activeTab + billing}>
            {plans.map((plan, i) => {
              const price = getPrice(plan);
              const origPx = getOrigPrice(plan);
              const saveTxt = getSave(plan);
              const gstTxt = getGst(plan);
              const showBusinessMeta = activeTab === 'business';

              return (
                <div 
                  key={plan.id} 
                  className={`bg-white border-2 rounded-3xl overflow-hidden relative transition-all duration-300 ease-out animate-card-in hover:shadow-2xl hover:shadow-black/15 hover:-translate-y-2 hover:scale-105 ${
                    plan.featured 
                      ? 'border-amber-400 shadow-xl shadow-amber-400/20 hover:shadow-2xl hover:shadow-amber-400/30' 
                      : plan.enterprise 
                        ? 'border-purple-500 shadow-xl shadow-purple-500/18 hover:shadow-2xl hover:shadow-purple-500/28'
                        : 'border-gray-200 hover:border-green-200'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Shimmer top */}
                  <div className={`h-1.5 shimmer-bar animate-shimmer ${
                    plan.featured 
                      ? 'bg-gradient-to-r from-amber-400/30 via-amber-400/80 to-amber-400/30'
                      : plan.enterprise 
                        ? 'bg-gradient-to-r from-purple-500/30 via-purple-500/80 to-purple-500/30'
                        : ''
                  }`} />

                  {plan.featured && (
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-lg shadow-lg shadow-amber-400/45 animate-badge-pop animate-bounce-subtle">
                      Best value
                    </div>
                  )}
                  {plan.enterprise && (
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-lg shadow-lg shadow-purple-500/45">
                      Enterprise
                    </div>
                  )}

                  <div className="p-8 pb-6">
                    <div className="text-xl font-extrabold text-gray-900 mb-2">
                      <span className="mr-1.5">{plan.icon}</span>
                      {plan.name}
                    </div>

                    <div className="text-3xl font-black text-gradient leading-tight mb-1">
                      {origPx && <span className="text-lg font-semibold text-gray-400 line-through mr-2">{origPx}</span>}
                      {price}
                      {showBusinessMeta && price && price !== 'Custom' && <span className="text-sm font-semibold text-gray-600">/mo</span>}
                    </div>
                    {showBusinessMeta && <div className="text-xs text-gray-400 mb-2 italic">{gstTxt}</div>}
                    {saveTxt && <div className="text-sm font-bold text-emerald-600 mb-4">{saveTxt}</div>}

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 border-t-2 border-gray-100 pt-4">{plan.desc}</p>

                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map(feat => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-gray-800 font-medium transition-transform duration-200 hover:translate-x-1">
                          <CheckIcon />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-8 pb-8 border-t-2 border-gray-100 pt-4 flex flex-col items-stretch gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <LockIcon />
                      Secure transaction
                    </div>
                    <div className={`grid gap-3 w-full ${!plan.hasTrial || plan.contactSales ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {plan.hasTrial && (
                        <button 
                          className="px-5 py-2.5 rounded-xl border-2 border-emerald-900 bg-transparent text-emerald-900 text-sm font-bold cursor-pointer whitespace-nowrap text-center transition-all duration-300 ease-out hover:bg-emerald-900 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/30"
                          onClick={() => handleFreeTrial(plan)}
                        >
                          Free trial
                        </button>
                      )}
                      {plan.contactSales ? (
                        <button 
                          className="px-5 py-3 rounded-xl border-2 border-purple-500 bg-transparent text-purple-500 text-sm font-bold cursor-pointer whitespace-nowrap text-center transition-all duration-300 ease-out hover:bg-purple-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40"
                          onClick={handleContactSales}
                        >
                          Contact sales
                        </button>
                      ) : (
                        <button
                          className={`px-5 py-3 rounded-xl border-none text-white text-sm font-extrabold cursor-pointer whitespace-nowrap text-center shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 relative overflow-hidden btn-shimmer ${
                            plan.btnColor === 'blue' 
                              ? 'bg-gradient-to-r from-blue-700 to-blue-600 shadow-blue-600/40 hover:shadow-xl hover:shadow-blue-600/55'
                              : plan.btnColor === 'purple' 
                                ? 'bg-gradient-to-r from-purple-500 to-purple-700 shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/55'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50'
                          }`}
                          onClick={() => handleBuyNow(plan)}
                        >
                          Buy now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CONTACT SALES CTA ══ */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 bg-[length:200%_200%] animate-gradient-shift py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 border-2 border-white/25 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-white/90 mb-6 shadow-lg shadow-black/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
            Enterprise & Institutional Plans Available
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-lg">
            Ready to digitize your operations?
          </h2>
          <p className="text-lg font-medium text-white/80 mb-10 leading-relaxed">
            Join thousands of growers and agri-businesses already using Applekul One.
            Start free or talk to our enterprise team for custom pricing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button 
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-white text-emerald-900 text-base font-extrabold border-none cursor-pointer shadow-xl shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-black/40"
              onClick={handleNavFreeTrial}
            >
              🚀 Start Your Free Trial
            </button>
            <button 
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-transparent text-white text-base font-bold border-2 border-white/50 cursor-pointer transition-all duration-300 ease-out hover:bg-white/15 hover:border-white/80 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-black/20"
              onClick={handleContactSales}
            >
              🤝 Contact Enterprise Sales
            </button>
          </div>
          <div className="flex items-center gap-4 justify-center mb-5">
            <div className="flex-1 max-w-24 h-0.5 bg-white/20" />
            <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">Direct inquiry</span>
            <div className="flex-1 max-w-24 h-0.5 bg-white/20" />
          </div>
          <p className="text-sm font-medium text-white/70">
            Email us at{' '}
            <a 
              href="mailto:sales@applekul.com" 
              className="text-emerald-300 font-bold no-underline border-b-2 border-emerald-300/40 transition-all duration-300 hover:text-emerald-200 hover:border-emerald-200/70 hover:drop-shadow-lg"
            >
              sales@applekul.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;