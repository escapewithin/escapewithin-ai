export type Question = {
  id: string;
  text: string;
  options?: string[];
  allowPersonal?: boolean;
};

export const questions: Question[] = [
  {
    id: 'travel_with',
    text: 'Who are you traveling with?',
    options: ['Solo', 'Partner', 'Family', 'Friends'],
    allowPersonal: true,
  },
  {
    id: 'purpose',
    text: 'What’s the main purpose of this trip?',
    options: ['To relax', 'To explore', 'To reconnect', 'To party', 'To escape routine'],
    allowPersonal: true,
  },
  {
    id: 'emotions',
    text: 'How do you want to feel during this trip?',
    options: ['Peaceful', 'Inspired', 'Excited', 'Recharged', 'Loved'],
    allowPersonal: true,
  },
  {
    id: 'experience_type',
    text: 'What kind of experience are you looking for?',
    options: ['Adventure & Activities', 'Quiet and Secluded', 'Cultural and Historic', 'Beach Vibes', 'Trending / Social Hotspots'],
    allowPersonal: true,
  },
  {
    id: 'extra_notes',
    text: 'Anything else you’d like us to know about your dream trip?',
    allowPersonal: true,
  },
];