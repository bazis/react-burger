import { baseUrl } from "../services/rest-api";
import { CustomHeaders } from '../types';

const refreshTokenPath = '/auth/token';

/*export function checkResponse(res) {
	if (res.ok) {
		return res.json();
	} 
	//Архитектор был молодец и возвращает JSON не только лишь со статусом 200
	if([401, 403].includes(res.status)) {
		return res.json();
	}
	return Promise.reject(res.status);
} */

export const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  } 

export const refreshToken = () => {
	return fetch(baseUrl + refreshTokenPath, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify( { token: localStorage.getItem('refreshToken') }) 
	}).then(checkResponse);
};
// options: Request & {headers: CustomHeaders} TODO
export const fetchWithRefresh = async (url: string, options: {
		headers: CustomHeaders, body?: string, method?: string}) => {
	try {		
	  	const res = await fetch(url, options);
	  	return await checkResponse(res);
	} catch (err) {
	  	if (err instanceof Error && err.message === 'jwt expired') {		
			const refreshData = await refreshToken();
			if(!refreshData.success) {
				Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);		
			options.headers.Authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
	 	 } else {
			return Promise.reject(err);
	  	}
	}
  }