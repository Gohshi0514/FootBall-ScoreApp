//順位表の型定義
export type Team = {
    team: any;
    id: number;
    name: string;
    crest: string;
    position: number;
    points: number;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
};

//プレミアリーグ情報の型定義
export type StandingsData = {
    competition: {
        emblem: string;
        name: string;
    };
    standings: [
        {
            table: Team[];
        }
    ];
};

//チーム情報の型定義
export type TeamDetails = {
    id: number;
    name: string;
    crest: string;
};

