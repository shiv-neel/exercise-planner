import { Box } from '@chakra-ui/react'
import { ExerciseType } from '../utils/types'
import ExerciseListItems from './ExerciseListItems'

interface ConfirmRoutineProps {
	routine: string
	whichDays: any
	exercises: ExerciseType[]
	setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
}
const ConfirmRoutine: React.FC<ConfirmRoutineProps> = ({
	routine,
	whichDays,
	exercises,
	setExercises,
}) => {
	const { M, T, W, R, F, S, U, setM, setT, setW, setR, setF, setS, setU } =
		whichDays
	const days = [M, T, W, R, F, S, U]
	return (
		<Box className='w-2/3 mb-8'>
			<p className='text-2xl font-bold mb-4'>Confirm Routine</p>
			<p className='text-xl font-bold mt-8 mb-4'>Routine Name</p>
			<p className='text-md'>{routine.toUpperCase()}</p>
			<p className='text-xl font-bold mt-8 mb-4'>Frequency</p>
			{[
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			]
				.map((day, i) => (i < 7 && days[i] ? `${day}, ` : ''))
				.join('')
				.slice(0, -2)}
			<p className='text-lg font-bold mt-8 mb-4'>Exercises</p>
			<ExerciseListItems exercises={exercises} setExercises={setExercises} />
		</Box>
	)
}

export default ConfirmRoutine
