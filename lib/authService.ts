import { Alert } from "react-native";
import { supabase } from "./supabase";

const authService = {

    /*** Get user ****/
    async getUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            return user;
        } catch (error) {
            return null
        }
    },

    async updateUser(fullName: string, avatarUrl: string = "", avatarFilePath: string = "") {
        try {
            const { data: { user }, error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    avatar_url: avatarUrl,
                    avatar_file_path: avatarFilePath
                }
            })

            return {
                data: user,
                success: true,
                error: error
            }
        } catch (error: any) {
            return {
                error: error.message
            }
        }
    },

    /*** Create new user: Sign up ***/
    async signUpWithEmail(fullName: string, email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName,
                        avatar_url: "",
                        avatar_file_path: "",
                    }
                }
            })

            return {
                data: data,
                error: error
            }
        } catch (error: any) {
            return {
                error: error.message || "Sign up with email failed. Try again!"
            }
        }
    },

    /*** Login ***/
    async signInWithEmail(email: string, password: string) {
        try {
            const { data: { session }, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            return {
                data: session,
                error: error
            }
        } catch (error: any) {
            return {
                error: "Login failed. Wrong credentials!"
            }
        }
    },

    /*** Logout ***/
    async logout() {
        try {
            const { error } = await supabase.auth.signOut({ scope: 'local' })

            if(error) {
                Alert.alert("Logout failed!")
            }

            return {
                success: true
            }
        } catch (error: any) {
            return {
                error: error.message || "Logout failed. Try again!"
            }
        }
    }
}




export default authService