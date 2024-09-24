'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
// import { createProduct, State } from '@/app/lib/actions';
// import { useActionState } from 'react';

export default function CreateProductForm({}: {}) {
	// const initialState: State = { message: null, errors: {} }
	// const [state, formAction] = useActionState(createProduct, initialState);

	return (
		<form>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">

				<div className="mb-4">
					<label htmlFor="description" className="mb-2 block text-sm font-medium">
						Description:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
							id="description"
							name="description"
							type="string"
							defaultValue=""
							placeholder="Enter description..."
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="key-benefits" className="mb-2 block text-sm font-medium">
						Key Benefits:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="key-benefits"
								name="key-benefits"
								type="string"
								defaultValue=""
								placeholder="Enter key benefits..."
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="key-specifications" className="mb-2 block text-sm font-medium">
						Key Specifications:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="key-specifications"
								name="key-specifications"
								type="string"
								defaultValue=""
								placeholder="Enter key specifications..."
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

			</div>

			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/products"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Product</Button>
			</div>

		</form>
	);
}
