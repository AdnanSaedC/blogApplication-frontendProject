import config from "../config/config.js";
import {ID,Client,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
                .setProject(config.appwriteProjectId)
                .setEndpoint(config.appwriteUrl)
        this.databases= new Databases(this.client)
        this.bucket= new Storage(this.client)
    }

    async createPost({title,slug,content,image,status,userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Error in create post"+error)
            throw error
        }        
    }

    async updatePost(slug,{title,content,image,status}){
         try {
            return await this.databases.updateDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        } catch (error) {
            console.log("Error in update post"+error)
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
            )

            return true
        } catch (error) {
            console.log("error in deleting the document"+error)
        }

        return false
    }

    async getSinglePost(slug){
        try {
             
            return await this.databases.getDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
            )

            r
        } catch (error) {
            console.log("error in getting the post"+error)
            throw error
        }
    }

    async getPost(queries=[Query.equal("status","active")]){
        // we are trying to fetch only those post where the active status id true
        // we can apply query on those attributes where we ahve turned indexing on
        try {
            return await this.databases.listDocuments(
                config.appwriteUrl,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error in getting the document"+error)
        }
    }


    // file services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error while uploading file")
            return false
        }
    }

    async deleteFile(fileId){
        // u will get this while creating the file
        try {
            await this.databases.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("error while deleting the file"+error)
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("error while getting file preview"+error)
            return false
        }
    }
}

const service = new Service()

export default service