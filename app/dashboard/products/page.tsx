// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
import { TableSort } from '@/app/dashboard/products/table';
import { CreateProduct } from '@/app/ui/dashboard/products/buttons';
import { lusitana } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchProductsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Container } from '@mantine/core';

export const metadata: Metadata = {
	title: 'Products',
};

export default async function Page({
	searchParams,
} : {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchProductsPages(query);

	return (
		<Container mt="md">
			{/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
				{/* <Table query={query} currentPage={currentPage} /> */}
				<TableSort />
			{/* </Suspense> */}
			{/* <div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div> */}
		</Container>
	);
}