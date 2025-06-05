'use client';

import { useState } from 'react';
import { questions, Question } from '../lib/questions';
import formatAnswers from '../lib/formatAnswers';

export default function AIChat() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const currentQuestion: Question | undefined = questions[step];

  const handleAnswer = async (answer: string) => {
    const updatedAnswers = { ...answers, [currentQuestion!.id]: answer };
    setAnswers(updatedAnswers);
    setCustomInput('');

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // All questions answered, submit to API
      setIsLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ answers: updatedAnswers }),
      });
      const data = await response.json();
      setResult(data.result);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#000', background: '#fff', fontFamily: 'sans-serif' }}>
      {!result && currentQuestion && (
        <>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{currentQuestion.text}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                style={{
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestion.allowCustom && (
            <div>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Or type your answer..."
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.25rem',
                  marginRight: '0.5rem',
                  width: '300px',
                }}
              />
              <button
                onClick={() => handleAnswer(customInput)}
                disabled={!customInput.trim()}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
      {isLoading && <p>Loading your recommendation...</p>}
      {result && (
        <div>
          <h2>Your Recommendation:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}