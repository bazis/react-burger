import { v4 as uuidv4 } from 'uuid';
import { fetchWithRefresh } from '../../utils/api';
import { baseUrl } from '../rest-api';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_REQUEST_SUCCESS = 'PLACE_ORDER_REQUEST_SUCCESS';
export const PLACE_ORDER_REQUEST_FAILED = 'PLACE_ORDER_REQUEST_FAILED';
export const MOVE_CART_INGREDIENT = 'MOVE_CART_INGREDIENT';

const orderPath = '/orders';

export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: {
		...ingredient, 
		uuid: uuidv4()
	}
});

export function placeOrder(cartIngredients) {
	return function(dispatch) {
		dispatch({
		  type: PLACE_ORDER_REQUEST
		});		

		fetchWithRefresh(baseUrl + orderPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem('accessToken')
			},
			body: JSON.stringify( { "ingredients" : cartIngredients.map(item => item._id) }) 
		})			
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: PLACE_ORDER_REQUEST_SUCCESS,
						payload: res.order    
					});    
				}else {
					dispatch({
						type: PLACE_ORDER_REQUEST_FAILED						
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: PLACE_ORDER_REQUEST_FAILED						
				});				
			});	
	}
}
