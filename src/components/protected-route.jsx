import { useSelector } from '../services/store';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
	const {email, userIsLoading} = useSelector((store) => store.user.currentUser); //по F5 не успевае прогрузиться
	//const accessToken = localStorage.getItem('accessToken');

    if(!email && userIsLoading) {
        return <h1 className='text text_type_main-large'>Загрузка</h1>
    }

	return (
		<Route
			{...rest}
			render = {({ location }) =>
                email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
  );
}