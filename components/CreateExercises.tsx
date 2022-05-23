import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	FormControl,
	Heading,
	Input,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
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
		<Box className='w-1/2'>
			<p className='text-2xl font-bold mb-4'>{routine?.toUpperCase()}</p>

			<Button
				className='gap-3 my-4'
				disabled={form}
				onClick={() => showForm(true)}
				colorScheme={'messenger'}
			>
				<FaPlus />
				Create New Exercise
			</Button>
			{form ? (
				<NewExerciseForm
					form={form}
					showForm={showForm}
					exercises={exercises}
					setExercises={setExercises}
				/>
			) : null}
			<Exercises
				routine={routine}
				exercises={exercises}
				setExercises={setExercises}
			/>
		</Box>
	)
}

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
	const [ename, setEname] = useState<string>('')
	const [sets, setSets] = useState<number>(0)
	const [reps, setReps] = useState<number>(0)
	const [weight, setWeight] = useState<number>(0)
	const [muscles, setMuscles] = useState<string[]>([])
	const [error, setError] = useState<boolean>(false)
	const [setsSliderValue, setSetsSliderValue] = useState(0)
	const [setsTooltip, setSetsShowTooltip] = useState(false)
	const [repsSliderValue, setRepsSliderValue] = useState(0)
	const [repsTooltip, setRepsShowTooltip] = useState(false)

	const handleBtnClick = (m: string) => {
		if (muscles.find((x) => x === m)) setMuscles(muscles.filter((x) => x !== m))
		else setMuscles([...muscles, m])
	}

	const submitForm = async () => {
		if (ename.length === 0 && muscles.length === 0) {
			setError(true)
			return
		}
		//setExercises(exercises.concat({ ename: ename, muscles: muscles }))
		setEname('')
		setMuscles([])
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
						onChange={(e: number) => setSetsSliderValue(e)}
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
					<p className='text-xl font-bold mt-8 mb-4'>Number of Reps</p>
					<Slider
						defaultValue={0}
						min={0}
						max={20}
						step={1}
						onChange={(e: number) => setRepsSliderValue(e)}
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
			</FormControl>{' '}
			<Button type='submit' className='gap-3 my-8' colorScheme={'messenger'}>
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
