import { FunctionComponent, useEffect, useState } from "react"
import { useTranslation } from 'next-i18next'
import s from './Header.module.scss'
import { LoginModal } from "./loginModal/LoginModal";
import { PublicUser } from "../../../api/auth/dtos/publicUser";
import useSWR from "swr";
import { localStorageService } from "../../../core/services/localStorage";
import { USER_IS_AUTHORIZED } from "../../../constants/localStorageConstants";
import { authApi } from "../../../api/auth/authApi";
import { useUser } from "../../../hooks/useUser";
import { RegistrationModal } from "./registrationModal/RegistrationModal";

const UserLoginBox: FunctionComponent<{user: PublicUser}> = ({ user }) => {
  const [ shouldLogOut, setsHouldLogOut] = useState(false)
  const { data } = useSWR(shouldLogOut ? '/auth/logOut' : null, authApi.logOut)
  const { setUser } = useUser()

  useEffect(() => {
    if (data) {
      localStorageService.setObj(USER_IS_AUTHORIZED, false)
      setUser(null)
    }
  }, [data, setUser])

  return (<>
    <button type="button" className="btn btn-primary ms-3" onClick={() => setsHouldLogOut(true)}>Выход</button>
    <div className="username ms-3">
      { user.firstName }
    </div>
  </>)
}

const UnAuthorizedLoginBox: FunctionComponent<{ handleLoginOpen: () => void, handleRegistrationOpen: () => void }> = ({ handleLoginOpen, handleRegistrationOpen }) => {
  return (<>
    <button type="button" className="btn btn-primary" onClick={handleLoginOpen}>Вход</button>
    <button type="button" className="btn btn-primary ms-3" onClick={handleRegistrationOpen}>Регистрация</button>
  </>)
}

export const Header: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const [ openLogin, setOpenLogin ] = useState(false)
  const [ openRegistration, setRegistration ] = useState(false)

  const handleLoginOpen = () => {
    setOpenLogin(true)
  }

  const handleLoginClose = () => {
    setOpenLogin(false)
  }

  const handleRegistrationOpen = () => {
    setRegistration(true)
  }

  const handleRegistrationClose = () => {
    setRegistration(false)
  }

  return (
  <header className={s['header']}>
    <div className="container">
      <div className="row row-cols-auto justify-content-between align-items-center">        
        <div className="logo">
          Cars project
          { t('home:HomeTest') } 
        </div> 
        <div className="login-box d-flex align-items-center">
          {
            user 
              ? <UserLoginBox user={user}/>
              : <UnAuthorizedLoginBox handleLoginOpen={handleLoginOpen} handleRegistrationOpen={handleRegistrationOpen}/>
          }
        </div>
      </div>
    </div>
    <LoginModal open={openLogin} handleClose={handleLoginClose}/>
    <RegistrationModal open={openRegistration} handleClose={handleRegistrationClose}/>
  </header>
  )
}