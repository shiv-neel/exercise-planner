import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { TableType } from '../utils/types'

interface TableProps {
	table: TableType | null
}

const Table: React.FC<TableProps> = ({ table }) => {
	return (
		<Box>
			<Heading as='h2' my={4} size='lg'>
				{table!.tname.toUpperCase()}
			</Heading>
			{table!.days ? (
				<Box className='w-1/2'>{table!.days.toString()}</Box>
			) : null}
		</Box>
	)
}

export default Table
