import React from 'react';
import Image from 'next/image';

interface TeamInfo {
    id: React.Key;
    crest: string;
    name: string;
}

interface TeamStanding {
    id: React.Key;
    position: number;
    team: TeamInfo;
    name: string;
    points: number;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

interface StandingsTableProps {
    standings: TeamStanding[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
    // 順位に応じた背景色のクラスを返す関数
    const getPositionColorClass = (position: number) => {
        if (position <= 4) return 'border-l-4 border-blue-600'; // チャンピオンズリーグ
        if (position === 5) return 'border-l-4 border-orange-500'; // ヨーロッパリーグ
        if (position === 6) return 'border-l-4 border-green-500'; // ECL
        if (position >= 18) return 'border-l-4 border-red-500'; // 降格圏
        return '';
    };

    // 降格圏、CL圏などの説明を表示する関数
    const renderLegend = () => (
        <div className="w-full max-w-3xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-3">
                <h3 className="font-bold text-gray-700 mb-2">欧州大会出場圏</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-600 mr-2"></div>
                        <span className="text-sm">1-4位: UEFAチャンピオンズリーグ</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-500 mr-2"></div>
                        <span className="text-sm">5位: UEFAヨーロッパリーグ</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 mr-2"></div>
                        <span className="text-sm">6位: UEFAカンファレンスリーグ</span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3">
                <h3 className="font-bold text-gray-700 mb-2">降格圏</h3>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span className="text-sm">18-20位: チャンピオンシップ降格</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">プレミアリーグ順位表</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
                                <th className="py-3 px-2 text-left w-12">順位</th>
                                <th className="py-3 px-2 text-left">クラブ</th>
                                <th className="py-3 px-2 text-center w-12">試合</th>
                                <th className="py-3 px-2 text-center w-12 hidden md:table-cell">勝</th>
                                <th className="py-3 px-2 text-center w-12 hidden md:table-cell">分</th>
                                <th className="py-3 px-2 text-center w-12 hidden md:table-cell">敗</th>
                                <th className="py-3 px-2 text-center w-12 hidden md:table-cell">得点</th>
                                <th className="py-3 px-2 text-center w-12 hidden md:table-cell">失点</th>
                                <th className="py-3 px-2 text-center w-16 hidden md:table-cell">得失点</th>
                                <th className="py-3 px-2 text-center w-12 font-bold">勝点</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((team) => (
                                <tr
                                    key={team.team.id}
                                    className={`border-b border-gray-200 hover:bg-gray-50 ${getPositionColorClass(team.position)}`}
                                >
                                    <td className="py-3 px-2 text-center font-medium">
                                        {team.position}
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-center">
                                            <div className="relative w-8 h-8 flex-shrink-0">
                                                <Image
                                                    src={team.team.crest}
                                                    alt={`${team.team.name} エンブレム`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="ml-3 font-medium">{team.team.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-center">{team.playedGames}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">{team.won}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">{team.draw}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">{team.lost}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">{team.goalsFor}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">{team.goalsAgainst}</td>
                                    <td className="py-3 px-2 text-center hidden md:table-cell">
                                        <span className={team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : ''}>
                                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-center font-bold bg-gray-50">{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {renderLegend()}
        </div>
    );
};

export default StandingsTable;
