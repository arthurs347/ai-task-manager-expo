import axios from "axios";
import {authenticateAndGetUser, authenticateUser} from "@/actions/authActions";
import type {User} from "@prisma/client";
import {generateAPIUrl} from "@/utils/apiUtils";

/**
 * Creates a user if no user is found in the db with the same email
 * */
export async function createUserAction() {
	const user = authenticateAndGetUser();

	const userData: User = {
		id: user.id,
		email: user.emailAddresses[0].emailAddress,
		fullName: user.fullName,
		image: user.imageUrl,
	};

	return axios
		.post(generateAPIUrl(`/api/users`), JSON.stringify(userData))
		.then((response) => {
			return response.data;
		})
		.catch(() => {
			throw new Error("Failed to create user");
		});
}

export function getCurrentUserId(): string {
	const user = authenticateUser();

	return user.id;
}
