import { generateState, generateCodeVerifier } from "arctic";
import { google } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	// Buat URL login Google
	const url = google.createAuthorizationURL(state, codeVerifier, ["profile", "email"]);

    // Simpan state & verifier di cookie (penting untuk keamanan)
	setCookie(event, "google_oauth_state", state, {
		path: "/",
		secure: !process.dev,
		httpOnly: true,
		maxAge: 60 * 10, // 10 menit
		sameSite: "lax"
	});
    
	setCookie(event, "google_code_verifier", codeVerifier, {
		path: "/",
		secure: !process.dev,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return sendRedirect(event, url.toString());
});