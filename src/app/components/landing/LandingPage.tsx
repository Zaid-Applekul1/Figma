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
 */
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const LANDING_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

@keyframes lp-fade-up {
  from { opacity:0; transform:translateY(32px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes lp-blob-drift {
  0%,100% { transform:translate(0,0) scale(1); }
  33%  { transform:translate(30px,-22px) scale(1.08); }
  66%  { transform:translate(-18px,14px) scale(0.95); }
}
@keyframes lp-shimmer {
  0%   { background-position:-600px 0; }
  100% { background-position: 600px 0; }
}
@keyframes lp-pulse-dot {
  0%,100% { opacity:1; transform:scale(1); }
  50%  { opacity:.5; transform:scale(.78); }
}
@keyframes lp-hero-float {
  0%,100% { transform:translateY(0); }
  50%  { transform:translateY(-10px); }
}
@keyframes lp-badge-pop {
  from { opacity:0; transform:scale(0.6) rotate(-10deg); }
  to   { opacity:1; transform:scale(1) rotate(0deg); }
}
@keyframes lp-scroll-hint {
  0%,100% { opacity:0.5; transform:translateY(0); }
  50%  { opacity:1; transform:translateY(6px); }
}
@keyframes lp-card-in {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes lp-glow-pulse {
  0%,100% { box-shadow:0 0 0 0 rgba(16,185,129,.4); }
  50%  { box-shadow:0 0 0 16px rgba(16,185,129,0); }
}
@keyframes lp-tab-swap {
  from { opacity:0; transform:translateY(10px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes lp-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes lp-bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.lp-root *, .lp-root *::before, .lp-root *::after { box-sizing:border-box; }
.lp-root {
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
}

/* ── Navbar ── */
.lp-nav {
  position: fixed;
  top:0; left:0; right:0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  background: rgba(255,255,255,.96);
  backdrop-filter: blur(24px) saturate(1.8);
  -webkit-backdrop-filter: blur(24px) saturate(1.8);
  border-bottom: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 4px 24px rgba(0,0,0,.08);
  transition: all 0.3s ease;
}
.lp-nav.scrolled {
  padding: 0.75rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
}
.lp-nav-logo {
  display: flex;
  align-items: center;
  gap: .8rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.lp-nav-logo:hover {
  transform: scale(1.02);
}
.lp-nav-logo img {
  height: 85px;
  width: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  transition: box-shadow 0.3s ease;
}
.lp-nav-logo:hover img {
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}
.lp-nav-brand {
  font-size:1.2rem;
  font-weight:900;
  color:#064e3b;
  letter-spacing:-.5px;
  background: linear-gradient(135deg, #064e3b, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.lp-nav-brand span {
  color:#10b981;
  -webkit-text-fill-color: #10b981;
}
.lp-nav-actions {
  display:flex;
  align-items:center;
  gap:.8rem;
}
.lp-btn-solid {
  padding: .6rem 1.6rem;
  border-radius: 999px;
  font-size: .9rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg,#059669,#10b981);
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(16,185,129,.35);
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  position: relative;
  overflow: hidden;
}
.lp-btn-solid::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
  transition: left 0.5s;
}
.lp-btn-solid:hover::before {
  left: 100%;
}
.lp-btn-solid:hover {
  transform:translateY(-3px) scale(1.02);
  box-shadow:0 10px 28px rgba(16,185,129,.5);
}
.lp-btn-solid:active {
  transform:translateY(-1px) scale(0.98);
}

/* ── Hero ── */
.lp-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 76px;
}
.lp-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 30%, #d1fae5 60%, #a7f3d0 100%);
  background-size: 400% 400%;
  animation: lp-gradient-shift 15s ease infinite;
}
.lp-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: lp-blob-drift 14s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.6;
}
.lp-grid-overlay {
  position: absolute;
  inset:0;
  pointer-events:none;
  background-image:
    linear-gradient(rgba(6,78,59,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6,78,59,.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.4;
}
.lp-hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem 1.5rem 4rem;
  max-width: 960px;
  margin: 0 auto;
}
.lp-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  background: rgba(5,150,105,.12);
  border: 1.5px solid rgba(5,150,105,.25);
  border-radius: 999px;
  padding: .5rem 1.3rem;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #059669;
  margin-bottom: 2rem;
  animation: lp-badge-pop .6s cubic-bezier(.22,1,.36,1) .2s both;
  box-shadow: 0 4px 12px rgba(5,150,105,.15);
  transition: all 0.3s ease;
}
.lp-hero-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(5,150,105,.25);
}
.lp-hero-badge-dot {
  width:8px;
  height:8px;
  border-radius:50%;
  background:#10b981;
  box-shadow:0 0 12px #10b981;
  animation: lp-pulse-dot 1.8s ease-in-out infinite;
}
.lp-hero-logo {
  display:inline-block;
  margin-bottom:2rem;
  animation: lp-hero-float 4s ease-in-out infinite, lp-glow-pulse 3s ease-in-out infinite;
  border-radius:24px;
}
.lp-hero-logo img {
  height: clamp(120px, 12vw, 140px);
  width: auto;
  border-radius: 24px;
  object-fit: contain;
  display: block;
  box-shadow: 0 12px 32px rgba(0,0,0,.15);
}
.lp-hero-title {
  font-size: clamp(3rem,8vw,5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1px;
  margin: 0 0 1rem;
  animation: lp-fade-up .75s cubic-bezier(.22,1,.36,1) .3s both;
}
.lp-hero-title .brand-name {
  background: linear-gradient(135deg, #064e3b, #059669, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: lp-gradient-shift 8s ease infinite;
}
.lp-hero-title .text-green-400 {
  color:#10b981;
  text-shadow: 0 0 40px rgba(16,185,129,.3);
}
.lp-hero-punchline {
  font-size: clamp(1.3rem,3.5vw,1.9rem);
  font-weight: 700;
  color: #374151;
  margin: 0 0 .8rem;
  animation: lp-fade-up .75s cubic-bezier(.22,1,.36,1) .4s both;
  line-height: 1.4;
}
.lp-hero-punchline .hl {
  color:#059669;
  font-weight:900;
  position: relative;
}
.lp-hero-punchline .hl::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #34d399);
  border-radius: 2px;
}
.lp-hero-sub {
  font-size: clamp(1rem,2.5vw,1.2rem);
  font-weight: 500;
  color: #6b7280;
  margin: 1rem 0 2.5rem;
  animation: lp-fade-up .75s cubic-bezier(.22,1,.36,1) .5s both;
  line-height: 1.6;
}
.lp-hero-cta-group {
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
  justify-content:center;
  animation: lp-fade-up .75s cubic-bezier(.22,1,.36,1) .6s both;
}
.lp-hero-cta-primary {
  display:inline-flex;
  align-items:center;
  gap:.6rem;
  padding:1.1rem 2.5rem;
  border-radius:16px;
  background:linear-gradient(135deg,#059669,#10b981,#34d399);
  background-size: 200% 200%;
  color:#fff;
  font-size:1.1rem;
  font-weight:800;
  border:none;
  cursor:pointer;
  box-shadow:0 12px 32px rgba(16,185,129,.45);
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
  position: relative;
  overflow: hidden;
}
.lp-hero-cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
  transition: left 0.5s;
}
.lp-hero-cta-primary:hover::before {
  left: 100%;
}
.lp-hero-cta-primary:hover {
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 18px 48px rgba(16,185,129,.6);
  animation: lp-gradient-shift 3s ease infinite;
}
.lp-hero-cta-primary:active {
  transform:translateY(-2px) scale(0.98);
}

/* Stats bar */
.lp-stats-bar {
  position:relative;
  z-index:10;
  display:flex;
  flex-wrap:wrap;
  gap:0;
  justify-content:center;
  background:rgba(255,255,255,.98);
  backdrop-filter: blur(20px);
  border:1.5px solid rgba(5,150,105,.2);
  border-radius:24px;
  padding:1.5rem 2rem;
  max-width:800px;
  width:calc(100% - 3rem);
  margin:0 auto;
  box-shadow:0 8px 32px rgba(0,0,0,.1);
  animation: lp-fade-up .75s cubic-bezier(.22,1,.36,1) .7s both;
  transition: transform 0.3s ease;
}
.lp-stats-bar:hover {
  transform: translateY(-5px);
  box-shadow:0 12px 40px rgba(0,0,0,.15);
}
.lp-stat {
  flex:1;
  min-width:140px;
  text-align:center;
  padding:.6rem 1.2rem;
  border-right:2px solid rgba(5,150,105,.15);
  transition: transform 0.3s ease;
}
.lp-stat:hover {
  transform: scale(1.05);
}
.lp-stat:last-child { border-right:none; }
.lp-stat-val {
  font-size:2rem;
  font-weight:900;
  background: linear-gradient(135deg, #059669, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height:1.2;
}
.lp-stat-lbl {
  font-size:.72rem;
  font-weight:600;
  color:#6b7280;
  text-transform:uppercase;
  letter-spacing:.12em;
  margin-top:.4rem;
}

/* Scroll hint */
.lp-scroll-hint {
  position:absolute;
  bottom:3rem;
  left:50%;
  transform:translateX(-50%);
  z-index:10;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:.5rem;
  animation: lp-scroll-hint 2s ease-in-out infinite;
  cursor:pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
.lp-scroll-hint:hover {
  opacity: 1;
}
.lp-scroll-hint span {
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:#059669;
}
.lp-scroll-arrow {
  width:32px;
  height:32px;
  border:2px solid #059669;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(255,255,255,.5);
  backdrop-filter: blur(8px);
}

/* ── Plans section ── */
.lp-plans {
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  padding:6rem 1.5rem 7rem;
}
.lp-plans-inner { max-width:1300px; margin:0 auto; }
.lp-plans-head { text-align:center; margin-bottom:4rem; }
.lp-plans-head h2 {
  font-size:clamp(2.2rem,5vw,3.2rem);
  font-weight:900;
  background: linear-gradient(135deg, #064e3b, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing:-1px;
  margin:0 0 .8rem;
}
.lp-plans-head p {
  font-size:1.15rem;
  color:#6b7280;
  font-weight:500;
  margin:0;
}

/* Tab bar */
.lp-tab-bar {
  display:flex;
  justify-content:center;
  gap:.5rem;
  border-bottom:3px solid #e5e7eb;
  margin-bottom:3rem;
}
.lp-tab {
  padding:.9rem 2rem;
  font-size:.95rem;
  font-weight:600;
  color:#6b7280;
  background:none;
  border:none;
  border-bottom:3px solid transparent;
  margin-bottom:-3px;
  cursor:pointer;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space:nowrap;
  font-family:inherit;
  position: relative;
}
.lp-tab::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #059669, #10b981);
  transition: transform 0.3s ease;
}
.lp-tab.active::before {
  transform: translateX(-50%) scaleX(1);
}
.lp-tab.active {
  color:#059669;
  border-bottom-color:#059669;
  font-weight:800;
}
.lp-tab:hover:not(.active) {
  color:#374151;
  background: rgba(5,150,105,.05);
  border-radius: 8px 8px 0 0;
}

/* Tab description strip */
.lp-tab-desc {
  text-align:center;
  margin-bottom:2.5rem;
  padding:1rem 2rem;
  background: linear-gradient(135deg, #ffffff, #f0fdf4);
  border:1.5px solid #d1fae5;
  border-radius:16px;
  font-size:.95rem;
  font-weight:500;
  color:#4b5563;
  animation: lp-tab-swap .3s cubic-bezier(.22,1,.36,1) both;
  box-shadow: 0 4px 12px rgba(0,0,0,.06);
}
.lp-tab-desc strong {
  color:#059669;
  font-weight:700;
}

/* Billing toggle */
.lp-billing-toggle { display:flex; justify-content:center; margin-bottom:3rem; }
.lp-billing-pill {
  display:flex;
  align-items:center;
  gap:2rem;
  background:#fff;
  border:2px solid #e5e7eb;
  border-radius:999px;
  padding:.8rem 2rem;
  font-size:.9rem;
  font-weight:600;
  color:#374151;
  box-shadow:0 4px 16px rgba(0,0,0,.08);
}

/* Plans grid */
.lp-plans-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:2rem;
  align-items:start;
  animation: lp-tab-swap .35s cubic-bezier(.22,1,.36,1) both;
}
.lp-plans-grid.centered {
  justify-content:center;
  grid-template-columns:repeat(auto-fit,minmax(300px,450px));
  max-width:500px;
  margin:0 auto;
}

/* Plan card */
.lp-plan-card {
  background:#fff;
  border:2px solid #e5e7eb;
  border-radius:24px;
  overflow:hidden;
  position:relative;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: lp-card-in .6s cubic-bezier(.22,1,.36,1) both;
}
.lp-plan-card:hover {
  box-shadow:0 20px 60px rgba(0,0,0,.15);
  transform:translateY(-8px) scale(1.02);
  border-color:#d1fae5;
}
.lp-plan-card.featured {
  border:3px solid #f59e0b;
  box-shadow:0 12px 40px rgba(245,158,11,.2);
}
.lp-plan-card.featured:hover {
  box-shadow:0 24px 64px rgba(245,158,11,.3);
  border-color:#f59e0b;
}
.lp-plan-card.enterprise {
  border:3px solid #7c3aed;
  box-shadow:0 12px 40px rgba(124,58,237,.18);
}
.lp-plan-card.enterprise:hover {
  box-shadow:0 24px 64px rgba(124,58,237,.28);
  border-color:#7c3aed;
}

/* Best value badge */
.lp-best-badge {
  position:absolute;
  top:1.2rem;
  right:1.2rem;
  background:linear-gradient(135deg,#f59e0b,#d97706);
  color:#fff;
  font-size:.65rem;
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  padding:.4rem .9rem;
  border-radius:8px;
  box-shadow:0 6px 16px rgba(245,158,11,.45);
  animation: lp-badge-pop .5s cubic-bezier(.22,1,.36,1) .4s both, lp-bounce-subtle 2s ease-in-out infinite 1s;
}
.lp-enterprise-badge {
  position:absolute;
  top:1.2rem;
  right:1.2rem;
  background:linear-gradient(135deg,#7c3aed,#6d28d9);
  color:#fff;
  font-size:.65rem;
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  padding:.4rem .9rem;
  border-radius:8px;
  box-shadow:0 6px 16px rgba(124,58,237,.45);
}

/* Card body */
.lp-card-body { padding:2rem 1.8rem 1.5rem; }
.lp-card-plan-name {
  font-size:1.2rem;
  font-weight:800;
  color:#111;
  margin:0 0 .5rem;
}
.lp-card-plan-name .plan-icon { margin-right:.4rem; }
.lp-card-price {
  font-size:2rem;
  font-weight:900;
  background: linear-gradient(135deg, #064e3b, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height:1.2;
  margin:.3rem 0 .3rem;
}
.lp-card-price .orig {
  font-size:1.1rem;
  font-weight:600;
  color:#9ca3af;
  text-decoration:line-through;
  margin-right:.5rem;
}
.lp-card-price .freq {
  font-size:.9rem;
  font-weight:600;
  color:#6b7280;
}
.lp-card-gst {
  font-size:.75rem;
  color:#9ca3af;
  margin-bottom:.5rem;
  font-style:italic;
}
.lp-card-save {
  font-size:.85rem;
  font-weight:700;
  color:#059669;
  margin-bottom:1rem;
}
.lp-card-desc {
  font-size:.88rem;
  color:#6b7280;
  line-height:1.7;
  margin-bottom:1.5rem;
  border-top:2px solid #f3f4f6;
  padding-top:1rem;
}

/* Features */
.lp-feat-list {
  list-style:none;
  padding:0;
  margin:0 0 1.5rem;
  display:flex;
  flex-direction:column;
  gap:.6rem;
}
.lp-feat-item {
  display:flex;
  align-items:flex-start;
  gap:.7rem;
  font-size:.85rem;
  color:#374151;
  font-weight:500;
  transition: transform 0.2s ease;
}
.lp-feat-item:hover {
  transform: translateX(5px);
}
.lp-feat-check {
  width:20px;
  height:20px;
  border-radius:50%;
  background:linear-gradient(135deg,#10b981,#059669);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  margin-top:.1rem;
  box-shadow: 0 2px 8px rgba(16,185,129,.3);
}
.lp-feat-check svg { width:11px; height:11px; }

/* Card footer */
.lp-card-footer {
  padding:1rem 1.8rem 1.8rem;
  border-top:2px solid #f3f4f6;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:.8rem;
}
.lp-secure-label {
  display:flex;
  align-items:center;
  gap:.4rem;
  font-size:.7rem;
  color:#9ca3af;
  font-weight:500;
}
.lp-card-actions {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:.7rem;
  width:100%;
}
.lp-card-actions.single { grid-template-columns:1fr; }
.lp-btn-trial {
  padding:.65rem 1.2rem;
  border-radius:12px;
  border:2px solid #064e3b;
  background:transparent;
  color:#064e3b;
  font-size:.85rem;
  font-weight:700;
  cursor:pointer;
  white-space:nowrap;
  width:100%;
  text-align:center;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
}
.lp-btn-trial:hover {
  background:#064e3b;
  color:#fff;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(6,78,59,.3);
}
.lp-btn-buy {
  padding:.65rem 1.3rem;
  border-radius:12px;
  border:none;
  background:linear-gradient(135deg,#059669,#10b981);
  color:#fff;
  font-size:.85rem;
  font-weight:800;
  cursor:pointer;
  white-space:nowrap;
  width:100%;
  text-align:center;
  box-shadow:0 6px 18px rgba(16,185,129,.4);
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
  position: relative;
  overflow: hidden;
}
.lp-btn-buy::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
  transition: left 0.5s;
}
.lp-btn-buy:hover::before {
  left: 100%;
}
.lp-btn-buy:hover {
  transform:translateY(-3px) scale(1.02);
  box-shadow:0 10px 28px rgba(16,185,129,.5);
}
.lp-btn-buy.blue {
  background:linear-gradient(135deg,#1d4ed8,#2563eb);
  box-shadow:0 6px 18px rgba(37,99,235,.4);
}
.lp-btn-buy.blue:hover {
  box-shadow:0 10px 28px rgba(37,99,235,.55);
}
.lp-btn-buy.purple {
  background:linear-gradient(135deg,#7c3aed,#6d28d9);
  box-shadow:0 6px 18px rgba(124,58,237,.4);
}
.lp-btn-buy.purple:hover {
  box-shadow:0 10px 28px rgba(124,58,237,.55);
}
.lp-btn-contact {
  padding:.65rem 1.3rem;
  border-radius:12px;
  border:2px solid #7c3aed;
  background:transparent;
  color:#7c3aed;
  font-size:.85rem;
  font-weight:700;
  cursor:pointer;
  white-space:nowrap;
  width:100%;
  text-align:center;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
}
.lp-btn-contact:hover {
  background:#7c3aed;
  color:#fff;
  transform: scale(1.02);
  box-shadow: 0 6px 18px rgba(124,58,237,.4);
}

/* Shimmer bar */
.lp-shimmer-bar {
  height:5px;
  background:linear-gradient(90deg,rgba(16,185,129,.3) 25%,rgba(16,185,129,.8) 50%,rgba(16,185,129,.3) 75%);
  background-size:600px 100%;
  animation: lp-shimmer 2.2s ease-in-out infinite;
}

/* ── CTA section ── */
.lp-cta {
  background: linear-gradient(135deg,#064e3b 0%,#065f46 50%,#047857 100%);
  background-size: 200% 200%;
  animation: lp-gradient-shift 15s ease infinite;
  padding:5rem 1.5rem;
  text-align:center;
  position:relative;
  overflow:hidden;
}
.lp-cta::before {
  content:'';
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
}
.lp-cta-inner {
  position:relative;
  z-index:1;
  max-width:800px;
  margin:0 auto;
}
.lp-cta-eyebrow {
  display:inline-flex;
  align-items:center;
  gap:.5rem;
  background:rgba(255,255,255,.15);
  border:1.5px solid rgba(255,255,255,.25);
  border-radius:999px;
  padding:.4rem 1.1rem;
  font-size:.72rem;
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:rgba(255,255,255,.9);
  margin-bottom:1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.2);
}
.lp-cta-title {
  font-size:clamp(2rem,5vw,3rem);
  font-weight:900;
  color:#fff;
  line-height:1.15;
  margin:0 0 1rem;
  letter-spacing:-.5px;
  text-shadow: 0 4px 20px rgba(0,0,0,.3);
}
.lp-cta-sub {
  font-size:1.05rem;
  font-weight:500;
  color:rgba(255,255,255,.8);
  margin:0 0 2.5rem;
  line-height: 1.7;
}
.lp-cta-btns {
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
  justify-content:center;
  margin-bottom:2rem;
}
.lp-cta-btn-primary {
  display:inline-flex;
  align-items:center;
  gap:.6rem;
  padding:1rem 2.3rem;
  border-radius:14px;
  background:#fff;
  color:#064e3b;
  font-size:1rem;
  font-weight:800;
  border:none;
  cursor:pointer;
  box-shadow:0 12px 32px rgba(0,0,0,.3);
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
}
.lp-cta-btn-primary:hover {
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 18px 48px rgba(0,0,0,.4);
}
.lp-cta-btn-outline {
  display:inline-flex;
  align-items:center;
  gap:.6rem;
  padding:1rem 2.3rem;
  border-radius:14px;
  background:transparent;
  color:#fff;
  font-size:1rem;
  font-weight:700;
  border:2px solid rgba(255,255,255,.5);
  cursor:pointer;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family:inherit;
}
.lp-cta-btn-outline:hover {
  background:rgba(255,255,255,.15);
  border-color:rgba(255,255,255,.8);
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 8px 24px rgba(0,0,0,.2);
}
.lp-cta-divider {
  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  margin-bottom:1.2rem;
}
.lp-cta-divider span {
  font-size:.75rem;
  font-weight:600;
  color:rgba(255,255,255,.5);
  letter-spacing:.1em;
  text-transform:uppercase;
}
.lp-cta-divider-line {
  flex:1;
  max-width:100px;
  height:2px;
  background:rgba(255,255,255,.2);
}
.lp-cta-direct {
  font-size:.9rem;
  font-weight:500;
  color:rgba(255,255,255,.7);
}
.lp-cta-direct a {
  color:#6ee7b7;
  font-weight:700;
  text-decoration:none;
  border-bottom:2px solid rgba(110,231,183,.4);
  transition:all .3s ease;
}
.lp-cta-direct a:hover {
  color:#a7f3d0;
  border-color:rgba(167,243,208,.7);
  text-shadow: 0 0 20px rgba(167,243,208,.5);
}

/* Responsive */
@media (max-width:640px) {
  .lp-nav { padding:.8rem 1.2rem; }
  .lp-nav-logo img { height: 70px; }
  .lp-nav-brand { font-size:1rem; }
  .lp-nav-actions { gap:.5rem; }
  .lp-btn-solid { padding:.5rem 1.2rem; font-size:.85rem; }
  .lp-hero-content { padding:1.5rem 1rem 3rem; }
  .lp-hero-title { text-align: center; }
  .lp-hero-punchline { text-align: center; }
  .lp-hero-sub { text-align: center; }
  .lp-stats-bar {
    flex-direction:column;
    border-radius:20px;
    padding:1rem;
  }
  .lp-stat {
    border-right:none;
    border-bottom:2px solid rgba(5,150,105,.15);
    padding:.8rem;
  }
  .lp-stat:last-child { border-bottom:none; }
  .lp-tab-bar { gap:.2rem; overflow-x: auto; }
  .lp-tab { padding:.7rem 1.2rem; font-size:.82rem; }
  .lp-billing-pill {
    flex-direction:column;
    gap:.8rem;
    border-radius:16px;
  }
  .lp-plans-grid {
    grid-template-columns: 1fr;
    gap:1.5rem;
  }
  .lp-card-body { padding: 1.75rem 1.2rem 1.2rem; }
  .lp-card-footer { padding:.9rem 1.2rem 1.5rem; }
  .lp-card-desc { text-align: left; }
  .lp-cta { padding:3.5rem 1.2rem; }
  .lp-cta-btns { flex-direction:column; align-items:stretch; }
  .lp-cta-btn-primary,.lp-cta-btn-outline { justify-content:center; }
}
`;

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
  <div className="lp-feat-check">
    <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="lp-root">
      <style>{LANDING_STYLES}</style>

      {/* ── Navbar ── */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/" className="lp-nav-logo">
          <img src={logo} alt="AppleKul" className="lp-nav-logo-img" />
          <span className="lp-nav-brand">
            AppleKul <span>One</span>
          </span>
        </a>
        <div className="lp-nav-actions">
          <button className="lp-btn-solid" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="lp-btn-solid" onClick={scrollToPlans}>
            See Plans
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-blob" style={{ width:'35rem',height:'35rem',background:'rgba(52,211,153,.18)',top:'-10rem',left:'-10rem',animationDuration:'16s' }} />
        <div className="lp-blob" style={{ width:'25rem',height:'25rem',background:'rgba(6,95,70,.25)',bottom:'-5rem',right:'-5rem',animationDuration:'20s',animationDelay:'5s' }} />
        <div className="lp-blob" style={{ width:'18rem',height:'18rem',background:'rgba(52,211,153,.15)',top:'40%',right:'8%',animationDuration:'12s',animationDelay:'8s' }} />
        <div className="lp-grid-overlay" />

        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            Now live — Orchard Intelligence Platform
          </div>

          <h1 className="lp-hero-title">
            <span className="brand-name">AppleKul</span>
            <span className="text-green-400"> One</span>
          </h1>

          <p className="lp-hero-punchline">
            No more guess work &mdash; <span className="hl">only daily insights</span>
          </p>

          <p className="lp-hero-sub">
            The complete orchard intelligence suite for growers, developers &amp; cooperatives.
          </p>

          <div className="lp-hero-cta-group">
            <button className="lp-hero-cta-primary" onClick={scrollToPlans}>
              ✨ Choose Your Plan
            </button>
          </div>
        </div>

        <div className="lp-stats-bar">
          {[
            { val: '₹0',      lbl: 'First Month Free' },
            { val: '12',       lbl: 'Intelligence Modules' },
            { val: '24/7',    lbl: 'AI Monitoring' },
          ].map(s => (
            <div key={s.lbl} className="lp-stat">
              <div className="lp-stat-val">{s.val}</div>
              <div className="lp-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="lp-scroll-hint" onClick={scrollToPlans}>
          <span>Explore Plans</span>
          <div className="lp-scroll-arrow">
            ↓
          </div>
        </div>
      </section>

      {/* ══ PLANS ══ */}
      <section className="lp-plans" id="plans-section">
        <div className="lp-plans-inner">
          <div className="lp-plans-head">
            <h2>Choose your plan.</h2>
            <p>Transparent pricing for every stage of your orchard journey.</p>
          </div>

          {/* Tabs */}
          <div className="lp-tab-bar">
            {(
              [
                { id: 'individuals', label: 'Growers' },
                { id: 'business',    label: 'Business' },
                { id: 'cooperative', label: 'Academic & Public Sector Initiative' },
              ] as Array<{ id: 'individuals' | 'business' | 'cooperative'; label: string }>
            ).map(tab => (
              <button
                key={tab.id}
                className={`lp-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab description */}
          <div className="lp-tab-desc" key={activeTab}>
            <strong>
              {activeTab === 'individuals' && 'Individual Growers & Farmers'}
              {activeTab === 'business' && 'Agri-tech Businesses'}
              {activeTab === 'cooperative' && 'Students, Universities & Public Sector'}
            </strong>
            {' — '}{currentTab.desc}
          </div>

          {/* Billing info */}
          <div className="lp-billing-toggle">
            <div className="lp-billing-pill">
              <span style={{ fontWeight:700,color:'#374151',fontSize:'.9rem' }}>Annual plan, billed monthly</span>
            </div>
          </div>

          {/* Cards */}
          <div className={`lp-plans-grid${activeTab === 'cooperative' && plans.length === 1 ? ' centered' : ''}`} key={activeTab + billing}>
            {plans.map((plan, i) => {
              const price    = getPrice(plan);
              const origPx   = getOrigPrice(plan);
              const saveTxt  = getSave(plan);
              const gstTxt   = getGst(plan);
              const showBusinessMeta = activeTab === 'business';
              const cardClass = `lp-plan-card${plan.featured ? ' featured' : ''}${plan.enterprise ? ' enterprise' : ''}`;

              return (
                <div key={plan.id} className={cardClass} style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Shimmer top */}
                  <div className="lp-shimmer-bar" style={{
                    background: plan.featured
                      ? 'linear-gradient(90deg,rgba(245,158,11,.3) 25%,rgba(245,158,11,.8) 50%,rgba(245,158,11,.3) 75%)'
                      : plan.enterprise
                        ? 'linear-gradient(90deg,rgba(124,58,237,.3) 25%,rgba(124,58,237,.8) 50%,rgba(124,58,237,.3) 75%)'
                        : undefined,
                  }} />

                  {plan.featured   && <div className="lp-best-badge">Best value</div>}
                  {plan.enterprise && <div className="lp-enterprise-badge">Enterprise</div>}

                  <div className="lp-card-body">
                    <div className="lp-card-plan-name">
                      <span className="plan-icon">{plan.icon}</span>
                      {plan.name}
                    </div>

                    <div className="lp-card-price">
                      {origPx && <span className="orig">{origPx}</span>}
                      {price}
                      {showBusinessMeta && price && price !== 'Custom' && <span className="freq">/mo</span>}
                    </div>
                    {showBusinessMeta && <div className="lp-card-gst">{gstTxt}</div>}
                    {saveTxt && <div className="lp-card-save">{saveTxt}</div>}

                    <p className="lp-card-desc">{plan.desc}</p>

                    <ul className="lp-feat-list">
                      {plan.features.map(feat => (
                        <li key={feat} className="lp-feat-item">
                          <CheckIcon />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lp-card-footer">
                    <div className="lp-secure-label">
                      <LockIcon />
                      Secure transaction
                    </div>
                    <div className={`lp-card-actions${!plan.hasTrial || plan.contactSales ? ' single' : ''}`}>
                      {plan.hasTrial && (
                        <button className="lp-btn-trial" onClick={() => handleFreeTrial(plan)}>
                          Free trial
                        </button>
                      )}
                      {plan.contactSales ? (
                        <button className="lp-btn-contact" onClick={handleContactSales}>
                          Contact sales
                        </button>
                      ) : (
                        <button
                          className={`lp-btn-buy${plan.btnColor === 'blue' ? ' blue' : plan.btnColor === 'purple' ? ' purple' : ''}`}
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
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <div className="lp-cta-eyebrow">
            <span style={{ width:7,height:7,borderRadius:'50%',background:'#6ee7b7',display:'inline-block' }} />
            Enterprise &amp; Institutional Plans Available
          </div>
          <h2 className="lp-cta-title">Ready to digitize your operations?</h2>
          <p className="lp-cta-sub">
            Join thousands of growers and agri-businesses already using Applekul One.
            Start free or talk to our enterprise team for custom pricing.
          </p>
          <div className="lp-cta-btns">
            <button className="lp-cta-btn-primary" onClick={handleNavFreeTrial}>
              🚀 Start Your Free Trial
            </button>
            <button className="lp-cta-btn-outline" onClick={handleContactSales}>
              🤝 Contact Enterprise Sales
            </button>
          </div>
          <div className="lp-cta-divider">
            <div className="lp-cta-divider-line" />
            <span>Direct inquiry</span>
            <div className="lp-cta-divider-line" />
          </div>
          <p className="lp-cta-direct">
            Email us at{' '}
            <a href="mailto:sales@applekul.com">sales@applekul.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;