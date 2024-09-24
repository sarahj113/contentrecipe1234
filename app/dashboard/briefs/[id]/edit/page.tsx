import Form from '@/app/ui/dashboard/briefs/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchBriefById } from '@/app/lib/data';
// import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: {id :string }}) {
	const id = params.id;
	const [brief] = await Promise.all([
		fetchBriefById(id),
	]);

	// if (!briefs) {
	// 	notFound();
	// }

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Briefs', href: '/dashboard/briefs' },
					{
						label: 'Edit Brief',
						href: `/dashboard/briefs/${id}/edit`,
						active: true,
					},
				]}
			/>

			<Form brief={brief} />
		</main>
	);
}