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

export const CATERERS = [
  {
    avatar: "/avatars/platter-perfectionists.svg",
    name: "Platter Perfectionists",
    email: "platters@example.com",
    description:
      "We specialize in crafting beautifully curated platters that turn every meal into a memorable experience. From mouth-watering appetizers to decadent desserts, our goal is to bring flavor, flair, and a touch of perfection to your table!",
  },
  {
    avatar: "/avatars/munch-masters.svg",
    name: "Munch Masters",
    email: "masters@example.com",
    description:
      "Your go-to team for delicious bites and unforgettable feasts. With flavors that satisfy and presentations that impress, we\u2019re here to make every munch a moment to remember!",
  },
  {
    avatar: "/avatars/banana-buffets.svg",
    name: "Banana Buffets",
    email: "banana@example.com",
    description:
      "We bring fun, flavor, and a touch of the unexpected to every spread, with dishes that are as lively as they are delicious. Whether you\u2019re after tropical vibes or classic comfort, we\u2019ve got you covered with a buffet that\u2019s truly a-peel-ing!",
  },
];

export const TIMESLOTS: Date[] = [
  getDate({ hour: 17, minute: 0 }),
  getDate({ hour: 17, minute: 30 }),
  getDate({ hour: 18, minute: 0 }),
  getDate({ hour: 18, minute: 30 }),
  getDate({ hour: 19, minute: 0 }),
  getDate({ hour: 19, minute: 30 }),
  getDate({ hour: 20, minute: 0 }),
];

function getDate({
  year,
  month,
  day,
  hour,
  minute,
  second,
  millisecond,
}: {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}) {
  const date = new Date();
  date.setFullYear(year ?? 0);
  date.setMonth(month ?? 0);
  date.setDate(day ?? 0);
  date.setHours(hour ?? 0);
  date.setMinutes(minute ?? 0);
  date.setSeconds(second ?? 0);
  date.setMilliseconds(millisecond ?? 0);
  return date;
}
