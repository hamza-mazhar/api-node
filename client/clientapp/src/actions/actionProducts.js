const setName = name => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }, 2000);
  };
};

const setPrice = price => {
  return {
    type: "SET_PRICE",
    payload: price
  };
};

export { setName, setPrice };
