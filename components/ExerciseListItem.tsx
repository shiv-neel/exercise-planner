import { Badge, Button, Td, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiPencil } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { IoTrashOutline } from 'react-icons/io5'
import { ExerciseType } from '../utils/types'
import { badgeColor } from '../utils/utilFns'
import ConfirmDeleteModal from './ConfirmDeleteModal'

interface ExerciseListItemType {
	exercise: ExerciseType
	setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
}

const ExerciseListItem: React.FC<ExerciseListItemType> = ({
	exercise,
	setExercises,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const deleteExercise = () => {
		setExercises((e) => e.filter((e) => e.eid !== exercise.eid))
	}

	return (
		<Tr>
			<Td w={12}>
				<Button
					variant='outline'
					colorScheme='red'
					rounded='full'
					shadow={'md'}
					onClick={onOpen}
					className='-mr-8'
				>
					<IoTrashOutline className='text-xl cursor-pointer' />
				</Button>
				<ConfirmDeleteModal
					name={exercise.ename}
					isOpen={isOpen}
					onClose={onClose}
					deleteItem={deleteExercise}
				/>
			</Td>
			<Td w={48}>{exercise.ename}</Td>
			<Td w={28} isNumeric>
				{exercise.sets}
			</Td>
			<Td w={28} isNumeric>
				{exercise.reps}
			</Td>
			<Td w={28} isNumeric>
				{exercise.weight}
			</Td>
			<Td w={80}>
				{exercise.muscles.map((m, i) => (
					<Badge
						key={i}
						className='mr-4 shadow-md'
						colorScheme={badgeColor(m)}
						rounded='full'
						px={2}
						py={1}
					>
						{m}
					</Badge>
				))}
			</Td>
		</Tr>
	)
}

export default ExerciseListItem
