import React, { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DateSelector from '@/components/DateSelector';
import MatchTable from '@/components/MatchTable';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: matchesData, error } = useSWR(`/api/matches?date=${selectedDate}`, fetcher);


  if (error) return <Error />;
  if (!matchesData) return <Loading />;

  return (
    <>
      <Head>
        <title>プレミアリーグ | 試合日程・結果</title>
        <meta name='description' content='イングランドプレミアリーグの試合日程と結果をチェック' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">プレミアリーグ 試合日程・結果</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              イングランドのトップリーグ、プレミアリーグの試合日程と結果をチェック。
              最新の試合情報をリアルタイムで確認できます。
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          <MatchTable matches={matchesData.matches} />
        </div>
      </div>
    </>
  );
}
