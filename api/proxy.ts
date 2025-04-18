import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight-запроса
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Прокси логика
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySG_Qdiq_Cow5slOfd7pM53Wv2MYrCwZ5Q14tvyWiRfADXUEEj_-_py87mPqZKhEUN/exec';

  const url = GOOGLE_SCRIPT_URL + (req.url || '');
  const method = req.method || 'GET';

  try {
    const response = await fetch(url, {
      method,
      headers: req.headers as any,
      body: ['GET', 'HEAD'].includes(method) ? undefined : req.body,
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
