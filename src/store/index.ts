import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import * as models  from "./models"
import {IRootModel} from './IModels'
 const store = init({
   models
});
export default store
export type IStore = typeof store;
export type IDispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel>;
