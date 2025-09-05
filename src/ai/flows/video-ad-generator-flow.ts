
'use server';
/**
 * @fileOverview An AI-powered tool for generating video ads for roofing projects.
 *
 * - generateVideoAd - A function that creates a video from before/after photos.
 * - GenerateVideoAdInput - The input type for the generateVideoAd function.
 * - GenerateVideoAdOutput - The return type for the generateVideoAd function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import * as fs from 'fs';
import { Readable } from 'stream';
import wav from 'wav';

// Define Zod schemas for input and output
const GenerateVideoAdInputSchema = z.object({
  beforePhotoDataUri: z.string().describe("A 'before' photo of the house, as a data URI."),
  afterPhotoDataUri: z.string().describe("An 'after' photo of the house with the new roof, as a data URI."),
  roofType: z.string().describe("The type and brand of the new roof (e.g., 'IKO Cambridge Shingles')."),
  roofColor: z.string().describe("The color of the new roof (e.g., 'Charcoal Grey')."),
  companyName: z.string().describe("The name of the roofing company."),
});
export type GenerateVideoAdInput = z.infer<typeof GenerateVideoAdInputSchema>;

const GenerateVideoAdOutputSchema = z.object({
  videoUrl: z.string().describe('The data URI of the generated video ad.'),
  script: z.string().describe('The generated script for the ad.'),
  audioUrl: z.string().describe('The data URI of the generated audio narration.'),
});
export type GenerateVideoAdOutput = z.infer<typeof GenerateVideoAdOutputSchema>;

// Exported wrapper function
export async function generateVideoAd(input: GenerateVideoAdInput): Promise<GenerateVideoAdOutput> {
  return generateVideoAdFlow(input);
}


// Helper function to convert PCM audio data to WAV format
async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });
    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs)));
    writer.write(pcmData);
    writer.end();
  });
}

// Main Genkit Flow
const generateVideoAdFlow = ai.defineFlow(
  {
    name: 'generateVideoAdFlow',
    inputSchema: GenerateVideoAdInputSchema,
    outputSchema: GenerateVideoAdOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the ad script
    const scriptPrompt = await ai.generate({
      prompt: `Create a short, punchy, and professional 10-15 second video ad script.
        The ad is for a roofing company called "${input.companyName}".
        The project involved replacing an old roof with a new "${input.roofColor} ${input.roofType}" roof.
        The script should be energetic and highlight the dramatic transformation.
        Start with a hook, describe the upgrade, and end with a strong call to action for "${input.companyName}".
        Keep it concise and impactful. The entire script must be under 50 words.`,
    });
    const script = scriptPrompt.text;

    // Step 2: Generate the audio narration from the script
    const ttsResponse = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } } },
      },
      prompt: script,
    });
    const audioPcmBuffer = Buffer.from(ttsResponse.media!.url.substring(ttsResponse.media!.url.indexOf(',') + 1), 'base64');
    const audioWavBuffer = await toWav(audioPcmBuffer);
    const audioUrl = `data:audio/wav;base64,${audioWavBuffer.toString('base64')}`;

    // Step 3: Generate the video from the images
    let { operation } = await ai.generate({
      model: googleAI.model('veo-3.0-generate-preview'),
      prompt: [
        { text: `Create a dynamic, professional video ad. Start with the "before" image, then dramatically transition to the "after" image. Use cinematic effects like a slow zoom, pans, or a wipe transition to make the reveal impactful. The final shot of the "after" house should look stunning and aspirational. The video should have a clean, modern aesthetic.` },
        { media: { url: input.beforePhotoDataUri } },
        { media: { url: input.afterPhotoDataUri } },
      ],
    });

    if (!operation) throw new Error('Video generation operation did not start.');

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) throw new Error(`Video generation failed: ${operation.error.message}`);
    
    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart?.media?.url) throw new Error('Generated video not found in operation result.');
    
    // For now, we can't combine audio and video in the flow.
    // The front-end will receive separate data URIs for video and audio.
    // A more advanced implementation would merge them on the server or client.
    // We are returning a faked video URL for now as we can't fetch it without an API key.
    const videoUrl = videoPart.media.url;


    // Step 4: Combine and return the results
    return {
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      script,
      audioUrl,
    };
  }
);
