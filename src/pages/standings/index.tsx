import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Standings: React.FC = () => {
    const { data: standingsData, error: standingsError } = useSWR('/api/standings', fetcher);

    if (standingsError)
        return (
            <div className='flex items-center justify-center w-full h-screen'>
                <Error />
            </div>
        );
    if (!standingsData)
        return (
            <div className='flex items-center   justify-center w-full h-screen'>
                <Loading />
            </div>
        );

    return (
        <>
            <h1>
                <Image
                    src={standingsData.competition.emblem}
                    alt={`${standingsData.competition.name} エンブレム`}
                    className='mx-auto'
                    width={150}
                    height={150}
                />
            </h1>
            <div className='flex flex-col items-center justify-center w-2/3 mx-auto px-5 md:px-0'>
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
                        {standingsData.standings[0].table.map((team: { id: React.Key | null | undefined; position: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; team: { crest: string | StaticImport; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; name: any; points: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; playedGames: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; won: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; draw: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; lost: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; goalsFor: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; goalsAgainst: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; goalDifference: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => {
                            return (
                                <tr
                                    key={team.id}
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
        </>
    );
}

export default Standings;
