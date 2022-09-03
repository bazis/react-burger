import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppDispatch, TRootState } from './store';
import { IwsActions } from './actions/wsActions';

export const socketMiddleware = (wsActions: IwsActions): Middleware => {
	return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
		let socket: WebSocket | null = null;

		return  next => (action) => {
			const { dispatch, getState } = store;
			const { type, payload } = action;
			const { wsStart, wsStop, onOpen, onClose, onError, onMessage } = wsActions;
	
			//Подключаем сокет только если он не был создан или был закрыт
			if (type === wsStart && (socket === null || socket.readyState === 3)) {					
				socket = new WebSocket(payload.wsUrl + ((typeof payload.token !== 'undefined') ? '?token=' + payload.token : ''));
				
				if (socket) {

					// функция, которая вызывается при открытии сокета
					socket.onopen = event => {
						dispatch({type: onOpen, payload: event});
					};
	
					// функция, которая вызывается при ошибке соединения
					socket.onerror = event => {
						dispatch({ type: onError, payload: event });
					};			
	
					// функция, которая вызывается при закрытии соединения
					socket.onclose = (event: CloseEvent) => {
						dispatch({ type: onClose, payload: event });
					};
	
					// функция, которая вызывается при получения события от сервера
					socket.onmessage = (event: MessageEvent) => {              
						dispatch({type: onMessage, payload: JSON.parse(event.data)});
					}
				}
			}else if(socket && type === wsStop) {
				socket.close();
			}
			
			next(action);
		};
	}) as Middleware;
};