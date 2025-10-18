// import serverless from 'serverless-http';
// import {readFile} from 'fs/promises';
// import {pathToFileURL} from 'url';
// import path from 'path';
//
// let cachedHandler: any = null;
// let staticHtml: string | null = null;
//
// async function ensureHandler() {
//     if (cachedHandler) return cachedHandler;
//
//     const serverPath = path.join(process.cwd(), 'dist', 'server', 'index.js');
//     try {
//         const mod = await import(pathToFileURL(serverPath).href);
//         const app = mod.default ?? mod.app ?? mod.server ?? mod.handler;
//         if (app && typeof app === 'function') {
//             cachedHandler = serverless(app);
//             return cachedHandler;
//         }
//     } catch (err) {
//         // no server bundle — fall through to static fallback
//     }
//
//     // Fallback: serve the client HTML
//     const htmlPath = path.join(process.cwd(), 'dist', 'client', '_expo', 'index.html');
//     staticHtml = await readFile(htmlPath, 'utf-8');
//     cachedHandler = async (_event: any, _context: any) => ({
//         statusCode: 200,
//         headers: { 'Content-Type': 'text/html; charset=utf-8' },
//         body: staticHtml,
//     });
//     return cachedHandler;
// }
//
// export const handler = async (event: any, context: any) => {
//     const fn = await ensureHandler();
//     return fn(event, context);
// };
