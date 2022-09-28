import jwtDecode, { JwtPayload } from "jwt-decode";
import { useSelector } from "react-redux";
import { authSelector } from "../../app/selector";

const useGetJWT = () => {
  const data = useSelector(authSelector).auth;
  if (data) {
    return jwtDecode<JwtPayload>(data.token);
  }

  return undefined;
};

export default useGetJWT;
