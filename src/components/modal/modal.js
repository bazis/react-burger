import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';


export default function Modal({title, children}) {

	const history = useHistory();

	React.useEffect(() => {
		document.addEventListener("keydown", closeByEscape);	
		return () => {
		  document.removeEventListener("keydown", closeByEscape);
		}
	});

	const closeByEscape = (event) => {
        if (event.key === "Escape") {
            onModalClose();
        }
    }

	const onModalClose = (e) => {
		history.goBack();
	};	


	return ReactDOM.createPortal (		
		<ModalOverlay onModalClose = {onModalClose}>
			<div className = {`${styles.window} pt-10 pr-10 pb-15 pl-10`}>
				<header className = {styles.title}>
					<p className = "text text_type_main-medium">
						{title}
					</p>   
					<div className = {styles.closeButton} onClick={onModalClose}>
						<CloseIcon type="primary"/>    
					</div> 								       
				</header>
				{children}				
			</div>
		</ModalOverlay>,
		document.getElementById('react-modals')
	)   
}

Modal.propTypes = {	
	title: PropTypes.string,
	children: PropTypes.node.isRequired  
}