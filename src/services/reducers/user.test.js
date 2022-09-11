import { userReducer } from './user';
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

const initialState = {
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

const testUser = {
	email: 'eee@yyy.com',
    name: 'myname',
    password: 'mypass' 
}

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, {})).toEqual(initialState)
	})

	it('should handle REGISTER_FORM_SET_VALUE', () => {
		expect(
			userReducer(initialState, {
				type: REGISTER_FORM_SET_VALUE,
				payload: {field: 'fff', value: 'vvv'}
			})
		).toEqual({	  		
			...initialState,
			registration: {
				...initialState.registration,
				form: {
					...initialState.registration.form,
					fff: 'vvv'
				},
				requestFailed: false,
				requestFailMessage: null	
			}	
		})
	})

	it('should handle LOGIN_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: LOGIN_REQUEST_SUCCESS,
				payload: {user: testUser}
			})
		).toEqual({	  		
			...initialState,
			currentUser: testUser	
		})
	})

	it('should handle REGISTER_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: REGISTER_REQUEST_SUCCESS,
				payload: {user: testUser}
			})
		).toEqual({	  		
			...initialState,
			currentUser: testUser	
		})
	})

	it('should handle REGISTER_REQUEST_FAILED', () => {
		expect(
			userReducer(initialState, {
				type: REGISTER_REQUEST_FAILED,
				payload: {message: 'register fail'}
			})
		).toEqual({	  		
			...initialState,
			registration: {
				...initialState.registration,
				requestFailed: true,
				requestFailMessage: 'register fail'
			}
		})
	})

	it('should handle FORGOT_PASSWORD_FORM_SET_VALUE', () => {
		expect(
			userReducer(initialState, {
				type: FORGOT_PASSWORD_FORM_SET_VALUE,
				payload: {field: 'fff', value: 'vvv'}
			})
		).toEqual({	  		
			...initialState,
			forgotPassword: {
				...initialState.forgotPassword,
				form: {
					...initialState.forgotPassword.form,
					fff: 'vvv'
				},
				requestFailed: false,
				requestFailMessage: null	
			}	
		})
	})

	it('should handle FORGOT_PASSWORD_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: FORGOT_PASSWORD_REQUEST_SUCCESS
			})
		).toEqual({	  		
			...initialState,
			forgotPassword: {
				...initialState.forgotPassword,
				requestSuccess: true
			}
		})
	})

	it('should handle FORGOT_PASSWORD_REQUEST_FAILED', () => {
		expect(
			userReducer(initialState, {
				type: FORGOT_PASSWORD_REQUEST_FAILED,
				payload: {message: 'request fail'}
			})
		).toEqual({	  		
			...initialState,
			forgotPassword: {
				...initialState.forgotPassword,
				requestFailed: true,
				requestFailMessage: 'request fail'
			}		
		})
	})

	it('should handle RESET_PASSWORD_FORM_SET_VALUE', () => {
		expect(
			userReducer(initialState, {
				type: RESET_PASSWORD_FORM_SET_VALUE,
				payload: {field: 'fff', value: 'vvv'}
			})
		).toEqual({	  		
			...initialState,
			resetPassword: {
				...initialState.resetPassword,
				form: {
					...initialState.resetPassword.form,
					fff: 'vvv'
				}	
			}
		})
	})

	it('should handle RESET_PASSWORD_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: RESET_PASSWORD_REQUEST_SUCCESS
			})
		).toEqual({	  		
			...initialState,
			resetPassword: {
				...initialState.resetPassword,
				requestSuccess: true
			}	
		})
	})

	it('should handle RESET_PASSWORD_REQUEST_FAILED', () => {
		expect(
			userReducer(initialState, {
				type: RESET_PASSWORD_REQUEST_FAILED,
				payload: {message: 'request fail'}
			})
		).toEqual({	  		
			...initialState,
			resetPassword: {
				...initialState.resetPassword,
				requestFailed: true,
				requestFailMessage: 'request fail'
			}		
		})
	})

	it('should handle LOGIN_FORM_SET_VALUE', () => {
		expect(
			userReducer(initialState, {
				type: LOGIN_FORM_SET_VALUE,
				payload: {field: 'fff', value: 'vvv'}
			})
		).toEqual({	  		
			...initialState,
			login: {
				...initialState.login,
				form: {
					...initialState.login.form,
					fff: 'vvv'
				},
				requestFailed: false,
				requestFailMessage: null	
			}	
		})
	})

	it('should handle LOGIN_REQUEST_FAILED', () => {
		expect(
			userReducer(initialState, {
				type: LOGIN_REQUEST_FAILED,
				payload: {message: 'request fail'}
			})
		).toEqual({	  		
			...initialState,
			login: {
				...initialState.login,
				requestFailed: true,
				requestFailMessage: 'request fail'
			},
			currentUser: {
				...initialState.currentUser,
				userIsLoading: false				
			}		
		})
	})

	it('should handle PROFILE_FORM_SET_VALUE', () => {
		expect(
			userReducer(initialState, {
				type: PROFILE_FORM_SET_VALUE,
				payload: {field: 'fff', value: 'vvv'}
			})
		).toEqual({	  		
			...initialState,
			profile: {
				...initialState.profile,
				form: {
					...initialState.profile.form,
					fff: 'vvv'
				},
				requestFailed: false,
				requestFailMessage: null	
			}	
		})
	})
	

	it('should handle PROFILE_FORM_RESET', () => {
		expect(
			userReducer({
				...initialState, 
				profile: {
					...initialState.profile, form: {
						name: 'changed',
						email: 'changed',
						password: ''
					}
				}
			}, {
				type: PROFILE_FORM_RESET
			})
		).toEqual({	  		
			...initialState,
			profile: {
				...initialState.profile,
				form: {
					...initialState.profile.form,
					name: initialState.currentUser.name,
					email: initialState.currentUser.email
				}					
			}		
		})
	})


	it('should handle LOGIN_REQUEST', () => {
		expect(
			userReducer(initialState, {
				type: LOGIN_REQUEST
			})
		).toEqual({	  		
			...initialState,
			currentUser: {
				...initialState.currentUser,
				userIsLoading: true				
			}
		})
	})

	it('should handle GET_USER_REQUEST', () => {
		expect(
			userReducer(initialState, {
				type: GET_USER_REQUEST
			})
		).toEqual({	  		
			...initialState,
			currentUser: {
				...initialState.currentUser,
				userIsLoading: true				
			}
		})
	})

	it('should handle GET_USER_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: GET_USER_REQUEST_SUCCESS,
				payload: {user: testUser}
			})
		).toEqual({	  		
			...initialState,
			profile: {
				...initialState.profile,
				form: {
					...initialState.profile.form,
					email: testUser.email,
					name: testUser.name
				},
				requestSuccess: true,
				requestFailed: false,
				requestFailMessage: null
			},
			currentUser: testUser
		})
	})

	it('should handle PATCH_USER_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: PATCH_USER_REQUEST_SUCCESS,
				payload: {user: testUser}
			})
		).toEqual({	  		
			...initialState,
			profile: {
				...initialState.profile,
				form: {
					...initialState.profile.form,
					email: testUser.email,
					name: testUser.name
				},
				requestSuccess: true,
				requestFailed: false,
				requestFailMessage: null
			},
			currentUser: testUser
		})
	})

	it('should handle GET_USER_REQUEST_FAILED', () => {
		expect(
			userReducer(initialState, {
				type: GET_USER_REQUEST_FAILED,
				payload: {message: 'request fail'}
			})
		).toEqual({	  		
			...initialState,
			profile: {
				...initialState.profile,						
				requestFailed: true,
				requestFailMessage: 'request fail'	
			},
			currentUser: {
				...initialState.currentUser,
				userIsLoading: false				
			}		
		})
	})

	it('should handle LOGOUT_REQUEST', () => {
		expect(
			userReducer(initialState, {
				type: LOGOUT_REQUEST
			})
		).toEqual({	  		
			...initialState,
			logout: {
				...initialState.logout,
				requestInProgress: true
			}
		})
	})


	it('should handle LOGOUT_REQUEST_SUCCESS', () => {
		expect(
			userReducer(initialState, {
				type: LOGOUT_REQUEST_SUCCESS
			})
		).toEqual({	  		
			...initialState,
			currentUser: {
				name: '',
				email: '',
				userIsLoading: false
			},
			logout: {
				...initialState.logout,
				requestSuccess: true,
				requestInProgress: false
			},
			login: {
				...initialState.login,
				form: {
					...initialState.login.form,
					email: '',
					password: ''
				}
			}
		})
	})


})
