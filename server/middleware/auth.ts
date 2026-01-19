import { verifyRequestOrigin } from "lucia";
import type { Session, User } from "lucia";
import { lucia } from "../utils/auth";

export default defineEventHandler(async (event) => {
    // 1. CSRF Protection (Hanya untuk method non-GET)
    if (event.method !== "GET") {
		const originHeader = getHeader(event, "Origin") ?? null;
		const hostHeader = getHeader(event, "Host") ?? null;
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return event.node.res.writeHead(403).end();
		}
	}

    // 2. Baca Cookie Session
    const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
    if (!sessionId) {
        event.context.session = null;
        event.context.user = null;
        return;
    }

    // 3. Validasi Session ke Database
    const { session, user } = await lucia.validateSession(sessionId);

    // 4. Refresh Cookie jika perlu (misal masa aktif diperpanjang)
    if (session && session.fresh) {
        appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
    }
    // 5. Hapus Cookie jika session tidak valid
    if (!session) {
        appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
    }

    // 6. Simpan user ke context agar bisa diakses di API lain
    event.context.session = session;
    event.context.user = user;
});

// Update Type Definition untuk H3 Event Context
declare module "h3" {
	interface H3EventContext {
		user: User | null;
		session: Session | null;
	}
}