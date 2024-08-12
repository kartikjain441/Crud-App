import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users", async (data) => {
  const response = await axios.post(
    "https://66b83ccf3ce57325ac76b092.mockapi.io/users",
    data
  );
  return response.data;
});
export const UpdateUser = createAsyncThunk("use", async ({ user, id }) => {
  const response = await axios.put(
    `https://66b83ccf3ce57325ac76b092.mockapi.io/users/${id}`,
    user
  );
  return response.data;
});

export const postUsers = createAsyncThunk("usera", async () => {
  const response = await axios.get(
    "https://66b83ccf3ce57325ac76b092.mockapi.io/users"
  );
  return response.data;
});
export const DeleteUser = createAsyncThunk("DeleteUser", async (id) => {
  const response = await axios.delete(
    `https://66b83ccf3ce57325ac76b092.mockapi.io/users/${id}`
  );
  return response.data;
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "loading",
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload); // Assuming response is an individual user to be added
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Assuming response is an array of users
      })
      .addCase(postUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        state.users = state.users.filter((elem) => elem.id != id);
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UpdateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        const { id } = action.payload;
        state.users = state.users.map((elem) => {
          if (elem.id === id) {
            return action.payload;
          } else {
            return elem;
          }
        });
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { searchUser } = UserSlice.actions;
export default UserSlice.reducer;
