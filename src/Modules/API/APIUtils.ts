import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const invokeSupabaseFunction = async <T>(name: string, body: T) => {
    const { data, error } = await supabase.functions.invoke<T>(name, {
        body,
    });
    if (error) {
        if (error instanceof FunctionsHttpError) {
            const errorMessage = await error.context.json();
            throw new Error(errorMessage.error);
        } else {
            throw error;
        }
    }
    return data;
}
