import { useSelector } from "react-redux"
import { ROLES } from "../utils/roles"
import { RootState } from "../store/store"
import { Navigate, replace } from "react-router-dom"
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}


export const PrivateRoute = ({children}: Props) => {
    const role = useSelector((state: RootState) => state.auth.user.role)
    if(role !== ROLES.ADMIN){
        return <Navigate to='/' replace/>
    }
    return children

}

export default PrivateRoute