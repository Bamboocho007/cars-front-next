import { FunctionComponent, useEffect, useState } from "react"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import useSWR from "swr"
import { HeaderStyles as S } from './HeaderStyles'
import { LoginModal } from "./loginModal/LoginModal"
import { PublicUser } from "../../../api/auth/dtos/publicUser"
import { localStorageService } from "../../../core/services/localStorage"
import { USER_IS_AUTHORIZED } from "../../../constants/localStorageConstants"
import { authApi } from "../../../api/auth/authApi"
import { useUser } from "../../../hooks/useUser"
import { RegistrationModal } from "./registrationModal/RegistrationModal"

const UserLoginBox: FunctionComponent<{user: PublicUser}> = ({ user }) => {
  const [ shouldLogOut, setsHouldLogOut] = useState(false)
  const { data } = useSWR(shouldLogOut ? authApi.LOG_OUT_KEY : null, authApi.logOut)
  const { setUser } = useUser()

  useEffect(() => {
    if (data) {
      localStorageService.setObj(USER_IS_AUTHORIZED, false)
      setUser(null)
    }
  }, [data, setUser])

  return (<>
    <S.LogOutBtn type="button" className="btn btn-primary" onClick={() => setsHouldLogOut(true)}>Выход</S.LogOutBtn>
    <S.UserName>
      { user.firstName }
    </S.UserName>
  </>)
}

const UnAuthorizedLoginBox: FunctionComponent<{ handleLoginOpen: () => void, handleRegistrationOpen: () => void }> = ({ handleLoginOpen, handleRegistrationOpen }) => {
  return (<>
    <button type="button" className="btn btn-primary" onClick={handleLoginOpen}>Вход</button>
    <S.GeristrationBtn type="button" className="btn btn-primary" onClick={handleRegistrationOpen}>Регистрация</S.GeristrationBtn>
  </>)
}

export const Header: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const [ openLogin, setOpenLogin ] = useState(false)
  const [ openRegistration, setRegistration ] = useState(false)
  const { locales, pathname, asPath, query, push, locale } = useRouter()

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
  <S.Header>
    <S.Container className="container">       
      <div className="logo">
        Cars project
        { t('home:HomeTest') } 
      </div> 
      <S.RightSide>
        <S.LoginBox>
          {
            user 
              ? <UserLoginBox user={user}/>
              : <UnAuthorizedLoginBox handleLoginOpen={handleLoginOpen} handleRegistrationOpen={handleRegistrationOpen}/>
          }
        </S.LoginBox>
        <S.LocaleBox>
          { locales.map((l) => {
            return <button 
              className="btn" 
              disabled={locale === l}
              key={l} 
              onClick={() => push({ pathname, query }, asPath, { locale: l })}>{l}</button>
          })}
        </S.LocaleBox>
      </S.RightSide>
    </S.Container>
    <LoginModal open={openLogin} handleClose={handleLoginClose}/>
    <RegistrationModal open={openRegistration} handleClose={handleRegistrationClose}/>
  </S.Header>
  )
}