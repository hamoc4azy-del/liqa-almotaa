export type VideoJobInput={imageUrl:string;prompt:string;duration:number;sceneType:string;message:string;voiceMode:string};
export type VideoJob={providerJobId:string;status:'processing'|'ready'|'failed';videoUrl?:string};
export interface VideoProvider{create(input:VideoJobInput):Promise<VideoJob>; get(providerJobId:string):Promise<VideoJob>;}
