const initialState = {
  result: 1,
  lastValue: [],
  userName: "Ham"
};

const reducerMath = (state = initialState, action) => {
  switch (action.type) {
    case "Add":
      state = {
        ...state,
        result: state.result + action.payload,
        lastValue: [...state.lastValue, action.payload]
      };
      break;
    case "Subtract":
      state = {
        ...state,
        result: state.result - action.payload,
        lastValue: [...state.lastValue, action.payload]
      };
      break;
  }
  return state;
};

const initailProduct = {
  productName: "None",
  price: 0
};
const reducerProducts = (state = initailProduct, action) => {
  switch (action.type) {
    case "SET_NAME":
      state = {
        ...state,
        productName: action.payload
      };
      break;
    case "SET_PRICE":
      state = {
        ...state,
        price: action.payload
      };
      break;
  }
  return state;
};

export { reducerMath, reducerProducts };
