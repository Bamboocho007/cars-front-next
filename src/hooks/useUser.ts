import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext)

  return {
    user, 
    setUser
  }
}