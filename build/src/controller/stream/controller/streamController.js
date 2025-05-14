"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const openai_1 = require("../../../lib/openai");
const github_1 = require("../../../lib/github");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
async function stream(req, res) {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const userDescription = req.query.description;
    const businessId = req.query.businessId;
    const businessName = req.query.businessName || 'Business';
    let generatedHTML = '';
    const sendStatus = (message, type = 'status') => {
        res.write(`data: ${JSON.stringify({ type, message })}\n\n`);
    };
    try {
        sendStatus('🚀 מתחיל בתהליך יצירת דף הנחיתה...');
        const stream = await openai_1.openai.chat.completions.create({
            model: 'o4-mini-2025-04-16',
            stream: true,
            messages: [{
                    role: 'user',
                    content: `Create a high-conversion landing page in Hebrew for: ${userDescription}.
          Business name: ${businessId}.
          Use only valid HTML with Tailwind CSS classes.
          Use photos ONLY from dreamstime.com.
          Make sure the layout is optimized for Israeli audiences:
          - Hebrew language with full RTL alignment.
          - In the hero section, use a full-width background image behind the text by setting a \`div\` with \`bg-[url('IMAGE_URL')]\`, \`bg-cover\`, \`bg-center\`, and \`relative\`, and position the headline, subheadline, and call-to-action inside a child \`div\` with \`absolute\` or \`z-10\`.
          - Include a bold main headline, a subheadline, and a call-to-action button overlaid on the hero background.
          - Include a section with key features or benefits (bulleted).
          - Add a technical or product specification table if relevant.
          - Include trust signals like warranty, reviews, or guarantees.
          - Make the design colorful and friendly, with fonts and layout common to Israeli e-commerce pages.
          Return only the full HTML content, no additional explanation.`
                }]
        });
        for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
                generatedHTML += content;
                res.write(`data: ${JSON.stringify({ type: 'content', chunk: content })}\n\n`);
            }
        }
        sendStatus('📁 מכין את המאגר ב-GitHub...');
        const tempDir = os_1.default.tmpdir();
        const tempFilePath = path_1.default.join(tempDir, `landingPage_${Date.now()}.html`);
        await promises_1.default.writeFile(tempFilePath, generatedHTML, 'utf8');
        const repoUrl = await (0, github_1.createAndPushRepo)(tempFilePath, {
            name: businessId,
            description: userDescription
        });
        res.write(`data: ${JSON.stringify({ type: 'repo_url', url: repoUrl })}\n\n`);
        sendStatus('🎉 המאגר נוצר בהצלחה!', 'success');
        await promises_1.default.unlink(tempFilePath);
        res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    }
    catch (error) {
        console.error('Stream error:', error);
        res.write(`data: ${JSON.stringify({ type: 'error', message: 'אירעה שגיאה ביצירת דף הנחיתה' })}\n\n`);
    }
}
exports.stream = stream;
;
