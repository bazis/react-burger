import {
	TUserActions,
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
	LOGIN_REQUEST,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_FAILED,
	PROFILE_FORM_SET_VALUE,
	PROFILE_FORM_RESET,
	GET_USER_REQUEST,
	GET_USER_REQUEST_SUCCESS,
	GET_USER_REQUEST_FAILED,
	PATCH_USER_REQUEST_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_REQUEST_SUCCESS
} from '../actions/user';


type TConstructorStateUser = {
	currentUser: {
		name: string,
		email: string,
		userIsLoading?: boolean
	},
	registration: {
		form: {
			name: string,
			email: string,
			password: string
		},		
		requestFailed: boolean,
		requestFailMessage: string | null
	},
	forgotPassword: {
		form: {
			email: string
		},
		requestSuccess: boolean,
		requestFailed: boolean,
		requestFailMessage: string | null
	},
	resetPassword: {
		form: {			
			password: string,
			token: string
		},
		requestSuccess: boolean,
		requestFailed: boolean,
		requestFailMessage: string | null
	},
	login: {
		form: {			
			email: string,
			password: string
		},		
		requestFailed: boolean,
		requestFailMessage: string | null
	},
	profile: {
		form: {			
			name: string,
			email: string,
			password: string
		},
		requestSuccess: boolean,		
		requestFailed: boolean,
		requestFailMessage: string | null
	},
	logout: {
		requestInProgress: boolean,
		requestSuccess: boolean,
		requestFailed: boolean,
		requestFailMessage: string | null
	}
}

const initialState: TConstructorStateUser = {
	currentUser: {
		name: '',
		email: '',
		userIsLoading: false
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
		requestSuccess: false,	
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

export const userReducer = (store = initialState, action: TUserActions): TConstructorStateUser => {
  	switch (action.type) {
		case REGISTER_FORM_SET_VALUE:
			return {
				...store,
				registration: {
					...store.registration,
					form: {
						...store.registration.form,
						[action.payload.field]: action.payload.value
					},
					requestFailed: false,
					requestFailMessage: null	
				}				
			};			
		case LOGIN_REQUEST_SUCCESS :
		case REGISTER_REQUEST_SUCCESS : 
			return {
				...store,
				currentUser: action.payload.user,
				
			};		
		case REGISTER_REQUEST_FAILED : 
			return {
				...store,	
				registration: {
					...store.registration,
					requestFailed: true,
					requestFailMessage: action.payload.message
				}								
			};		
		case FORGOT_PASSWORD_FORM_SET_VALUE: 
			return {
				...store,
				forgotPassword: {
					...store.forgotPassword,
					form: {
						...store.forgotPassword.form,
						[action.payload.field]: action.payload.value
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
					requestFailMessage: action.payload.message
				}								
			};		
		case RESET_PASSWORD_FORM_SET_VALUE: 
			return {
				...store,
				resetPassword: {
					...store.resetPassword,
					form: {
						...store.resetPassword.form,
						[action.payload.field]: action.payload.value
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
					requestFailMessage: action.payload.message
				}								
			};		
		case LOGIN_FORM_SET_VALUE: 
			return {
				...store,
				login: {
					...store.login,
					form: {
						...store.login.form,
						[action.payload.field]: action.payload.value
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
					requestFailMessage: action.payload.message
				},
				currentUser: {
					...store.currentUser,
					userIsLoading: false				
				}									
			};	
		case PROFILE_FORM_SET_VALUE:
			return {
				...store,
				profile: {
					...store.profile,
					form: {
						...store.profile.form,
						[action.payload.field]: action.payload.value
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
		case LOGIN_REQUEST:		
		case GET_USER_REQUEST:			
			return {
				...store,
				currentUser: {
					...store.currentUser,
					userIsLoading: true				
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
						email: action.payload.user.email,
						name: action.payload.user.name
					},
					requestSuccess: true,
					requestFailed: false,
					requestFailMessage: null
				},
				currentUser: action.payload.user								
			};		
		case GET_USER_REQUEST_FAILED:
			return {
				...store,
				profile: {
					...store.profile,						
					requestFailed: true,
					requestFailMessage: action.payload.message	
				},
				currentUser: {
					...store.currentUser,
					userIsLoading: false				
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
					email: '',
					userIsLoading: false
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