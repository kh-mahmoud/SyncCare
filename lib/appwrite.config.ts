import * as sdk from "node-appwrite"



export const appwriteConfig=
{
  projectId:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId:process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
  bucketId:process.env.NEXT_PUBLIC_BUCKET_ID,
  patientCollection:process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION,
  doctorCollection:process.env.NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION,
  appointementCollection:process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION,
  endpoint:process.env.NEXT_PUBLIC_ENDPOINT,
  secretKey:process.env.NEXT_PUBLIC_APPWRITE_API_SCRET
}



let client = new sdk.Client();



client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!) // Replace with your project ID
    .setKey(appwriteConfig.secretKey!) // Your secret API key


export const account = new sdk.Account(client);

export const databases= new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const users = new sdk.Users(client)
export const messaging = new sdk.Messaging(client);
