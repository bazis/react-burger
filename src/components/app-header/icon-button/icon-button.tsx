import React, {FC} from 'react';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "../icon-button/icon-button.module.css";

type IconButtonProps = {
	text: string;
}

export const IconButton: FC<IconButtonProps> = ({text, children}) => {
	return (			
		<Button type="secondary" size="medium">
			<span className = {styles.icon}>
				{children}									
			</span>	
			<span className = {`${styles.text} text ml-2`}>
				{text}
			</span>
		</Button>			
	)
}

