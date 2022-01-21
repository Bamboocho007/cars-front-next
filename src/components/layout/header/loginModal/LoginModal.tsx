import { Modal } from '@mui/material'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { LoginModalStyles as S } from './LoginModalStyles'
import { LoginData } from '../../../../interfaces/loginData'
import { authApi } from '../../../../api/auth/authApi'
import { localStorageService } from '../../../../core/services/localStorage'
import { USER_IS_AUTHORIZED } from '../../../../constants/localStorageConstants'
import { usersApi } from '../../../../api/users/usersApi'
import { useUser } from '../../../../hooks/useUser'

export const LoginModal: FunctionComponent<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
  const { control, handleSubmit, getValues, formState: { errors } } = useForm<LoginData>()
  const [ isLogining, setIsLogining] = useState(false)
  const [ shouldGetUserInfo, setGetUserInfo] = useState(false)
  const { data: userData } = useSWR(shouldGetUserInfo ? usersApi.USER_INFO_KEY : null, usersApi.userInfo)
  const { setUser } = useUser()

  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [setUser, userData])

  useEffect(() => {
    if (userData) {
      handleClose()
    }
  }, [userData, handleClose])

  const onSubmit = async() => {
    setIsLogining(true)

    try {
      await authApi.login(getValues())
    } catch(err) {
      console.log('login error ', err);
    }

    setIsLogining(false)
    localStorageService.setObj(USER_IS_AUTHORIZED, true)
    setGetUserInfo(true)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <S.FormBox onSubmit={handleSubmit(onSubmit)}>
        <p>Вход</p>
        
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}} 
              label="Email" 
              variant="standard" {...field} />}
        />
        {errors.email && <S.Error>This field is required</S.Error>}
        
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}}
              label="Password" 
              variant="standard" 
              type='password' {...field} />}
        />
        {errors.password && <S.Error>This field is required</S.Error>}

        <S.SubmitBtn type="submit" className='btn'>Submit</S.SubmitBtn>
      </S.FormBox>
    </Modal>
  )
}
