import store from "../store"

export const authHeader = () => {
    const currUser = store.getState().user;
    return {
      'Accept': '*/*',
      "Content-Type": "application/json",
      authorization: currUser?.token,
    };
} 
