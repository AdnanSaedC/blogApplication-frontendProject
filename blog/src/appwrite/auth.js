import config from "../config/config.js";
import {ID,Client,Account} from "appwrite";



export class AuthService {
    //the goal of this approach tomorrow when we are changing our backnd just chnage the defination of the functions and your frontend remains safe
    // in order to create an account usigng appwrite we need client and account
    client = new Client()
    account;

    constructor(){
        this.client
                .setProject(config.appwriteProjectId)
                .setEndpoint(config.appwriteUrl)

        this.account=new Account(this.client)
    }

    async createAccount({email,password,username}){
        try {
           const userAccount = await this.account.create(
            ID.unique(),email,password,username)

            if(userAccount){
                //login the user
                return this.loginAccount({email,password})
            }
            else{
                return userAccount
            }

        } catch (error) {
                        console.log("appwrite createAccount error"+error)
            throw error
        }
    }

    async loginAccount({email,password}){
        try {
            
            return  this.account.createEmailPasswordSession(email,password)
        } catch (error) {
                        console.log("appwrite login error"+error)
            throw error;
        }
    }

    async getCurrentUser(){

        
        try {
            // here we are not checking anything like whether user is there or  not for safety purpose lets return null in the bottom
            return await this.account.get()
        } catch (error) {
            console.log("getCurrentUserError: "+error)
        }

        return null
    }

    async logout(){
        
        try {
        
            return await this.account.deleteSessions()
            
        } catch (error) {
            console.log("appwrite logout error"+error)
            throw error
        }
    }
}

const authService = new AuthService()

export default authService