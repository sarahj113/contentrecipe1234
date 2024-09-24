'use client';

import { useState } from 'react';
import {
	Button,
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	TextInput,
	rem,
	keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
// import { Button } from '@/app/ui/button';
import Link from 'next/link';

interface RowData {
	name: string;
	description: string;
	price: string;
	promotion: string;
}

interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
	const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
	return (
		<Table.Th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group justify="space-between">
					<Text fw={500} fz="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}

function filterData(data: RowData[], search: string) {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
	);
}

function sortData(
	data: RowData[],
	payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy]);
			}

			return a[sortBy].localeCompare(b[sortBy]);
		}),
		payload.search
	);
}

const data = [
	{
		name: 'Product 1',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		price: '$10',
		promotion: '',
	},
	{
		name: 'Product 2',
		description: 'Nunc pellentesque consequat neque id interdum.',
		price: '$20',
		promotion: '',
	},
	{
		name: 'Product 3',
		description: 'Aliquam erat volutpat.',
		price: '$40',
		promotion: '',
	},
	{
		name: 'Product 4',
		description: 'Morbi placerat pulvinar massa ac pellentesque.',
		price: '$30',
		promotion: '',
	},
	{
		name: 'Product 5',
		description: 'Maecenas non hendrerit massa.',
		price: '$100',
		promotion: '',
	},
];

export function TableSort() {
	const [search, setSearch] = useState('');
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(data, { sortBy: field, reversed, search }));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
	};

	const rows = sortedData.map((row) => (
		<Table.Tr key={row.name}>
			<Table.Td>{row.name}</Table.Td>
			<Table.Td>{row.description}</Table.Td>
			<Table.Td>{row.price}</Table.Td>
			<Table.Td>{row.promotion}</Table.Td>
			<Table.Td>
				<Button mb="md" variant="filled" color="black" component={Link} href="">
					See linked briefs
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<ScrollArea>
			<Button mb="md" variant="filled" color="black" component={Link} href="/dashboard/products/create">
				Create Product
			</Button>

			<TextInput
				placeholder="Search by any field"
				mb="md"
				leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
				value={search}
				onChange={handleSearchChange}
			/>
			<Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
				<Table.Tbody>
					<Table.Tr>
						<Th
							sorted={sortBy === 'name'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('name')}
						>
							Name
						</Th>
						<Th
							sorted={sortBy === 'description'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('description')}
						>
							Description
						</Th>
						<Th
							sorted={sortBy === 'price'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('price')}
						>
							Price
						</Th>
						<Th
							sorted={sortBy === 'promotion'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('promotion')}
						>
							Promotions
						</Th>
						<Th
							sorted={sortBy === 'promotion'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('promotion')}
						>
							Actions
						</Th>
					</Table.Tr>
				</Table.Tbody>

				<Table.Tbody>
					{rows.length > 0 ? (
						rows
					) : (
						<Table.Tr>
							<Table.Td colSpan={Object.keys(data[0]).length}>
							<Text fw={500} ta="center">
								Nothing found
							</Text>
							</Table.Td>
						</Table.Tr>
					)}
				</Table.Tbody>
			</Table>
		</ScrollArea>
	);
}