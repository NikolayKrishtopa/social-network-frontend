import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserTypeExt, UserType, UserLoginType } from '../../models/models';
import URL_ENDPOINTS from '../../utils/url-endpoints';
import SYSTEM_MESSAGES from '../../utils/system-messages';
import BASE_URL from '../../utils/base-url';

interface IAuthState {
  currentUser: UserTypeExt;
  isLogged: boolean;
  error: null | string;
  isLoading: boolean;
  systMsgAuth: string;
}

export const logout = createAsyncThunk<
  { withMsg: boolean },
  { withMsg: boolean }
>('auth/logout', async ({ withMsg }) => {
  await fetch(BASE_URL + URL_ENDPOINTS.LOGOUT, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return { withMsg };
});
export const login = createAsyncThunk<UserTypeExt, UserLoginType>(
  'auth/login',
  async (payload) => {
    const response = await fetch(BASE_URL + URL_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(SYSTEM_MESSAGES.LOGIN_FAIL);
    }
  }
);

export const regUser = createAsyncThunk<UserTypeExt, UserType>(
  'auth/regUser',
  async (payload) => {
    const response = await fetch(BASE_URL + URL_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload, avatar: payload.avatar === '' ? null : payload.avatar}),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(SYSTEM_MESSAGES.REGISTER_FAIL);
    }
  }
);
export const editUser = createAsyncThunk<UserTypeExt, UserType>(
  'auth/editUser',
  async (payload) => {
    const response = await fetch(BASE_URL + URL_ENDPOINTS.USERS_ME, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload, avatar: payload.avatar === '' ? null : payload.avatar}),
      credentials: 'include',
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(SYSTEM_MESSAGES.LOGIN_FAIL);
    }
  }
);

export const checkAuth = createAsyncThunk<
  UserTypeExt,
  void,
  { rejectValue: string }
>('auth/checkAuth', async function (_, { dispatch, rejectWithValue }) {
  try {
    const res = await fetch(BASE_URL + URL_ENDPOINTS.USERS_ME, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.ok) {
      const user = await res.json();
      return user;
    } else {
      dispatch(logout({ withMsg: false }));
      throw new Error(SYSTEM_MESSAGES.COOKIES_EXPIRED);
    }
  } catch (err: any) {
    dispatch(logout({ withMsg: false }));
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    isLogged: false,
    error: null,
    isLoading: false,
    systMsgAuth: '',
  } as IAuthState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutWithPopup: (state) => {
      state.isLogged = false;
      state.currentUser = {
        email: '',
        password: '',
        name: '',
        city: '',
        college: '',
        avatar: '',
        status: '',
        gender: '',
        _id: '',
        friends: [],
      };
      state.systMsgAuth = SYSTEM_MESSAGES.LOGOUT_SCSS;
    },
    clearSystMsgAuth: (state) => {
      state.systMsgAuth = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.isLogged = true;
        state.systMsgAuth = SYSTEM_MESSAGES.LOGIN_SCSS;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = `${error.name}: ${error.message}`;
        state.systMsgAuth = error.message as string;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.currentUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.systMsgAuth = SYSTEM_MESSAGES.COOKIES_EXPIRED;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.systMsgAuth = action.payload.withMsg
          ? SYSTEM_MESSAGES.LOGOUT_SCSS
          : '';
        state.currentUser = {
          email: '',
          password: '',
          name: '',
          city: '',
          college: '',
          avatar: '',
          status: '',
          gender: '',
          _id: '',
          friends: [],
        };
        state.isLogged = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name}: ${action.error.message}`;
        state.currentUser = {
          email: '',
          password: '',
          name: '',
          city: '',
          college: '',
          avatar: '',
          status: '',
          gender: '',
          _id: '',
          friends: [],
        };
        state.isLogged = false;
      })
      .addCase(regUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state) => {
        state.isLoading = false;
        state.systMsgAuth = SYSTEM_MESSAGES.REGISTER_SCSS;
        state.error = null;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name}: ${action.error.message}`;
        state.systMsgAuth = SYSTEM_MESSAGES.REGISTER_FAIL;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.systMsgAuth = SYSTEM_MESSAGES.PROFILE_UPDATE_SCSS;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name}: ${action.error.message}`;
        state.systMsgAuth = SYSTEM_MESSAGES.PROFILE_UPDATE_FAIL;
      });
  },
});
export const {
  startLoading,
  clearSystMsgAuth,
  logoutWithPopup,
  setCurrentUser,
} = authSlice.actions;
export default authSlice.reducer;
