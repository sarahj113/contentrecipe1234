export type Product = {
	id: string;
	brand_id: string;
	description: string;
	image_url: string;
	key_benefits: string;
	key_specifications: string;
};


export type ProductForm = {
	id: string;
	description: string;
	key_benefits: string;
	key_specifications: string;
};

export type Brief = {
	id: string;
	name: string;
	product_id: string;
	text: string;
	status: string;
	date: string;
};

export type BriefForm = {
	id: string;
	name: string;
	text: string;
	status: string;
	date: string;
};