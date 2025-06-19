import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { persistMiddlware } from "./middlewares/persist-middlware";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddlware, thunk)
);
