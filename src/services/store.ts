import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { compose, createStore, applyMiddleware, ActionCreator, Action, Dispatch } from 'redux';
import { rootReducer } from './reducers/index';
import {  TypedUseSelectorHook,
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import { TwsActions } from '../services/actions/wsActions';
import { socketMiddleware } from './socketMiddleware';

import { TCartActions } from './actions/cart';
import { TIngredientsActions } from './actions/ingredients';
import { TUserActions } from './actions/user';


declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const wsUrlMyOrders = 'wss://norma.nomoreparties.space/orders';
export const wsUrlAllOrders = 'wss://norma.nomoreparties.space/orders/all';

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));


export const store = createStore(rootReducer, enhancer); 

export type TApplicationActions = TCartActions | TIngredientsActions | TUserActions | TwsActions;
// Типизация thunk'ов в нашем приложении
export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type TAppDispatch = Dispatch<TApplicationActions>; 

export type TRootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();