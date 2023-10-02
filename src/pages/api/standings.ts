import { NextApiRequest, NextApiResponse } from 'next';
import { fetchStandings } from '../../utils/fetchData';

const getStandings = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = await fetchStandings();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export default getStandings;
