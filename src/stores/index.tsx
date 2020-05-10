import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { Recommend, Bookrack, Mine, Login } from './home'
import { Reader, Intro } from './novel'
import { Search } from './search'

export const stores = types
  .model({
    recommendStore: Recommend,
    bookrackStore: Bookrack,
    mineStore: Mine,
    loginStore: Login,
    readerStore: Reader,
    searchStore: Search,
    introStore: Intro,
  })
  .create({
    recommendStore: Recommend.create(),
    bookrackStore: Bookrack.create(),
    mineStore: Mine.create(),
    loginStore: Login.create(),
    readerStore: Reader.create(),
    searchStore: Search.create(),
    introStore: Intro.create(),
  })

// Create the stores context
export const storesContext = React.createContext<Instance<typeof stores> | null>(null)