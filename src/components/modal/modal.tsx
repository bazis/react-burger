import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModal {
	title?: string;
	onModalClose: () => void
}

export const Modal: FC<IModal> = ({title, children, onModalClose}) => {

	React.useEffect(() => {
		document.addEventListener("keydown", closeByEscape);	
		return () => {
		  document.removeEventListener("keydown", closeByEscape);
		}
	});

	const closeByEscape = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			onModalClose();
		}
	}
	
	return ReactDOM.createPortal (		
		<ModalOverlay onModalClose = {onModalClose}>
			<div className = {`${styles.window} pt-10 pr-10 pb-15 pl-10`}>
				<header className = {styles.title}>
					<p className = "text text_type_main-medium">
						{title}
					</p>   
					<div className = {styles.closeButton} onClick={onModalClose} data-testid="modal_close_button">
						<CloseIcon type="primary"/>    
					</div> 								       
				</header>
				{children}				
			</div>
		</ModalOverlay>,
		document.getElementById('react-modals') as  HTMLDivElement
	)   
}

export default Modal;
