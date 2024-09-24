import Image from 'next/image';
import { DeleteBrief, UpdateBrief } from '@/app/ui/dashboard/briefs/buttons';
import { fetchFilteredBriefs } from '@/app/lib/data';

export default async function BriefsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const briefs = await fetchFilteredBriefs(query, currentPage);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">

					{/* <div className="md:hidden">
						{briefs?.map((brief) => (
							<div
								key={brief.id}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
							<div className="flex items-center justify-between border-b pb-4">
								<div>
									<div className="mb-2 flex items-center">
										<Image
											src={brief.image_url}
											className="mr-2 rounded-full"
											width={28}
											height={28}
											alt={`${brief.name}'s profile picture`}
										/>
										<p>{brief.name}</p>
									</div>
									<p className="text-sm text-gray-500">{brief.description.slice(0, 20) + '...'}</p>
								</div>
							</div>

							<div className="flex w-full items-center justify-between pt-4">
								<div>
									<p className="text-xl font-medium">
										{brief.key_benefits}
									</p>
									<p className="text-xl font-medium">
										{brief.key_specifications}
									</p>
								</div>
								<div className="flex justify-end gap-2">
									<UpdateBrief id={brief.id} />
									<DeleteBrief id={brief.id} />
								</div>
							</div>
							</div>
						))}
					</div> */}

					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Name
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Text
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Status
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Date
								</th>
								<th scope="col" className="relative py-3 pl-6 pr-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						
						<tbody className="bg-white">
							{briefs?.map((brief) => (
								<tr
									key={brief.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										{brief.name}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{brief.text}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{brief.status}
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{brief.date}
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<UpdateBrief id={brief.id} />
											<DeleteBrief id={brief.id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
  );
}
