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
	Flex,
} from '@mantine/core';
import { useForm } from "@mantine/form";
import { joinBetaAction } from "@/app/actions";
import { useDisclosure } from "@mantine/hooks";
import { NavbarSimple } from './NavbarSimple';

export default function StayTuned() {
	return (
		<Container>
			<Text>Test</Text>
		</Container>
	);
}