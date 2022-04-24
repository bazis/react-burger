import React from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "../icon-button/icon-button.module.css";
import PropTypes from 'prop-types';

export default function IconButton(props) {
	return (			
		<Button type="secondary" size="medium">
			<span className = {styles.icon}>
				{props.children}									
			</span>	
			<span className = {`${styles.text} ml-2`}>
				{props.text}
			</span>
		</Button>			
	)
}

IconButton.propTypes = {		
	text: PropTypes.string.isRequired	
};
