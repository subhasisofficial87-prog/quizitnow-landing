export interface MCQ {
  question: string;
  options: string[];
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface FillInBlank {
  question: string;
  options: string[];
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface OneWordAnswer {
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface TrueFalse {
  question: string;
  answer: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface MatchFollowing {
  pairs: { left: string; right: string }[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface AssertionReason {
  assertion: string;
  reason: string;
  answer: 'both_correct_reason_explains' | 'both_correct_reason_not_explains' | 'assertion_correct_reason_wrong' | 'both_wrong';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface GeneratedQuestions {
  mcqs: MCQ[];
  fillInBlanks: FillInBlank[];
  oneWordAnswers: OneWordAnswer[];
  trueFalse: TrueFalse[];
  matchFollowing: MatchFollowing[];
  assertionReason: AssertionReason[];
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  created_at: string;
  questions?: GeneratedQuestions;
}

export interface QuizState {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  answers: Record<number, string>;
  isComplete: boolean;
}
