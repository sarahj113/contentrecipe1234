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
	essence: string;
	target_audience: string;
	voice: string;
	key_differenciator: string;
	tagline: string;
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
		name: 'Dirty Labs',
		essence: 'Dirty Labs is on a mission to make traditional petrochemical-based cleaning obsolete by creating innovative, sustainable cleaning products rooted in science and aligned with nature.',
		target_audience: 'Environmentally-conscious consumers who want effective, non-toxic cleaning solutions.',
		voice: 'innovative, sustainable, scientific, natural',
		key_differenciator: 'Dirty Labs uses advanced bioenzymes and green chemistry to deliver superior cleaning performance without the use of toxic chemicals.',
		tagline: 'Clean science for a cleaner world.',
	},
	{
		name: 'Nike',
		essence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae diam cursus nulla maximus hendrerit vel id nibh.',
		target_audience: 'Curabitur fringilla nisl ac massa ultricies, quis aliquam lacus vestibulum.',
		voice: 'sportsy, high-tech, fashionable',
		key_differenciator: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		tagline: 'Curabitur vestibulum mauris ut orci convallis finibus.',
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
			<Table.Td>{row.essence}</Table.Td>
			<Table.Td>{row.target_audience}</Table.Td>
			<Table.Td>{row.voice}</Table.Td>
			<Table.Td>{row.key_differenciator}</Table.Td>
			<Table.Td>{row.tagline}</Table.Td>
		</Table.Tr>
	));

	return (
		<ScrollArea>
			<Button mb="md" variant="filled" color="black" component={Link} href="/dashboard/brands/create">
				Create Brand
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
							sorted={sortBy === 'essence'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('essence')}
						>
							Essence
						</Th>
						<Th
							sorted={sortBy === 'target_audience'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('target_audience')}
						>
							Target Audience
						</Th>
						<Th
							sorted={sortBy === 'voice'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('voice')}
						>
							Voice
						</Th>
						<Th
							sorted={sortBy === 'key_differenciator'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('key_differenciator')}
						>
							Key Differenciator
						</Th>
						<Th
							sorted={sortBy === 'tagline'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('tagline')}
						>
							Tagline
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