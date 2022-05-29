import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ExerciseType } from '../utils/types'
import { CreateExercises } from './CreateExercises'
import ExerciseListItems from './ExerciseListItems'

const Exercises: React.FC<CreateExercises> = ({
	routine,
	exercises,
	setExercises,
}) => {
	return (
		<Box>
			<ExerciseListItems exercises={exercises} setExercises={setExercises} />
			{!exercises.length ? (
				<p className='mb-2 italic opacity-50'>
					Looks pretty lonely here. Add some exercises to{' '}
					{routine.toUpperCase()}!
				</p>
			) : null}
		</Box>
	)
}

export default Exercises
