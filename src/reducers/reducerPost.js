import { FETCH_POST, GET_POST } from "../actions";
import _ from "lodash";

const initialState = {
  posts: [],
};
export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_POST:
      return {
        ...state,
        [actions.payload.data.id]: actions.payload.data,
      };
    case FETCH_POST:
      return {
        ...state,
        posts: actions.payload,
      };

    default:
      return state;
  }
}
