import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { TableType } from '../utils/types'

interface TableProps {
	table: TableType
}

const Table: React.FC<TableProps> = ({ table }) => {
	return (
		<Box>
			<Heading as='h2' my={4} size='lg'>
				{table.tname}
			</Heading>
		</Box>
	)
}

export default Table
