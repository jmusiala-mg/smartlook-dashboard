exports.handler = async function (event) {
  const { funnelId, dateFrom, dateTo } = event.queryStringParameters || {};

  if (!funnelId || !dateFrom || !dateTo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required parameters: funnelId, dateFrom, dateTo' }),
    };
  }

  const token = process.env.SMARTLOOK_API_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SMARTLOOK_API_TOKEN environment variable not set' }),
    };
  }

  try {
    const url = `https://api.eu.smartlook.cloud/api/v1/funnels/${funnelId}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
