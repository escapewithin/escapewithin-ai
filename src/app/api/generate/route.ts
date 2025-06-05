import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    console.log('Received answers:', answers);

    const prompt = `A person is planning a holiday. Based on their answers: ${JSON.stringify(
      answers,
      null,
      2
    )}, suggest a travel destination and explain why it's a perfect match.`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = chatCompletion.choices[0]?.message?.content || '';
    console.log('Generated reply:', reply);

    return NextResponse.json({ result: reply });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ result: 'Something went wrong.' }, { status: 500 });
  }
}