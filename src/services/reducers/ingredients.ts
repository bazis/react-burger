import {
	TIngredientsActions,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_REQUEST_SUCCESS,
	GET_INGREDIENTS_REQUEST_FAILED
} from '../actions/ingredients';
import { TIngredient } from '../../types';

type TConstructorStateIngr = {
	ingredientsRequestInProgress: boolean,
	ingredientsRequestFailed: boolean,
	ingredientsAll: TIngredient[]
}

export const initialState: TConstructorStateIngr = {
	ingredientsRequestInProgress: false,
	ingredientsRequestFailed: false,
	ingredientsAll: []
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TConstructorStateIngr => {
  	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				// Запрос начал выполняться
				ingredientsRequestInProgress: true,
				// Сбрасываем статус наличия ошибок от предыдущего запроса 
				// на случай, если он был и завершился с ошибкой
				ingredientsRequestFailed: false,
			};
		}
		case GET_INGREDIENTS_REQUEST_SUCCESS: {			
			return { 
				...state, 
				// Запрос выполнился успешно, помещаем полученные данные в хранилище
				ingredientsAll: action.payload, 
				// Запрос закончил своё выполнение
				ingredientsRequestInProgress: false 
			};
		}
		case GET_INGREDIENTS_REQUEST_FAILED: {
		return { 
				...state, 
				// Запрос выполнился с ошибкой, 
				// выставляем соответсвующие значения в хранилище
				ingredientsRequestFailed: true, 
				// Запрос закончил своё выполнение
				ingredientsRequestInProgress: false 
			};
		}		
		default: {
			return state;
		}
	}
}