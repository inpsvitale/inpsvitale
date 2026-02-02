export function computeStats(players, matches) {
  const stats = {};

  // Init stats per ogni giocatore
  players.forEach(p => {
    stats[p.id] = {
      id: p.id,
      name: p.name,
      photo: p.photo,
      games: 0,
      goals: 0,
      assists: 0,
      points: 0,
      badges: []
    };
  });

  // Calcolo stats dai match
  matches.forEach(m => {
    const resultA = m.scoreA > m.scoreB ? 3 : m.scoreA === m.scoreB ? 1 : 0;
    const resultB = m.scoreB > m.scoreA ? 3 : m.scoreA === m.scoreB ? 1 : 0;

    m.teamA.forEach(id => {
      if (!stats[id]) return;
      stats[id].games++;
      stats[id].points += resultA;
    });

    m.teamB.forEach(id => {
      if (!stats[id]) return;
      stats[id].games++;
      stats[id].points += resultB;
    });

    m.goals.forEach(g => {
      if (stats[g.scorer]) stats[g.scorer].goals++;
      if (g.assist && stats[g.assist]) stats[g.assist].assists++;
    });
  });

  // --- BADGE DINAMICI ---
  const values = Object.values(stats);
  const max = key => Math.max(...values.map(p => p[key]));

  const maxGoals = max("goals");
  const maxAssists = max("assists");
  const maxGames = max("games");
  const maxPoints = max("points");

  values.forEach(p => {
    if (p.goals === maxGoals && maxGoals > 0)
      p.badges.push({ id:"top-scorer", label:"🥇 Top Scorer" });

    if (p.assists === maxAssists && maxAssists > 0)
      p.badges.push({ id:"assist-king", label:"🎯 Assist King" });

    if (p.games === maxGames && maxGames > 0)
      p.badges.push({ id:"iron-man", label:"💪 Iron Man" });

    if (p.points === maxPoints && maxPoints > 0)
      p.badges.push({ id:"mvp", label:"⭐ MVP" });
  });

  return stats;
}

export function computeMatchMVP(match) {
  const score = {};

  match.goals.forEach(g => {
    score[g.scorer] = (score[g.scorer] || 0) + 2;
    if (g.assist) {
      score[g.assist] = (score[g.assist] || 0) + 1;
    }
  });

  let mvp = null;
  let max = -1;

  for (const id in score) {
    if (score[id] > max) {
      max = score[id];
      mvp = id;
    }
  }

  return mvp;
}
