import { configureStore } from "@reduxjs/toolkit";
import { setAutoFreeze } from 'immer';

import userSlice from './slice/user.slice';

setAutoFreeze(false);

export const store = configureStore({
    reducer: {
        user: userSlice,
    }
});