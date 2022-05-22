import {
	Box,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import CreateExercises from '../components/CreateExercises'
import { ExerciseType } from '../utils/types'

const CreateNewRoutine = () => {
	const [page, setPage] = useState<number>(1)
	const [routine, setRoutine] = useState<string>('')
	const [exercises, setExercises] = useState<ExerciseType[]>([])

	const pageToRender: any = {
		1: <CreateRoutineName routine={routine} setRoutine={setRoutine} />,
		2: <CreateExercises />,
	}
	return (
		<Box className='flex flex-col'>
			<Link href='/'>
				<Button variant='ghost' w={24} mt={16} mb={8} className='gap-3'>
					<IoIosArrowBack /> Back
				</Button>
			</Link>
			<Heading as='h1' className='flex'>
				Create New Routine
			</Heading>
			<Divider className='my-8' />
			{pageToRender[page]}
			<Box className='flex'>
				<Button
					variant='ghost'
					disabled={page === 1}
					className='gap-1'
					onClick={() => setPage((p) => p - 1)}
				>
					<IoIosArrowBack /> Back
				</Button>
				<Button
					disabled={!routine.length}
					variant='ghost'
					className='gap-1'
					onClick={() => setPage((p) => p + 1)}
				>
					Next
					<IoIosArrowForward />
				</Button>
			</Box>
		</Box>
	)
}

const CreateRoutineName = ({ routine, setRoutine }: any) => {
	return (
		<Box className='w-1/2'>
			<FormControl isRequired>
				<Heading className='text-2xl font-bold mb-4'>Routine Name</Heading>
				<Input
					id='tname'
					placeholder='e.g. "Cardio"'
					className='mb-4'
					value={routine}
					onChange={(e: any) => setRoutine(e.target.value)}
				/>
			</FormControl>
		</Box>
	)
}

export default CreateNewRoutine
