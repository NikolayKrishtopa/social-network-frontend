import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import URL_ENDPOINTS from '../../utils/url-endpoints';
import SYSTEM_MESSAGES from '../../utils/system-messages';
import { PostType } from '../../models/models';
import BASE_URL from '../../utils/base-url';

interface IPostsState {
  posts: Array<PostType>
  postsPageNo: number
  error: null | string
  isLoading: boolean
  systMsgPosts: string
}

export const getPosts = createAsyncThunk<
Array<PostType>,
number,
{ rejectValue: string }
>(
  'posts/getPosts',
  async function (page, { dispatch, rejectWithValue }) {
    dispatch(startLoading());
    try {
      const res = await fetch(
        '',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        }
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(SYSTEM_MESSAGES.ERROR_404);
        } else {
          throw new Error(SYSTEM_MESSAGES.GET_POSTS_FAIL);
        }
      }
      const postsList = await res.json();
      return postsList;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const addPost = createAsyncThunk<
PostType,
{text: string},
{ rejectValue: string }
>(
  'posts/addPost',
  async function (post, { dispatch, rejectWithValue }) {
    dispatch(startLoading());
    try {
      const res = await fetch(
        BASE_URL + URL_ENDPOINTS.POSTS,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(post)
        }
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(SYSTEM_MESSAGES.ERROR_404);
        } else {
          throw new Error(SYSTEM_MESSAGES.ADD_POSTS_FAIL);
        }
      }
      const posts = await res.json();
      return posts;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const likePost = createAsyncThunk<
PostType,
string,
{ rejectValue: string }
>(
  'posts/likePost',
  async function (id, { dispatch, rejectWithValue }) {
    dispatch(startLoading());
    try {
      const res = await fetch(
        BASE_URL + URL_ENDPOINTS.POSTS + '/' + id + '/like',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(SYSTEM_MESSAGES.ERROR_404);
        } else {
          throw new Error(SYSTEM_MESSAGES.DEFAULT_ERR);
        }
      }
      const posts = await res.json();
      return posts;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const unlikePost = createAsyncThunk<
PostType,
string,
{ rejectValue: string }
>(
  'posts/unlikePost',
  async function (id, { dispatch, rejectWithValue }) {
    dispatch(startLoading());
    try {
      const res = await fetch(
        BASE_URL + URL_ENDPOINTS.POSTS + '/' + id + '/like',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(SYSTEM_MESSAGES.ERROR_404);
        } else {
          throw new Error(SYSTEM_MESSAGES.DEFAULT_ERR);
        }
      }
      const posts = await res.json();
      return posts;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: {
    posts: [],
    postsPageNo: 1,
    error: null,
    isLoading: false,
    systMsgPosts: '',
  } as IPostsState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    clearSystMsgPosts: (state) => {
      state.systMsgPosts = '';
    },
    incPostsPage: (state) => {
      state.postsPageNo += 1;
    },
    cleanPosts: (state) => {
      state.postsPageNo = 1; 1;
      state.error = null;
      state.isLoading = false;
      state.systMsgPosts = '';
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.posts = [
          ...state.posts,
          ...action.payload.filter(
            (e) => !state.posts.some((c) => c._id === e._id)
          )
        ];
      })
      .addCase(getPosts.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = `${error.name}: ${error.message}`;
      });
  }
});
export const {
  startLoading,
  clearSystMsgPosts,
  incPostsPage,
  cleanPosts
} = postsSlice.actions;
export default postsSlice.reducer;