export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({ error: 'GOOGLE_SCRIPT_URL не задан в .env' });
  }

  const url = GOOGLE_SCRIPT_URL + (req.url || '');
  const method = req.method || 'GET';

  try {
    const response = await fetch(url, {
      method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(method) ? undefined : req.body,
    });

    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    res.status(response.status);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: 'Ошибка проксирования запроса', details: err.message });
  }
}
