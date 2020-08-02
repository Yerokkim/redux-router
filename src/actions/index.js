import axios from "axios";
export const FETCH_POST = "FETCH_POST";
export const CREATE_POST = "CREATE_POST";
export const GET_POST = "GET_POST";
export const DELETE_POST = "DELETE_POST";
import _ from "lodash";

const api = "http://reduxblog.herokuapp.com/api";
const api_key = "?key=yerok1234";

export const fetchPost = () => (dispatch) => {
  axios
    .get(`${api}/posts${api_key}`)
    .then((res) => {
      console.log(res);
      let formedObj = _.mapKeys(res.data, "id");
      dispatch({ type: "FETCH_POST", payload: formedObj });
    })
    .catch((e) => console.log(e));
};

export const createPost = (value, callback) => (dispatch) => {
  axios
    .post(`${api}/posts${api_key}`, {
      title: value.title,
      category: value.category,
      content: value.content,
    })
    .then((res) => {
      dispatch({
        type: "CREATE_POST",
        payload: res,
      });
      callback();
    });
};

export const getPost = (id) => (dispatch) => {
  axios.get(`${api}/posts/${id}${api_key}`).then((res) => {
    dispatch({ type: "GET_POST", payload: res });
  });
};

export const deletePost = (id, callback) => (dispatch) => {
  axios.delete(`${api}/posts/${id}${api_key}`).then(() => {
    dispatch({ type: "DELETE_POST", payload: id });
    callback();
  });
};
