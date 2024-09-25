import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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
