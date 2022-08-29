import { TWsOrder } from '../../types';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
//export const WS_GET_MESSAGE_MY_ORDERS = 'WS_GET_MESSAGE_MY_ORDERS';
//export const WS_GET_MESSAGE_ALL_ORDERS = 'WS_GET_MESSAGE_ALL_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';


export interface IwsConnectionStart {
	readonly type: typeof WS_CONNECTION_START;
	payload: {
		wsUrl: string;
		token: string;    
	}	
}
export interface IwsConnectionStop {
	readonly type: typeof WS_CONNECTION_STOP;	
}  
export interface IwsConnectionSuccess {
	readonly type: typeof WS_CONNECTION_SUCCESS;
	payload: Event;
}
export interface IwsConnectionError {   
	readonly type: typeof WS_CONNECTION_ERROR;
	payload: Event;
}  
export interface IwsConnectionClosed {
	readonly type: typeof WS_CONNECTION_CLOSED;
	payload: Event;
}
export interface IwsGetMessage {    
	readonly type: typeof WS_GET_MESSAGE;
	payload: {
		total: number,
		totalToday: number,
		orders: TWsOrder[]
	};
}
// export interface IwsGetMessageAllOrders {
// 	readonly type: typeof WS_GET_MESSAGE_ALL_ORDERS;
// 	payload: {
// 		total: number,
// 		totalToday: number,
// 		orders: TOrder[]
// 	};
// }
export interface IwsSendMessage {   
	readonly type: typeof WS_SEND_MESSAGE;
	payload: string;
}
  
export type TwsActions =
	IwsConnectionStart
	| IwsConnectionStop
	| IwsConnectionSuccess
	| IwsConnectionError
	| IwsConnectionClosed
	| IwsGetMessage
//	| IwsGetMessageAllOrders
	| IwsSendMessage;
