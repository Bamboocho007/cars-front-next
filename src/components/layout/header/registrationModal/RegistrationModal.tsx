import { InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material'
import React, { FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { SFormBox, STextField, SError, SSignUp, SFormControl } from './RegistrationModalStyles'
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
      <SFormBox onSubmit={handleSubmit(onSubmit)}>
        <p>Регистрация</p>

        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}} 
              label="First name" 
              variant="standard" {...field} />}
        />
        {errors.firstName && <SError>This field is required</SError>}

        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}} 
              label="Last name" 
              variant="standard" {...field} />}
        />
        {errors.lastName && <SError>This field is required</SError>}

        <Controller
          name="patronymic"
          control={control}
          defaultValue=""
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}} 
              label="Patronymic" 
              variant="standard" {...field} />}
        />

        <SFormControl variant="standard" style={{width: '100%'}}>
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
        </SFormControl>

        <Controller
          name="cityId"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <SFormControl variant="standard" style={{width: '100%'}}>
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
            </SFormControl>}
        />
        {errors.cityId && <SError>This field is required</SError>}
        
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}} 
              label="Email" 
              variant="standard" {...field} />}
        />
        {errors.email && <SError>This field is required</SError>}

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}} 
              label="Phone" 
              variant="standard" {...field} />}
        />
        {errors.phone && <SError>This field is required</SError>}
        
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => 
            <STextField 
              style={{width: '100%'}}
              label="Password" 
              variant="standard" 
              type='password' {...field} />}
        />
        {errors.password && <SError>This field is required</SError>}

        <SSignUp type='submit' className="btn">Sign Up!</SSignUp>
      </SFormBox>
    </Modal>
  )
}
