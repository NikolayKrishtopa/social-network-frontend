import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import URL_ENDPOINTS from '../../utils/url-endpoints';
import SYSTEM_MESSAGES from '../../utils/system-messages';
import { UserTypeExt } from '../../models/models';
import BASE_URL from '../../utils/base-url';

interface IUsersState {
  users: Array<UserTypeExt>
  currentUser: UserTypeExt | null
  error: string | null
  isLoading: boolean
  systMsgUsers: string
}

export const getUsers = createAsyncThunk<
Array<UserTypeExt>,
void,
{ rejectValue: string }
>('about/getUsers', async function (_, { dispatch, rejectWithValue }) {
  try {
    const res = await fetch(
      BASE_URL + URL_ENDPOINTS.USERS,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );
    if (!res.ok) {
      throw new Error(SYSTEM_MESSAGES.GET_USERS_FAIL);
    }
    const users = await res.json();
    return users;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const getFriends = createAsyncThunk<
Array<UserTypeExt>,
void,
{ rejectValue: string }
>('about/getFriends', async function (_, { dispatch, rejectWithValue }) {
  try {
    const res = await fetch(
      BASE_URL + URL_ENDPOINTS.FRIENDS,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );
    if (!res.ok) {
      throw new Error(SYSTEM_MESSAGES.GET_USERS_FAIL);
    }
    const users = await res.json();
    return users;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const addUserToFriends = createAsyncThunk<
UserTypeExt,
string,
{ rejectValue: string }
>('about/addUserToFriends', async function (id, { dispatch, rejectWithValue }) {
  try {
    const res = await fetch(
      `${BASE_URL}${URL_ENDPOINTS.FRIENDS}/${id}/connect`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );
    if (!res.ok) {
      throw new Error(SYSTEM_MESSAGES.DEFAULT_ERR);
    }
    const user = await res.json();
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const removeUserFromFriends = createAsyncThunk<
UserTypeExt,
string,
{ rejectValue: string }
>('about/addUserToFriends', async function (id, { dispatch, rejectWithValue }) {
  try {
    const res = await fetch(
      `${BASE_URL}${URL_ENDPOINTS.FRIENDS}/${id}/connect`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );
    if (!res.ok) {
      throw new Error(SYSTEM_MESSAGES.DEFAULT_ERR);
    }
    const user = await res.json();
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});



const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: {
    users: [],
    currentUser: null,
    error: null,
    isLoading: false,
    systMsgUsers: '',
  } as IUsersState,
  reducers: {
    clearSystMsgUsers: (state) => {
      state.systMsgUsers = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = `${error.name}: ${error.message}`;
      })
      .addCase(getFriends.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getFriends.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = `${error.name}: ${error.message}`;
      })
      .addCase(addUserToFriends.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addUserToFriends.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.users = [...state.users.filter(u=>u._id !== action.payload._id), action.payload];
      })
      .addCase(addUserToFriends.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = `${error.name}: ${error.message}`;
      })
      .addCase(removeUserFromFriends.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(removeUserFromFriends.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.users = [...state.users.filter(u=>u._id !== action.payload._id), action.payload];
      })
      .addCase(removeUserFromFriends.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = `${error.name}: ${error.message}`;
      });
      
  }
});
export const {  clearSystMsgUsers } = usersSlice.actions;
export default usersSlice.reducer;
