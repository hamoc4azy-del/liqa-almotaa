import { SignJWT, jwtVerify } from 'jose'; import { config } from '../config';
const secret=new TextEncoder().encode(config.jwtSecret);
export async function signAdmin(id:string,email:string){return new SignJWT({sub:id,email,role:'admin'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(secret)}
export async function verifyAdmin(token:string){return jwtVerify(token,secret)}
