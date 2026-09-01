import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getCondominiumById } from '@/lib/actions/condominium.actions';
import EditCondominiumForm from '@/components/admin/EditCondominiumForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCondominiumPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const { success, condominium } = await getCondominiumById(id);

  if (!success || !condominium) notFound();

  return <EditCondominiumForm condominium={condominium} />;
}
