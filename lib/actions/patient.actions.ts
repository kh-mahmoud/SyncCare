'use server'



import { ID, InputFile, Query } from "node-appwrite";
import { appwriteConfig, databases, storage, users } from '../appwrite.config';
import { CreateUserParams, RegisterUserParams } from './../../types/index';
import { parseStringify } from "../utils";


export const CreateUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )

        return newUser


    } catch (error) {
        console.log(error)
    }
}

export const GetUser = async (userId: string) => {
    try {

        const user = await users.get(userId)

        return user

    } catch (error) {
        console.log(error)
    }
}

export const registerPatient = async ({identificationDocument,...patient}: RegisterUserParams) => {
    try {
        let file;


        // //store the files in the bucket
        if (identificationDocument) {
            const inputFile =
                identificationDocument &&
                InputFile.fromBlob(
                    identificationDocument?.get("blobFile") as Blob,
                    identificationDocument?.get("fileName") as string
                );

            file = await storage.createFile(appwriteConfig.bucketId!, ID.unique(), inputFile);
        }

        //store patient infos

        const newPatien = await databases.createDocument(
            appwriteConfig.databaseId!,
            appwriteConfig.patientCollection!,
            ID.unique(),
            {
                ...patient,
                identificationDocumentId:file?.$id || null,
                identificationDocumentUrl:file?.$id ?
                 `${appwriteConfig.endpoint!}/storage/buckets/${appwriteConfig.bucketId!}/files/${file.$id}/view??project=${appwriteConfig.projectId!}`
                : null
            }
        )

        return newPatien

    } catch (error) {
        console.log(error)
    }
}


export const GetPatient = async (userId: string) => {
    try {

        const patient = await databases.listDocuments(
            appwriteConfig.databaseId!,
            appwriteConfig.patientCollection!,
            [Query.equal("userId", [userId])]
        )

        return parseStringify(patient.documents[0])

    } catch (error) {
        console.log(error)
    }
}

