import { checkResponse } from '../../utils/api';
import { baseUrl } from '../rest-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';

const ingredientsPath = '/ingredients';	

export function getIngredients() {
	return function(dispatch) {
		dispatch({
		  type: GET_INGREDIENTS_REQUEST
		});

		//fetch('https://api.codetabs.com/v1/proxy/?quest=https://fr.upravdom.duckdns.org/wl/?id=fNTuij9V6KeE1A0sa4ndGSpxFdg0s0iq&fmode=open')
		fetch(baseUrl + ingredientsPath)		
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: GET_INGREDIENTS_REQUEST_SUCCESS,
						payload: res.data    
					});    
				}else {
					dispatch({
						type: GET_INGREDIENTS_REQUEST_FAILED						
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: GET_INGREDIENTS_REQUEST_FAILED						
				});				
			});	
	}
}
