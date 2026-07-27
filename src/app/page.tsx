import { Hero } from "@/components/sections/hero";
import { TrustLogos } from "@/components/sections/trust-logos";
import { FeaturedCaseStudies } from "@/components/sections/featured-case-studies";
import { Services } from "@/components/sections/services";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <FeaturedCaseStudies />
      <Services />
      <ProcessTimeline />
      <About />
      <TechStack />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
