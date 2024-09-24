'use client';

import Form from '@/app/ui/dashboard/briefs/create-form';
import { Button, Center, Container, Divider, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function Page() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const AIForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			brand_about: "...",
		},
	}); 

	const manualForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			company_about: "Dirty Labs is a cleaning innovations lab on a mission to make traditional petrochemical-based cleaning obsolete. Too many cleaners today still rely on petrochemicals and harsh synthetics that pollute the environment and our drinking water. Some of the most common cleaning and personal care ingredients have been found to be potential carcinogens, irritants, toxins, or endocrine disruptors. We believe there's a smarter way to clean without these chemicals. We founded Dirty Labs to create the change we want to see in the cleaning industry — a truly innovative, sustainable approach to cleaning that’s rooted in science and aligned with nature. By utilizing breakthroughs in green chemistry, our team of chemists and environmentalists have raised the bar for performance, safety, and sustainability. Our promise is to deliver on par or better cleaning efficacy than conventional cleaners without the use of any ethoxylates, parabens, fillers, California Prop 65 chemicals of concern, and EU listed fragrance allergens.",
			product_name: "Sustainable Laundry Starter Set",
			product_description: "Tackle your dirtiest, smelliest laundry with clean science. Dirty Labs Murasaki Bio Laundry Detergent & Bio Booster is a liquid + powder duo that uses advanced bioenzymes - not toxic chemicals - to make your whites and colors vibrant and eliminate the toughest stains and odors. Murasaki Bio Laundry DetergentConsciously formulated with natural, nontoxic ingredients that are safe for sensitive skin, and free of dyes, SLS, SLES, parabens, EU listed fragrance allergens, and all California Prop. 65 chemicals. Our Murasaki scent is inspired by the early Spring green tea harvest in Japan and features fresh notes of jasmine, matcha, and vetiver. With Dirty Labs 11x concentrated formula, less is more – 80 loads in a 21.6 fl oz bottle. Bio Enzyme Laundry Booster: 4-in-1 Advanced Stain & Odor Remover. Specifically formulated to work with our Bio Laundry Detergents.Designed to remove the toughest stains. Permastank and odor eliminator. Brightens for more vibrant whites and colors. Removes yellow stains caused by sweat and sebum.",
			product_price: "$39.00",
			product_promotion: "",
			creator_tiktok_handle: "@hottiekjs",
			creator_follower_count: "10,000",
			creator_audience: "fashion, young, stylish",
		},
	});

	return (
		<Stack ml="md">
			<form onSubmit={manualForm.onSubmit((values) => console.log(values))}>
				<Textarea
					key={AIForm.key('company_about')}
					{...AIForm.getInputProps('company_about')}
					label="Copy/paste your brand about information and our AI will extract the data"
					placeholder="Copy & paste your 'About' page"
					autosize
					minRows={4}
					maxRows={8}
					mb="md"
				/>
				<Button
					type="submit"
					loading={isLoading}
					mt="lg" variant="filled" color="black"
					onClick={async () => {
						setIsLoading(true);
					}}
				>
					Extract
				</Button>
			</form>

			<Divider my="md" />

			<form onSubmit={manualForm.onSubmit((values) => console.log(values))}>

				<TextInput
					{...manualForm.getInputProps('name')}
					key={manualForm.key('name')}
					label="What is the brand's name?"
					mb="md"
				/>
				<TextInput
					{...manualForm.getInputProps('essence')}
					key={manualForm.key('essence')}
					label="Describe the brand's essence"
					mb="md"
				/>
				<TextInput
					{...manualForm.getInputProps('target_audience')}
					key={manualForm.key('target_audience')}
					label="Describe the brand's target audience"
					mb="md"
				/>
				<TextInput
					{...manualForm.getInputProps('voice')}
					key={manualForm.key('voice')}
					label="What is the brand's voice?"
					mb="md"
				/>
				<TextInput
					{...manualForm.getInputProps('key_differenciator')}
					key={manualForm.key('key_differenciator')}
					label="What is the brand's key_differenciator?"
					mb="md"
				/>
				<TextInput
					{...manualForm.getInputProps('tagline')}
					key={manualForm.key('tagline')}
					label="What is the brand's tagline?"
					mb="md"
				/>

				<Button
					type="submit"
					loading={isLoading}
					mt="lg" variant="filled" color="black"
					onClick={async () => {
						setIsLoading(true);
					}}
				>
					Create
				</Button>
			</form>
		</Stack>
	);
}