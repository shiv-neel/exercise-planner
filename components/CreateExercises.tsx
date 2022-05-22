import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const CreateExercises = () => {
	return (
		<Box className='w-1/2'>
			<p className='text-2xl font-bold mb-4'>Add Exercises to Routine</p>
			<Button className='gap-3 my-4'>
				<FaPlus />
				Create Exercise
			</Button>
		</Box>
	)
}

export default CreateExercises
