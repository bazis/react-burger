import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

export default function ModalOverlay(props) {

    const closeOnClickOverlay = (event) => {
        if (event.target === event.currentTarget) {
            props.onModalClose();
        }
    }

    return (
        <div 
            className = {styles.overlay}             
            onClick = {closeOnClickOverlay}>

          {props.children}
        </div>
      )

}

ModalOverlay.propTypes = {
    onModalClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired    
}

