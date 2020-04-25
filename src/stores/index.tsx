import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { RecommendStore } from './home'
import { ReaderStore, IntroStore } from './novel'
import { SearchStore } from './search'

export const stores = types
  .model({
    recommendStore: RecommendStore,
    readerStore: ReaderStore,
    searchStore: SearchStore,
    introStore: IntroStore,
  })
  .create({
    recommendStore: RecommendStore.create(),
    readerStore: ReaderStore.create(),
    searchStore: SearchStore.create(),
    introStore: IntroStore.create(),
  })

// Create the stores context
export const storesContext = React.createContext<Instance<typeof stores> | null>(null)