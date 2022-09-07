import { ingredientsReducer } from './ingredients';
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


describe('Ingredients reducer', () => {
	it('should return the initial state', () => {
	  expect(ingredientsReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle GET_INGREDIENTS_REQUEST', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_REQUEST
			})
		).toEqual({	  		
			...initialState,
			ingredientsRequestInProgress: true,
			ingredientsRequestFailed: false
		})
	})

	it('should handle GET_INGREDIENTS_REQUEST_SUCCESS', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_REQUEST_SUCCESS,
				payload: [ingredient1, ingredient2]
			})
		).toEqual({	  		
			...initialState,
			ingredientsAll: [ingredient1, ingredient2], 
			ingredientsRequestInProgress: false 
		})
	})

	it('should handle GET_INGREDIENTS_REQUEST_FAILED', () => {
		expect(
			ingredientsReducer(initialState, {
				type: GET_INGREDIENTS_REQUEST_FAILED
			})
		).toEqual({	  		
			...initialState,
			ingredientsRequestFailed: true, 
			ingredientsRequestInProgress: false 
		})
	})



})