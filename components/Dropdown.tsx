import { Box, Button, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { AiFillCloseCircle } from 'react-icons/ai'

interface DropdownProps {
	toggleShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const Dropdown: React.FC<DropdownProps> = ({ toggleShowDropdown }) => {
	const { user, signIn, signOut } = useAuth()
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<VStack
			className='flex p-2 shadow-md rounded-md'
			backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}
		>
			<AiFillCloseCircle
				onClick={() => toggleShowDropdown(true)}
				className='flex justify-start mr-auto text-red-500 hover:text-red-700 hover:rotate-180 duration-200 text-2xl -mb-2'
			/>
			<Box className='p-3'>
				<Box className='mb-4 text-xl font-bold'>{user!.fullName}</Box>
				<Box className='flex flex-col text-center gap-3'>
					<Box
						className='text-sm hover:text-blue-500 hover:font-bold duration-100'
						onClick={toggleColorMode}
					>
						Switch to {colorMode === 'dark' ? 'Light' : 'Dark'} Theme
					</Box>
					<Box
						className='text-sm hover:text-red-500 hover:font-bold duration-100'
						onClick={signOut}
					>
						Sign Out
					</Box>
				</Box>
			</Box>
		</VStack>
	)
}

export default Dropdown
