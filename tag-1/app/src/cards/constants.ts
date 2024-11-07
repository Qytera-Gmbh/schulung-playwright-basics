export const ARTISTS = [
  "Raven Riot",
  "Steel Serpent",
  "Lunar Lightning",
  "Binary Bloom",
  "Echo Eclipse",
  "Synth Serenade",
  "Celestial Chord",
  "Symphonic Silence",
  "Harmony Haven",
] as const;

export const TIMESLOTS = [
  getDate({ hour: 17, minute: 0 }),
  getDate({ hour: 17, minute: 30 }),
  getDate({ hour: 18, minute: 0 }),
  getDate({ hour: 18, minute: 30 }),
  getDate({ hour: 19, minute: 0 }),
  getDate({ hour: 19, minute: 30 }),
  getDate({ hour: 20, minute: 0 }),
];

function getDate({ hour, minute }: { hour: number; minute: number }) {
  const date = new Date();
  date.setFullYear(0);
  date.setMonth(0);
  date.setDate(0);
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
