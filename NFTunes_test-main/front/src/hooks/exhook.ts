/* AppDispatch, AppState 사용 예제*/
import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// import store.
import type { AppDispatch, AppState } from '../modules/store'

// Use throughout your hooks instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
