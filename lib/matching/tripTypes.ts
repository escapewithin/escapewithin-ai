export type TripType = {
  id: string;
  name: string;
  description: string;
};

export const tripTypes: TripType[] = [
  {
    id: 'reset_seeker',
    name: 'The Reset Seeker',
    description: 'You’re craving rest, quiet, and reconnection. You want to unwind, disconnect from the chaos, and return feeling recharged.',
  },
  {
    id: 'experience_collector',
    name: 'The Experience Collector',
    description: 'You thrive on action, discovery, and new sensations. Your trip should be full of adventure, culture, and unique moments.',
  },
  {
    id: 'bond_builder',
    name: 'The Bond Builder',
    description: 'You want to deepen your connection with someone. Shared experiences and intentional downtime matter most.',
  },
  {
    id: 'social_explorer',
    name: 'The Social Explorer',
    description: 'You love trending destinations, vibrant energy, parties, and sharing your experiences. You chase the hype in the coolest places.',
  }
];

// Very basic scoring logic for now — will evolve!
export function matchTripType(answers: string[]): TripType {
  const counts: Record<string, number> = {
    reset_seeker: 0,
    experience_collector: 0,
    bond_builder: 0,
    social_explorer: 0,
  };

  for (const answer of answers) {
    if (answer.includes('relax') || answer.includes('unwind')) counts.reset_seeker++;
    if (answer.includes('adventure') || answer.includes('culture')) counts.experience_collector++;
    if (answer.includes('connect') || answer.includes('partner')) counts.bond_builder++;
    if (answer.includes('party') || answer.includes('trending')) counts.social_explorer++;
  }

  const highest = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  return tripTypes.find(t => t.id === highest)!;
}