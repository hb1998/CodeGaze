import * as djwt from "https://deno.land/x/djwt@v2.2/mod.ts";
const { create, getNumericDate, verify } = djwt


const algorithm = "HS512"
export const createJWT = async (data) => {
    const TWO_HOURS = 60 * 60 * 2;
    return await create({ alg: algorithm, typ: "JWT" }, { ...data, exp: getNumericDate(TWO_HOURS) }, Deno.env.get('JWT_SECRET'))
}

export const verifyJWT = async (token) => {
    return await verify(token, Deno.env.get('JWT_SECRET'), algorithm)
}