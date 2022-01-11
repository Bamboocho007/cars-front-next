import axios from "axios";
import { environment } from "../../environment";
import { PublicUser } from "../auth/dtos/publicUser";

const userInfo = async (): Promise<PublicUser> => {
  const res = await axios.get<PublicUser>(`${environment.backendApi}users/userInfo/`,
  {
    withCredentials: true,
  });
  return res.data;
}

export const usersApi = {
  userInfo,
}