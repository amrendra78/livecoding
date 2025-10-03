import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { supabase } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    // check existing user
    const { data: existing, error: selectError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (selectError) throw selectError;
    if (existing && existing.length > 0) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.from('users').insert([{ name, email, password: hashed }]);
    if (error) throw error;

    res.status(201).json({ message: 'Signup successful' });
  } catch (err: any) {
    console.error('signup error', err.message || err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
