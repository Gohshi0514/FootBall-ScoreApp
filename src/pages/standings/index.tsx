import React from 'react';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import StandingsTable from '@/components/StandingsTable';
import { fetchStandings } from '../api/matches';

const Standings: React.FC<{ standingsData: any, error: string | null }> = ({ standingsData, error }) => {
    if (error) {
        return <Error />
    }

    if (!standingsData || !standingsData.standings || standingsData.standings.length === 0) {
        return <Loading />
    }

    return (
        <div className='flex flex-col items-center justify-center w-full py-10'>
            <div className='flex flex-col items-center justify-center w-full md:w-3/4 mx-auto px-5 md:px-0'>
                <StandingsTable standings={standingsData.standings[0].table} />
            </div>
        </div>
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
