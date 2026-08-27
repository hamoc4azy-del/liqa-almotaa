import {VideoProvider,VideoJobInput,VideoJob} from './types'; import {config} from '../config';
export class ReplicateVideoProvider implements VideoProvider{
 private endpoint=`https://api.replicate.com/v1/models/${config.replicateOwner}/${config.replicateModel}/predictions`;
 private headers(){return {'Authorization':`Bearer ${config.replicateToken}`,'Content-Type':'application/json'}}
 async create(input:VideoJobInput){
  if(!config.replicateToken||!config.replicateOwner||!config.replicateModel) throw new Error('Replicate configuration is incomplete');
  const prompt=`Cinematic memorial scene, respectful and non-supernatural, ${input.sceneType}. Use the provided portrait as visual reference. Arabic memorial text theme: ${input.message}. Duration ${input.duration}s.`;
  const r=await fetch(this.endpoint,{method:'POST',headers:this.headers(),body:JSON.stringify({input:{prompt,image:input.imageUrl,duration:input.duration},webhook:`${config.publicApiUrl}/api/webhooks/replicate`,webhook_events_filter:['completed']})});
  if(!r.ok) throw new Error(`Replicate create failed: ${await r.text()}`); const d:any=await r.json(); return {providerJobId:d.id,status:'processing'};
 }
 async get(id:string){const r=await fetch(`https://api.replicate.com/v1/predictions/${id}`,{headers:{'Authorization':`Bearer ${config.replicateToken}`}}); if(!r.ok) throw new Error(`Replicate get failed: ${await r.text()}`); const d:any=await r.json(); if(d.status==='succeeded')return {providerJobId:id,status:'ready',videoUrl:Array.isArray(d.output)?d.output[0]:d.output}; if(['failed','canceled'].includes(d.status))return {providerJobId:id,status:'failed'}; return {providerJobId:id,status:'processing'}; }
}
