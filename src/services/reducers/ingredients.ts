import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_REQUEST_SUCCESS,
	GET_INGREDIENTS_REQUEST_FAILED
} from '../actions/ingredients';

const initialState = {
	ingredientsRequestInProgress: false,
	ingredientsRequestFailed: false,
	ingredientsAll: []
}

export const ingredientsReducer = (store = initialState, action: any) => {
  	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...store,
				// Запрос начал выполняться
				ingredientsRequestInProgress: true,
				// Сбрасываем статус наличия ошибок от предыдущего запроса 
				// на случай, если он был и завершился с ошибкой
				ingredientsRequestFailed: false,
			};
		}
		case GET_INGREDIENTS_REQUEST_SUCCESS: {			
			return { 
				...store, 
				// Запрос выполнился успешно, помещаем полученные данные в хранилище
				ingredientsAll: action.payload, 
				// Запрос закончил своё выполнение
				ingredientsRequestInProgress: false 
			};
		}
		case GET_INGREDIENTS_REQUEST_FAILED: {
		return { 
				...store, 
				// Запрос выполнился с ошибкой, 
				// выставляем соответсвующие значения в хранилище
				ingredientsRequestFailed: true, 
				// Запрос закончил своё выполнение
				ingredientsRequestInProgress: false 
			};
		}		
		default: {
			return store;
		}
	}
}