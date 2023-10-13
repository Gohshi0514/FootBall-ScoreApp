import React from 'react';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { fetchStandings } from '@/utils/fetchData';
import StandingsTable from '@/components/StandingsTable';

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
        <div className='flex flex-col items-center justify-center w-full py-10'>
            <div className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto px-5 md:px-0'>
                <StandingsTable standings={standingsData.standings[0].table} />
            </div>
        </div>
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
