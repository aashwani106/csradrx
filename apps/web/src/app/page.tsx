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


        <SocialProof />


        <Problem />

        <LiveFeed />






        <Solution />

        <DataSources />

        <Pipeline />

        <Showcase />

        <Distribution />

        <Features />

        <PersonalizationSection />
        <Differentiation />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
