'use client';

import { useState } from 'react';
import { questions, Question } from '../lib/questions';
import formatAnswers from '../lib/formatAnswers';

export default function AIChat() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [personalInputs, setPersonalInputs] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[step];

  const handleAnswer = async (answer: string) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };
    setAnswers(updatedAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          answers: formatAnswers({ ...updatedAnswers, ...personalInputs }),
        }),
      });
      const data = await response.json();
      setResult(data.result);
      setLoading(false);
    }
  };

  const handlePersonalInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalInputs({
      ...personalInputs,
      [currentQuestion.id]: e.target.value,
    });
  };

  const handlePersonalSubmit = () => {
    const input = personalInputs[currentQuestion.id];
    if (input && input.trim()) {
      handleAnswer(input);
    }
  };

  if (result) {
    return (
      <div className="p-6 max-w-xl mx-auto text-white">
        <h2 className="text-2xl font-bold mb-4">Your Recommendation:</h2>
        <p>{result}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>

      {currentQuestion.options && (
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {currentQuestion.allowPersonal && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 rounded bg-white text-black"
            rows={4}
            placeholder="Write your answer here..."
            value={personalInputs[currentQuestion.id] || ''}
            onChange={handlePersonalInputChange}
          />
          <button
            className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={handlePersonalSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {loading && <p className="mt-4">Thinking of your perfect destination...</p>}
    </div>
  );
}