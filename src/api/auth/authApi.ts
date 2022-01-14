import axios from 'axios'
import { environment } from '../../environment'
import { LoginPayloadDto, RegistrationPayloadDto } from './dtos/auth-dtos'

const login = async ( creds: LoginPayloadDto): Promise<'OK'> => {
  const res = await axios.post<'OK'>(`${environment.backendApi}auth/login/`, creds,
  {
    withCredentials: true,
  });
  return res.data
}
const LOGIN_KEY = 'auth/login'

const logOut = async (): Promise<'OK'> => {
  const res = await axios.post<'OK'>(`${environment.backendApi}auth/logOut/`, null, { withCredentials: true, })
  return res.data
}
const LOG_OUT_KEY = 'auth/logOut'

const registration = async (payload: RegistrationPayloadDto): Promise<'OK'> => {
  const res = await axios.post<'OK'>(
    `${environment.backendApi}auth/registration/`,
    payload)
  return res.data
}
const REGISTRATION_KEY = 'registration'

export const authApi = {
  login,
  LOGIN_KEY,
  logOut,
  LOG_OUT_KEY,
  registration,
  REGISTRATION_KEY
}