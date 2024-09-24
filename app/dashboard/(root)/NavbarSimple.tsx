'use client';

import { useState } from 'react';
import { Group, Code, Text } from '@mantine/core';
import {
	IconBellRinging,
	IconApple,
	IconAlien,
	IconBat,
	IconSettings,
	IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';

const data = [
	{ link: '/dashboard/notifications',  label: 'Notifications', icon: IconBellRinging },
	{ link: '/dashboard/brands',         label: 'Brand',         icon: IconApple },
	{ link: '/dashboard/products',       label: 'Products',      icon: IconAlien },
	{ link: '/dashboard/briefs',         label: 'Briefs',        icon: IconBat },
];

export function NavbarSimple() {
	const [active, setActive] = useState('');

	const links = data.map((item) => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				<Group className={classes.header} justify="space-between">
					<Text>Content AI</Text>
					<Code fw={700}>v0.0.1</Code>
				</Group>
				{links}
			</div>

			<div className={classes.footer}>
				<a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
					<IconSettings className={classes.linkIcon} stroke={1.5} />
					<span>Account settings</span>
				</a>

				<a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</a>
			</div>
		</nav>
	);
}