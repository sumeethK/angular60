interface QuestionCategory {
  id: number;
  creationDate: string;
  modifiedDate: string;
  active: boolean;
  latestVersion: boolean;
  name: string;
  description: string;
}

interface  Option {
  A: string;
  B: string;
  C: string;
  D: string;
}
interface Answer {
  key: string;
  description: string;
}

interface Question {
  id: number;
  creationDate: string;
  modifiedDate: string;
  active: boolean;
  latestVersion: boolean;
  question: string;
  options: Option;
  answer: Answer;
  category: QuestionCategory;
  comments: string;
  level: number;
}
