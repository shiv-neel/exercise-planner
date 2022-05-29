import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	FormControl,
	Heading,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa'
import { ExerciseType } from '../utils/types'
import Exercises from './Exercises'
import allMuscles from '../utils/muscleGroups'
import { supabase } from '../utils/auth'

export interface CreateExercises {
	routine: string
	exercises: ExerciseType[]
	setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
}

const CreateExercises: React.FC<CreateExercises> = ({
	routine,
	exercises,
	setExercises,
}) => {
	const [form, showForm] = useState<boolean>(false)
	return (
		<Box className=''>
			<p className='text-2xl font-bold mb-4'>{routine?.toUpperCase()}</p>
			<Exercises
				routine={routine}
				exercises={exercises}
				setExercises={setExercises}
			/>
			<Button
				className='gap-3 my-4'
				onClick={() => showForm((f) => !f)}
				colorScheme={'messenger'}
				variant={form ? 'outline' : 'solid'}
			>
				{form ? (
					<>
						<FaMinus />
						Close
					</>
				) : (
					<>
						<FaPlus />
						Create New Exercise
					</>
				)}
			</Button>
			{form ? (
				<NewExerciseForm
					form={form}
					showForm={showForm}
					exercises={exercises}
					setExercises={setExercises}
				/>
			) : null}
		</Box>
	)
}

/*
*
*
*
NewExerciseForm
*
*
*
*/

interface ExerciseFormProps {
	form: boolean
	showForm: React.Dispatch<React.SetStateAction<boolean>>
	exercises: ExerciseType[]
	setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
}

const NewExerciseForm: React.FC<ExerciseFormProps> = ({
	form,
	showForm,
	exercises,
	setExercises,
}) => {
	const [tempEid, setTempEid] = useState<number>(0)
	const [ename, setEname] = useState<string>('')
	const [sets, setSets] = useState<number>(0)
	const [reps, setReps] = useState<number>(0)
	const [weight, setWeight] = useState<number>(0)
	const [muscles, setMuscles] = useState<string[]>([])
	const [error, setError] = useState<boolean>(false)

	const handleBtnClick = (m: string) => {
		if (muscles.find((x) => x === m)) setMuscles(muscles.filter((x) => x !== m))
		else setMuscles([...muscles, m])
	}

	const addExercise = () => {
		const eid = tempEid
		console.log(ename, sets, reps, weight, muscles)
		if (
			ename === '' ||
			sets === 0 ||
			reps === 0 ||
			weight === 0 ||
			muscles.length === 0
		) {
			setError(true)
			return
		}
		setError(false)
		setTempEid(Math.random())
		setEname('')
		setSets(0)
		setReps(0)
		setWeight(0)
		setMuscles([])
		showForm(false)
		setExercises([...exercises, { eid, ename, sets, reps, weight, muscles }])
	}
	return (
		<Box>
			<FormControl isRequired>
				<p className='text-xl font-bold mb-4'>Exercise Name</p>
				<Input
					id='ename'
					placeholder='e.g. "Barbell Rows"'
					className='mb-8'
					value={ename}
					onChange={(e: any) => setEname(e.target.value)}
				/>
				<p className='text-xl font-bold mb-4'>Muscles Targeted</p>
				<Divider mt={2} />
				<Box>
					<p className='text-md mt-6 mb-4'>BACK</p>
					<ButtonGroup className='gap-2 flex justify-start'>
						{allMuscles.BACK.map((m: string, i: number) => (
							<Button
								key={i}
								onClick={() => handleBtnClick(m)}
								colorScheme={'messenger'}
								variant={muscles.find((x) => x === m) ? 'solid' : 'ghost'}
							>
								{m}
							</Button>
						))}
					</ButtonGroup>
					<Divider mt={2} />
					<p className='text-md mt-6 mb-4'>CHEST</p>
					<ButtonGroup className='gap-2 flex justify-start'>
						{allMuscles.CHEST.map((m: string, i: number) => (
							<Button
								key={i}
								onClick={() => handleBtnClick(m)}
								colorScheme={'messenger'}
								variant={muscles.find((x) => x === m) ? 'solid' : 'ghost'}
							>
								{m}
							</Button>
						))}
					</ButtonGroup>{' '}
					<Divider mt={2} />
					<p className='text-md mt-6 mb-4'>ARMS</p>
					<ButtonGroup className='gap-2 flex justify-start'>
						{allMuscles.ARMS.map((m: string, i: number) => (
							<Button
								key={i}
								onClick={() => handleBtnClick(m)}
								colorScheme={'messenger'}
								variant={muscles.find((x) => x === m) ? 'solid' : 'ghost'}
							>
								{m}
							</Button>
						))}
					</ButtonGroup>{' '}
					<Divider mt={2} />
					<p className='text-md mt-6 mb-4'>SHOULDERS</p>
					<ButtonGroup className='gap-2 flex justify-start'>
						{allMuscles.SHOULDERS.map((m: string, i: number) => (
							<Button
								key={i}
								onClick={() => handleBtnClick(m)}
								colorScheme={'messenger'}
								variant={muscles.find((x) => x === m) ? 'solid' : 'ghost'}
							>
								{m}
							</Button>
						))}
					</ButtonGroup>{' '}
					<Divider mt={2} />
					<p className='text-md mt-6 mb-4'>LEGS</p>
					<ButtonGroup className='gap-2 flex justify-start'>
						{allMuscles.LEGS.map((m: string, i: number) => (
							<Button
								key={i}
								onClick={() => handleBtnClick(m)}
								colorScheme={'messenger'}
								variant={muscles.find((x) => x === m) ? 'solid' : 'ghost'}
							>
								{m}
							</Button>
						))}
					</ButtonGroup>{' '}
					<Divider mt={2} />
				</Box>
				<Box className='my-8'>
					<p className='text-xl font-bold mt-8 mb-4'>Number of Sets</p>
					<Slider
						defaultValue={0}
						min={0}
						max={10}
						step={1}
						onChange={(e: number) => setSets(e)}
					>
						<SliderTrack>
							<Box position='relative' right={10} />
							<SliderFilledTrack bg='messenger.500' />
						</SliderTrack>
						<SliderMark className='mt-4 -ml-1' value={0}>
							0
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={1}>
							1
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={2}>
							2
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={3}>
							3
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={4}>
							4
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={5}>
							5
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={6}>
							6
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={7}>
							7
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={8}>
							8
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={9}>
							9
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={10}>
							10
						</SliderMark>
						<SliderThumb boxSize={6} bg='messenger.500' />
					</Slider>
					<p className='text-xl font-bold mt-12 mb-4'>Number of Reps</p>
					<Slider
						defaultValue={0}
						min={0}
						max={20}
						step={1}
						onChange={(e: number) => setReps(e)}
					>
						<SliderTrack>
							<Box position='relative' right={10} />
							<SliderFilledTrack bg='messenger.500' />
						</SliderTrack>
						<SliderMark className='mt-4 -ml-1' value={0}>
							0
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={2}>
							2
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={4}>
							4
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={6}>
							6
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={8}>
							8
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={10}>
							10
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={12}>
							12
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={14}>
							14
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={16}>
							16
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={18}>
							18
						</SliderMark>
						<SliderMark className='mt-4 -ml-1' value={20}>
							20
						</SliderMark>
						<SliderThumb boxSize={6} bg='messenger.500' />
					</Slider>
				</Box>
				<p className='text-xl font-bold mt-12 mb-4'>Weight per Rep</p>
				<Box className='flex items-center gap-2 my-4'>
					<NumberInput
						size='md'
						maxW={24}
						min={5}
						onChange={(e: string) => setWeight(Number(e))}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<p>lb</p>
				</Box>
			</FormControl>
			<Button
				type='submit'
				className='gap-3 my-8'
				colorScheme={'messenger'}
				onClick={addExercise}
			>
				<FaCheck />
				Looks Good to Me!
			</Button>
			{error ? (
				<p className='text-red-500'>
					One or more fields are empty. Please fill in all fields before
					submitting.
				</p>
			) : (
				''
			)}
		</Box>
	)
}

export default CreateExercises
