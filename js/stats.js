export function computeStats(players, matches) {
  const stats = {};

  // init
  players.forEach(p => {
    stats[p.id] = {
      id: p.id,
      name: p.name,
      games: 0,
      goals: 0,
      assists: 0,
      points: 0,
      badges: []
    };
  });

  matches.forEach(m => {
    const resultA = m.scoreA > m.scoreB ? 3 : m.scoreA === m.scoreB ? 1 : 0;
    const resultB = m.scoreB > m.scoreA ? 3 : m.scoreA === m.scoreB ? 1 : 0;

    m.teamA.forEach(p => {
      if (!stats[p]) return;
      stats[p].games++;
      stats[p].points += resultA;
    });

    m.teamB.forEach(p => {
      if (!stats[p]) return;
      stats[p].games++;
      stats[p].points += resultB;
    });

    m.goals.forEach(g => {
      if (stats[g.scorer]) stats[g.scorer].goals++;
      if (g.assist && stats[g.assist]) stats[g.assist].assists++;
    });
  });

  // badge
  const max = key =>
    Math.max(...Object.values(stats).map(p => p[key]));

  const maxGoals = max("goals");
  const maxAssists = max("assists");
  const maxGames = max("games");

  Object.values(stats).forEach(p => {
    if (p.goals === maxGoals && maxGoals > 0) p.badges.push("🥇 Top Scorer");
    if (p.assists === maxAssists && maxAssists > 0) p.badges.push("🎯 Assist King");
    if (p.games === maxGames && maxGames > 0) p.badges.push("💪 Iron Man");
  });

  return stats;
}
