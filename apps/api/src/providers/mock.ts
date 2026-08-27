import {VideoProvider,VideoJobInput,VideoJob} from './types';
export class MockVideoProvider implements VideoProvider{
 async create(_input:VideoJobInput){return {providerJobId:`mock_${Date.now()}`,status:'processing'} as VideoJob}
 async get(id:string){const age=Date.now()-Number(id.split('_')[1]); if(age<8000)return {providerJobId:id,status:'processing'}; return {providerJobId:id,status:'ready',videoUrl:'https://cdn.coverr.co/videos/coverr-a-walk-in-the-forest-1573/1080p.mp4'} }
}
