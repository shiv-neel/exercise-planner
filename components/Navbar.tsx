import { Box, Button, Image } from '@chakra-ui/react'
import { supabase } from '../utils/auth'
import React, { useEffect, useState } from 'react'
import { useAuth, UserType } from '../utils/AuthContext'
import Dropdown from './Dropdown'

const Navbar = () => {
	const [showDropdown, toggleShowDropdown] = useState(false)
	const { user, signIn, signOut } = useAuth()
	const [user_, setUser] = useState<UserType | null>(null)
	useEffect(() => {
		setUser(user)
	}, [user])

	const toggleDropdown = () => toggleShowDropdown((state) => !state)

	return (
		<Box className='flex justify-between items-center'>
			<>Logo</>
			<Box
				className='hover:cursor-pointer flex justify-center'
				onClick={user ? toggleDropdown : signIn}
			>
				{!user ? (
					<Button>Sign In</Button>
				) : (
					<Image
						className='hover:scale-105 duration-150 shadow-md'
						src={user.imgUrl}
						rounded='100%'
						w={16}
					/>
				)}
				<Box className='absolute mt-20'>
					{showDropdown ? (
						<Dropdown toggleShowDropdown={toggleShowDropdown} />
					) : (
						<></>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar
