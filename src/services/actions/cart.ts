import { v4 as uuidv4 } from 'uuid';
import { fetchWithRefresh } from '../../utils/api';
import { baseUrl } from '../rest-api';
import { TIngredientCart, TIngredient, TOrder } from '../../types';
import { TAppDispatch } from '../store';
import { Dispatch } from 'react';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_REQUEST_SUCCESS = 'PLACE_ORDER_REQUEST_SUCCESS';
export const PLACE_ORDER_REQUEST_FAILED = 'PLACE_ORDER_REQUEST_FAILED';
export const MOVE_CART_INGREDIENT = 'MOVE_CART_INGREDIENT';

const orderPath = '/orders';

export type TCartActions = 
	{
		type: typeof ADD_INGREDIENT;
		payload: TIngredientCart;
	} | {
		type: typeof DELETE_INGREDIENT;
		payload: TIngredientCart;
	} | {
		type: typeof PLACE_ORDER_REQUEST;		
	} | {
		type: typeof PLACE_ORDER_REQUEST_SUCCESS;
        payload: TOrder;
	} | {
		type: typeof PLACE_ORDER_REQUEST_FAILED;
	} | {
		type: typeof MOVE_CART_INGREDIENT;
		payload: {
			dragIndex: number, hoverIndex: number
		};
	};

export const addIngredient = (ingredient: TIngredientCart) => ({
	type: ADD_INGREDIENT,
	payload: {
		...ingredient, 
		uuid: uuidv4()
	}
});

export function placeOrder(cartIngredients: TIngredientCart[]) {
	return function(dispatch: TAppDispatch) { 
		const accessToken = localStorage.getItem('accessToken');
		if(accessToken === null) {
			return new Error('Missing accessToken');
		}

		dispatch({
		  type: PLACE_ORDER_REQUEST
		});				

		fetchWithRefresh(baseUrl + orderPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken
			},
			body: JSON.stringify( { "ingredients" : cartIngredients.map(item => item._id) })
		})			
			.then((res) => {
				if(res && res.success && res.order) {
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
