import { FormControl, TextField } from '@mui/material'
import styled from 'styled-components'

export const SFormBox = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: rgb(18, 18, 18);
  padding: 15px;
`

export const STextField = styled(TextField)`
  margin-top: 10px;
`

export const SError = styled.p`
  margin-top: 5px;
`

export const SSignUp = styled.button`
  margin-top: 30px;
`

export const SFormControl = styled(FormControl)`
  margin-top: 10px;
`