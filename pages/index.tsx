import { Box, Divider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Tables from '../components/Tables'
import Week from '../components/Week'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/auth'
import { useAuth, UserType } from '../utils/AuthContext'
import { TableType } from '../utils/types'

const Home: NextPage = () => {
	const { user, signIn, signOut } = useAuth()
	const [tables, setTables] = useState<TableType[]>([])
	const getTables = async (user: UserType) => {
		const { data, error } = await supabase
			.from('tables')
			.select('*')
			.eq('uid', user.uid)
		setTables(data!)
	}
	useEffect(() => {
		if (user) getTables(user)
	}, [user])

	const [timeOfDay, setTimeOfDay] = useState('')
	const hour = new Date().getHours()
	useEffect(() => {
		if (hour < 12) setTimeOfDay('Morning')
		else if (hour >= 12 && hour < 17) setTimeOfDay('Afternoon')
		else setTimeOfDay('Evening')
	}, [hour])

	return (
		<Box>
			<p className='text-5xl mt-16 font-bold'>
				Good {timeOfDay}, {user!.fullName.split(' ')[0]}.
			</p>
			<Week tables={tables} />
			<Divider my={4} />
			<Tables tables={tables} />
		</Box>
	)
}

export default Home
