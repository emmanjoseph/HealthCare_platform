import * as sdk from "node-appwrite";

export const {
    NEXT_PUBLIC_ENDPOINT,
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  } = process.env;

  // const client = new sdk.Client();
  // client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66f3c309001d0630cd43").setKey(API_KEY!);
  const client = new sdk.Client();
client.setEndpoint("https://cloud.appwrite.io/v1") 
      .setProject("66f3c309001d0630cd43") // Hardcoded Project ID for debugging
      .setKey("standard_5e0e9921b184c1ded4487f99eb0840ac9813b3f6254515449d51646e2a202b049895c7831f6b2abee697f9f19b7bc5be1e6056b40d90581bde9aff4d695f3e0553a7955e3c2bc3acbcc375d4a48211758cdde5b7cc7859de8680588b61284f8b51d182f6cfd0e056ba0cc24b21ea8bcc989aa44a1b97bda8025a999e5d141d14");


  export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);

