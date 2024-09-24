'use server';

import { generateObject, streamObject, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';

export async function generate(input: string) {
	const supabase = createClient();

	// const stream = createStreamableValue();

	const { object: brief } = await generateObject({
	// (async () => {
	// 	const { partialObjectStream } = await streamObject({
			model: anthropic('claude-3-haiku-20240307'),
			system: 'You are a social media marketing specialist for influencers.',
			prompt: input,
			schema: z.object({
				data: z.object({
					input_brand: z.object({
						brand_name: z.string().describe('Brand name.'),	
						brand_essence: z.string().describe('Core mission and values of the brand.'),
						target_audience: z.string().describe('Description of the primary audience the brand serves.'),
						brand_voice: z.array(z.string().describe('Adjective describing the brand\'s tone and style.')),
						key_differentiator: z.string().describe('What sets the brand apart from competitors.'),
						brand_tagline: z.string().describe('The brand\'s memorable slogan or tagline.'),
					}),
					input_product: z.object({
						product_name: z.string().describe('Name of the product.'),
						product_description: z.string().describe('Detailed description of the product.'),
						size: z.string().describe('Size or quantity details of the product.'),
						price: z.string().describe('Price point of the product.'),
						current_promotions: z.string().describe('Details of any ongoing promotions or discounts.'),
						primary_function: z.string().describe('Main purpose or benefit of the product.'),
						ideal_user: z.string().describe('Description of the intended user or customer.'),
						unique_features: z.array(z.string().describe('Standout features or qualities.')),
						value_proposition: z.string().describe('Explanation of why the product offers good value.'),
						use_case_scenarios: z.array(z.string().describe('Example of situation where the product is especially useful.')),
						social_proof: z.array(z.string().describe('Testimonial, award, or statistic validating the product.')),
						call_to_action: z.string().describe('Desired action from the customer after viewing the content."'),
					}),
					input_creator: z.object({
						creator_handle: z.string().describe('Creator\'s social media handle.'),
						primary_platform: z.string().describe('Main platform used by the creator (e.g., Instagram, TikTok, YouTube).'),
						follower_count: z.number().describe('Total number of followers.'),
						content_style: z.array(z.string().describe('Description of the creator\'s content style and themes (e.g., \'casual\', \'informative\', \'humorous\').')),
						audience_demographics: z.object({
							age_range: z.string().describe('Predominant age group of followers.'),
							gender_distribution: z.string().describe('Predominant gender among followers.'),
							interests: z.array(z.string().describe('Common interests shared by the audience.')),
						}),
						engagement_metrics: z.object({
							average_likes: z.number().describe('Average likes per post.'),
							average_comments: z.number().describe('Average comments per post.'),
							average_shares: z.number().describe('Average shares per post.'),
						}),
						brand_fit: z.string().describe('Description of how the creator\'s persona aligns with the brand\'s values.'),
						past_collaborations: z.array(z.string().describe('List of previous brand partnerships.')),
						top_performing_content: z.array(z.string().describe('Descriptions or links to the creator\'s most successful posts/videos.')),
					}),
					input_ugc_templates: z.array(z.object({
						name: z.string().describe('Template name'),
						duration_seconds: z.number().describe('Total duration of the video'),
						structure: z.array(
							z.object({
								time_frame: z.string().describe('Beginning and ending time of this segment'),
								content: z.string().describe('What is happening during this time frame')
							}),
						),
						key_elements: z.array(z.string().describe('Adjectives describing the key elements to convey in the video')),
					})),
				}),
			}),
		});

	// 	for await (const partialObject of partialObjectStream) {
	// 		stream.update(partialObject);
	// 	}
	// };
	// 	stream.done();
	// })();

	// return { object: stream.value };
	// const { data, error } = await supabase
	// 	.from('countries')
	// 	.insert({ id: 1, name: 'Denmark' })
	// 	.select()

	try {
		const { error } = await supabase.from('briefs').upsert({
			form_data: {"test": "data"},
			ai_answer: brief,
		})
		if (error) throw error
		console.log('ok!');
	} catch (error) { console.log(error); }
	finally {}

	return { brief };
};