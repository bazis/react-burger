import { wsReducer } from './wsReducer';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,    
	WS_GET_MESSAGE
} from '../actions/wsActions';

const initialState = {
	wsConnected: false,
	ordersArray: [],
	totalOrders: 0,
	totalOrdersToday: 0
}


describe('wsReducer reducer', () => {
	it('should return the initial state', () => {
		expect(wsReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle WS_CONNECTION_START', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_START
			})
		).toEqual({	  		
			...initialState,
			wsConnected: false
		})
	})

	it('should handle WS_CONNECTION_SUCCESS', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_SUCCESS
			})
		).toEqual({	  		
			...initialState,
			wsConnected: true
		})
	})

	it('should handle WS_CONNECTION_ERROR', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_ERROR
			})
		).toEqual({	  		
			...initialState,
			wsConnected: false
		})
	})

	it('should handle WS_CONNECTION_CLOSED', () => {
		expect(
			wsReducer(initialState, {
				type: WS_CONNECTION_CLOSED
			})
		).toEqual({	  		
			...initialState,
			wsConnected: false
		})
	})

	
    it('should handle WS_GET_MESSAGE', () => {
		expect(
			wsReducer(initialState, {
				type: WS_GET_MESSAGE,
				payload: {total: 4, totalToday: 10, orders: [1, 2, 3]}
			})
		).toEqual({	  		
			...initialState,
			totalOrders: 4,
            totalOrdersToday: 10,
        	ordersArray: [1, 2, 3]
		})
	})

})