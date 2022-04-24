import styles from './ingredients-details.module.css';
import PropTypes from 'prop-types';
import {ingredient} from "../../types/index";

export default function IngredientDetails(props) {

	return (
		<div className = {styles.windowBody}>
			<img src={props.image_large} alt={props.name}/>             
			<div className = "mt-4 text text_type_main-default">
                {props.name}
			</div>
            <ul className = {`${styles.calories} mt-8`}>
                <li className = {styles.caloriesItem}>
                    <div className = "text text_type_main-small text_color_inactive">
                        Калории, калл
                    </div>       
                    <div className = "text text_type_digits-default text_color_inactive">
                        {props.calories}
                    </div>                                  
                </li>
                <li className = {styles.caloriesItem}>
                    <div className = "text text_type_main-small text_color_inactive">
                        Белки, г
                    </div>       
                    <div className = "text text_type_digits-default text_color_inactive">
                        {props.proteins}
                    </div>                                  
                </li>
                <li className = {styles.caloriesItem}>
                    <div className = "text text_type_main-small text_color_inactive">
                        Жиры, г
                    </div>       
                    <div className = "text text_type_digits-default text_color_inactive">
                        {props.fat}
                    </div>                                  
                </li>
                <li className = {styles.caloriesItem}>
                    <div className = "text text_type_main-small text_color_inactive">
                        Углеводы, г
                    </div>       
                    <div className = "text text_type_digits-default text_color_inactive">
                        {props.carbohydrates}
                    </div>                                  
                </li>
            </ul>			
		</div>   
	)
}

IngredientDetails.propTypes = {
	props: ingredient
}


