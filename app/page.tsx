import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Terminal from "@/components/sections/Terminal";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Terminal />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
