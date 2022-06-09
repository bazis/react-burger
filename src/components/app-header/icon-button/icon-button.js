import React from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "../icon-button/icon-button.module.css";
import PropTypes from 'prop-types';

export default function IconButton({text, children}) {
	return (			
		<Button type="secondary" size="medium">
			<span className = {styles.icon}>
				{children}									
			</span>	
			<span className = {`${styles.text} text text_type_main-default ml-2`}>
				{text}
			</span>
		</Button>			
	)
}

IconButton.propTypes = {		
	text: PropTypes.string.isRequired	
};
