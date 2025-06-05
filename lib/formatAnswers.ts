import { Question } from './questions';

export function formatAnswers(questions: Question[], answers: string[]): string {
  let result = 'Here is the user profile based on their travel preferences:\n\n';

  questions.forEach((question, index) => {
    result += `Q: ${question.text}\nA: ${answers[index] || 'No answer'}\n\n`;
  });

  result += `Based on this, suggest a unique travel destination and trip concept that suits the emotional, practical, and relational context of the traveler. Include why it fits their situation.\n`;

  return result;
}