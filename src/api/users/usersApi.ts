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
const USER_INFO_KEY = 'users/userInfo'

export const usersApi = {
  userInfo,
  USER_INFO_KEY,
}