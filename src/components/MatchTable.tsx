import React from 'react';
import Image from 'next/image';

interface Team {
    crest: string;
    name: string;
}

interface Score {
    fullTime: {
        home: number;
        away: number;
    };
}

interface Match {
    utcDate: string | number | Date;
    status: string;
    id: React.Key;
    homeTeam: Team;
    score: Score;
    awayTeam: Team;
}

interface MatchTableProps {
    matches: Match[];
}

const MatchTable: React.FC<MatchTableProps> = ({ matches: matchesData }) => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">試合一覧</h2>

            {matchesData.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-500 text-lg">この日の試合はありません</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {matchesData.map((match) => (
                        <div
                            key={match.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="relative">
                                {match.status === 'FINISHED' && (
                                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-md font-medium">
                                        試合終了
                                    </div>
                                )}
                                {match.status === 'SCHEDULED' && (
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl-md font-medium">
                                        試合予定
                                    </div>
                                )}
                                {match.status === 'IN_PLAY' && (
                                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-md font-medium animate-pulse">
                                        試合中
                                    </div>
                                )}
                            </div>

                            <div className="p-4 md:p-6 flex items-center justify-between">
                                <div className="flex flex-col items-center w-2/5">
                                    <div className="relative w-16 h-16 mb-2">
                                        <Image
                                            src={match.homeTeam.crest}
                                            alt={`${match.homeTeam.name} エンブレム`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-gray-800 font-medium text-center text-sm md:text-base">
                                        {match.homeTeam.name}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center justify-center w-1/5">
                                    {match.status === 'FINISHED' ? (
                                        <div className="text-center">
                                            <div className="text-2xl md:text-3xl font-bold text-gray-800 flex justify-center items-baseline">
                                                <span>{match.score.fullTime.home}</span>
                                                <span className="mx-2 text-gray-400">-</span>
                                                <span>{match.score.fullTime.away}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">最終スコア</div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="bg-gray-100 px-3 py-2 rounded-lg">
                                                <span className="text-gray-800 font-medium">
                                                    {new Date(match.utcDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">キックオフ</div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-center w-2/5">
                                    <div className="relative w-16 h-16 mb-2">
                                        <Image
                                            src={match.awayTeam.crest}
                                            alt={`${match.awayTeam.name} エンブレム`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-gray-800 font-medium text-center text-sm md:text-base">
                                        {match.awayTeam.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchTable;
