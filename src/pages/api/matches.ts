import { NextApiRequest, NextApiResponse } from 'next';
import { fetchMatches } from '../../utils/fetchData';

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
