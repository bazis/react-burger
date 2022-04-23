import {shape, number, string, arrayOf} from 'prop-types';


export const ingredient = shape({
    _id: string.isRequired,
	name: string.isRequired,
	price: number.isRequired,
	image: string.isRequired,
	image_mobile: string.isRequired
});
