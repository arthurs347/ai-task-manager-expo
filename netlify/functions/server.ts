import serverless from 'serverless-http';

let cachedHandler: any | null = null;

async function ensureHandler() {
    if (cachedHandler) return cachedHandler;

    const mod = await import('@/dist/server/index.html');
    const app = mod.default ?? mod.app ?? mod.server ?? mod.handler;
    if (!app || typeof app !== 'function') {
        throw new Error('No valid server export found in `dist/server/index.js` (expected default or named export of the app).');
    }

    cachedHandler = serverless(app);
    return cachedHandler;
}

export const handler = async (event: any, context: any) => {
    const fn = await ensureHandler();
    return fn(event, context);
};