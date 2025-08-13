import { Hono } from "hono";
import { Context } from "hono";
import {eq} from "drizzle-orm"
import * as dotenv from "dotenv"
import { sign } from "hono/jwt";

dotenv.config();


const createToken = (id:string) => {
    return sign({id},process.env.JWT_SECRET as string)
}

const hashPassword = async(password:string):Promise<string>=>{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256',data);
   const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');
}


const verifyPassword = async (password:string,hashedPassword:string):Promise<boolean>=>{
    const hashedInput = await hashPassword(password);
    return hashedInput === hashedPassword
}

export const registerUser = async(c:Context) => {
    try {
        
    } catch (error) {
        
    }
}

export const registerAdv = async(c:Context)=>{
    try {
        
    } catch (error) {
        
    }
}

export const loginUser = async(c:Context) => {
    try {
        
    } catch (error) {
        
    }
}

export const loginAdv = async(c:Context)=>{
    try {
        
    } catch (error) {
        
    }
}