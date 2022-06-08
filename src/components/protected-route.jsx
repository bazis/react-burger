import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
	const currentUser = useSelector((store) => store.user.currentUser);

	return (
		<Route
			{...rest}
			render = {({ location }) =>
				currentUser ? (
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