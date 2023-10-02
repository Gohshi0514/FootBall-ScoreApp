import { NextApiRequest, NextApiResponse } from 'next';
import { fetchMatches } from '../../utils/fetchData';

const getMatches = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchMatches();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default getMatches;
