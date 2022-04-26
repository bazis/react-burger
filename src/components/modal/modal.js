import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';



export default function Modal(props) {

	React.useEffect(() => {
		document.addEventListener("keydown", closeByEscape);	
		return () => {
		  document.removeEventListener("keydown", closeByEscape);
		}
	});

	const closeByEscape = (event) => {
        if (event.key === "Escape") {
            props.onModalClose();
        }
    }


	return ReactDOM.createPortal (
		props.visible &&
		<ModalOverlay onModalClose = {props.onModalClose}>
			<div className = {`${styles.window} pt-10 pr-10 pb-15 pl-10`}>
				<header className = {styles.title}>
					<p className = "text text_type_main-medium">
						{props.title}
					</p>   
					<div className = {styles.closeButton} onClick={props.onModalClose}>
						<CloseIcon type="primary"/>    
					</div> 								       
				</header>
				{props.children}				
			</div>
		</ModalOverlay>,
		document.getElementById('react-modals')
	)   
}

Modal.propTypes = {
	onModalClose:  PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	title: PropTypes.string,
	children: PropTypes.node.isRequired  
}