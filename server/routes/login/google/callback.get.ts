import { OAuth2RequestError } from "arctic";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;

    const storedState = getCookie(event, "google_oauth_state") ?? null;
    const storedCodeVerifier = getCookie(event, "google_code_verifier") ?? null;

    // 1. Validasi State
    if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
        throw createError({ statusCode: 400, statusMessage: "Invalid OAuth state" });
    }

    try {
        // 2. Tukar Code -> Token
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

        const accessToken = tokens.accessToken();
        
        // 3. Ambil User Info
        const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}` // Gunakan variable string yang sudah diambil
            }
        });
        
        const googleUser = await googleUserResponse.json();

        // 4. Cek User di Database
        // Cek by Google ID
        let user = await prisma.user.findUnique({
            where: { googleId: googleUser.sub }
        });

        // Jika tidak ketemu by Google ID, cek by Email (untuk link account)
        if (!user) {
            user = await prisma.user.findUnique({
                where: { email: googleUser.email }
            });

            if (user) {
                // User ada (via email), update Google ID-nya
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: googleUser.sub } // updatedAt otomatis diurus Prisma
                });
            }
        }

        // Jika benar-benar user baru, buat user
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: crypto.randomUUID(),
                    googleId: googleUser.sub,
                    email: googleUser.email,
                    name: googleUser.name,
                    avatarUrl: googleUser.picture
                    // Tidak perlu updatedAt manual lagi!
                }
            });
        }

        // 5. Buat Session Lucia
        const session = await lucia.createSession(user.id, {});
        appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());

        return sendRedirect(event, "/");

    } catch (e: any) {
        // Log error ke terminal agar kelihatan jelas
        console.error("ERROR CALLBACK:", e); 
        
        if (e instanceof OAuth2RequestError) {
            throw createError({ statusCode: 400, statusMessage: "Invalid code" });
        }
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});