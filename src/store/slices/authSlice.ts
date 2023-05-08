import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserTypeExt, UserType, UserLoginType } from '../../models/models';
import URL_ENDPOINTS from '../../utils/url-endpoints';
import SYSTEM_MESSAGES from '../../utils/system-messages';
import BASE_URL from '../../utils/base-url';


interface IAuthState {
  currentUser: UserTypeExt | null
  isLogged: boolean
  error: null | string
  isLoading: boolean
  systMsgAuth: string
  mustChgPswd: boolean
}

export const login = createAsyncThunk<
UserTypeExt,
UserLoginType
>(
  'auth/login',
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await fetch(
      BASE_URL + URL_ENDPOINTS.LOGIN,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(SYSTEM_MESSAGES.LOGIN_FAIL);
    }
  }
);

export const register = createAsyncThunk<
UserTypeExt,
UserType
>(
  'auth/login',
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await fetch(
      BASE_URL + URL_ENDPOINTS.REGISTER,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
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
>(
  'auth/checkAuth',
  async function (_, { dispatch, rejectWithValue }) {
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
        dispatch(logout());
        throw new Error(SYSTEM_MESSAGES.COOKIES_EXPIRED);
      }
    } catch (err: any) {
      dispatch(logout());
      return rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLogged: false,
    error: null,
    isLoading: false,
    systMsgAuth: '',
    mustChgPswd: false
  } as IAuthState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    logout: (state) => {
      state.isLogged = false;
      state.currentUser = null;
    },
    logoutWithPopup: (state) => {
      state.isLogged = false;
      state.currentUser = null;
      state.systMsgAuth = SYSTEM_MESSAGES.LOGOUT_SCSS;
    },
    setMustChgPswd: (state, action) => {
      state.mustChgPswd = action.payload;
    },
    showPasswordAlert: (state) => {
      state.systMsgAuth = SYSTEM_MESSAGES.FORGOT_PASSWORD_ALERT;
    },
    clearSystMsgAuth: (state) => {
      state.systMsgAuth = '';
    }
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
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.error.name}: ${action.error.message}`;
        state.systMsgAuth = SYSTEM_MESSAGES.COOKIES_EXPIRED;
      });
      
  }
});
export const {
  logout,
  startLoading,
  clearSystMsgAuth,
  logoutWithPopup,
  showPasswordAlert,
  setMustChgPswd
} = authSlice.actions;
export default authSlice.reducer;
