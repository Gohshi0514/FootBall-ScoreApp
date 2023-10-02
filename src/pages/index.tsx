import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data: standingsData, error: standingsError } = useSWR('/api/standings', fetcher);

  if (standingsError) return <div>データの取得中にエラーが発生しました。</div>;
  if (!standingsData) return <div>データを読み込んでいます...</div>;

  return (
    <>
      <Link href="/standings">
        順位表
      </Link>
    </>
  );
}
