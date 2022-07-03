import {FC} from 'react';
import styles from './order-details.module.css';
import doneImage from '../../images/done.png'

interface IOrderDetails {
	orderNumber: number;
	orderStatus: string;
}

export const OrderDetails: FC<IOrderDetails> = ({orderNumber, orderStatus}) => {

	return (
		<div className = {styles.windowBody}>
			{orderNumber !== 0 ? (
				<>
					<div className = {`${styles.centerText} text_type_digits-large `}>
						{orderNumber}
					</div>    
					<p className = {`${styles.centerText} mt-8 text text_type_main-medium `}>
						идентификатор заказа
					</p>						
					<div className = {styles.centerText}>
						<img className = {`${styles.doneImage} mt-15`} src = {doneImage} alt = "OK"/>
					</div>			
					<p className = {`${styles.centerText} mt-15 text text_type_main-small `}>
						Ваш заказ начали готовить
					</p>
					<p className = {`${styles.centerText} mt-2 mb-20 text text_type_main-small text_color_inactive `}>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			) : (
				<h2>{orderStatus}</h2>
			)}				
		</div>   
	)
}

export default OrderDetails;

