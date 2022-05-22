import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { cartReducer} from './cart';

// Корневой редьюсер
export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	cart: cartReducer
});