import { Box } from '@chakra-ui/react'
import React from 'react'
import { AuthProvider } from '../utils/AuthContext'
import Navbar from './Navbar'

export interface Props {
	children: any
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<Box className='mx-60 my-20'>
			<AuthProvider>
				<Navbar />
				{children}
			</AuthProvider>
		</Box>
	)
}

export default Layout
