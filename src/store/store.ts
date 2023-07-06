import { init } from '@rematch/core';

import LoginData from "./LoginData";
const models = {
    LoginData
}; 


export const store = init({
      models
    });