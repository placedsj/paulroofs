'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/material-recommendation-tool.ts';
import '@/ai/flows/quote-generator-flow.ts';
import '@/ai_flows/color-coordinator-flow.ts';
import '@/ai/flows/invoice-generator-flow.ts';
import '@/ai/flows/project-promoter-flow.ts';
import '@/ai/flows/blog-post-generator-flow.ts';
import '@/ai/flows/home-story-generator-flow.ts';
