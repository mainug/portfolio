export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: "Code",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Java"],
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["React", "Next.js", "Tailwind CSS", "Styled-components", "Framer Motion"],
  },
  {
    category: "State & Data",
    icon: "Database",
    skills: ["Redux", "Recoil", "Zustand", "TanStack Query"],
  },
  {
    category: "Tools",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Vite", "Webpack", "Vercel", "Netlify"],
  },
];
