import styles from './ingredients-details.module.css';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router';
import { TIngredient } from '../../types';

export default function IngredientDetails() {

	const ingredientsAll = useSelector((store) => store.ingredients.ingredientsAll) || [];   
	const { id }: {id: string}  = useParams();

	const ingredientObj = ingredientsAll.find((item: TIngredient )  => item._id === id);

	return (
		ingredientObj ? (
			<div className = {styles.windowBody}>
				<img src={ingredientObj.image_large} alt={ingredientObj.name}/>             
				<div className = "mt-4 text text_type_main-default">
					{ingredientObj.name}
				</div>
				<ul className = {`${styles.calories} mt-8`}>
					<li className = {styles.caloriesItem}>
						<div className = "text text_type_main-small text_color_inactive">
							Калории, калл
						</div>       
						<div className = "text text_type_digits-default text_color_inactive">
							{ingredientObj.calories}
						</div>                                  
					</li>
					<li className = {styles.caloriesItem}>
						<div className = "text text_type_main-small text_color_inactive">
							Белки, г
						</div>       
						<div className = "text text_type_digits-default text_color_inactive">
							{ingredientObj.proteins}
						</div>                                  
					</li>
					<li className = {styles.caloriesItem}>
						<div className = "text text_type_main-small text_color_inactive">
							Жиры, г
						</div>       
						<div className = "text text_type_digits-default text_color_inactive">
							{ingredientObj.fat}
						</div>                                  
					</li>
					<li className = {styles.caloriesItem}>
						<div className = "text text_type_main-small text_color_inactive">
							Углеводы, г
						</div>       
						<div className = "text text_type_digits-default text_color_inactive">
							{ingredientObj.carbohydrates}
						</div>                                  
					</li>
				</ul>			
			</div> 
		) : (
			<h1 className='text text_type_main-large'> Загрузка...</h1>
		)
	);
}



