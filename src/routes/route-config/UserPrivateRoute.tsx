import { Navigate } from "react-router-dom";

interface UserPrivateRouteProps {
  Component: React.ComponentType;
}

const UserPrivateRoute = ({ Component }: UserPrivateRouteProps) => {
  console.log("UserPrivateRoute");

  //   const { userLoggedIn } = useSelector((state) => state.auth);
  const userLoggedIn = true;
  // console.log(userLoggedIn, "userLoggedIn");
  return userLoggedIn ? <Component /> : <Navigate to="/welcome" />;
};

export default UserPrivateRoute;
