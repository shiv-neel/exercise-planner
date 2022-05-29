import { Box, Heading, Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { supabase } from '../utils/auth'
import { ExerciseType, TableType } from '../utils/types'
import { badgeColor } from '../utils/utilFns'
import ExerciseListItems from './ExerciseListItems'
import ConfirmDeleteTableModal from './ConfirmDeleteModal'

interface TableProps {
	table: TableType
}

const Table: React.FC<TableProps> = ({ table }) => {
	const [exercises, setExercises] = useState<ExerciseType[]>([])
	const tid = table!.tid
	const { isOpen, onOpen, onClose } = useDisclosure()

	const getExercises = async (): Promise<ExerciseType[] | void> => {
		if (!tid) return
		const { data, error } = await supabase
			.from('exercises')
			.select('tid, eid, ename, sets, reps, weight, muscles')
			.eq('tid', tid)
		if (data) setExercises(data)
		if (error) console.log(error)
	}

	useEffect(() => {
		console.log(tid)
		getExercises()
	}, [tid])

	const deleteTable = async (): Promise<void> => {
		if (!tid) return
		await deleteExercises()
		const { data, error } = await supabase
			.from('tables')
			.delete()
			.match({ tid: tid })
		if (error) console.log(error)
		onClose()
	}

	const deleteExercises = async (): Promise<void> => {
		const { data, error } = await supabase
			.from('exercises')
			.delete()
			.match({ tid: tid })
	}
	return (
		<Box>
			<Heading as='h2' my={4} size='lg' className='flex gap-3 items-center'>
				{table!.tname.toUpperCase()}
				<Button colorScheme='messenger' rounded='full' shadow={'md'}>
					<FiEdit className='text-xl cursor-pointer' />
				</Button>
				<Button
					variant='outline'
					colorScheme='red'
					rounded='full'
					shadow={'md'}
					onClick={onOpen}
				>
					<IoTrashOutline className='text-xl cursor-pointer' />
				</Button>
				<ConfirmDeleteTableModal
					isOpen={isOpen}
					onClose={onClose}
					name={table.tname}
					deleteItem={deleteTable}
				/>
			</Heading>
			{exercises ? (
				<Box className=''>
					<ExerciseListItems
						exercises={exercises}
						setExercises={setExercises}
					/>
				</Box>
			) : (
				'b'
			)}
		</Box>
	)
}

export default Table
