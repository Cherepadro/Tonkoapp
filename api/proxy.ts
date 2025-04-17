import type { VercelRequest, VercelResponse } from '@vercel/node';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const targetUrl = GOOGLE_SCRIPT_URL || '';
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: '',
      },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка проксирования запроса', details: String(error) });
  }
}
