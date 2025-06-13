import {authenticateUser} from "@/actions/auth";
import {User} from "@/prisma/generated/prisma";

/**
 * Creates a user if no user is found in the db with the same email
 * */
export async function createUserAction() {
    const user = authenticateUser()!;

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
    console.log(userData);

    await fetch("api/users", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}