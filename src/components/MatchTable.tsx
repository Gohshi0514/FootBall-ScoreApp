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
        <table className='flex flex-col items-center justify-center w-full md:w-2/3 mx-auto mt-6 rounded-md shadow-md border-collapse border border-gray-300'>
            <thead className='w-full text-white bg-gray-800 rounded-t-md'>
                <tr className='flex flex-row justify-around w-full p-2'>
                    <th className='md:w-1/3 flex-none flex-shrink-0'>HOME</th>
                    <th className='md:w-1/3 flex-none flex-shrink-0'></th>
                    <th className='md:w-1/3 flex-none flex-shrink-0'>AWAY</th>

                </tr>
            </thead>
            <tbody className='flex flex-col w-full text-center divide-y divide-gray-300'>
                {/* 試合がない場合はありませんと表示する */}
                {matchesData.length === 0 && (
                    <tr className='flex flex-row justify-around w-full p-2'>
                        <td colSpan={3}>試合はありません。</td>
                    </tr>
                )}
                {matchesData.map((match) => (
                    <tr key={match.id} className='flex flex-row justify-around w-full p-2 hover:bg-gray-200'>
                        <td className='w-1/3 flex flex-row justify-center items-center'>
                            <Image src={match.homeTeam.crest} alt={`${match.homeTeam.name} エンブレム`} width={30} height={30} />
                            <small className='text-xs text-gray-500 rounded-full ml-2'>
                                {match.homeTeam.name}
                            </small>
                        </td>
                        <td className='w-1/3 flex flex-col justify-center items-center'>
                            {match.status === 'FINISHED' && (
                                <p className='text-center text-lg'>
                                    {match.score.fullTime.home} - {match.score.fullTime.away}
                                </p>
                            )}
                            {match.status !== 'FINISHED' && (
                                <small className="text-center text-gray-500 text-base">
                                    {new Date(match.utcDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                </small>
                            )}
                        </td>

                        <td className='w-1/3 flex flex-row justify-center items-center'>
                            <Image src={match.awayTeam.crest} alt={`${match.awayTeam.name} エンブレム`} width={30} height={30} />
                            <small className='text-xs text-gray-500 rounded-full ml-2'>
                                {match.awayTeam.name}
                            </small>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MatchTable;
