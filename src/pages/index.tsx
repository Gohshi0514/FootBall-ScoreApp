import React, { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

const fetcher = (url: string) => fetch(url).then(res => res.json());

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

export default function Home() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const { data: matchesData, error } = useSWR(`/api/matches?date=${selectedDate}`, fetcher);

  if (error)
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Error />
      </div>
    );

  if (!matchesData)
    return (
      <div className='flex items-center   justify-center w-full h-screen'>
        <Loading />
      </div>
    );

  const generateTabs = () => {
    const tabs = [];
    const daysBeforeToday = 4; // 今日の前に表示する日数
    const daysAfterToday = 4;  // 今日の後に表示する日数

    for (let i = -daysBeforeToday; i <= daysAfterToday; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
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
    <div className='flex flex-col items-center justify-center w-full px-5 md:px-0 py-10'>
      <div className="flex flex-wrap justify-center items-center w-full mb-2">
        <FormControl>
          <InputLabel
            htmlFor="date-native-select"
          >
            日付を選択
          </InputLabel>
          <NativeSelect
            className='w-full'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            inputProps={{
              name: 'date',
              id: 'date-native-select',
            }}
          >
            {generateTabs().map(date => (
              <option key={date} value={date}>
                {date.split('-').slice(1).join('/')} ({getDayOfWeek(date)})
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      <div className="flex justify-center items-center w-full px-3 md:px-0">
        <table className='flex flex-col items-center justify-center w-full md:w-2/3 mx-auto my-4 rounded-md shadow-md border-collapse border border-gray-300'>
          <thead className='w-full text-white bg-gray-800 rounded-t-md'>
            <tr className='flex flex-row justify-around w-full p-2'>
              <th className='md:w-1/3 flex-none flex-shrink-0'>HOME</th>
              <th className='md:w-1/3 flex-none flex-shrink-0'></th>
              <th className='md:w-1/3 flex-none flex-shrink-0'>AWAY</th>

            </tr>
          </thead>
          <tbody className='flex flex-col w-full text-center divide-y divide-gray-300'>
            {/* 試合がない場合はありませんと表示する */}
            {matchesData.matches.length === 0 && (
              <tr className='flex flex-row justify-around w-full p-2'>
                <td colSpan={3}>試合はありません。</td>
              </tr>
            )}
            {matchesData.matches.map((match: Match) => (
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
      </div>
    </div>

  );
}