import { supabase } from "./supabase";

const TABLE_NAME = "posts";


const postService = {

    async getArticle() {

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
            const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert({
                title: title,
                content: content,
                user_id: userId
            })

            console.log("Upload post: ", data);
        } catch (error: any) {
            return {
                error: error.messge || "Failed to create post"
            }
        }
    },

    async updateArticle(postId: number ,title: string, content: string, coverImageUrl: string) {
        try {
            const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ title, content, coverImageUrl })
            .eq('id', postId)
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

            console.log("Article id delete:", articleId)

            const response = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', articleId)
            
            console.log("Delete response: ", response)
            if (!response) {
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