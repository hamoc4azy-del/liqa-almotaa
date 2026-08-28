import { config } from '../config';
import { VideoJob, VideoJobInput, VideoProvider } from './types';

export const ReplicateVideoProvider: VideoProvider = {
  async create(input: VideoJobInput): Promise<VideoJob> {
    const r = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.replicateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!r.ok) {
      throw new Error(`Replicate create failed: ${await r.text()}`);
    }

    const d: any = await r.json();

    return {
      providerJobId: String(d.id),
      status: 'processing',
    };
  },

  async get(id: string): Promise<VideoJob> {
    const r = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${config.replicateToken}`,
        },
      },
    );

    if (!r.ok) {
      throw new Error(`Replicate get failed: ${await r.text()}`);
    }

    const d: any = await r.json();

    if (d.status === 'succeeded') {
      return {
        providerJobId: id,
        status: 'ready',
        videoUrl: Array.isArray(d.output)
          ? String(d.output[0])
          : String(d.output),
      };
    }

    if (d.status === 'failed' || d.status === 'canceled') {
      return {
        providerJobId: id,
        status: 'failed',
      };
    }

    return {
      providerJobId: id,
      status: 'processing',
    };
  },
};
