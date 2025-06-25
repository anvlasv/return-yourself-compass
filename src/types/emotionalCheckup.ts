
export interface EmotionalCheckupQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: number;
    emoji: string;
  }[];
}

export interface EmotionalCheckupResult {
  title: string;
  message: string;
  color: string;
  suggestion: string;
}
