export function computeStats(players, matches) {
  const s = {};
  players.forEach(p => s[p.id] =
    { ...p, games:0, goals:0, assists:0, points:0, badges:[] });

  matches.forEach(m => {
    const rA = m.scoreA > m.scoreB ? 3 : m.scoreA === m.scoreB ? 1 : 0;
    const rB = m.scoreB > m.scoreA ? 3 : m.scoreA === m.scoreB ? 1 : 0;

    m.teamA.forEach(p => { s[p].games++; s[p].points += rA; });
    m.teamB.forEach(p => { s[p].games++; s[p].points += rB; });

    m.goals.forEach(g => {
      s[g.scorer].goals++;
      if (g.assist) s[g.assist].assists++;
    });
  });

  const max = (k) => Math.max(...Object.values(s).map(p=>p[k]));
  Object.values(s).forEach(p => {
    if (p.goals === max("goals")) p.badges.push("🥇 Top Scorer");
    if (p.assists === max("assists")) p.badges.push("🎯 Assist King");
    if (p.games === max("games")) p.badges.push("💪 Iron Man");
  });

  return s;
}
