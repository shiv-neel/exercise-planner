import { Box, Button, Image, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TableType } from '../utils/types'
import { FiEdit } from 'react-icons/fi'
import { getDateGivenDay } from '../utils/dates'

interface DayProps {
	day: string
	tables: TableType[]
}
const DayTile: React.FC<DayProps> = ({ day, tables }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isDark: boolean = colorMode === 'dark'
	const [plan, setPlan] = useState<string>('Rest')
	const shift: any = {
		Monday: 1,
		Tuesday: 2,
		Wednesday: 3,
		Thursday: 4,
		Friday: 5,
		Saturday: 6,
		Sunday: 0,
	}
	const table: TableType[] = tables.filter((table) =>
		table.days.find((d) => d === shift[day])
	)

	useEffect(() => {
		if (table.length > 0) {
			setPlan(table[0].tname)
		}
	})

	const cardStyles: any = {
		REST: '💤',
		PULL: '💪',
		PUSH: '🏋️‍♂️',
		LEGS: '🦵',
		CORE: '🏖️',
		CARDIO: '🏃‍♂️',
	}

	const date: Date = getDateGivenDay(day)
	const isToday: boolean = new Date().getDay() === shift[day]
	return (
		<Box
			backgroundColor={isToday ? (isDark ? 'gray.600' : 'gray.300') : ''}
			borderColor={isToday ? (isDark ? 'gray.600' : 'gray.300') : ''}
			shadow={new Date().getDay() === shift[day] ? 'lg' : 'sm'}
			className='flex flex-col flex-wrap my-5 mx-3 border-2 rounded-md'
			w={200}
		>
			<Box className='flex justify-center items-center gap-4'>
				<Box>
					<Box
						className={`${isToday ? 'font-bold' : ''} text-center text-gray-${
							isDark ? 400 : 500
						}`}
					>
						<Box className={`text-center mt-3 mb-1 text-md italic`}>{day}</Box>
						<Box className='text-sm italic'>
							{('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getDate()}
						</Box>
					</Box>
				</Box>
			</Box>

			<Box className='flex flex-col gap-2 items-center justify-center my-2'>
				<Box className='mx-auto text-2xl'>{cardStyles[plan.toUpperCase()]}</Box>
				<Box className='font-bold text-2xl'>{plan.toUpperCase()}</Box>
			</Box>
			<Button variant={'ghost'} size='xs' className='rounded-full py-3'>
				<FiEdit className='text-xs cursor-pointer' />
			</Button>
		</Box>
	)
}

export default DayTile
