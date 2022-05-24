import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoIosSend } from 'react-icons/io'
import CreateExercises from '../components/CreateExercises'
import { supabase } from '../utils/auth'
import { useAuth } from '../utils/AuthContext'
import { stringCasing } from '../utils/dates'
import { ExerciseType } from '../utils/types'

const CreateNewRoutine = () => {
	const [page, setPage] = useState<number>(1)
	const [routine, setRoutine] = useState<string>('')
	const [M, setM] = useState<boolean>(false)
	const [T, setT] = useState<boolean>(false)
	const [W, setW] = useState<boolean>(false)
	const [R, setR] = useState<boolean>(false)
	const [F, setF] = useState<boolean>(false)
	const [S, setS] = useState<boolean>(false)
	const [U, setU] = useState<boolean>(false)
	const whichDays = {
		M,
		T,
		W,
		R,
		F,
		S,
		U,
		setM,
		setT,
		setW,
		setR,
		setF,
		setS,
		setU,
	}
	const [exercises, setExercises] = useState<ExerciseType[]>([])
	const [tid, setTid] = useState<number | null>(null)

	const pageToRender: any = {
		1: (
			<CreateRoutineName
				routine={routine}
				setRoutine={setRoutine}
				whichDays={whichDays}
			/>
		),
		2: (
			<CreateExercises
				routine={routine}
				exercises={exercises}
				setExercises={setExercises}
			/>
		),
		3: (
			<ConfirmRoutine
				routine={routine}
				whichDays={whichDays}
				exercises={exercises}
			/>
		),
	}

	const uid = useAuth().user?.uid

	const createTable = async () => {
		if (!uid) return
		const days = [M, T, W, R, F, S, U]
		const { data, error } = await supabase.from('tables').insert([
			{
				uid: uid,
				tname: routine,
				days: days
					.map((d, i) => (days[i] ? i : null))
					.filter((d) => d !== null),
			},
		])
		setTid(data![0].tid)
		await createExercises(data![0].tid)
	}

	const createExercises = async (tid: number) => {
		const exercisesWithTid = exercises.map((e) => ({ ...e, tid: tid }))
		console.log(exercisesWithTid)
		const { data, error } = await supabase
			.from('exercises')
			.insert(exercisesWithTid)
		console.log(data)
	}
	return (
		<Box className='flex flex-col'>
			<Link href='/'>
				<Button variant='outline' w={24} mt={16} mb={8} className='gap-3'>
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
				{page < 3 ? (
					<Button
						disabled={!routine.length}
						className='gap-1'
						onClick={() => setPage((p) => p + 1)}
					>
						Next
						<IoIosArrowForward />
					</Button>
				) : (
					<Button
						className='gap-1'
						colorScheme={'messenger'}
						onClick={() => createTable()}
					>
						Submit <IoIosSend />
					</Button>
				)}
			</Box>
		</Box>
	)
}

const CreateRoutineName = ({ routine, setRoutine, whichDays }: any) => {
	const { M, T, W, R, F, S, U, setM, setT, setW, setR, setF, setS, setU } =
		whichDays
	return (
		<Box className='w-2/3'>
			<FormControl isRequired>
				<p className='text-2xl font-bold mb-4'>Routine Name</p>
				<Input
					id='tname'
					placeholder='e.g. "Cardio"'
					className='mb-8'
					value={routine}
					onChange={(e: any) => setRoutine(e.target.value)}
				/>
				<p className='text-2xl font-bold mb-4'>Frequency</p>
				<ButtonGroup className='flex mb-4'>
					<Button
						w={16}
						className='gap-2'
						variant={M ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setM((s: boolean) => !s)}
					>
						MON
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={T ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setT((s: boolean) => !s)}
					>
						TUE
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={W ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setW((s: boolean) => !s)}
					>
						WED
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={R ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setR((s: boolean) => !s)}
					>
						THU
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={F ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setF((s: boolean) => !s)}
					>
						FRI
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={S ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setS((s: boolean) => !s)}
					>
						SAT
					</Button>
					<Button
						w={16}
						className='gap-2'
						variant={U ? 'solid' : 'outline'}
						colorScheme={'messenger'}
						onClick={() => setU((s: boolean) => !s)}
					>
						SUN
					</Button>
				</ButtonGroup>
			</FormControl>
		</Box>
	)
}

interface ConfirmRoutine {
	routine: string
	whichDays: any
	exercises: ExerciseType[]
}
const ConfirmRoutine: React.FC<ConfirmRoutine> = ({
	routine,
	whichDays,
	exercises,
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
			<ExerciseListItems exercises={exercises} />
		</Box>
	)
}

interface ExerciseListItems {
	exercises: ExerciseType[]
}

export const ExerciseListItems: React.FC<ExerciseListItems> = ({
	exercises,
}) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isDark = colorMode === 'dark'
	return (
		<Box className='flex flex-wrap my-8 gap-8'>
			{exercises.map((exercise: ExerciseType, i: number) => (
				<Box
					backgroundColor={'grayalpha.100'}
					className='flex flex-col justify-center w-32 text-center h-32 rounded-xl shadow-lg border-2'
					key={i}
				>
					<p className='text-lg'>{stringCasing(exercise.ename)}</p>
					<p className='italic'>{`${exercise.sets} x ${exercise.reps}`}</p>
					<p className='text-xl font-bold'>@ {exercise.weight} lb</p>
				</Box>
			))}
		</Box>
	)
}

export default CreateNewRoutine
