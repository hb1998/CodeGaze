import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import * as models from "./models"
import { IRootModel } from './IModels'
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const store = init({
  models,
  plugins: [persistPlugin(persistConfig) as any],

});
export default store
export type IStore = typeof store;
export type IDispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel>;
