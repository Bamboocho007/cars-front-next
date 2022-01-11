import React, { FunctionComponent } from 'react'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { Main } from './main/Main'

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        { children }
      </Main>
      <Footer />
    </>
  )
}