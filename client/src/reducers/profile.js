/*
Manages the STATE and ACTIONS for Loading Profiles
*/
import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null, // Gets user profile data
  profiles: [], // List all user profiles
  repos: [], // Github repos for user
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
