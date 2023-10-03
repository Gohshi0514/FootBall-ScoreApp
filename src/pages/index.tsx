import React, { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Spinner from '@/components/Spinner';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const { data: matchesData, error } = useSWR(`/api/matches?date=${selectedDate}`, fetcher);

  if (error) return <div>エラーが発生しました。</div>;
  if (!matchesData)
    return (
      <div className='flex items-center   justify-center w-full h-screen'>
        <Spinner />
      </div>
    );

  const generateTabs = () => {
    const tabs = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      tabs.push(date.toISOString().split('T')[0]);
    }
    return tabs;
  };

  const getDayOfWeek = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

  return (
    <div className='flex flex-col items-center justify-center w-full px-5 md:px-0'>
      <div className="sm:flex sm:justify-center sm:items-center sm:w-full sm:my-4">
        {generateTabs().map(date => (
          <button key={date} onClick={() => setSelectedDate(date)} className={selectedDate === date ? 'bg-gray-800 text-white px-4 py-2 m-1 rounded-md' : 'px-4 py-2 m-1 rounded-md border border-gray-300'}>
            {date.split('-').slice(1).join('/')}
            ({getDayOfWeek(date)})
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center w-full mb-4">
        <h1 className="text-center text-xl font-bold">
          {selectedDate} ({getDayOfWeek(selectedDate)})
        </h1>
      </div>
      <div className="flex justify-center items-center w-full px-5 md:px-0">
        <table className='flex flex-col items-center justify-center w-full md:w-1/3 mx-auto my-4 rounded-md shadow-md border-collapse border border-gray-300'>
          <thead className='w-full text-white bg-gray-800 rounded-t-md'>
            <tr className='flex flex-row justify-around w-full p-2'>
              <th className='md:w-1/3 flex-none flex-shrink-0'>ホーム</th>
              <th className='md:w-1/3 flex-none flex-shrink-0'>得点</th>
              <th className='md:w-1/3 flex-none flex-shrink-0'>アウェイ</th>
            </tr>
          </thead>
          <tbody className='flex flex-col w-full text-center divide-y divide-gray-300'>
            {/* 試合がない場合はありませんと表示する */}
            {matchesData.matches.length === 0 && (
              <tr className='flex flex-row justify-around w-full p-2'>
                <td colSpan={3}>試合はありません。</td>
              </tr>
            )}
            {matchesData.matches.map((match: { id: React.Key | null | undefined; homeTeam: { crest: string | StaticImport; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; score: { fullTime: { home: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; away: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }; awayTeam: { crest: string | StaticImport; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) => (
              <tr key={match.id} className='flex flex-row justify-around w-full p-2 hover:bg-gray-200'>
                <td className='w-1/3 flex flex-row justify-center items-center'>
                  <Image src={match.homeTeam.crest} alt={`${match.homeTeam.name} エンブレム`} width={30} height={30} />
                  <small className='text-xs text-gray-500 rounded-full ml-2'>
                    {match.homeTeam.name}
                  </small>
                </td>
                <td className='w-1/3 flex flex-row justify-center items-center'>
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                  <br />
                  {/* 開催地 */}
                  
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
      </div>
    </div>

  );
}
