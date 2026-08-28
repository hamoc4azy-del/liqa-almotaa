import { VideoJob, VideoJobInput, VideoProvider } from './types';

export const MockVideoProvider: VideoProvider = {
  async create(_input: VideoJobInput): Promise<VideoJob> {
    return {
      providerJobId: `mock_${Date.now()}`,
      status: 'processing',
    };
  },

  async get(id: string): Promise<VideoJob> {
    const age = Date.now() - Number(id.split('_')[1]);

    if (age < 8000) {
      return {
        providerJobId: id,
        status: 'processing',
      };
    }

    return {
      providerJobId: id,
      status: 'ready',
      videoUrl:
        'https://cdn.coverr.co/videos/coverr-a-walk-in-the-forest-1573/1080p.mp4',
    };
  },
};	
