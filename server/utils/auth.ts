import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./db"; // Import dari file langkah 3
import { Google } from "arctic";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
            // Secure true hanya di production (HTTPS)
			secure: !process.dev 
		}
	},
	getUserAttributes: (attributes) => {
		return {
			googleId: attributes.googleId,
			email: attributes.email,
            name: attributes.name,
            avatarUrl: attributes.avatarUrl
		};
	}
});

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!, 
    process.env.GOOGLE_CLIENT_SECRET!, 
    `${process.env.BASE_URL}/login/google/callback`
);

// Setup Typescript agar auto-complete jalan
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	googleId: string;
	email: string;
    name: string;
    avatarUrl: string;
}