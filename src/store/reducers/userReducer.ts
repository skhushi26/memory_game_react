import * as actions from "../ActionTypes";

export interface initialValues {
  token: string;
}

export interface actionParams {
  type: string;
  payload: any;
}

let initialData: initialValues = {
  token: "",
};

const reducer = (state = initialData, action: actionParams) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default reducer;
