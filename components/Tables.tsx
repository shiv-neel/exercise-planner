import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { TableType } from '../utils/types'
import Table from './Table'
import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'

interface TablesProps {
	tables: TableType[] | null
}

const Tables: React.FC<TablesProps> = ({ tables }) => {
	useEffect(() => {}, [tables])
	return (
		<Box className='mt-16'>
			<p className='mb-4 text-2xl font-semibold'>Your Workout Routines</p>
			<Link href='/createNewRoutine'>
				<Button className='gap-3 my-8' colorScheme={'messenger'}>
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
