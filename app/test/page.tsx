'use client';

import { Card, Container, Divider, Group, List, ListItem, Paper, rem, ThemeIcon, Title } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Button, Center, Slider, Text, Textarea, TextInput } from '@mantine/core';

import { useState } from 'react';
// import { generate } from '@/app/api/actions';
import { generate } from '@/app/api/actions';
import { readStreamableValue } from 'ai/rsc';
import { useForm } from '@mantine/form';
import { CheckIcon } from '@heroicons/react/24/outline';
import { hardcodedData } from './fakeData';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default function Index() {
	const [generation, setGeneration] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const fakeData = hardcodedData["data"];

	const form = useForm({
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

	const marks = [
		{ value: 0, label: '~ 1000' },
		{ value: 25, label: '~ 10,000' },
		{ value: 50, label: '~ 100,000' },
		{ value: 75, label: '~ 1,000,000' },
		{ value: 100, label: '> 1,000,000' },
	];

	// @todo Move prompt creation server side once agreed on structure/input used.
	function createPrompt() {
		const formValues = form.getValues();
		let prompt = `
UGC Product Review Script Generator Prompt
Develop a comprehensive and authentic User-Generated Content (UGC) product review script tailored for a specific content creator. The script should effectively promote the product while aligning with the brand's essence and resonating with the creator's audience. Utilize proven UGC structures and formats to maximize engagement and authenticity.

Input Parameters

From this company, product and creator details:

"Company about: '${formValues['company_about']}'
Product Name: '${formValues['product_name']}'
Product description: '${formValues['product_description']}'
Product price: '${formValues['product_price']}'
Product promotion: '${formValues['product_promotion']}'
Creator tiktok handle: '${formValues['creator_tiktok_handle']}'
Creator followers count: ${formValues['creator_follower_count']}'
Creator audience: '${formValues['creator_audience']}'", create the following structured inputs:

1. Brand Information (input_brand)

Extract and structure the following details:
{
  "brand_essence": "String - Core mission and values of the brand.",
  "target_audience": "String - Description of the primary audience the brand serves.",
  "brand_voice": ["String"] - List of adjectives describing the brand's tone and style.",
  "key_differentiator": "String - What sets the brand apart from competitors.",
  "brand_tagline": "String - The brand's memorable slogan or tagline."
}

2. Product Information (\`input_product\`)

Provide detailed information about the product:
{
"product_name": "String - Name of the product.",
"product_description": "String - Detailed description of the product.",
"size": "String - Size or quantity details of the product.",
"price": "String - Price point of the product.",
"current_promotions": "String - Details of any ongoing promotions or discounts.",
"primary_function": "String - Main purpose or benefit of the product.",
"ideal_user": "String - Description of the intended user or customer.",
"unique_features": ["String"] - List of standout features or qualities.",
"value_proposition": "String - Explanation of why the product offers good value.",
"use_case_scenarios": ["String"] - Examples of situations where the product is especially useful.",
"social_proof": ["String"] - Testimonials, awards, or statistics validating the product.",
"call_to_action": "String - Desired action from the customer after viewing the content."
}

3. Creator Information (\`input_creator\`)

Provide insights about the content creator:
{
"creator_handle": "String - Creator's social media handle.",
"primary_platform": "String - Main platform used by the creator (e.g., Instagram, TikTok, YouTube).",
"follower_count": "Number - Total number of followers.",
"content_style": ["String"] - Description of the creator's content style and themes (e.g., 'casual', 'informative', 'humorous').",
"audience_demographics": {
"age_range": "String - Predominant age group of followers.",
"gender_distribution": "String - Predominant gender among followers.",
"interests": ["String"] - Common interests shared by the audience."
},
"engagement_metrics": {
"average_likes": "Number - Average likes per post.",
"average_comments": "Number - Average comments per post.",
"average_shares": "Number - Average shares per post."
},
"brand_fit": "String - Description of how the creator's persona aligns with the brand's values.",
"past_collaborations": ["String"] - List of previous brand partnerships.",
"top_performing_content": ["String"] - Descriptions or links to the creator's most successful posts/videos."
}

4. UGC Structures and Formats (\`input_ugc_templates\`)

Incorporate proven UGC structures and formats. Utilize the following templates and guidelines:

{
"templates": [
{
"name": "Problem-Solution Template",
"duration_seconds": 45,
"structure": [
{"time_frame": "0-5s", "content": "State a common problem related to the product's domain."},
{"time_frame": "5-15s", "content": "Explain why common solutions are ineffective."},
{"time_frame": "15-25s", "content": "Introduce the product as the effective solution."},
{"time_frame": "25-35s", "content": "Demonstrate quick and easy use of the product."},
{"time_frame": "35-40s", "content": "Show or describe immediate results."},
{"time_frame": "40-45s", "content": "Provide a compelling and urgent call-to-action."}
],
"key_elements": ["Educational tone", "Before/after comparison", "Ease of use demonstration"]
},
{
"name": "Lifestyle Upgrade Template",
"duration_seconds": 35,
"structure": [
{"time_frame": "0-5s", "content": "Introduce the product as a game-changer for a daily task."},
{"time_frame": "5-15s", "content": "Show the product in action within a relatable setting."},
{"time_frame": "15-20s", "content": "Highlight a unique feature that stands out."},
{"time_frame": "20-25s", "content": "Share personal improvement or benefit experienced."},
{"time_frame": "25-30s", "content": "Mention additional benefits enhancing lifestyle."},
{"time_frame": "30-35s", "content": "Conclude with an enthusiastic recommendation and purchase information."}
],
"key_elements": ["Relatability", "Personal impact", "Lifestyle enhancement"]
}
// Include additional templates as needed...
],
"general_tips": [
"Begin with a strong hook to capture attention within the first 3 seconds.",
"Maintain a conversational and authentic tone throughout the script.",
"Incorporate personal anecdotes to build trust and relatability.",
"Utilize repetition to reinforce key benefits and selling points.",
"Highlight scarcity or exclusivity where appropriate to create urgency.",
"End with a clear and compelling call-to-action, encouraging immediate engagement.",
"Adapt language and style to fit both the brand's and creator's personas.",
"Use platform-specific features and trends to enhance engagement (e.g., popular hashtags, challenges).",
"Ensure compliance with disclosure requirements for sponsored content."
]
}

Script Generation Instructions

Using the provided inputs, follow these steps to generate the UGC product review script:

Step 1: Data Extraction and Synthesis

- **Brand Alignment**:
    - Analyze \`input_brand\` to understand and embody the brand's essence, voice, and target audience.
    - Ensure all messaging aligns with the brand's key differentiators and tagline.
- **Product Highlighting**:
    - Extract key features, benefits, and unique selling points from \`input_product\`.
    - Identify and integrate relevant use-case scenarios and social proof to bolster credibility.
    - Emphasize current promotions and value propositions effectively.
- **Creator Personalization**:
    - Tailor the script to match the creator's \`content_style\` and appeal to their \`audience_demographics\`.
    - Incorporate elements reflecting the creator's past successful content and engagement strategies.
    - Utilize language and scenarios that resonate with the creator's followers, enhancing authenticity.

Step 2: Template Selection and Adaptation

- **Template Matching**:
    - Choose the most suitable template from \`input_ugc_templates.templates\` based on the product and creator's style.
    - Adapt the chosen template's structure to fit the specific context and objectives.
- **Hook Development**:
    - Craft an engaging opening statement that immediately captures attention, possibly using surprising facts, questions, or relatable problems.
    - Ensure the hook aligns with both the brand message and the creator's typical content approach.
- **Body Composition**:
    - Seamlessly introduce the product, weaving in key benefits and unique features through storytelling and demonstration.
    - Incorporate personal experiences or testimonials to enhance authenticity and trust.
    - Utilize repetition strategically to reinforce the most compelling selling points.
- **Closing and Call-to-Action**:
    - Conclude with a strong, memorable statement that encapsulates the product's value.
    - Include a clear and urgent call-to-action, guiding viewers towards the desired next steps (e.g., purchasing, visiting a website).

Step 3: Language and Tone Optimization

- **Conversational Tone**:
    - Use friendly and approachable language, as if the creator is speaking directly to a friend.
    - Include colloquial expressions and phrases typical of the creator's usual speech patterns.
- **Emotional Engagement**:
    - Evoke emotions such as excitement, relief, or curiosity through descriptive and emotive language.
    - Address common pain points and demonstrate how the product provides effective solutions.
- **Authenticity Markers**:
    - Incorporate minor imperfections or spontaneous moments to mimic genuine, unscripted content.
    - Avoid overly promotional language; focus on honest and relatable experiences.

Step 4: Platform and Format Optimization

- **Platform-Specific Adjustments**:
    - Tailor the script length, pacing, and format to suit the primary platform (e.g., quick cuts and trending sounds for TikTok).
    - Integrate platform features such as captions, stickers, or filters where appropriate.
- **Visual and Audio Cues**:
    - Suggest corresponding visual elements that complement the script (e.g., product close-ups, before-and-after shots).
    - Recommend background music or sound effects that enhance the mood and engagement.
- **Compliance and Disclosure**:
    - Include clear guidelines for disclosing the sponsored nature of the content according to platform and legal requirements.
    - Ensure all claims made are truthful and substantiated to maintain credibility and trust.
		`;
		
		return prompt;
		// return "Give me a recipe for a random dessert.";
	}

	return (
		<div>
			<Container mt="100">
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
			<Accordion variant="separated" chevronPosition="right" defaultValue={"about"}>
				<Accordion.Item key="about" value="about">
					<Accordion.Control>About</Accordion.Control>
					<Accordion.Panel>
						<Textarea
							key={form.key('company_about')}
							{...form.getInputProps('company_about')}
							label=""
							placeholder="Copy & paste your 'About' page"
							autosize
							minRows={4}
							maxRows={8}
							mb="md"
						/>
					</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item key="product" value="product">
					<Accordion.Control>Product</Accordion.Control>
					<Accordion.Panel>
						<TextInput
							{...form.getInputProps('product_name')}
							key={form.key('product_name')}
							label="What is the product's name?"
							mb="md"
						/>
						<TextInput
							{...form.getInputProps('product_description')}
							key={form.key('product_description')}
							label="Copy & paste the product description."
							mb="md"
						/>
						<TextInput
							{...form.getInputProps('product_price')}
							key={form.key('product_price')}
							label="What's the size and price of the product the creator is selling?"
							mb="md"
						/>
						<TextInput
							{...form.getInputProps('product_promotion')}
							key={form.key('product_promotion')}
							label="Are there any promotions currently running (including subscription pricing)?"
							mb="md"
						/>

					</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item key="creator" value="creator">
					<Accordion.Control>Creator</Accordion.Control>
					<Accordion.Panel>
						<TextInput
							{...form.getInputProps('creator_tiktok_handle')}
							key={form.key('creator_tiktok_handle')}
							label="What is the creator's Tiktok handle?"
							mb="md"
						/>
						{/* <Slider
							color="blue"
							size="md"
							mb="md"
							showLabelOnHover={false}
							marks={[
								{ value: 20, label: '20%' },
								{ value: 50, label: '50%' },
								{ value: 80, label: '80%' },
							]}
						/> */}
						<Text mt="md">How many followers do they have?</Text>
						<Slider
							{...form.getInputProps('creator_follower_count')}
							key={form.key('creator_follower_count')}
							color="black"
							defaultValue={50}
							label={(val) => marks.find((mark) => mark.value === val)!.label}
							step={25}
							marks={marks}
							labelAlwaysOn
							mb="lg"
							styles={{ markLabel: { display: 'none' } }}
						/>
						<TextInput
							{...form.getInputProps('creator_audience')}
							key={form.key('creator_audience')}
							label="How would you describe the creator's content style and audience in a few words?"
							placeholder="Etc. a mom creator who posts a lot of house cleaning videos."
							mb="md"
						/>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>

			<Center>
				<Button
					type="submit"
					loading={isLoading}
					mt="lg" variant="filled" color="black"
					onClick={async () => {
						setIsLoading(true);
						let prompt = createPrompt();
						console.log(prompt);

						const { brief } = await generate(prompt);
						console.log(brief);
						setGeneration(JSON.stringify(brief.data, null, 2));

						// const { object } = await generate(prompt);
						// for await (const partialObject of readStreamableValue(object)) {
						// 	if (partialObject) {
						// 		setGeneration(
						// 			JSON.stringify(partialObject.data, null, 2),
						// 		);
						// 	}
						// };
						setIsLoading(false);
					}}
				>
					Let's cook
				</Button>
			</Center>
			</form>

			<div hidden={generation===""}>
				<Divider my="xl" />

				<Card shadow="sm" padding="lg" radius="md" withBorder>
					<Group justify="space-between" mt="md" mb="xs">
						<Text fw={500}>{generation ? JSON.parse(generation)['input_brand']['brand_name'] : ""}</Text>
						<Text size="sm">
							{generation ? JSON.parse(generation)['input_brand']['brand_essence'] : ""}
						</Text>
						<Text size="sm" c="dimmed">
							{generation ? JSON.parse(generation)['input_brand']['key_differentiator'] : ""}
						</Text>
						<Text size="sm" c="dimmed">
							{generation ? JSON.parse(generation)['input_brand']['brand_voice'].join(', ') : ""}
						</Text>
					</Group>

					<Group justify="space-between" mt="md" mb="xs">
						<List
							spacing='xs' size='sm' center
							icon={
								<ThemeIcon color="teal" size={24} radius="xl">
									<CheckIcon style={{ width: rem(16), height: rem(16) }} />
								</ThemeIcon>
							}
						>
							{
								generation && JSON.parse(generation)['input_ugc_templates'] ?
									JSON.parse(generation)['input_ugc_templates'][0]['structure'].map((value:any) => {
										return <List.Item> {value['time_frame']} : {value['content']} </List.Item>
									})
								: ''
							}
						</List>
					</Group>

					{/* <Group justify="space-between" mt="md" mb="xs">
						<Text fw={500}>{generation ? JSON.parse(generation)['input_product']['product_name'] : "?"}</Text>
						<Text size="sm">
							{generation ? JSON.parse(generation)['input_product']['product_description'] : ""}
						</Text>
						<Text size="sm" c="dimmed">
							{generation ? JSON.parse(generation)['input_brand']['value_proposition'] : ""}
						</Text>
					</Group>

					<Group justify="space-between" mt="md" mb="xs">
						<Text fw={500}>{generation ? JSON.parse(generation)['input_creator']['creator_handle'] : "?"}</Text>
						<Text size="sm">
							{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['name'] : ""}
						</Text>
						<Group justify="space-between" mt="md" mb="xs">
							<Text fw={500}>
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][0]['time_frame'] : ""}
							</Text>
							<Text size="sm">
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][0]['content'] : ""}
							</Text>
						</Group>
						<Group justify="space-between" mt="md" mb="xs">
							<Text fw={500}>
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][1]['time_frame'] : ""}
							</Text>
							<Text size="sm">
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][1]['content'] : ""}
							</Text>
						</Group>
						<Group justify="space-between" mt="md" mb="xs">
							<Text fw={500}>
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][2]['time_frame'] : ""}
							</Text>
							<Text size="sm">
								{generation ? JSON.parse(generation)['input_ugc_templates']['templates'][0]['structure'][2]['content'] : ""}
							</Text>
						</Group>
					</Group> */}

				</Card>
			</div>

			</Container>
		</div>

	);
}