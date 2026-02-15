import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      const ideas = data.map(row => ({ id: row.id, title: row.title, messages: typeof row.messages === 'string' ? JSON.parse(row.messages) : row.messages, createdAt: new Date(row.created_at).getTime(), starred: row.starred }));
      return res.status(200).json(ideas);
    }
    if (req.method === 'POST') {
      const { id, title, messages, starred } = req.body;
      const { error } = await supabase.from('ideas').insert({ id, title, messages: JSON.stringify(messages || []), starred: starred || false });
      if (error) throw error;
      return res.status(201).json({ success: true });
    }
    if (req.method === 'PUT') {
      const { id, title, messages, starred } = req.body;
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (messages !== undefined) updates.messages = JSON.stringify(messages);
      if (starred !== undefined) updates.starred = starred;
      const { error } = await supabase.from('ideas').update(updates).eq('id', id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('ideas').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
}
