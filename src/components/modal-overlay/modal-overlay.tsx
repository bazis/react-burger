import React, {FC, MouseEventHandler} from "react";
import styles from './modal-overlay.module.css'

interface IModalOverlay {	
	onModalClose: () => void
}


export const ModalOverlay: FC<IModalOverlay> = ({onModalClose, children}) =>{

    const closeOnClickOverlay: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target === event.currentTarget) {
            onModalClose();
        }
    }

    return (
        <div 
            className = {styles.overlay}             
            onClick = {closeOnClickOverlay}>

          {children}
        </div>
      )

}

export default ModalOverlay;

