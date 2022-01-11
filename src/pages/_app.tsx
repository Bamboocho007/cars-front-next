import { FunctionComponent, useEffect, useState } from 'react'
import { appWithTranslation } from 'next-i18next';
import useSWR, { SWRConfig } from 'swr'
import '../styles/globals.scss'
import { Layout } from '../components/layout/Layout'
import { UserContext } from '../context/userContext';
import { localStorageService } from '../core/services/localStorage';
import { usersApi } from '../api/users/usersApi';
import { USER_IS_AUTHORIZED } from '../constants/localStorageConstants';

const MyApp: FunctionComponent<any> = ({ Component, pageProps: { pageProps, fallback = {} },  }) => {
  const [user, setUser] = useState(null)
  const { data: userData } = useSWR(localStorageService.getObj<boolean>(USER_IS_AUTHORIZED) ? 'users/userInfo' : null, usersApi.userInfo)
  
  useEffect(() => {
    setUser(userData)
  }, [setUser, userData])

  return (
    <SWRConfig value={{ fallback }}>
      <UserContext.Provider value={{user, setUser}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </SWRConfig>
  )
}

export default appWithTranslation(MyApp);
