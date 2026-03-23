import { supabase } from "./supabase";

const TABLE_NAME = "posts";


const postService = {

    async getArticlesById(articleIdArr: number[]) {
        try {
            const {data, error} = await supabase
            .from(TABLE_NAME)
            .select()
            .in('id', articleIdArr) 

            //console.log("Article Arr Data: ", data);
            
            return data;
        } catch (error) {
            console.log("postArticle Error: Unable to get articles by id!");
        }
    },

    async getArticles() {
        try {
            const { data, error } = await supabase.from(TABLE_NAME).select("*");

            if (error) {
                console.log("postArticle Error: Unable to get articles!");
            }

            return {
                data: data,
                error: error
            };
        } catch (error: any) {
            return {
                error: error.messge || "Unable to get posts!"
            }
        }
    },

    async uploadArticle(title: string, content: string, userId: number) {
        try {
            const response = await supabase
            .from(TABLE_NAME)
            .insert({
                title: title,
                content: content,
                author_id: userId
            })
            //console.log("Upload post: ", response.status);
            if (response.status != 201) return { success: false }

            return { success: true }
        } catch (error: any) {
            console.log("postService :: error: Failed to upload article!")
            return {
                success: false
            }
        }
    },

    async updateArticle(articleId: number ,title: string, content: string) {
        try {
            const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ title, content})
            .eq('id', articleId)
            .select()

            return data;
        } catch (error: any) {
            return {
                error: error.message || "Failed to update post!"
            }
        }
    },

    async deleteArticle(articleId: number) {
        try {
            const response = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', articleId)

            if (response.status != 204) {
                console.log("postService::Error: Unable to delete post!")
                return {
                    success: false
                }
            }

            return {
                success: true
            }
        } catch (error: any) {
            return {
                success: false
            }
        }
    }

}

export default postService;