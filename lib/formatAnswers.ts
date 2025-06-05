import { questions } from './questions';

export default function formatAnswers(answers: { [key: string]: string }) {
  let result = 'Here is the user profile based on their travel preferences:\n\n';

  questions.forEach((question) => {
    const answer = answers[question.id] || 'No answer';
    result += `Q: ${question.text}\nA: ${answer}\n\n`;
  });

  return result;
}