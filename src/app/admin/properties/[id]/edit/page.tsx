import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getPropertyById } from '@/lib/actions/property-edit.actions';
import EditPropertyForm from '@/components/admin/EditPropertyForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const { success, property } = await getPropertyById(id);

  if (!success || !property) notFound();

  return <EditPropertyForm property={property} />;
}
