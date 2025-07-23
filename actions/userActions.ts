import {authenticateUser} from "@/actions/authActions";
import {User} from "@/prisma/generated/prisma/edge";
import {getClerkInstance} from "@clerk/clerk-expo";
import axios from "axios";

/**
 * Creates a user if no user is found in the db with the same email
 * */
export async function createUserAction() {
    const user = authenticateUser();
    const userId = user.id;
    const userEmail = user.emailAddresses[0].emailAddress;
    const userFullName = user.fullName;
    const userImage = user.imageUrl;

    const userData: User = {
        id: userId,
        email: userEmail,
        fullName: userFullName,
        image: userImage,
    }

    return axios.post("api/users", JSON.stringify(userData))
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error("Failed to create user");
        })
}

export function getCurrentUserId(): string | null {
    const clerk = getClerkInstance();
    return clerk?.user?.id ?? null;
}