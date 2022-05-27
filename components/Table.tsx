import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ExerciseListItems } from '../pages/createNewRoutine'
import { supabase } from '../utils/auth'
import { ExerciseType, TableType } from '../utils/types'

interface TableProps {
	table: TableType | null
}

const Table: React.FC<TableProps> = ({ table }) => {
	const [exercises, setExercises] = useState<ExerciseType[]>([])
	const tid = table!.tid
	const getExercises = async (): Promise<ExerciseType[] | void> => {
		if (!tid) return
		const { data, error } = await supabase
			.from('exercises')
			.select('tid, eid, ename, sets, reps, weight')
			.eq('tid', tid)
		console.log(data)
		if (data) setExercises(data)
		if (error) console.log(error)
	}

	useEffect(() => {
		console.log(tid)
		getExercises()
	}, [tid])
	return (
		<Box>
			<Heading as='h2' my={4} size='lg'>
				{table!.tname.toUpperCase()}
			</Heading>
			{exercises ? (
				<Box className='w-1/2'>
					<ExerciseListItems exercises={exercises} />
				</Box>
			) : (
				'b'
			)}
		</Box>
	)
}

export default Table
