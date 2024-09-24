'use client';

import { Button, Center, Container, Divider, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function Page() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: '',
			description: '',
			price: '',
			promotion: '',
		},
	});

	return (
		<Stack ml="md">
			<form onSubmit={form.onSubmit((values) => console.log(values))}>

				<TextInput
					{...form.getInputProps('name')}
					key={form.key('name')}
					label="What is the product's name?"
					mb="md"
				/>
				<Textarea
					key={form.key('description')}
					{...form.getInputProps('description')}
					label="Copy/paste your product description"
					autosize
					minRows={4}
					maxRows={8}
					mb="md"
				/>
				{/* <TextInput
					{...form.getInputProps('product_description')}
					key={form.key('product_description')}
					label="Copy & paste the product description."
					mb="md"
				/> */}
				<TextInput
					{...form.getInputProps('price')}
					key={form.key('price')}
					label="What's the size and price of the product the creator is selling?"
					mb="md"
				/>
				<TextInput
					{...form.getInputProps('promotion')}
					key={form.key('promotion')}
					label="Are there any promotions currently running (including subscription pricing)?"
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