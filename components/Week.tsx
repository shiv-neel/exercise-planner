import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { supabase } from '../utils/auth'
import { useAuth } from '../utils/AuthContext'
import { getDateGivenDay } from '../utils/dates'
import { TableType } from '../utils/types'
import DayTile from './DayTile'

interface WeekProps {
	tables: TableType[]
}

const Week: React.FC<WeekProps> = ({ tables }) => {
	const user = useAuth().user
	const DAYS = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]

	const date = getDateGivenDay('Monday')

	return (
		<Box>
			<Heading as='h1' mt={16} mb={8}>
				{/* Week of {('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getDate()} */}
				Weekly Plan
			</Heading>
			<Box className='flex'>
				{DAYS.map((day, i) => (
					<DayTile tables={tables} day={day} key={i} />
				))}
			</Box>
		</Box>
	)
}

export default Week
