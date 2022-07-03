import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
	const currentUserEmail = useSelector((store) => store.user.currentUser.email);

	return (
		<Route
			{...rest}
			render = {({ location }) =>
				currentUserEmail ? (
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