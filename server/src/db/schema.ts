import { pgTable,uuid,text,timestamp,varchar,boolean,pgEnum } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import {sql} from "drizzle-orm"

export const users = pgTable('users',{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    name:varchar('name',{length:255}).notNull(),
    password:varchar('password',{length:300}).notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull(),
})

export const lawyers = pgTable('users',{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    name:varchar('name',{length:255}).notNull(),
    password:varchar('password',{length:300}).notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull(),
})

export const appointments = pgTable('users',{

})

