import { users, products, briefs } from '@/app/lib/placeholder-data';

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
	query: string,
	currentPage: number,
) {
	return products;
};

export async function fetchProductsPages(query: string) {
	return 1;
};

export async function fetchProductById(id: string) {
	return products[0];
};

export async function fetchFilteredBriefs(
	query: string,
	currentPage: number,
) {
	return briefs;
};

export async function fetchBriefsPages(query: string) {
	return 1;
};

export async function fetchBriefById(id: string) {
	return briefs[0];
};