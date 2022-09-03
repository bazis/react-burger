import { checkResponse, fetchWithRefresh } from '../../utils/api';
import { baseUrl } from '../rest-api';
import { IUserRequest }  from '../../types';
import { TAppDispatch, TAppThunk } from '../store';


export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_REQUEST_SUCCESS = 'GET_USER_REQUEST_SUCCESS';
export const GET_USER_REQUEST_FAILED = 'GET_USER_REQUEST_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_REQUEST_SUCCESS = 'PATCH_USER_REQUEST_SUCCESS';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';

export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';
export const FORGOT_PASSWORD_FORM_SET_VALUE = 'FORGOT_PASSWORD_FORM_SET_VALUE';
export const RESET_PASSWORD_FORM_SET_VALUE = 'RESET_PASSWORD_FORM_SET_VALUE';
export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const PROFILE_FORM_SET_VALUE = 'PROFILE_FORM_SET_VALUE';
export const PROFILE_FORM_RESET = 'PROFILE_FORM_RESET';


export type TUserActions = 
	{
		type: typeof REGISTER_REQUEST;		
	} | {
		type: typeof REGISTER_REQUEST_SUCCESS;
		payload: {
			user: IUserRequest;
		};
	} | {
		type: typeof REGISTER_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof LOGIN_REQUEST;
	} | {
		type: typeof LOGIN_REQUEST_SUCCESS;
		payload: {
			user: IUserRequest;
		};
	} | {
		type: typeof LOGIN_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof LOGOUT_REQUEST;	
	} | {
		type: typeof LOGOUT_REQUEST_SUCCESS;
		payload: {
			message: string;
		};
	} | {
		type: typeof LOGOUT_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof FORGOT_PASSWORD_REQUEST;
	} | {
		type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
		payload: {
			message: string;
		};
	} | {
		type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof RESET_PASSWORD_REQUEST;
	} | {
		type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
	} | {
		type: typeof RESET_PASSWORD_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof GET_USER_REQUEST;
	} | {
		type: typeof GET_USER_REQUEST_SUCCESS;
		payload: {
			user: IUserRequest
		};
	} | {
		type: typeof GET_USER_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof PATCH_USER_REQUEST;
	} | {
		type: typeof PATCH_USER_REQUEST_SUCCESS;
		payload: {
			user: IUserRequest
		};
	} | {
		type: typeof PATCH_USER_REQUEST_FAILED;
		payload: {
			message: string;
		};
	} | {
		type: typeof REGISTER_FORM_SET_VALUE;
		payload: {
			field: string, value: string
		};
	} | {
		type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
		payload: {
			field: string, value: string
		};
	} | {
		type: typeof RESET_PASSWORD_FORM_SET_VALUE;
		payload: {
			field: string, value: string
		};
	} | {
		type: typeof LOGIN_FORM_SET_VALUE;
		payload: {
			field: string, value: string
		};
	} | {
		type: typeof PROFILE_FORM_SET_VALUE;
		payload: {
			field: string, value: string
		};
	} | {
		type: typeof PROFILE_FORM_RESET;		
	};



const registerPath = '/auth/register';
const loginPath = '/auth/login';
const logoutPath = '/auth/logout';
const userPath = '/auth/user';
const forgotPasswordPath = '/password-reset';
const resetPasswordPath = '/password-reset/reset';


export const setRegisterFormValue = (field: string, value: string) => ({
	type: REGISTER_FORM_SET_VALUE,
	payload: {field, value}
});

export const setForgotPasswordFormValue = (field: string, value: string) => ({
	type: FORGOT_PASSWORD_FORM_SET_VALUE,
	payload: {field, value}
});

export const setResetPasswordFormValue = (field: string, value: string) => ({
	type: RESET_PASSWORD_FORM_SET_VALUE,
	payload: {field, value}
});

export const setLoginFormValue = (field: string, value: string) => ({
	type: LOGIN_FORM_SET_VALUE,
	payload: {field, value}
});

export const setProfileFormValue = (field: string, value: string) => ({
	type: PROFILE_FORM_SET_VALUE,
	payload: {field, value}
});



export const register: TAppThunk = ({name, email, password} : IUserRequest) => {
	return function(dispatch: TAppDispatch) {
		dispatch({
		  type: REGISTER_REQUEST
		});
		
		fetch(baseUrl + registerPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { name, email, password }) 
		})
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success && res.accessToken) {
					dispatch({
						type: REGISTER_REQUEST_SUCCESS,
						payload: { user: {...res.user, userIsLoading: false} }					
					}); 
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('refreshToken', res.refreshToken);					 
				}else {
					dispatch({
						type: REGISTER_REQUEST_FAILED,
						payload: { message: res?.message }		
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: REGISTER_REQUEST_FAILED,
					payload: { message: e.message }					
				});				
			});	
	}
}

export const login: TAppThunk = ({email, password}: Partial<IUserRequest>) => {
	return function(dispatch: TAppDispatch) {
		dispatch({
		  type: LOGIN_REQUEST
		});
		
		fetch(baseUrl + loginPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { email, password }) 
		})
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: LOGIN_REQUEST_SUCCESS,
						payload: { user: {...res.user, userIsLoading: false} }					
					}); 
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('refreshToken', res.refreshToken);		
				}else {
					dispatch({
						type: LOGIN_REQUEST_FAILED,
						payload: { message: res?.message }		
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: LOGIN_REQUEST_FAILED,
					payload: { message: e.message }
				});				
			});	
	}
}

export const logout: TAppThunk = () => {	
	return function(dispatch: TAppDispatch) {
		dispatch({
		  type: LOGOUT_REQUEST
		});
		
		fetch(baseUrl + logoutPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { token: localStorage.getItem('refreshToken') }) 
		})
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success) {							
					dispatch({
						type: LOGOUT_REQUEST_SUCCESS,
						payload: { message: res?.message }				
					}); 				
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');	
				}else {
					dispatch({
						type: LOGOUT_REQUEST_FAILED,
						payload: { message: res?.message }		
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: LOGOUT_REQUEST_FAILED,
					payload: { message: e.message }
				});				
			});	
	}
}

export const forgotPassword: TAppThunk = (email: string) => {	
	return function(dispatch: TAppDispatch) {
		dispatch({
		  type: FORGOT_PASSWORD_REQUEST
		});
		
		fetch(baseUrl + forgotPasswordPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( {email}) 
		})
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: FORGOT_PASSWORD_REQUEST_SUCCESS,
						payload: { message: res?.message }		
					});   					
				}else {
					dispatch({
						type: FORGOT_PASSWORD_REQUEST_FAILED,
						payload: { message: res?.message }					
					});  
				}
			})
			.catch((e) => {				
				dispatch({
					type: FORGOT_PASSWORD_REQUEST_FAILED,					
					payload: { message: e.message }
				});				
			});	
	}
}


export const resetPassword: TAppThunk = ({password, token}: {password: string, token: string}) => {
	return function(dispatch: TAppDispatch) {
		dispatch({
		  type: RESET_PASSWORD_REQUEST
		});
		
		fetch(baseUrl + resetPasswordPath, { 
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( {password, token} ) 
		})
			.then(checkResponse) 
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: RESET_PASSWORD_REQUEST_SUCCESS
						//payload: res.data    
					});    
				}else {
					dispatch({
						type: RESET_PASSWORD_REQUEST_FAILED,
						payload: { message: res?.message }								
					});  
				}
			})
			.catch((e) => {
				dispatch({
					type: RESET_PASSWORD_REQUEST_FAILED,
					payload: { message: e.message }
				});				
			});	
	}
}

export const getUser: TAppThunk = () => {	
	return function(dispatch) {
		const accessToken = localStorage.getItem('accessToken');
		if(accessToken === null) {
			return new Error('Missing accessToken');
		}

		dispatch({
		  type: GET_USER_REQUEST
		});
		
		fetchWithRefresh(baseUrl + userPath, { 
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken
			}
		})			
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: GET_USER_REQUEST_SUCCESS,
						payload: { user: {...res.user, userIsLoading: false} }										
					});   					
				}else {
					dispatch({
						type: GET_USER_REQUEST_FAILED,
						payload: { message: res?.message }		
					});  
				}
			})
			.catch((e) => {				
				dispatch({
					type: GET_USER_REQUEST_FAILED,					
					payload: { message: e.message }
				});				
			});	
	}
}


export const updateUser: TAppThunk = ({ name, email, password }: IUserRequest) => {
	return function(dispatch: TAppDispatch) {
		const accessToken = localStorage.getItem('accessToken');
		if(accessToken === null) {
			return new Error('Missing accessToken');
		}

		dispatch({
		  type: PATCH_USER_REQUEST
		});
		
		fetchWithRefresh(baseUrl + userPath, { 
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken
			},
			body: JSON.stringify( {name, email, password}) 
		})			
			.then((res) => {
				if(res && res.success) {
					dispatch({
						type: PATCH_USER_REQUEST_SUCCESS,
						payload: { user: res.user }					
					});   					
				}else {					
					dispatch({
						type: PATCH_USER_REQUEST_FAILED,
						payload: { message: res?.message }
					});  
				}
			})
			.catch((e) => {				
				dispatch({
					type: PATCH_USER_REQUEST_FAILED,					
					payload: { message: e.message }
				});				
			});	
	}
}


