import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppDispatch, TRootState } from './store';
import { 
	WS_CONNECTION_START,  
	WS_CONNECTION_STOP,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE} from '../services/actions/wsActions';



export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
		let socket: WebSocket | null = null;

		return  next => (action) => {
			const { dispatch, getState } = store;
			const { type, payload } = action;
			//const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
	
			//Подключаем сокет только если он не был создан или был закрыт
			if (type === WS_CONNECTION_START && (socket === null || socket.readyState === 3)) {					
				socket = new WebSocket(payload.wsUrl + ((typeof payload.token !== 'undefined') ? '?token=' + payload.token : ''));
				
				if (socket) {

					// функция, которая вызывается при открытии сокета
					socket.onopen = event => {
						dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
					};
	
					// функция, которая вызывается при ошибке соединения
					socket.onerror = event => {
						dispatch({ type: WS_CONNECTION_ERROR, payload: event });
					};			
	
					// функция, которая вызывается при закрытии соединения
					socket.onclose = (event: CloseEvent) => {
						dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
					};
	
					// функция, которая вызывается при получения события от сервера
					socket.onmessage = (event: MessageEvent) => {              
						dispatch({type: WS_GET_MESSAGE, payload: JSON.parse(event.data)});
					}
				}
			}else if(socket && type === WS_CONNECTION_STOP) {
				socket.close();
			}
			
			next(action);
		};
	}) as Middleware;
};