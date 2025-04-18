import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({ error: 'GOOGLE_SCRIPT_URL не задан в .env' });
  }

  const url = GOOGLE_SCRIPT_URL + (req.url || '');
  const method = req.method || 'GET';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    res.status(response.status);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err: any) {
    res.status(500).json({ error: 'Ошибка проксирования запроса', details: err.message });
  }
}
