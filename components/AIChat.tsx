'use client';

import { useState } from 'react';
import { questions } from '../lib/questions';
import formatAnswers from '../lib/formatAnswers';

export default function AIChat() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[step];

  const handleOptionClick = (option: string) => {
    const prev = inputs[currentQuestion.id] || '';
    const updated = prev.includes(option)
      ? prev
      : prev
      ? `${prev}, ${option}`
      : option;
    setInputs({ ...inputs, [currentQuestion.id]: updated });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [currentQuestion.id]: e.target.value });
  };

  const handleNext = async () => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ answers: inputs }),
      });
      const data = await response.json();
      setResult(data.result);
      setLoading(false);
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
        <div className="flex flex-wrap gap-2 mb-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition text-sm"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <textarea
        className="w-full p-2 rounded bg-white text-black"
        rows={4}
        placeholder="Describe your answer..."
        value={inputs[currentQuestion.id] || ''}
        onChange={handleChange}
      />

      <button
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        onClick={handleNext}
      >
        {step + 1 < questions.length ? 'Next' : 'Submit'}
      </button>

      {loading && <p className="mt-4">Thinking of your perfect destination...</p>}
    </div>
  );
}