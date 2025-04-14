import { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../../firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, role } = req.body;

    try {
      // Set custom claims on the user.
      await admin.auth().setCustomUserClaims(uid, { role: role });

      return res.status(200).json({ message: `Custom claim set successfully for user ${uid} with role ${role}` });
    } catch (error: any) {
      console.error('Error setting custom claim:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
