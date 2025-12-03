// Tipos mínimos para compilar sin @vercel/node en el build de Vite
type VercelRequest = {
  method?: string;
  body?: any;
};
type VercelResponse = {
  status: (code: number) => { json: (data: any) => any };
};

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      service = 'No especificado',
      message = '',
    } = (req.body || {}) as ContactPayload;

    if (!firstName && !lastName) {
      return res.status(400).json({ error: 'Faltan nombre y apellido' });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Temporal para pruebas: usar tu mail como fallback. En prod, setear CONTACT_TO en Vercel.
    const toEmail = process.env.CONTACT_TO || 'julisan2911@gmail.com';
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return res.status(500).json({ error: 'Falta configurar RESEND_API_KEY' });
    }

    const subject = `Consulta desde la web - ${[firstName, lastName].filter(Boolean).join(' ')}`.trim();
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';
    const bccEmail = process.env.CONTACT_BCC;
    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">Nueva consulta desde el sitio</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tbody>
            <tr><td style="padding: 8px; font-weight: 600;">Nombre</td><td style="padding: 8px;">${[firstName, lastName].filter(Boolean).join(' ')}</td></tr>
            <tr><td style="padding: 8px; font-weight: 600;">Email</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: 600;">Teléfono</td><td style="padding: 8px;">${phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: 600;">Servicio</td><td style="padding: 8px;">${service}</td></tr>
            <tr><td style="padding: 8px; font-weight: 600;">Mensaje</td><td style="padding: 8px; white-space: pre-wrap;">${(message || '').replace(/</g,'&lt;')}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `Kinesiologos MDP <${fromEmail}>`,
        to: [toEmail],
        bcc: bccEmail ? [bccEmail] : undefined,
        reply_to: email,
        subject,
        html
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      // Log para facilitar diagnóstico en Vercel
      // eslint-disable-next-line no-console
      console.error('Resend error:', text);
      return res.status(502).json({ error: 'Error enviando email', details: text });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error interno', details: err?.message || String(err) });
  }
}


