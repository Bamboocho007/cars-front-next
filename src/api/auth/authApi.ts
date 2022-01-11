import axios from 'axios'
import { environment } from '../../environment';
import { LoginPayloadDto, RegistrationPayloadDto } from './dtos/auth-dtos';

const login = async ( creds: LoginPayloadDto): Promise<'OK'> => {
  const res = await axios.post<'OK'>(`${environment.backendApi}auth/login/`, creds,
  {
    withCredentials: true,
  });
  return res.data;
}

const logOut = async (): Promise<'OK'> => {
  const res = await axios.post<'OK'>(`${environment.backendApi}auth/logOut/`, null, { withCredentials: true, });
  return res.data;
}

const registration = async (payload: RegistrationPayloadDto): Promise<void> => {
  const res = await axios.post<void>(
    `${environment.backendApi}registration/`,
    payload);
  return res.data;
}

export const authApi = {
  login,
  logOut,
  registration
}