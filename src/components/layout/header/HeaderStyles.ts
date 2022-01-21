import styled from 'styled-components'

const Header = styled.header`
`

const Container = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RightSide = styled.div`
  display: flex;
  align-items: center;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
`

const LocaleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`

const LogOutBtn = styled.button`
  margin-left: 10px;
`

const UserName = styled.button`
  margin-left: 10px;
`

const GeristrationBtn = styled.button`
  margin-left: 10px;
`

export const HeaderStyles = {
  Header,
  Container,
  RightSide,
  LoginBox,
  LocaleBox,
  LogOutBtn,
  UserName,
  GeristrationBtn,
}