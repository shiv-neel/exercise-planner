import { Box, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { supabase } from '../utils/auth'
import { useAuth } from '../utils/AuthContext'
import { getDateGivenDay } from '../utils/utilFns'
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
		<Box className='mt-28'>
			<p className='mb-8 text-2xl font-semibold'>Your Weekly Plan</p>
			<Box className='flex'>
				{DAYS.map((day, i) => (
					<DayTile tables={tables} day={day} key={i} />
				))}
			</Box>
		</Box>
	)
}

export default Week
