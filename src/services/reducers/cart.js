import {
	ADD_INGREDIENT, 
	DELETE_INGREDIENT, 
	PLACE_ORDER_REQUEST,
	PLACE_ORDER_REQUEST_SUCCESS,
	PLACE_ORDER_REQUEST_FAILED,
	MOVE_CART_INGREDIENT
} from '../actions/cart';

const initialState = {
	cartIngredients: [],
	orderRequestInProgress: false,
	orderRequestFailed: false
};

//при добавлении булки в ингридиенты, ставим её в начало массива, чтобы не мешала переставлять элементы при dnd
const moveBunToFirstPlace = (cartIngredients) => {
	const foundBunIndex = cartIngredients.findIndex(item => item.type === 'bun');
	if(foundBunIndex !== -1 && cartIngredients.length > 1) {
		const foundBun = cartIngredients.find(item => item.type === 'bun');
		cartIngredients.splice(foundBunIndex, 1);
		cartIngredients.unshift(foundBun);
	}	
	return cartIngredients;
}

export const cartReducer = (store = initialState, action) => {
	switch (action.type) {            
		case ADD_INGREDIENT:
			return {
				...store,
				cartIngredients: (action.payload.type === 'bun') ? 
				moveBunToFirstPlace([...
						[...store.cartIngredients.filter(item => item.type !== 'bun'),  //заменяем булку
						action.payload]
					]) : 
					[...store.cartIngredients, action.payload]
			} 
		case DELETE_INGREDIENT:      
			return {
				...store,
				cartIngredients: [...store.cartIngredients].filter(item => item.uuid !== action.payload.uuid)        
			} 
		case PLACE_ORDER_REQUEST: {
			return {
				...store,
				// Запрос начал выполняться
				orderRequestInProgress: true,
				// Сбрасываем статус наличия ошибок от предыдущего запроса 
				// на случай, если он был и завершился с ошибкой
				orderRequestFailed: false,
				order: {number: 0, textStatus: 'Оформление...'}
			}
		}	
		case PLACE_ORDER_REQUEST_SUCCESS: {			
			return { 
				...store, 
				// Запрос выполнился успешно, помещаем полученные данные в хранилище
				order: {...action.payload, textStatus: ''}, 
				// Запрос закончил своё выполнение
				orderRequestInProgress: false,
				cartIngredients: []
			};
		}
		case PLACE_ORDER_REQUEST_FAILED: {
			return {
				...store,
				// Запрос начал выполняться
				orderRequestInProgress: false,
				// Сбрасываем статус наличия ошибок от предыдущего запроса 
				// на случай, если он был и завершился с ошибкой
				orderRequestFailed: true,
				order: {number: 0, textStatus: 'Произошла ошибка'}
			}
		}
		case MOVE_CART_INGREDIENT: {
			const swapItems = (arr, index1, index2) => arr.map((val, idx) => {
				if (idx === index1) return arr[index2];
				if (idx === index2) return arr[index1];
				return val;
			});

			//если есть булка, которая не участвует в перетаскивании, индексы надо пересчитать.
			if(store.cartIngredients.findIndex(item => item.type === 'bun') !== -1) {
				action.payload.dragIndex++;
				action.payload.hoverIndex++;
			}
			
			//console.log('swapItems', action.payload.dragIndex, action.payload.hoverIndex);
			return {
				...store,
				cartIngredients: swapItems(store.cartIngredients, action.payload.dragIndex, action.payload.hoverIndex)
			}	
		}	

		default:
			return store
 	}
} 