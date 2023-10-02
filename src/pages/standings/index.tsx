import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import Spinner from '@/components/Spinner';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Standings: React.FC = () => {
    const { data: standingsData, error: standingsError } = useSWR('/api/standings', fetcher);

    if (standingsError) 
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <div>データの取得中にエラーが発生しました。</div>
            </div>
        );
    if (!standingsData)
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <Spinner />
            </div>
        );

    return (
        <>
            <h1>
                <Image
                    src={standingsData.competition.emblem}
                    alt={`${standingsData.competition.name} エンブレム`}
                    className='mx-auto'
                    width={100}
                    height={100}
                />
            </h1>
            <table className='flex flex-col items-center justify-center w-3/4 mx-auto my-4 border border-gray-300 rounded-md shadow-md'>
                <thead className='w-full text-white bg-gray-800 rounded-t-md'>
                    <tr className='flex flex-row justify-around w-full p-2'>
                        <th className='w-1/12 flex-none flex-shrink-0'>順位</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>チーム</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>ポイント</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>試合数</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>勝利</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>引き分け</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>敗北</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>得点</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>失点</th>
                        <th className='w-1/12 flex-none flex-shrink-0'>得失点差</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col w-full text-center divide-y divide-gray-300 bg-gray-100'>
                    {standingsData.standings[0].table.map((team: any) => {
                        return (
                            <tr
                                key={team.team.id}
                                className='flex flex-row justify-around w-full p-2 hover:bg-gray-200'
                            >
                                <td className='w-1/12 flex-none flex-shrink-0 font-medium text-lg'>
                                    {team.position}
                                </td>
                                <td className='flex flex-row items-center justify-center w-1/12 flex-none flex-shrink-0'>
                                    <Image
                                        src={team.team.crest}
                                        alt={`${team.team.name} エンブレム`}
                                        className='rounded-full'
                                        width={30}
                                        height={30}
                                    />
                                    <small className='block text-xs text-gray-500 rounded-full ml-2'>
                                        {team.team.name}
                                    </small>
                                </td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.points}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.playedGames}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.won}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.draw}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.lost}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.goalsFor}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.goalsAgainst}</td>
                                <td className='w-1/12 flex-none flex-shrink-0 text-gray-600'>{team.goalDifference}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Standings;
