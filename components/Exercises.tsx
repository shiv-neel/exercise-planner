import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ExerciseType } from '../utils/types'
import { CreateExercises } from './CreateExercises'

const Exercises: React.FC<CreateExercises> = ({
	routine,
	exercises,
	setExercises,
}: any) => {
	return (
		<Box>
			<p className='text-2xl font-bold my-4'>Exercises</p>
			{!exercises.length ? (
				<p className='my-4 italic opacity-50'>
					Add some exercises to {routine.toUpperCase()}!
				</p>
			) : null}
		</Box>
	)
}

export default Exercises
