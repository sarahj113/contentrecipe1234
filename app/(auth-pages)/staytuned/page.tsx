'use client';

import classes from '../custom.module.css';
import Link from "next/link";
import {
	TextInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import { joinBetaAction } from "@/app/actions";
import { useDisclosure } from "@mantine/hooks";

export default function StayTuned() {
	return (
		<Container size={420} my={100}>
			<Title ta="center" className={classes.title}>
				Thank you!
			</Title>
			
			<Text ta="center" mt={5}>
				Stay tuned. We will contact you once we're ready to launch.
			</Text>
		</Container>
	);
}