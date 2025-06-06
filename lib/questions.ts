export type Question = {
  id: string;
  text: string;
  options?: string[];
  allowPersonal?: boolean;
};

export const questions: Question[] = [
  {
    id: 'location',
    text: 'Where are you currently located? (City, Country)',
    allowPersonal: true,
  },
  {
    id: 'flight_time',
    text: 'What’s the maximum flight time you’re comfortable with?',
    options: ['Up to 3 hours', 'Up to 6 hours', 'Up to 10 hours', 'Any distance'],
    allowPersonal: true,
  },
  {
    id: 'travel_with',
    text: 'Who are you traveling with?',
    options: ['Solo', 'Partner', 'Family', 'Friends'],
    allowPersonal: true,
  },
  {
    id: 'purpose',
    text: 'What’s the main purpose of this trip for you (and your companion)?',
    options: ['To relax', 'To explore', 'To reconnect', 'To party', 'To escape routine'],
    allowPersonal: true,
  },
  {
    id: 'return_feeling',
    text: 'With what feelings do you want to come back from this trip?',
    options: ['Peaceful', 'Inspired', 'Excited', 'Recharged', 'Loved'],
    allowPersonal: true,
  },
  {
    id: 'experience_type',
    text: 'What kind of experience are you looking for?',
    options: [
      'Adventure & Activities',
      'Quiet and Secluded',
      'Cultural and Historic',
      'Beach Vibes',
      'Trending / Social Hotspots'
    ],
    allowPersonal: true,
  },
  {
    id: 'budget',
    text: 'What is your estimated total budget for this trip (including flights)?',
    options: ['Less than $1000', '$1000 - $2000', '$2000 - $4000', '$4000+'],
    allowPersonal: true,
  },
  {
    id: 'climate',
    text: 'What type of climate would you prefer during your trip?',
    options: [
      'Warm and Sunny (e.g. Greece, Spain)',
      'Cool and Refreshing (e.g. Norway, Iceland)',
      'Cold and Snowy (e.g. Switzerland, Canada)',
      'Tropical and Humid (e.g. Thailand, Bali)'
    ],
    allowPersonal: true,
  },
  {
    id: 'pace',
    text: 'What pace of travel are you looking for?',
    options: [
      'Very Chill (poolside, minimal activities)',
      'Balanced (mix of rest and exploration)',
      'Fast-Paced (sightseeing and active days)'
    ],
    allowPersonal: true,
  },
  {
    id: 'personal_input',
    text: 'Anything else you’d like us to know about your dream trip?',
    allowPersonal: true,
  },
];