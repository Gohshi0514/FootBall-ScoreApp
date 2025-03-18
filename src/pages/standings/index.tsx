import React from 'react';
import Head from 'next/head';
import StandingsTable from '@/components/StandingsTable';
import { fetchStandings } from '../api/matches';


const Standings: React.FC<{ standingsData: any }> = ({ standingsData }) => {

    return (
        <>
            <Head>
                <title>プレミアリーグ | 順位表</title>
                <meta name='description' content='イングランドプレミアリーグの最新順位表' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">プレミアリーグ 順位表</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            2023-2024シーズン イングランドプレミアリーグの最新順位表。
                            各チームの勝点、勝敗数、得失点などの詳細な成績を確認できます。
                        </p>
                    </div>

                    <StandingsTable standings={standingsData.standings[0].table} />
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    try {
        const standingsData = await fetchStandings();
        return {
            props: {
                standingsData,
                error: null
            },
            revalidate: 60
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
