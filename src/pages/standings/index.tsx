import React from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { fetchStandings } from '@/utils/fetchData';

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



const Standings: React.FC<{ standingsData: any, error: string | null }> = ({ standingsData, error }) => {
    if (error) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <Error />
            </div>
        );
    }

    if (!standingsData || !standingsData.standings || standingsData.standings.length === 0) {
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center w-full px-5 md:px-0'>
            <div className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto px-5 md:px-0'>
                <table className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto my-4 rounded-md shadow-md'>
                    <thead className='w-full text-white bg-gray-800 rounded-t-md'>
                        <tr className='flex flex-row justify-around w-full p-2'>
                            <th className='md:w-1/12 flex-none flex-shrink-0'>順位</th>
                            <th className='md:w-1/12 flex-none flex-shrink-0'>チーム</th>
                            <th className='md:w-1/12 flex-none flex-shrink-0'>勝ち点</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>試合</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>勝ち</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>分け</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>負け</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>得点</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>失点</th>
                            <th className='w-1/12 flex-none flex-shrink-0 hidden md:table-cell'>得失点</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col w-full text-center divide-y divide-gray-300'>
                        {standingsData.standings[0].table.map((team: TeamStanding) => {
                            return (
                                <tr
                                    key={team.team.id}
                                    className='flex flex-row justify-around w-full p-2 hover:bg-gray-200'
                                >
                                    <td className='w-1/12 flex-none flex-shrink-0 font-medium text-sm md:text-lg'>
                                        {team.position}
                                    </td>
                                    <td className='flex flex-row items-center justify-center w-1/12 flex-none flex-shrink-0'>
                                        <Image
                                            src={team.team.crest}
                                            alt={`${team.name} エンブレム`}
                                            className='rounded-full'
                                            width={30}
                                            height={30}
                                        />
                                        <small className='text-xs text-gray-500 rounded-full ml-2'>
                                            {/* {team.team.name} */}
                                        </small>
                                    </td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 font-bold'>{team.points}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.playedGames}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.won}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.draw}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.lost}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.goalsFor}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.goalsAgainst}</td>
                                    <td className='w-1/12 flex-none flex-shrink-0 md:text-gray-600 hidden md:table-cell'>{team.goalDifference}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//静的生成で順位表のデータを取得する
export async function getStaticProps() {
    try {
        const standingsData = await fetchStandings();
        return {
            props: {
                standingsData,
                error: null
            },
            revalidate: 60 * 60
        };
    } catch (err) {
        return {
            props: {
                standingsData: null,
                error: 'エラーが発生しました。'
            }
        };
    }
}

export default Standings;