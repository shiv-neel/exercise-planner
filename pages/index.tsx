import { Box, Divider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import Dashboard from './dashboard'
import Welcome from './welcome'

const Home: NextPage = () => {
	const { user, signIn, signOut } = useAuth()
	return <Box>{user ? <Dashboard /> : <Welcome />}</Box>
}

export default Home
