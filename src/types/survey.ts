export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  options: Option[];
}

export interface Option {
  id: string;
  label: string;
  description: string;
  score: number;
}

export interface Answer {
  questionId: string;
  selectedOptionId: string;
}

export interface Session {
  id: string;
  startTime: Date;
  endTime?: Date;
  status: 'in_progress' | 'completed';
  answers: Answer[];
}

export interface Result {
  sessionId: string;
  totalScore: number;
  averageScore: number;
  maturityLevel: number;
  categoryScores: CategoryScore[];
}

export interface CategoryScore {
  categoryId: string;
  score: number;
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  scoreRange: {
    min: number;
    max: number;
  };
}

export interface Recommendation {
  categoryId: string;
  maturityLevel: number;
  content: string;
}