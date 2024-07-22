import conf from "../conf/conf.js";
import { Client,ID,Databases,Query,Storage } from "appwrite";

export class Service{
  client=new Client();
  databases;
  bucket;

  constructor(){
    this.client
               .setEndpoint(conf.appwriteUrl)
               .setProject(conf.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
  }

  async createPost({title,slug,content,feautredImage,status,userId}){
               try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        feautredImage,
                        status,
                        userId,
                    }
                )
               } catch (error) {
                throw error
               }
  }
  async updatePost(slug, {title, content, feautredImage, status}){    try{
        await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                feautredImage,
                status,
            }
        )
    }
    catch(error){
        throw error
    }
}
async deletePost(slug){
try{
    await this.databases.deleteDocument(
        conf.appwriteProjectId,
        conf.appwriteCollectionId,
        slug
    )
    return true
}
catch(error){
    throw error
}
}
async getPost(slug){
try{
    await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,

    )
}
catch(error){
    throw error
}
}

async getPosts(queries=[Query.equal('status','active')]){
    try{
        return this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        )
    } catch(error){
        throw error
    }
           
}
//UPLOAD FILE
async uploadFile(file){
       try{
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
        )
       }catch(error){
        throw error
       }
}
//DELETE FILE
async deleteFile(fileID){
    try{
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileID,
        )
        return true
    } catch(error){
        throw error
    }
}
async getFilePreview(fileID){
    
return  this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID,
        )
    }
    // async getFilePreview(fileID) {
    //     try {
    //         const result = await this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
    //         return result.href; // Ensure it returns the URL string
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}


const service=new Service();
export default service;
