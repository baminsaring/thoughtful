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

    /*** Create new user: Sign up ***/
    async signUpWithEmail(fullName: string, email: string, password: string, avatarUrl: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName,
                        avatar_url: avatarUrl
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