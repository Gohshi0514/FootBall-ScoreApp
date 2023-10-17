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

//試合情報を取得する関数
export const fetchMatches = async (date: string) => {
  const response = await fetch(`${API_BASE_URL}/matches?dateFrom=${date}&dateTo=${date}`, { headers });
  checkApiResponse(response);
  return response.json();
};

//順位表を取得する関数
export const fetchStandings = async () => {
  const response = await fetch(`${API_BASE_URL}/standings`, { headers });
  checkApiResponse(response);
  return response.json();
};

//試合情報を取得するAPI
const getMatches = async (req: NextApiRequest, res: NextApiResponse) => {
  const { date } = req.query;
  try {
    const data = await fetchMatches(date as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default getMatches;
