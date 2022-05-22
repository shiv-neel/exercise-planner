import React, { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'

interface RowProps {
	row: any
	index: number
	moveRow: any
}

const Row: React.FC<RowProps> = ({ row, index, moveRow }) => {
	const dropRef = useRef(null)
	const dragRef = useRef(null)

	const [_, drop] = useDrop({
		accept: 'row',
		hover(item: any, monitor: DropTargetMonitor) {
			if (!dropRef.current) return
			const dragIndex = item.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) return
			moveRow(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	return <></>
}

export default Row
