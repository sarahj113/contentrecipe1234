'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
// import { createProduct, State } from '@/app/lib/actions';
// import { useActionState } from 'react';

export default function CreateBriefForm({}: {}) {
	// const initialState: State = { message: null, errors: {} }
	// const [state, formAction] = useActionState(createProduct, initialState);

	return (
		<form>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">

				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Name:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
							id="name"
							name="name"
							type="string"
							defaultValue=""
							placeholder="Enter name..."
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="text" className="mb-2 block text-sm font-medium">
						Text:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="text"
								name="text"
								type="string"
								defaultValue=""
								placeholder="Enter text..."
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/briefs"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Brief</Button>
			</div>

		</form>
	);
}
