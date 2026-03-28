import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LiveFeed from "@/components/landing/LiveFeed";
import SocialProof from "@/components/landing/SocialProof";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import DataSources from "@/components/landing/DataSources";
import Pipeline from "@/components/landing/Pipeline";
import Showcase from "@/components/landing/Showcase";
import Distribution from "@/components/landing/Distribution";
import Features from "@/components/landing/Features";
import Differentiation from "@/components/landing/Differentiation";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Atmosphere from "@/components/dashboard/Atmosphere";
import PersonalizationSection from "@/components/landing/PersonalizationSection";
import Reveal from "@/components/motion/Reveal";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-atmosphere overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="bg-noise" />
        <div className="bg-grid" />
        <div className="bg-microgrid" />
        <Atmosphere />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col pt-20">
        <Hero />
        <Reveal><SocialProof /></Reveal>
        <Reveal delay={0.03}><Problem /></Reveal>
        <Reveal delay={0.03}><LiveFeed /></Reveal>
        <Reveal delay={0.03}><Solution /></Reveal>
        <Reveal delay={0.03}><DataSources /></Reveal>
        <Reveal delay={0.03}><Pipeline /></Reveal>
        <Reveal delay={0.03}><Showcase /></Reveal>
        <Reveal delay={0.03}><Distribution /></Reveal>
        <Reveal delay={0.03}><Features /></Reveal>
        <Reveal delay={0.03}><PersonalizationSection /></Reveal>
        <Reveal delay={0.03}><Differentiation /></Reveal>
        <Reveal delay={0.03}><CTA /></Reveal>
      </main>

      <Reveal delay={0.03}><Footer /></Reveal>
    </div>
  );
}
