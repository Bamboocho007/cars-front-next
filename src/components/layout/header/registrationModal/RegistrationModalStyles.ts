import { FormControl, TextField } from '@mui/material'
import styled from 'styled-components'

const FormBox = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: rgb(18, 18, 18);
  padding: 15px;
`

const TField = styled(TextField)`
  margin-top: 10px;
`

const Error = styled.p`
  margin-top: 5px;
`

const SignUp = styled.button`
  margin-top: 30px;
`

const FControl = styled(FormControl)`
  margin-top: 10px;
`

export const RegistrationModalStyles = {
  FormBox,
  TField,
  Error,
  SignUp,
  FControl,
}