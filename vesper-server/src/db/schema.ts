import { pgTable,uuid,text,timestamp,varchar,boolean,pgEnum } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import {sql} from "drizzle-orm"

export const users = pgTable('users',{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    name:varchar('name',{length:255}).notNull(),
    password:varchar('password',{length:300}).notNull(),
    walletAddress:text('wallet_address').notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull(),
})

export const lawyers = pgTable('lawyers',{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    name:varchar('name',{length:255}).notNull(),
    password:varchar('password',{length:300}).notNull(),
    walletAddress:text('wallet_address').notNull(),
    stateRollNumber:text('state_roll_number').notNull().unique(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull(),
})

export const appointments = pgTable('appointments',{
    id:uuid('id').primaryKey().defaultRandom().notNull(),
    userName:text('user_name').notNull(),
    description:text('description').notNull(),
    userId:uuid('user_id').references(()=>users.id).notNull(),
    lawyerId:uuid('lawyer_id').references(()=>lawyers.id).notNull(),
    scheduledAt:timestamp('scheduled_at',{withTimezone:true}).notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').defaultNow().notNull()
})


export const lawyerRelations = relations(lawyers,({many})=>({
    appointments:many(appointments)
}))

export const userRelations = relations(users,({many})=>({
    appointments:many(appointments)
}))

export const appointmentRelations = relations(appointments, ({ one }) => ({
  lawyer: one(lawyers, {
    fields: [appointments.lawyerId],
    references: [lawyers.id],
  }),
  users: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));