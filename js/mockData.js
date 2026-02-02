export const players = [
  { id: "luca", name: "Luca" },
  { id: "marco", name: "Marco" },
  { id: "ale", name: "Ale" },
  { id: "gio", name: "Gio" }
];

export const matches = [
  {
    id: "m1",
    date: "2026-02-01",
    time: "21:00",
    place: "Campo Aurora",
    teamA: ["luca", "marco"],
    teamB: ["ale", "gio"],
    scoreA: 5,
    scoreB: 3,
    goals: [
      { scorer: "luca", assist: "marco" },
      { scorer: "luca", assist: null },
      { scorer: "ale", assist: null }
    ]
  }
];
