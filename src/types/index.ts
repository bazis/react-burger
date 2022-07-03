
export type TLocation = {
	path: string;
	hash: string;
	host: string;
	pathname: string;
	search: string;
	state: TLocationState
}

export type TLocationState = {
	state: {
		prevLocation: TLocation;
	}
}

export type TIngredient = {    	
	readonly _id: string;
	readonly name: string;
	readonly type: string;
	readonly price: number;
	readonly proteins: number; 
	readonly fat: number;
    readonly calories: number;
    readonly carbohydrates: number;    
    readonly image: string;    
    readonly image_mobile: string;     
	readonly image_large: string;
}

export type TIngredientCart = TIngredient & {
	uuid: string; 
	index: number;
} 

export interface IUserRequest {
	email: string;
	name: string;
	password: string;
}

export type TOrder = {
	_id: string;
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	ingredients: TIngredient[];
}

export type CustomHeaders = {
	Authorization: string;
	"Content-Type": string;
}
