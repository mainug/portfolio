export type Project = {
  id: string;
  nameKo: string;
  nameEn: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "endfield-calendar",
    nameKo: "엔드필드 캘린더",
    nameEn: "Endfield Calendar",
    description:
      "명일방주: 엔드필드의 버전별 이벤트 일정을 한눈에 볼 수 있는 인터랙티브 대시보드. 타임라인 뷰와 카드 뷰를 지원합니다.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    githubUrl: "https://github.com/mainug/endfield-calendar",
  },
  {
    id: "bluearchive-stats",
    nameKo: "블루 아카이브 총력전 통계",
    nameEn: "Blue Archive Stats",
    description:
      "블루 아카이브 총력전 점수를 기록하고 분석하는 통계 대시보드. Global/JP 서버 구분과 난이도별 데이터를 지원합니다.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/mainug/bluearchive-stats",
  },
  {
    id: "aic-assistant",
    nameKo: "AIC 어시스턴트",
    nameEn: "AIC Assistant",
    description:
      "AI 기반 챗봇 어시스턴트 웹 애플리케이션. 사용자와의 대화를 통해 다양한 질문에 답변합니다.",
    tech: ["TypeScript", "React", "Next.js"],
    githubUrl: "https://github.com/mainug/AIC-Assistant",
  },
  {
    id: "data-miniproject",
    nameKo: "데이터 미니 프로젝트",
    nameEn: "Data Mini Project",
    description: "데이터 시각화 및 분석을 중심으로 한 미니 프로젝트.",
    tech: ["TypeScript", "React"],
    githubUrl: "https://github.com/mainug/data-miniproject",
  },
  {
    id: "java-miniproject",
    nameKo: "Java 미니 프로젝트",
    nameEn: "Java Mini Project 2026",
    description:
      "Java 웹 개발자 과정에서 진행한 팀 미니 프로젝트. 백엔드 중심의 웹 서비스 개발.",
    tech: ["Java", "HTML5", "CSS3"],
    githubUrl: "https://github.com/mainug/java-miniproject-2026",
  },
];
