import React, { useState } from 'react';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DateSelector from '@/components/DateSelector';
import MatchTable from '@/components/MatchTable';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: matchesData, error } = useSWR(`/api/matches?date=${selectedDate}`, fetcher);

  if (error)
    return <Error />;

  if (!matchesData)
    return <Loading />;

  return (
    <div className='flex flex-col items-center justify-center w-full px-5 md:px-0 py-10'>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto'>
        <MatchTable matches={matchesData.matches} />
      </div>
    </div>
  );
}
