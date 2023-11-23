import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { Response } from 'node-fetch';

const API_BASE_URL = 'https://api.football-data.org/v4/competitions/PL'; //プレミアリーグの試合情報を取得するURL
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  throw new Error('API_TOKEN is not defined');
}

const headers = {
  'X-Auth-Token': API_TOKEN
};

//レスポンスが正常かどうかをチェックする関数
const checkApiResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error('API response was not ok.');
  }
};


// 試合情報を取得するAPI
export default async function getMatches(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;
  try {
    const response = await fetch(`${API_BASE_URL}/matches?dateFrom=${date}&dateTo=${date}`, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


//順位表を取得する関数(SSR用)
export const fetchStandings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/standings`, { headers });
    checkApiResponse(response);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

