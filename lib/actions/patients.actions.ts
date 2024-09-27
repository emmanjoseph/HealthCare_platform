'use server'

import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import {InputFile}from 'node-appwrite/file'

const DATABASEID = '66f3c60100302ebb96f1'
const PATIENTCOLLECTIONID = '66f3c666001ccfd34456'

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create a new user
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newuser });
    return newuser;
  } catch (error: any) {
    if (error?.code === 409) {
      // If user already exists, fetch the existing user by email
      const document = await users.list([Query.equal("email", [user.email])]);
      return document?.users[0];
    } else {
      console.error("Error creating user:", error);
      throw error;
    }
  }
};


export const getUser = async (userId:string)=>{
  try {
    const user = await users.get(userId);
    return parseStringify(user)
  } catch (error) {
    console.log(error);
    
  }
}
export const getPatient = async (userId:string)=>{
  try {
    const patient = await databases.listDocuments(
      DATABASEID,
      PATIENTCOLLECTIONID,
      [
        Query.equal('userId',userId)
      ]
    )

    return patient.documents[0];
  } catch (error) {
    console.log(error);
    
  }
}

export const registerPatients = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    let fileUrl = '';

    if (identificationDocument) {
      // Create InputFile from buffer and upload it
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      );

      // Upload the file to storage
      const BUCKET_ID = '66f3c752002f50a5a622'
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

      // Construct the file URL
      const endpoint = 'https://cloud.appwrite.io/v1';
      const PROJECT_ID = '66f3c309001d0630cd43'
      fileUrl = `${endpoint}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    }

    // Create the patient document with the uploaded file's ID and URL
    const newPatient = await databases.createDocument(
      DATABASEID, // Database ID
      '66f3c666001ccfd34456', // Collection ID
      ID.unique(),
      {
        identificationDocumentId: file?.$id,
        identificationDocumentUrl: fileUrl,
        ...patient, // Include other patient fields here
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("Error registering patient:", error);
    throw error; // Rethrow error for further handling
  }
};



