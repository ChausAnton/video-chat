import { createSlice } from '@reduxjs/toolkit';
// Utils
import { removeCookie, setCookie } from '@utils/cookie';
import { isAuthenticated } from '@utils/cookie';

const getInitialState = () => ({
  userInfo: {},
  isAuth: isAuthenticated(),

});

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    logIn:(_, { payload: { token, user }}) => {
      setCookie('accessToken', token);
      return {
        ...getInitialState(),
        user,
      };
    },

    logOut: () => {
      removeCookie('accessToken');

      return getInitialState();
    },
  },
});

export const { setUserInfo, logOut, logIn } = userSlice.actions;

export default userSlice.reducer;
