import {authenticateUser} from "@/actions/authActions";
import {User} from "@/prisma/generated/prisma";
import {getClerkInstance} from "@clerk/clerk-expo";

/**
 * Creates a user if no user is found in the db with the same email
 * */
export async function createUserAction() {
    const user = await authenticateUser();
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

    await fetch("api/users", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

export function getCurrentUserId(): string | null {
    const clerk = getClerkInstance();
    return clerk?.user?.id ?? null;
}