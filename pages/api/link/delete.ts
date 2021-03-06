import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@api/firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body);

  try {
    await db
      .collection('links')
      .doc(id)
      .delete();

    res.status(200).json({ message: 'Link successfully deleted' });
  } catch (error) {
    res.json({ error: error.message });
  }
};
