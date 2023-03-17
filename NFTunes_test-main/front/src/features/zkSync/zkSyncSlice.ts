import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../modules/store'

export interface AccountState {
  value: string | null
}

const initialState: AccountState = {
  value: null
}

