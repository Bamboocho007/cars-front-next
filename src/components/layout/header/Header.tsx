import { FunctionComponent, useEffect, useState } from "react"
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
import useSWR from "swr"
import { SContainer, SHeader, SRightSide, SLoginBox, SLocaleBox, SLogOutBtn, SUserName, SGeristrationBtn } from './HeaderStyles'
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
    <SLogOutBtn type="button" className="btn btn-primary" onClick={() => setsHouldLogOut(true)}>Выход</SLogOutBtn>
    <SUserName>
      { user.firstName }
    </SUserName>
  </>)
}

const UnAuthorizedLoginBox: FunctionComponent<{ handleLoginOpen: () => void, handleRegistrationOpen: () => void }> = ({ handleLoginOpen, handleRegistrationOpen }) => {
  return (<>
    <button type="button" className="btn btn-primary" onClick={handleLoginOpen}>Вход</button>
    <SGeristrationBtn type="button" className="btn btn-primary" onClick={handleRegistrationOpen}>Регистрация</SGeristrationBtn>
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
  <SHeader>
    <SContainer className="container">       
      <div className="logo">
        Cars project
        { t('home:HomeTest') } 
      </div> 
      <SRightSide>
        <SLoginBox>
          {
            user 
              ? <UserLoginBox user={user}/>
              : <UnAuthorizedLoginBox handleLoginOpen={handleLoginOpen} handleRegistrationOpen={handleRegistrationOpen}/>
          }
        </SLoginBox>
        <SLocaleBox>
          { locales.map((l) => {
            return <button 
              className="btn" 
              disabled={locale === l}
              key={l} 
              onClick={() => push({ pathname, query }, asPath, { locale: l })}>{l}</button>
          })}
        </SLocaleBox>
      </SRightSide>
    </SContainer>
    <LoginModal open={openLogin} handleClose={handleLoginClose}/>
    <RegistrationModal open={openRegistration} handleClose={handleRegistrationClose}/>
  </SHeader>
  )
}