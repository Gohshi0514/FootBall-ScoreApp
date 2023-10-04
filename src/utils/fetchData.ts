import fetch from 'node-fetch';

const API_TOKEN = process.env.API_TOKEN;
if (!API_TOKEN) {
    throw new Error('API_TOKEN is not defined');
}

export const fetchMatches = async (date: string) => {
    const API_ENDPOINT = `https://api.football-data.org/v4/competitions/PL/matches?dateFrom=${date}&dateTo=${date}`;
    const response = await fetch(API_ENDPOINT, {
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });

    if (!response.ok) {
        throw new Error('API response was not ok.');
    }

    return response.json();
};

export const fetchStandings = async () => {
    const API_ENDPOINT = 'https://api.football-data.org/v4/competitions/PL/standings';
    const response = await fetch(API_ENDPOINT, {
        headers: {
            'X-Auth-Token': API_TOKEN
        }
    });

    if (!response.ok) {
        throw new Error('API response was not ok.');
    }

    return response.json();
};


