const users = [
	{
		id: '410544b2-4001-4271-9855-fec4b6a6442a',
		name: 'Fake User',
		email: 'fake@user.com',
		password: '123456',
	},
];

const products = [
	{
		brand_id: '1',
		id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
		name: 'Co-op Flash 55',
		description: 'All-around great value backpacking pack. It carries a medium load well but is not intended for loads much over 30 pounds.',
		image_url: '/products/rei-bagpack-flash-55.jpeg',
		key_benefits: 'light, cheap',
		key_specifications: '33lbs, 0x10x10, $100',
	},
	{
		brand_id: '1',
		id: 'e6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
		name: 'Patagonia 30L',
		description: 'Medium sized and cheap bagpack.',
		image_url: '/products/patagonia-30l.jpeg',
		key_benefits: 'robust, light',
		key_specifications: '20lbs, 100x20x10, $30',
	},
];

const briefs = [
	{
		id: 'e6e15727-9fe1-4961-8c5b-ea44a9bd81a1',
		product_id: products[0].id,
		name: "brief 1",
		text: "This brief explains what you have to do",
		status: 'draft',
		date: '2022-12-06',
	},
	{
		id: 'e6e15727-9fe1-4961-8c5b-ea44a9bd81a2',
		product_id: products[0].id,
		name: "brief 2",
		text: "Test 2",
		status: 'draft',
		date: '2022-12-06',
	},
	{
		id: 'e6e15727-9fe1-4961-8c5b-ea44a9bd81a3',
		product_id: products[0].id,
		name: "brief for bags",
		text: "Test 3",
		status: 'draft',
		date: '2022-12-06',
	},
	{
		id: 'e6e15727-9fe1-4961-8c5b-ea44a9bd81a4',
		product_id: products[0].id,
		name: "brief for this creator",
		text: "Test 4",
		status: 'draft',
		date: '2022-12-06',
	},
];

export { users, products, briefs };