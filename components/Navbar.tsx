import { Box, Button, Image, Switch, useColorMode } from '@chakra-ui/react'
import { supabase } from '../utils/auth'
import React, { useEffect, useState } from 'react'
import { useAuth, UserType } from '../utils/AuthContext'
import Dropdown from './Dropdown'
import Anime from 'react-animejs-wrapper'
import { FaMoon, FaSun } from 'react-icons/fa'
import { GiWeightLiftingUp } from 'react-icons/gi'

const Navbar = () => {
	const [showDropdown, toggleShowDropdown] = useState(false)
	const { user, signIn, signOut } = useAuth()
	const [user_, setUser] = useState<UserType | null>(null)
	const [session_, setSession] = useState<boolean>(false)
	const [isDark, setDark] = useState<boolean>(false)
	const [config, setConfig] = useState<boolean>(false)
	useEffect(() => {
		const token = localStorage.getItem('supabase.auth.token')
		if (user && token) {
			setUser(user)
			setSession(true)
		}
	}, [user])
	const { colorMode, toggleColorMode } = useColorMode()
	const toggleDropdown = () => toggleShowDropdown((state) => !state)

	useEffect(() => {
		const dark = localStorage.getItem('chakra-ui-color-mode') === 'dark'
		const isSession = !!localStorage.getItem('supabase.auth.token')
		setDark(dark)
		setSession(isSession)
	}, [])

	const toggle = () => {
		toggleColorMode()
		setDark(!isDark)
	}

	return (
		<Box className='flex justify-between items-center'>
			<Box className='flex items-center gap-3'>
				<GiWeightLiftingUp className='text-7xl text-blue-600' />{' '}
				<p className='text-2xl font-semibold'>LiftLog</p>
			</Box>
			<Box className='flex items-center gap-3'>
				<Button onClick={toggle}>
					{isDark ? (
						<FaMoon className='text-3xl rotate-180' />
					) : (
						<FaSun className='text-3xl' />
					)}
				</Button>
				<Box
					className='hover:cursor-pointer flex justify-center'
					onClick={user ? toggleDropdown : signIn}
				>
					{!user_ || !session_ ? (
						<Button variant='solid' colorScheme={'messenger'}>
							Sign In
						</Button>
					) : (
						<Image
							className='hover:scale-105 duration-150 shadow-md'
							src={user_?.imgUrl}
							rounded='100%'
							w={16}
						/>
					)}
					<Box className='absolute mt-20'>
						{showDropdown ? (
							<Dropdown
								toggleShowDropdown={toggleShowDropdown}
								setSession={setSession}
							/>
						) : (
							<></>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar
