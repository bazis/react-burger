import React from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "../icon-button/icon-button.module.css";

class IconButton extends React.Component {
	render() {
		return (			
			<Button type="secondary" size="medium">
				<span className = {styles.icon}>
					{this.props.children}									
				</span>	
				<span className = {`${styles.text} ml-2`}>
					{this.props.text}
				</span>
			</Button>			
		)
	}
}

export default IconButton;