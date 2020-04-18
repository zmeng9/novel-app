import React from 'react'
import { storesContext } from '../stores'

export const useStores = () => {
  const stores = React.useContext(storesContext)
  if (!stores)
    throw new Error('useStores must be used within a StoreProvider')

  return stores
}