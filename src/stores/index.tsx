import React from 'react'
import { RecommendStore } from './recommend/recommend'

export const storesContext = React.createContext({
  recommendStore: new RecommendStore(),
})

