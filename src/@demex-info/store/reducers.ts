import { combineReducers } from "redux";
import app from "./app/reducers";
import layout from "./layout/reducers";
import markets from "./markets/reducers";
import pools from "./pools/reducers";
import staking from "./staking/reducers";

export default combineReducers({
  app,
  layout,
  markets,
  pools,
  staking,
});
