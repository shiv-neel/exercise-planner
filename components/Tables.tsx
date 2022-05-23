import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { TableType } from '../utils/types'
import Table from './Table'
import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'

interface TablesProps {
	tables: TableType[] | null
}

const Tables: React.FC<TablesProps> = ({ tables }) => {
	return (
		<Box>
			<Heading as='h1' my={8}>
				My Workout Routines
			</Heading>
			<Link href='/createNewRoutine'>
				<Button className='gap-3 mb-4' colorScheme={'messenger'}>
					<FaPlus className='hover:rotate-180 duration-200' />
					Create New Routine
				</Button>
			</Link>
			{tables!.map((table, i) => (
				<Table key={i} table={table} />
			))}
		</Box>
	)
}

export default Tables
