export default defineEventHandler(async (event) => {
	if (!event.context.session) {
		throw createError({
			statusCode: 403
		});
	}
    
    // Hapus session di database
	await lucia.invalidateSession(event.context.session.id);
    
    // Hapus cookie di browser
	appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
    
    return { success: true };
});