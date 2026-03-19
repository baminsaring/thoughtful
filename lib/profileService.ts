import { supabase } from "./supabase";

const TABLE_NAME = "profiles"

const profileService = {

    async getCreatorInfo(user_id: number) {
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .select()
        .eq('id', user_id)

        return {
            data: data,
            error: error
        }
    }
}

export default profileService