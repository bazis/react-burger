import { nodeModuleNameResolver } from 'typescript';
import {
	REGISTER_FORM_SET_VALUE,
	REGISTER_REQUEST_SUCCESS,
	REGISTER_REQUEST_FAILED,
	FORGOT_PASSWORD_FORM_SET_VALUE,	
	RESET_PASSWORD_FORM_SET_VALUE,
	RESET_PASSWORD_REQUEST_SUCCESS,
	RESET_PASSWORD_REQUEST_FAILED,	
	FORGOT_PASSWORD_REQUEST_SUCCESS,
	FORGOT_PASSWORD_REQUEST_FAILED,
	LOGIN_FORM_SET_VALUE,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_FAILED,
	PROFILE_FORM_SET_VALUE,
	PROFILE_FORM_RESET,
	GET_USER_REQUEST_SUCCESS,
	GET_USER_REQUEST_FAILED,
	PATCH_USER_REQUEST_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_REQUEST_SUCCESS
} from '../actions/user';

const initialState = {
	currentUser: {
		name: '',
		email: ''
	},
	registration: {
		form: {
			name: '',
			email: '',
			password: ''
		},
		//requestSuccess: false,
		requestFailed: false,
		requestFailMessage: null
	},
	forgotPassword: {
		form: {
			email: ''
		},
		requestSuccess: false,
		requestFailed: false,
		requestFailMessage: null
	},
	resetPassword: {
		form: {			
			password: '',
			token: ''
		},
		requestSuccess: false,
		requestFailed: false,
		requestFailMessage: null
	},
	login: {
		form: {			
			email: '',
			password: ''
		},
		//requestSuccess: false,
		requestFailed: false,
		requestFailMessage: null
	},
	profile: {
		form: {			
			name: '',
			email: '',
			password: ''
		},		
		requestFailed: false,
		requestFailMessage: null
	},
	logout: {
		requestInProgress: false,
		requestSuccess: false,
		requestFailed: false,
		requestFailMessage: null
	}
}

export const userReducer = (store = initialState, action: any) => {
  	switch (action.type) {
		case REGISTER_FORM_SET_VALUE:
			return {
				...store,
				registration: {
					...store.registration,
					form: {
						...store.registration.form,
						[action.field]: action.value
					},
					requestFailed: false,
					requestFailMessage: null	
				}				
			};			
		case LOGIN_REQUEST_SUCCESS :
		case REGISTER_REQUEST_SUCCESS : 
			return {
				...store,
				currentUser: action.user	
			};		
		case REGISTER_REQUEST_FAILED : 
			return {
				...store,	
				registration: {
					...store.registration,
					requestFailed: true,
					requestFailMessage: action.message
				}								
			};		
		case FORGOT_PASSWORD_FORM_SET_VALUE: 
			return {
				...store,
				forgotPassword: {
					...store.forgotPassword,
					form: {
						...store.forgotPassword.form,
						[action.field]: action.value
					},
					requestFailed: false,
					requestFailMessage: null	
				}				
			};		
		case FORGOT_PASSWORD_REQUEST_SUCCESS : 
			return {
				...store,	
				forgotPassword: {
					...store.forgotPassword,
					requestSuccess: true
				}								
			};		
		case FORGOT_PASSWORD_REQUEST_FAILED : 
			return {
				...store,	
				forgotPassword: {
					...store.forgotPassword,
					requestFailed: true,
					requestFailMessage: action.message
				}								
			};		
		case RESET_PASSWORD_FORM_SET_VALUE: 
			return {
				...store,
				resetPassword: {
					...store.resetPassword,
					form: {
						...store.resetPassword.form,
						[action.field]: action.value
					}	
				}				
			};	
		case RESET_PASSWORD_REQUEST_SUCCESS:
			return {
				...store,	
				resetPassword: {
					...store.resetPassword,
					requestSuccess: true
				}								
			};		
		case RESET_PASSWORD_REQUEST_FAILED : 
			return {
				...store,	
				resetPassword: {
					...store.resetPassword,
					requestFailed: true,
					requestFailMessage: action.message
				}								
			};		
		case LOGIN_FORM_SET_VALUE: 
			return {
				...store,
				login: {
					...store.login,
					form: {
						...store.login.form,
						[action.field]: action.value
					},
					requestFailed: false,
					requestFailMessage: null	
				}				
			};		
		case LOGIN_REQUEST_FAILED : 
			return {
				...store,	
				login: {
					...store.login,
					requestFailed: true,
					requestFailMessage: action.message
				}								
			};	
		case PROFILE_FORM_SET_VALUE:
			return {
				...store,
				profile: {
					...store.profile,
					form: {
						...store.profile.form,
						[action.field]: action.value
					},
					requestFailed: false,
					requestFailMessage: null	
				}				
			};				
		case PROFILE_FORM_RESET:			
			return {
				...store,
				profile: {
					...store.profile,
					form: {
						...store.profile.form,
						name: store.currentUser.name,
						email: store.currentUser.email
					}					
				}				
			};	
		case GET_USER_REQUEST_SUCCESS: 
		case PATCH_USER_REQUEST_SUCCESS:
			return {
				...store,	
				profile: {
					...store.profile,
					form: {
						...store.profile.form,
						email: action.user.email,
						name: action.user.name
					},
					requestSuccess: true,
					requestFailed: false,
					requestFailMessage: null
				},
				currentUser: action.user								
			};		
		case GET_USER_REQUEST_FAILED:
			return {
				...store,
				profile: {
					...store.profile,						
					requestFailed: true,
					requestFailMessage: action.message	
				}				
			};	
		case LOGOUT_REQUEST: {
			return {
				...store,					
				logout: {
					...store.logout,
					requestInProgress: true
				}
			}
		}										
		case LOGOUT_REQUEST_SUCCESS:
			return {
				...store,	
				currentUser: {
					name: '',
					email: ''
				},
				logout: {
					...store.logout,
					requestSuccess: true,
					requestInProgress: false
				},
				login: {
					...store.login,
					form: {
						...store.login.form,
						email: '',
						password: ''
					}
				}												
			};			
		default: 
			return store;		
	}
}