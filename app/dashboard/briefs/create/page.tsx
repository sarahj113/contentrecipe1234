import Form from '@/app/ui/dashboard/briefs/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';

export default async function Page() {
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Briefs', href: '/dashboard/briefs' },
					{
						label: 'Create Briefs',
						href: '/dashboard/briefs/create',
						active: true,
					},
				]}
			/>
			<Form />
		</main>
	);
}