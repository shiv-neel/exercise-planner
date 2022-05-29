import {
	Badge,
	Box,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorMode,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { ExerciseType, TableType } from '../utils/types'
import { badgeColor } from '../utils/utilFns'
import ExerciseListItem from './ExerciseListItem'

interface ExerciseListItemsType {
	exercises: ExerciseType[]
	setExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>
	table?: TableType | null
}

const ExerciseListItems: React.FC<ExerciseListItemsType> = ({
	setExercises,
	exercises,
	table,
}) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isDark = colorMode === 'dark'
	return (
		<Box className='grid grid-flow-col my-8'>
			<TableContainer>
				<Table variant='simple'>
					<TableCaption>{table?.days}</TableCaption>
					<Thead>
						<Tr>
							<Th></Th>
							<Th>Name</Th>
							<Th isNumeric>Sets</Th>
							<Th isNumeric>Reps</Th>
							<Th isNumeric>Weight (lb)</Th>
							<Th>Muscles Worked</Th>
						</Tr>
					</Thead>
					<Tbody>
						{exercises.map((e, eid) => (
							<ExerciseListItem
								exercise={e}
								key={eid}
								setExercises={setExercises}
							/>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default ExerciseListItems
