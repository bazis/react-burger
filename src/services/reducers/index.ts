import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { cartReducer} from './cart';
import { userReducer} from './user';
import { wsReducer} from './wsReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	cart: cartReducer,
	user: userReducer,
    ws: wsReducer
});