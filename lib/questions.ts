export type Question = {
  id: number;
  text: string;
  options: string[];
  allowCustom?: boolean;
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Who are you planning to travel with?",
    options: ["Solo", "Partner", "Family", "Friends"],
    allowCustom: true,
  },
  {
    id: 2,
    text: "What is the main purpose of your trip?",
    options: ["Relaxation", "Adventure", "Culture", "Nature", "Romance"],
    allowCustom: true,
  },
  {
    id: 3,
    text: "What kind of climate do you prefer?",
    options: ["Warm and sunny", "Cold and snowy", "Mild and breezy"],
    allowCustom: true,
  },
];