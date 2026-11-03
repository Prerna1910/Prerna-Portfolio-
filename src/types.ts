export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}
