// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import schoolReducer from "./schoolSlice" // assuming you have a schoolSlice.js file
import headerReducer from './headerSlice';

const store = configureStore({
  reducer: {
    school: schoolReducer,
    header_state : headerReducer
  },
});

export default store;