import { cartReducer } from './cart';
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
	orderRequestFailed: false,
	order: {
		number: 0, 
		textStatus: ''
	}	
}

const ingredient1 = {
	_id: 'myid1',
	uuid: 'uid1',
	name: 'myname1',
	type: 'bun',
	price: 111
}

const ingredient2 = {
	_id: 'myid2',
	uuid: 'uid2',
	name: 'myname2',
	type: 'main',
	price: 222
}

const ingredient3 = {
	_id: 'myid3',
	uuid: 'uid3',
	name: 'myname3',
	type: 'sauce',
	price: 333
}

const order = {
	_id: 'myid1',
	status: 'status',
	name: 'order name',
	createdAt: '22.03.2000',
	updatedAt: '24.03.2000',
	number: 788,
	ingredients: [ingredient1, ingredient2]
}


describe('Cart reducer', () => {
	it('should return the initial state', () => {
		expect(cartReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle ADD_INGREDIENT', () => {
		expect(
			cartReducer(initialState, {
				type: ADD_INGREDIENT,
				payload: ingredient1
			})
		).toEqual({	  		
			...initialState,
			cartIngredients: [ingredient1]
		})
	})

	it('should handle DELETE_INGREDIENT', () => {
		expect(
			cartReducer({...initialState, cartIngredients: [ingredient1, ingredient2, ingredient3]}, {
				type: DELETE_INGREDIENT,
				payload: ingredient1
			})
		).toEqual({	  		
			...initialState,
			cartIngredients: [ingredient2, ingredient3]
		})
	})

	it('should handle PLACE_ORDER_REQUEST', () => {
		expect(
			cartReducer(initialState, {
				type: PLACE_ORDER_REQUEST
			})
		).toEqual({	  		
			...initialState,
			orderRequestInProgress: true,
			orderRequestFailed: false,
			order: {number: 0, textStatus: 'Оформление...'}
		})
	})

	it('should handle PLACE_ORDER_REQUEST_SUCCESS', () => {
		expect(
			cartReducer(initialState, {
				type: PLACE_ORDER_REQUEST_SUCCESS,
				payload: order
			})
		).toEqual({	  		
			...initialState,
			order: {...order, textStatus: ''}, 
			orderRequestInProgress: false,
			cartIngredients: []
		})
	})

	it('should handle PLACE_ORDER_REQUEST_FAILED', () => {
		expect(
			cartReducer(initialState, {
				type: PLACE_ORDER_REQUEST_FAILED
			})
		).toEqual({	  		
			...initialState,
			orderRequestInProgress: false,
			orderRequestFailed: true,
			order: {number: 0, textStatus: 'Произошла ошибка'}
		})
	})

	it('should handle MOVE_CART_INGREDIENT', () => {
		expect(
			cartReducer({...initialState, cartIngredients: [ingredient1, ingredient2, ingredient3]}, {
				type: MOVE_CART_INGREDIENT,
				payload: {dragIndex: 0, hoverIndex: 1}
			})
		).toEqual({	  		
			...initialState,
			cartIngredients: [ingredient1, ingredient3, ingredient2]
		})
	})
}) 