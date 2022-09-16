import { TwsActions } from "../../services/actions/wsActions";
import { TWsOrder } from "../../types";

import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,    
	WS_GET_MESSAGE	
} from '../actions/wsActions';

type TConstructorStateWs = {
	wsConnected: boolean,
	ordersArray: TWsOrder[],
	totalOrders: number,
	totalOrdersToday: number | undefined
}

export const initialState: TConstructorStateWs = {
	wsConnected: false,
	ordersArray: [],
	totalOrders: 0,
	totalOrdersToday: 0
}

export const wsReducer = (state = initialState, action: TwsActions): TConstructorStateWs => {
	switch(action.type) {
		case WS_CONNECTION_START : 
			return {
				...state,
				wsConnected: false
			};	
		case WS_CONNECTION_SUCCESS : 		
			return {
				...state,
				wsConnected: true
			};	
		case WS_CONNECTION_ERROR : 
			return {
				...state,
				wsConnected: false
			};	    
		case WS_CONNECTION_CLOSED : 
			return {
				...state,
				wsConnected: false
			};	    
		case WS_GET_MESSAGE: 
			return {
				...state,
				totalOrders: action.payload.total,
                totalOrdersToday: action.payload.totalToday,
                ordersArray: action.payload.orders
			};	    	
		default:
			return state;    
	}
	
}

