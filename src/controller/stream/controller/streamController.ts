import { openai } from "../../../lib/openai";
import { createAndPushRepo } from '../../../lib/github';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { Request, Response } from 'express';

export async function stream(req: Request, res: Response) {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    const userDescription = req.query.description as string;
    const businessId = req.query.businessId as string;
    const businessName = (req.query.businessName as string) || 'Business';
    let generatedHTML = '';
  
    const sendStatus = (message: string, type: string = 'status') => {
      res.write(`data: ${JSON.stringify({ type, message })}\n\n`);
    };
  
    try {
      sendStatus('🚀 מתחיל בתהליך יצירת דף הנחיתה...');
  
      const stream = await openai.chat.completions.create({
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
  
      for await (const chunk of stream as any) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) {
          generatedHTML += content;
          console.log(content);
          res.write(`data: ${JSON.stringify({ type: 'content', chunk: content })}\n\n`);
        }
      }
  
      sendStatus('📁 מכין את המאגר ב-GitHub...');
  
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, `landingPage_${Date.now()}.html`);
      await fs.writeFile(tempFilePath, generatedHTML, 'utf8');
  
      const repoUrl = await createAndPushRepo(tempFilePath, {
        name: businessId,
        description: userDescription
      });
  
      res.write(`data: ${JSON.stringify({ type: 'repo_url', url: repoUrl })}\n\n`);
      sendStatus('🎉 המאגר נוצר בהצלחה!', 'success');
  
      await fs.unlink(tempFilePath);
  
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    } catch (error) {
      console.error('Stream error:', error);
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'אירעה שגיאה ביצירת דף הנחיתה' })}\n\n`);
    }
  };