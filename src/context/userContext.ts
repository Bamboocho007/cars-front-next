import React from 'react'
import { PublicUser } from '../api/auth/dtos/publicUser'

export const UserContext = React.createContext<{user: PublicUser, setUser: Function}>({ user: null, setUser: () => {}})