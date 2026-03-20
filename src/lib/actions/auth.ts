'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signAdminJwt } from '@/lib/jwt';
import { logAdminAction } from '@/lib/admin-logs';

const COOKIE_NAME = 'admin_session';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: 'Senha inválida' };
  }

  const token = await signAdminJwt({ role: 'admin' });

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  await logAdminAction('admin_login', { timestamp: new Date().toISOString() });
  
  return { success: true };
}

export async function logoutAction() {
  cookies().delete(COOKIE_NAME);
  redirect('/admin');
}
