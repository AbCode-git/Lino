import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Missing date parameter' });
    }

    try {
        // Query Supabase for appointments on the selected date
        const { data, error } = await supabase
            .from('appointments')
            .select('time')
            .eq('date', date);

        if (error) throw error;

        // Return the list of taken time slots
        const takenSlots = data.map(item => item.time);
        return res.status(200).json({ success: true, takenSlots });
    } catch (error) {
        console.error('Availability check error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
