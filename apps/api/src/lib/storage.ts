import fs from 'node:fs/promises'; import path from 'node:path'; import crypto from 'node:crypto';
export interface StorageAdapter { save(buffer:Buffer, mime:string):Promise<string>; remove(url:string):Promise<void> }
export class LocalStorage implements StorageAdapter{
 root=path.resolve(process.cwd(),'uploads'); baseUrl=()=>`${process.env.PUBLIC_API_URL||'http://localhost:4000'}/uploads`;
 async save(buffer:Buffer,mime:string){await fs.mkdir(this.root,{recursive:true}); const ext=mime==='image/png'?'png':mime==='image/webp'?'webp':'jpg'; const name=`${crypto.randomUUID()}.${ext}`; await fs.writeFile(path.join(this.root,name),buffer); return `${this.baseUrl()}/${name}`}
 async remove(url:string){const name=url.split('/').pop(); if(name) await fs.rm(path.join(this.root,name),{force:true})}
}
export const storage=new LocalStorage();
