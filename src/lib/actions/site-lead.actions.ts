'use server';

import connectDB from '@/lib/mongodb';
import SiteLead from '@/models/SiteLead';
import { revalidatePath } from 'next/cache';

/** Uso exclusivo do /admin — lista os leads capturados pelo site. */
export async function getSiteLeads(limit = 200) {
  try {
    await connectDB();
    const leads = await SiteLead.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return { success: true, leads: JSON.parse(JSON.stringify(leads)) };
  } catch (error: any) {
    console.error('Error fetching site leads:', error);
    return { success: false, error: error.message, leads: [] };
  }
}

export async function deleteSiteLead(id: string) {
  try {
    await connectDB();
    await SiteLead.findByIdAndDelete(id);
    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting site lead:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}
