import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/UsersSlice";
const store = configureStore({
  reducer: reducer,
});
export default store;
