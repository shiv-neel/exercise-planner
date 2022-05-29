import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from '@chakra-ui/react'
import React from 'react'

interface ConfirmDeleteModalProps {
	name: string
	isOpen: boolean
	onClose: () => void
	deleteItem: () => void
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
	name,
	isOpen,
	onClose,
	deleteItem,
}) => {
	return (
		<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete {name}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<p>
						Are you sure you want to delete <strong>{name}</strong>?
					</p>
				</ModalBody>

				<ModalFooter className='gap-5 mx-auto justify-between'>
					<Button colorScheme={'red'} onClick={deleteItem}>
						Yes, Delete It
					</Button>
					<Button variant={'outline'} mr={3} onClick={onClose}>
						Never Mind
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ConfirmDeleteModal
