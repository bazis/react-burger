import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import doneImage from '../../images/done.png'


export default function OrderDetails(props) {

	return (
		<div className = {styles.windowBody}>
			{props.orderStatus === 'ok' ? (
				<>
					<div className = {`${styles.centerText} text_type_digits-large `}>
						{props.orderNumber}
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
				<h2>{props.orderStatus}</h2>
			)}				
		</div>   
	)
}


OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired,
	orderStatus: PropTypes.string.isRequired
}

