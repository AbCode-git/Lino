import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { type, data } = req.body;

    if (!type || !data) {
        return res.status(400).json({ message: 'Missing type or data' });
    }

    try {
        let tableName = type === 'appointment' ? 'appointments' : 'contacts';

        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from(tableName)
            .insert([data]);

        if (dbError) throw dbError;

        // 2. Notify Telegram (if configured)
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const message = formatTelegramMessage(type, data);
            await sendTelegramMessage(botToken, chatId, message);
        }

        return res.status(200).json({ success: true, message: 'Data received successfully' });
    } catch (error) {
        console.error('Submission error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

function formatTelegramMessage(type, data) {
    const emoji = type === 'appointment' ? '📅' : '✉️';
    const header = type === 'appointment' ? '*New Appointment Request*' : '*New Contact Inquiry*';

    let body = '';
    if (type === 'appointment') {
        body = `
*Name:* ${data.name}
${data.email ? `*Email:* ${data.email}\n` : ''}*Phone:* ${data.phone}
*Service:* ${data.service}
*Date:* ${data.date}
*Time:* ${data.time}
*Notes:* ${data.notes || 'N/A'}`;
    } else {
        body = `
*Name:* ${data.name}
${data.email ? `*Email:* ${data.email}\n` : ''}*Type:* ${data.type}
*Message:* ${data.message}`;
    }

    return `${emoji} ${header}\n${body}`;
}

async function sendTelegramMessage(token, chatId, text) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown',
        }),
    });

    if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Telegram error: ${errData.description}`);
    }
}
