export type Skill = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "JavaScript", icon: "/icons/JavaScript.svg" },
      { name: "TypeScript", icon: "/icons/TypeScript.svg" },
      { name: "HTML5", icon: "/icons/HTML5.svg" },
      { name: "CSS3", icon: "/icons/CSS3.svg" },
      { name: "React", icon: "/icons/React.svg" },
      { name: "Next.js", icon: "/icons/Next.js.svg" },
      { name: "Vue.js", icon: "/icons/Vue.js.svg" },
      { name: "Svelte", icon: "/icons/Svelte.svg" },
      { name: "Tailwind CSS", icon: "/icons/Tailwind-CSS.svg" },
      { name: "Bootstrap", icon: "/icons/Bootstrap.svg" },
      { name: "Redux", icon: "/icons/Redux.svg" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Java", icon: "/icons/Java.svg" },
      { name: "Node.js", icon: "/icons/Node.js.svg" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", icon: "/icons/MySQL.svg" },
      { name: "MongoDB", icon: "/icons/MongoDB.svg" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: "/icons/Git.svg" },
      { name: "GitHub", icon: "/icons/GitHub.svg" },
      { name: "Vite", icon: "/icons/Vite.svg" },
      { name: "Webpack", icon: "/icons/Webpack.svg" },
      { name: "Vercel", icon: "/icons/Vercel.svg" },
      { name: "Docker", icon: "/icons/Docker.svg" },
      { name: "Postman", icon: "/icons/Postman.svg" },
    ],
  },
];
