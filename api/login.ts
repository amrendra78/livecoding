import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { supabase } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const { data: users, error } = await supabase.from('users').select('id,name,email,password').eq('email', email).limit(1);
    if (error) throw error;
    if (!users || users.length === 0) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err: any) {
    console.error('login error', err.message || err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
