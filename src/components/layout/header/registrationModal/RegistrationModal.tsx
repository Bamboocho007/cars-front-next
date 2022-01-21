import { InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material'
import React, { FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { RegistrationModalStyles as S } from './RegistrationModalStyles'
import { RegistrationPayloadDto } from '../../../../api/auth/dtos/auth-dtos'
import { authApi } from '../../../../api/auth/authApi'
import { citiesApi } from '../../../../api/cities/citiesApi'

export const RegistrationModal: FunctionComponent<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
  const { control, handleSubmit, getValues, formState: { errors }, setValue } = useForm<RegistrationPayloadDto>()
  const [ isSubmitingForm, setIsSubmitingForm ] = useState(false)
  const [ subdivisionsId, setSubdivisionsId ] = useState('')
  const { data: subdivisionsWithCities } = useSWR(citiesApi.SUBDIVISIONS_WITH_CITIES_KEY, citiesApi.subdivisionsWithCities)
  
  const onSubmit = async() => {
    setIsSubmitingForm(true)

    try {
      await authApi.registration(getValues()) 
    } catch (err) {
      console.log('registration err', err);
    }

    setIsSubmitingForm(false)
    handleClose()
  }

  const onBackdropClick = () => {
    if (isSubmitingForm) {
      return
    }
    handleClose()
  }

  const handleSubdivisionChange = (event: SelectChangeEvent) => {
    setSubdivisionsId(event.target.value)
    setValue('cityId', '')
  };
  
  return (
    <Modal open={open} onClose={handleClose} BackdropProps={{onClick: onBackdropClick}}>
      <S.FormBox onSubmit={handleSubmit(onSubmit)}>
        <p>Регистрация</p>

        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}} 
              label="First name" 
              variant="standard" {...field} />}
        />
        {errors.firstName && <S.Error>This field is required</S.Error>}

        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}} 
              label="Last name" 
              variant="standard" {...field} />}
        />
        {errors.lastName && <S.Error>This field is required</S.Error>}

        <Controller
          name="patronymic"
          control={control}
          defaultValue=""
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}} 
              label="Patronymic" 
              variant="standard" {...field} />}
        />

        <S.FControl variant="standard" style={{width: '100%'}}>
          <InputLabel id="demo-simple-select-standard-label">Subdivisions</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={subdivisionsId}
            onChange={handleSubdivisionChange}
            label="Subdivisions"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subdivisionsWithCities && subdivisionsWithCities.map(s => {
              return <MenuItem key={s.cityId} value={s.cityId}>{s.cityId}</MenuItem>
            })}
          </Select>
        </S.FControl>

        <Controller
          name="cityId"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.FControl variant="standard" style={{width: '100%'}}>
              <InputLabel id="demo-simple-select-standard-label">Cities of subdivision</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Cities of subdivision"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subdivisionsWithCities && subdivisionsWithCities
                  .find(s => s.cityId === subdivisionsId)?.children
                  .map(c => {
                    return <MenuItem key={c.cityId} value={c.cityId}>{c.cityId}</MenuItem>
                })}
              </Select>
            </S.FControl>}
        />
        {errors.cityId && <S.Error>This field is required</S.Error>}
        
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
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <S.TField 
              style={{width: '100%'}} 
              label="Phone" 
              variant="standard" {...field} />}
        />
        {errors.phone && <S.Error>This field is required</S.Error>}
        
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

        <S.SignUp type='submit' className="btn">Sign Up!</S.SignUp>
      </S.FormBox>
    </Modal>
  )
}
