/**
 * Mock data untuk 4 kompetisi utama Football-Data.org:
 * - PL: Premier League (Inggris)
 * - PD: La Liga (Spanyol, Primera Division)
 * - SA: Serie A (Italia)
 * - CL: UEFA Champions League
 */

export const LEAGUES = [
  {
    code: "PL",
    name: "Premier League",
    country: "Inggris",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    emblem: "https://crests.football-data.org/PL.png",
    season: "2024/2025",
    currentMatchday: 29,
  },
  {
    code: "PD",
    name: "La Liga",
    country: "Spanyol",
    flag: "🇪🇸",
    emblem: "https://crests.football-data.org/PD.png",
    season: "2024/2025",
    currentMatchday: 28,
  },
  {
    code: "SA",
    name: "Serie A",
    country: "Italia",
    flag: "🇮🇹",
    emblem: "https://crests.football-data.org/SA.png",
    season: "2024/2025",
    currentMatchday: 29,
  },
  {
    code: "CL",
    name: "Champions League",
    country: "Eropa",
    flag: "🇪🇺",
    emblem: "https://crests.football-data.org/CL.png",
    season: "2024/2025",
    currentMatchday: 8,
  },
];

export const MOCK_FOOTBALL_DATA = {
  PL: {
    competition: {
      id: 2021,
      name: "Premier League",
      code: "PL",
      emblem: "https://crests.football-data.org/PL.png",
    },
    matches: [
      {
        id: 101,
        utcDate: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
        status: "IN_PLAY",
        minute: "78'",
        matchday: 29,
        venue: "Emirates Stadium, London",
        homeTeam: { id: 57, name: "Arsenal FC", shortName: "Arsenal", tla: "ARS", crest: "https://crests.football-data.org/57.png" },
        awayTeam: { id: 65, name: "Manchester City FC", shortName: "Man City", tla: "MCI", crest: "https://crests.football-data.org/65.png" },
        score: { fullTime: { home: 2, away: 2 }, halfTime: { home: 1, away: 1 } },
        goals: [
          { scorer: { name: "Bukayo Saka" }, minute: 23 },
          { scorer: { name: "Erling Haaland" }, minute: 41 },
          { scorer: { name: "Martin Ødegaard" }, minute: 58 },
          { scorer: { name: "Phil Foden" }, minute: 74 },
        ],
      },
      {
        id: 102,
        utcDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "PAUSED",
        minute: "45'",
        matchday: 29,
        venue: "Stamford Bridge, London",
        homeTeam: { id: 61, name: "Chelsea FC", shortName: "Chelsea", tla: "CHE", crest: "https://crests.football-data.org/61.png" },
        awayTeam: { id: 64, name: "Liverpool FC", shortName: "Liverpool", tla: "LIV", crest: "https://crests.football-data.org/64.png" },
        score: { fullTime: { home: 1, away: 1 }, halfTime: { home: 1, away: 1 } },
      },
      {
        id: 103,
        utcDate: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 29,
        venue: "Tottenham Hotspur Stadium, London",
        homeTeam: { id: 73, name: "Tottenham Hotspur FC", shortName: "Tottenham", tla: "TOT", crest: "https://crests.football-data.org/73.png" },
        awayTeam: { id: 66, name: "Manchester United FC", shortName: "Man United", tla: "MUN", crest: "https://crests.football-data.org/66.png" },
        score: { fullTime: { home: 2, away: 0 }, halfTime: { home: 1, away: 0 } },
      },
      {
        id: 104,
        utcDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: "TIMED",
        matchday: 29,
        venue: "Villa Park, Birmingham",
        homeTeam: { id: 58, name: "Aston Villa FC", shortName: "Aston Villa", tla: "AVL", crest: "https://crests.football-data.org/58.png" },
        awayTeam: { id: 67, name: "Newcastle United FC", shortName: "Newcastle", tla: "NEW", crest: "https://crests.football-data.org/67.png" },
        score: { fullTime: { home: null, away: null } },
      },
      {
        // Laga pukul 02:00 pagi besok waktu lokal (WIB) - Melewati tengah malam
        id: 105,
        utcDate: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(2, 0, 0, 0);
          return d.toISOString();
        })(),
        status: "TIMED",
        matchday: 29,
        venue: "Amex Stadium, Brighton",
        homeTeam: { id: 397, name: "Brighton & Hove Albion FC", shortName: "Brighton", tla: "BHA", crest: "https://crests.football-data.org/397.png" },
        awayTeam: { id: 563, name: "West Ham United FC", shortName: "West Ham", tla: "WHU", crest: "https://crests.football-data.org/563.png" },
        score: { fullTime: { home: null, away: null } },
      },
      {
        id: 106,
        utcDate: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(21, 0, 0, 0);
          return d.toISOString();
        })(),
        status: "SCHEDULED",
        matchday: 29,
        venue: "Craven Cottage, London",
        homeTeam: { id: 63, name: "Fulham FC", shortName: "Fulham", tla: "FUL", crest: "https://crests.football-data.org/63.png" },
        awayTeam: { id: 402, name: "Brentford FC", shortName: "Brentford", tla: "BRE", crest: "https://crests.football-data.org/402.png" },
        score: { fullTime: { home: null, away: null } },
      },
    ],
    standings: [
      {
        stage: "REGULAR_SEASON",
        type: "TOTAL",
        table: [
          { position: 1, team: { id: 64, name: "Liverpool FC", shortName: "Liverpool", tla: "LIV", crest: "https://crests.football-data.org/64.png" }, playedGames: 28, won: 20, draw: 5, lost: 3, points: 65, goalsFor: 64, goalsAgainst: 26, goalDifference: 38 },
          { position: 2, team: { id: 57, name: "Arsenal FC", shortName: "Arsenal", tla: "ARS", crest: "https://crests.football-data.org/57.png" }, playedGames: 28, won: 19, draw: 6, lost: 3, points: 63, goalsFor: 61, goalsAgainst: 23, goalDifference: 38 },
          { position: 3, team: { id: 65, name: "Manchester City FC", shortName: "Man City", tla: "MCI", crest: "https://crests.football-data.org/65.png" }, playedGames: 28, won: 19, draw: 5, lost: 4, points: 62, goalsFor: 62, goalsAgainst: 28, goalDifference: 34 },
          { position: 4, team: { id: 58, name: "Aston Villa FC", shortName: "Aston Villa", tla: "AVL", crest: "https://crests.football-data.org/58.png" }, playedGames: 28, won: 16, draw: 6, lost: 6, points: 54, goalsFor: 52, goalsAgainst: 36, goalDifference: 16 },
          { position: 5, team: { id: 61, name: "Chelsea FC", shortName: "Chelsea", tla: "CHE", crest: "https://crests.football-data.org/61.png" }, playedGames: 28, won: 14, draw: 7, lost: 7, points: 49, goalsFor: 53, goalsAgainst: 38, goalDifference: 15 },
          { position: 6, team: { id: 73, name: "Tottenham Hotspur FC", shortName: "Tottenham", tla: "TOT", crest: "https://crests.football-data.org/73.png" }, playedGames: 28, won: 14, draw: 5, lost: 9, points: 47, goalsFor: 55, goalsAgainst: 41, goalDifference: 14 },
          { position: 7, team: { id: 67, name: "Newcastle United FC", shortName: "Newcastle", tla: "NEW", crest: "https://crests.football-data.org/67.png" }, playedGames: 28, won: 13, draw: 6, lost: 9, points: 45, goalsFor: 49, goalsAgainst: 40, goalDifference: 9 },
          { position: 8, team: { id: 66, name: "Manchester United FC", shortName: "Man United", tla: "MUN", crest: "https://crests.football-data.org/66.png" }, playedGames: 28, won: 12, draw: 5, lost: 11, points: 41, goalsFor: 40, goalsAgainst: 42, goalDifference: -2 },
          { position: 9, team: { id: 397, name: "Brighton & Hove Albion FC", shortName: "Brighton", tla: "BHA", crest: "https://crests.football-data.org/397.png" }, playedGames: 28, won: 11, draw: 8, lost: 9, points: 41, goalsFor: 44, goalsAgainst: 45, goalDifference: -1 },
          { position: 10, team: { id: 63, name: "Fulham FC", shortName: "Fulham", tla: "FUL", crest: "https://crests.football-data.org/63.png" }, playedGames: 28, won: 11, draw: 6, lost: 11, points: 39, goalsFor: 42, goalsAgainst: 43, goalDifference: -1 },
        ],
      },
    ],
    scorers: [
      { position: 1, player: { id: 3824, name: "Erling Haaland" }, team: { id: 65, name: "Manchester City", shortName: "Man City", crest: "https://crests.football-data.org/65.png" }, goals: 21, assists: 3, playedMatches: 24 },
      { position: 2, player: { id: 3754, name: "Mohamed Salah" }, team: { id: 64, name: "Liverpool", shortName: "Liverpool", crest: "https://crests.football-data.org/64.png" }, goals: 18, assists: 13, playedMatches: 25 },
      { position: 3, player: { id: 8243, name: "Cole Palmer" }, team: { id: 61, name: "Chelsea", shortName: "Chelsea", crest: "https://crests.football-data.org/61.png" }, goals: 16, assists: 6, playedMatches: 24 },
      { position: 4, player: { id: 7888, name: "Bukayo Saka" }, team: { id: 57, name: "Arsenal", shortName: "Arsenal", crest: "https://crests.football-data.org/57.png" }, goals: 13, assists: 11, playedMatches: 23 },
      { position: 5, player: { id: 6712, name: "Alexander Isak" }, team: { id: 67, name: "Newcastle", shortName: "Newcastle", crest: "https://crests.football-data.org/67.png" }, goals: 13, assists: 2, playedMatches: 20 },
      { position: 6, player: { id: 7120, name: "Ollie Watkins" }, team: { id: 58, name: "Aston Villa", shortName: "Aston Villa", crest: "https://crests.football-data.org/58.png" }, goals: 11, assists: 8, playedMatches: 25 },
    ],
  },

  PD: {
    competition: {
      id: 2014,
      name: "La Liga",
      code: "PD",
      emblem: "https://crests.football-data.org/PD.png",
    },
    matches: [
      {
        id: 201,
        utcDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: "TIMED",
        matchday: 28,
        homeTeam: { id: 86, name: "Real Madrid CF", shortName: "Real Madrid", tla: "RMA", crest: "https://crests.football-data.org/86.png" },
        awayTeam: { id: 81, name: "FC Barcelona", shortName: "Barcelona", tla: "FCB", crest: "https://crests.football-data.org/81.png" },
        score: { fullTime: { home: null, away: null } },
      },
      {
        id: 202,
        utcDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 28,
        homeTeam: { id: 78, name: "Club Atlético de Madrid", shortName: "Atlético", tla: "ATM", crest: "https://crests.football-data.org/78.png" },
        awayTeam: { id: 77, name: "Athletic Club", shortName: "Athletic", tla: "ATH", crest: "https://crests.football-data.org/77.png" },
        score: { fullTime: { home: 2, away: 1 } },
      },
      {
        id: 203,
        utcDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 28,
        homeTeam: { id: 92, name: "Real Sociedad de Fútbol", shortName: "Real Sociedad", tla: "RSO", crest: "https://crests.football-data.org/92.png" },
        awayTeam: { id: 298, name: "Girona FC", shortName: "Girona", tla: "GIR", crest: "https://crests.football-data.org/298.png" },
        score: { fullTime: { home: 1, away: 1 } },
      },
      {
        id: 204,
        utcDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: "SCHEDULED",
        matchday: 28,
        homeTeam: { id: 90, name: "Real Betis Balompié", shortName: "Real Betis", tla: "BET", crest: "https://crests.football-data.org/90.png" },
        awayTeam: { id: 94, name: "Villarreal CF", shortName: "Villarreal", tla: "VIL", crest: "https://crests.football-data.org/94.png" },
        score: { fullTime: { home: null, away: null } },
      },
    ],
    standings: [
      {
        stage: "REGULAR_SEASON",
        type: "TOTAL",
        table: [
          { position: 1, team: { id: 86, name: "Real Madrid CF", shortName: "Real Madrid", tla: "RMA", crest: "https://crests.football-data.org/86.png" }, playedGames: 27, won: 20, draw: 5, lost: 2, points: 65, goalsFor: 60, goalsAgainst: 21, goalDifference: 39 },
          { position: 2, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", tla: "FCB", crest: "https://crests.football-data.org/81.png" }, playedGames: 27, won: 19, draw: 5, lost: 3, points: 62, goalsFor: 64, goalsAgainst: 26, goalDifference: 38 },
          { position: 3, team: { id: 78, name: "Club Atlético de Madrid", shortName: "Atlético", tla: "ATM", crest: "https://crests.football-data.org/78.png" }, playedGames: 27, won: 17, draw: 5, lost: 5, points: 56, goalsFor: 49, goalsAgainst: 24, goalDifference: 25 },
          { position: 4, team: { id: 77, name: "Athletic Club", shortName: "Athletic", tla: "ATH", crest: "https://crests.football-data.org/77.png" }, playedGames: 27, won: 15, draw: 7, lost: 5, points: 52, goalsFor: 45, goalsAgainst: 27, goalDifference: 18 },
          { position: 5, team: { id: 94, name: "Villarreal CF", shortName: "Villarreal", tla: "VIL", crest: "https://crests.football-data.org/94.png" }, playedGames: 27, won: 13, draw: 6, lost: 8, points: 45, goalsFor: 48, goalsAgainst: 41, goalDifference: 7 },
          { position: 6, team: { id: 90, name: "Real Betis Balompié", shortName: "Real Betis", tla: "BET", crest: "https://crests.football-data.org/90.png" }, playedGames: 27, won: 12, draw: 7, lost: 8, points: 43, goalsFor: 38, goalsAgainst: 34, goalDifference: 4 },
        ],
      },
    ],
    scorers: [
      { position: 1, player: { id: 371, name: "Robert Lewandowski" }, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", crest: "https://crests.football-data.org/81.png" }, goals: 19, assists: 3, playedMatches: 24 },
      { position: 2, player: { id: 3374, name: "Kylian Mbappé" }, team: { id: 86, name: "Real Madrid", shortName: "Real Madrid", crest: "https://crests.football-data.org/86.png" }, goals: 16, assists: 4, playedMatches: 23 },
      { position: 3, player: { id: 7123, name: "Raphinha" }, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", crest: "https://crests.football-data.org/81.png" }, goals: 14, assists: 8, playedMatches: 24 },
      { position: 4, player: { id: 8493, name: "Vinícius Júnior" }, team: { id: 86, name: "Real Madrid", shortName: "Real Madrid", crest: "https://crests.football-data.org/86.png" }, goals: 13, assists: 7, playedMatches: 22 },
      { position: 5, player: { id: 3180, name: "Antoine Griezmann" }, team: { id: 78, name: "Atlético Madrid", shortName: "Atlético", crest: "https://crests.football-data.org/78.png" }, goals: 11, assists: 6, playedMatches: 25 },
    ],
  },

  SA: {
    competition: {
      id: 2019,
      name: "Serie A",
      code: "SA",
      emblem: "https://crests.football-data.org/SA.png",
    },
    matches: [
      {
        id: 301,
        utcDate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: "LIVE",
        minute: "25'",
        matchday: 29,
        homeTeam: { id: 108, name: "FC Internazionale Milano", shortName: "Inter", tla: "INT", crest: "https://crests.football-data.org/108.png" },
        awayTeam: { id: 109, name: "Juventus FC", shortName: "Juventus", tla: "JUV", crest: "https://crests.football-data.org/109.png" },
        score: { fullTime: { home: 1, away: 0 } },
      },
      {
        id: 302,
        utcDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 29,
        homeTeam: { id: 98, name: "AC Milan", shortName: "Milan", tla: "MIL", crest: "https://crests.football-data.org/98.png" },
        awayTeam: { id: 100, name: "AS Roma", shortName: "Roma", tla: "ROM", crest: "https://crests.football-data.org/100.png" },
        score: { fullTime: { home: 2, away: 1 } },
      },
      {
        id: 303,
        utcDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: "TIMED",
        matchday: 29,
        homeTeam: { id: 113, name: "SSC Napoli", shortName: "Napoli", tla: "NAP", crest: "https://crests.football-data.org/113.png" },
        awayTeam: { id: 102, name: "Atalanta BC", shortName: "Atalanta", tla: "ATA", crest: "https://crests.football-data.org/102.png" },
        score: { fullTime: { home: null, away: null } },
      },
      {
        id: 304,
        utcDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: "SCHEDULED",
        matchday: 29,
        homeTeam: { id: 110, name: "SS Lazio", shortName: "Lazio", tla: "LAZ", crest: "https://crests.football-data.org/110.png" },
        awayTeam: { id: 99, name: "ACF Fiorentina", shortName: "Fiorentina", tla: "FIO", crest: "https://crests.football-data.org/99.png" },
        score: { fullTime: { home: null, away: null } },
      },
    ],
    standings: [
      {
        stage: "REGULAR_SEASON",
        type: "TOTAL",
        table: [
          { position: 1, team: { id: 108, name: "FC Internazionale Milano", shortName: "Inter", tla: "INT", crest: "https://crests.football-data.org/108.png" }, playedGames: 28, won: 21, draw: 4, lost: 3, points: 67, goalsFor: 66, goalsAgainst: 22, goalDifference: 44 },
          { position: 2, team: { id: 113, name: "SSC Napoli", shortName: "Napoli", tla: "NAP", crest: "https://crests.football-data.org/113.png" }, playedGames: 28, won: 18, draw: 6, lost: 4, points: 60, goalsFor: 50, goalsAgainst: 24, goalDifference: 26 },
          { position: 3, team: { id: 102, name: "Atalanta BC", shortName: "Atalanta", tla: "ATA", crest: "https://crests.football-data.org/102.png" }, playedGames: 28, won: 18, draw: 4, lost: 6, points: 58, goalsFor: 61, goalsAgainst: 30, goalDifference: 31 },
          { position: 4, team: { id: 109, name: "Juventus FC", shortName: "Juventus", tla: "JUV", crest: "https://crests.football-data.org/109.png" }, playedGames: 28, won: 15, draw: 11, lost: 2, points: 56, goalsFor: 47, goalsAgainst: 21, goalDifference: 26 },
          { position: 5, team: { id: 110, name: "SS Lazio", shortName: "Lazio", tla: "LAZ", crest: "https://crests.football-data.org/110.png" }, playedGames: 28, won: 15, draw: 4, lost: 9, points: 49, goalsFor: 48, goalsAgainst: 37, goalDifference: 11 },
          { position: 6, team: { id: 98, name: "AC Milan", shortName: "Milan", tla: "MIL", crest: "https://crests.football-data.org/98.png" }, playedGames: 28, won: 13, draw: 8, lost: 7, points: 47, goalsFor: 44, goalsAgainst: 34, goalDifference: 10 },
        ],
      },
    ],
    scorers: [
      { position: 1, player: { id: 8201, name: "Mateo Retegui" }, team: { id: 102, name: "Atalanta", shortName: "Atalanta", crest: "https://crests.football-data.org/102.png" }, goals: 16, assists: 3, playedMatches: 22 },
      { position: 2, player: { id: 7521, name: "Marcus Thuram" }, team: { id: 108, name: "Inter Milan", shortName: "Inter", crest: "https://crests.football-data.org/108.png" }, goals: 15, assists: 4, playedMatches: 24 },
      { position: 3, player: { id: 3201, name: "Dušan Vlahović" }, team: { id: 109, name: "Juventus", shortName: "Juventus", crest: "https://crests.football-data.org/109.png" }, goals: 12, assists: 2, playedMatches: 23 },
      { position: 4, player: { id: 4120, name: "Lautaro Martínez" }, team: { id: 108, name: "Inter Milan", shortName: "Inter", crest: "https://crests.football-data.org/108.png" }, goals: 11, assists: 4, playedMatches: 23 },
      { position: 5, player: { id: 5410, name: "Christian Pulisic" }, team: { id: 98, name: "AC Milan", shortName: "Milan", crest: "https://crests.football-data.org/98.png" }, goals: 10, assists: 7, playedMatches: 24 },
    ],
  },

  CL: {
    competition: {
      id: 2001,
      name: "UEFA Champions League",
      code: "CL",
      emblem: "https://crests.football-data.org/CL.png",
    },
    matches: [
      {
        id: 401,
        utcDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: "TIMED",
        matchday: 8,
        homeTeam: { id: 5, name: "FC Bayern München", shortName: "Bayern", tla: "BAY", crest: "https://crests.football-data.org/5.png" },
        awayTeam: { id: 524, name: "Paris Saint-Germain FC", shortName: "PSG", tla: "PSG", crest: "https://crests.football-data.org/524.png" },
        score: { fullTime: { home: null, away: null } },
      },
      {
        id: 402,
        utcDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 7,
        homeTeam: { id: 86, name: "Real Madrid CF", shortName: "Real Madrid", tla: "RMA", crest: "https://crests.football-data.org/86.png" },
        awayTeam: { id: 65, name: "Manchester City FC", shortName: "Man City", tla: "MCI", crest: "https://crests.football-data.org/65.png" },
        score: { fullTime: { home: 3, away: 2 } },
      },
      {
        id: 403,
        utcDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "FINISHED",
        matchday: 7,
        homeTeam: { id: 57, name: "Arsenal FC", shortName: "Arsenal", tla: "ARS", crest: "https://crests.football-data.org/57.png" },
        awayTeam: { id: 108, name: "FC Internazionale Milano", shortName: "Inter", tla: "INT", crest: "https://crests.football-data.org/108.png" },
        score: { fullTime: { home: 1, away: 0 } },
      },
      {
        id: 404,
        utcDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: "SCHEDULED",
        matchday: 8,
        homeTeam: { id: 81, name: "FC Barcelona", shortName: "Barcelona", tla: "FCB", crest: "https://crests.football-data.org/81.png" },
        awayTeam: { id: 4, name: "Borussia Dortmund", shortName: "Dortmund", tla: "BVB", crest: "https://crests.football-data.org/4.png" },
        score: { fullTime: { home: null, away: null } },
      },
    ],
    standings: [
      {
        stage: "LEAGUE_STAGE",
        type: "TOTAL",
        table: [
          { position: 1, team: { id: 64, name: "Liverpool FC", shortName: "Liverpool", tla: "LIV", crest: "https://crests.football-data.org/64.png" }, playedGames: 7, won: 7, draw: 0, lost: 0, points: 21, goalsFor: 18, goalsAgainst: 3, goalDifference: 15 },
          { position: 2, team: { id: 86, name: "Real Madrid CF", shortName: "Real Madrid", tla: "RMA", crest: "https://crests.football-data.org/86.png" }, playedGames: 7, won: 5, draw: 1, lost: 1, points: 16, goalsFor: 17, goalsAgainst: 8, goalDifference: 9 },
          { position: 3, team: { id: 57, name: "Arsenal FC", shortName: "Arsenal", tla: "ARS", crest: "https://crests.football-data.org/57.png" }, playedGames: 7, won: 5, draw: 1, lost: 1, points: 16, goalsFor: 14, goalsAgainst: 5, goalDifference: 9 },
          { position: 4, team: { id: 108, name: "FC Internazionale Milano", shortName: "Inter", tla: "INT", crest: "https://crests.football-data.org/108.png" }, playedGames: 7, won: 5, draw: 1, lost: 1, points: 16, goalsFor: 11, goalsAgainst: 3, goalDifference: 8 },
          { position: 5, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", tla: "FCB", crest: "https://crests.football-data.org/81.png" }, playedGames: 7, won: 5, draw: 0, lost: 2, points: 15, goalsFor: 21, goalsAgainst: 10, goalDifference: 11 },
          { position: 6, team: { id: 5, name: "FC Bayern München", shortName: "Bayern", tla: "BAY", crest: "https://crests.football-data.org/5.png" }, playedGames: 7, won: 4, draw: 1, lost: 2, points: 13, goalsFor: 16, goalsAgainst: 9, goalDifference: 7 },
        ],
      },
    ],
    scorers: [
      { position: 1, player: { id: 372, name: "Harry Kane" }, team: { id: 5, name: "Bayern Munich", shortName: "Bayern", crest: "https://crests.football-data.org/5.png" }, goals: 7, assists: 2, playedMatches: 6 },
      { position: 2, player: { id: 3824, name: "Erling Haaland" }, team: { id: 65, name: "Manchester City", shortName: "Man City", crest: "https://crests.football-data.org/65.png" }, goals: 6, assists: 1, playedMatches: 6 },
      { position: 3, player: { id: 7123, name: "Raphinha" }, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", crest: "https://crests.football-data.org/81.png" }, goals: 6, assists: 3, playedMatches: 6 },
      { position: 4, player: { id: 371, name: "Robert Lewandowski" }, team: { id: 81, name: "FC Barcelona", shortName: "Barcelona", crest: "https://crests.football-data.org/81.png" }, goals: 5, assists: 1, playedMatches: 6 },
      { position: 5, player: { id: 8493, name: "Vinícius Júnior" }, team: { id: 86, name: "Real Madrid", shortName: "Real Madrid", crest: "https://crests.football-data.org/86.png" }, goals: 5, assists: 2, playedMatches: 6 },
    ],
  },
};
