import { supabase } from "./supabase";

const TABLE_NAME = "profiles"

const profileService = {

    async getUserData(user_id: number) {
        const { data, error } = await supabase
        .from(TABLE_NAME)
        .select()
        .eq('id', user_id)

        return {
            data: data,
            error: error
        }
    },

    async insertBookmark(userId: number, bookmarkArr: number[]) {
        try {
            const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({
                bookmarks: bookmarkArr
            })
            .eq('id', userId)
            .select()

            if (error) {
                console.log("insertBookmark :: error : ", error);
            }

            return data;
        } catch (error) {
            console.log("profileService :: Error: Unable to add article in the bookmarks, ", error);
        }
    },

    async getBookmarks(userId: number) {
        try {
            const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('bookmarks')
            .eq('id', userId)
            .single()

            return data;
        } catch (error) {
            console.log("profileService :: Error: Unable to get article in the bookmarks, ", error);
        }
    },

    async checkIsAlreadyExist(articleId: number, userId: number) {
        try {
            const { data, status, error } = await supabase
            .from(TABLE_NAME)
            .select('bookmarks')
            .eq("id", userId)
            .contains('bookmarks', [articleId])

            if (error) console.log("profileService :: Error : ", error)

            return data?.length != 0  ? true : false;
        } catch (error) {
            console.log("profileService :: Error: Unable to get article in the bookmarks, ", error);
        }
    }
}

export default profileService