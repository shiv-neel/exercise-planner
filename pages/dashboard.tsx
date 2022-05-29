import { Box, Divider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Tables from '../components/Tables'
import Week from '../components/Week'
import { supabase } from '../utils/auth'
import { useAuth, UserType } from '../utils/AuthContext'
import { TableType } from '../utils/types'

const Dashboard: NextPage = () => {
	const { user, signIn, signOut } = useAuth()
	const [tables, setTables] = useState<TableType[]>([])
	const [fullName, setFullName] = useState('')
	const getTables = async (user: UserType) => {
		const { data, error } = await supabase
			.from('tables')
			.select('*')
			.eq('uid', user.uid)
		setTables(data!)
	}
	useEffect(() => {
		const token = localStorage.getItem('supabase.auth.token')
		if (user && token) {
			setFullName(user.fullName)
			getTables(user)
		}
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
			<p className='text-4xl mt-16 font-bold'>
				Good {timeOfDay}, {fullName.split(' ')[0]}.
			</p>
			<Week tables={tables} />
			<Tables tables={tables} />
		</Box>
	)
}

export default Dashboard
