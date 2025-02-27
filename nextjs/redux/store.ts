import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from "@/redux/items.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      items: itemsReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']