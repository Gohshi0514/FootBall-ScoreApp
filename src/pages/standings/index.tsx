import React from 'react';
import Head from 'next/head';
import StandingsTable from '@/components/StandingsTable';
import { fetchStandings } from '../api/matches';


const Standings: React.FC<{ standingsData: any }> = ({ standingsData }) => {

    return (
        <>
            <Head>
                <title>Standings | Football App</title>
                <meta name='description' content='Standings Page' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='flex flex-col items-center justify-center w-full py-10'>
                <div className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto px-5 md:px-0'>
                    <StandingsTable standings={standingsData.standings[0].table} />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const standingsData = await fetchStandings();
        return {
            props: {
                standingsData,
                error: null
            },
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
