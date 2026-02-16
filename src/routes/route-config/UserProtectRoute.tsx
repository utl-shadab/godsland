
import { Navigate } from "react-router-dom";

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

const UserProtectedRoute = ({ children }: UserProtectedRouteProps) => {
//   const { userLoggedIn } = useSelector((state) => state.auth);

  const userLoggedIn = true;

  console.log('user protected route', userLoggedIn);


  if (userLoggedIn) {
    return <Navigate to="/pray" replace />;
  }

  return children;
};

export default UserProtectedRoute;
