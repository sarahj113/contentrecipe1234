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
	product_id: string;
	handle: string;
	follower_count: string;
	audience: string;
	created_date: string;
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
		product_id: 'Product 1',
		handle: '@askldmsakdm',
		follower_count: '100',
		audience: 'young, european',
		created_date: '01/01/2024',
	},
	{
		product_id: 'Product 2',
		handle: '@mdms94',
		follower_count: '100,000',
		audience: 'old, fasionable, poor',
		created_date: '03/01/2024',
	},
	{
		product_id: 'Product 4',
		handle: '@plp13n',
		follower_count: '1,000,000',
		audience: 'tech savy, millenial, american',
		created_date: '10/01/2024',
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
		<Table.Tr key={row.product_id}>
			<Table.Td>{row.product_id}</Table.Td>
			<Table.Td>{row.handle}</Table.Td>
			<Table.Td>{row.follower_count}</Table.Td>
			<Table.Td>{row.audience}</Table.Td>
			<Table.Td>{row.created_date}</Table.Td>
			<Table.Td>
				<Button mb="md" variant="filled" color="black" component={Link} href="">
					See brief
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<ScrollArea>
			<Button mb="md" variant="filled" color="black" component={Link} href="/dashboard/briefs/create">
				Create Brief
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
							sorted={sortBy === 'product_id'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('product_id')}
						>
							Product
						</Th>
						<Th
							sorted={sortBy === 'handle'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('handle')}
						>
							Handle
						</Th>
						<Th
							sorted={sortBy === 'follower_count'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('follower_count')}
						>
							Follower Count
						</Th>
						<Th
							sorted={sortBy === 'audience'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('audience')}
						>
							Audience
						</Th>
						<Th
							sorted={sortBy === 'created_date'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('created_date')}
						>
							Creation Date
						</Th>
						<Th
							sorted={sortBy === 'created_date'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('created_date')}
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