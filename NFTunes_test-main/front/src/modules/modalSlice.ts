import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from './store'

interface modalState {
  gnbStatus: '-top-0' | '-top-full',
  joinStatus: 'hidden' | '',
  scrollStatus: 'go' | 'stop'
}

const initialState: modalState = {
  gnbStatus: '-top-full',
  joinStatus: 'hidden',
  scrollStatus: 'go'
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleGnb: (state) => {
      if (state.gnbStatus !== '-top-0') {
        state.gnbStatus = '-top-0'
      } else {
        state.gnbStatus = '-top-full'
      }
    },
    handleJoin: (state) => {
      if (state.joinStatus !== '') {
        state.joinStatus = ''
      } else {
        state.joinStatus = 'hidden'
      }
    },
    handleScroll: (state) => {
      if (state.joinStatus === '' || state.gnbStatus === '-top-0') {
        state.scrollStatus = 'stop'
      } else {
        state.scrollStatus = 'go'
      }
    }
  }
})

export const { handleGnb, handleJoin, handleScroll } = modalSlice.actions

export const gnbCount = (state: AppState) => state.modal.gnbStatus
export const joinCount = (state: AppState) => state.modal.joinStatus
export const scrollCount = (state: AppState) => state.modal.scrollStatus

export default modalSlice.reducer
