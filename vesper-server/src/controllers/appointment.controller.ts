// import { Context } from "hono";
// import { eq, desc, and } from "drizzle-orm";
// import { appointments, users, lawyers } from "../db/schema";
// import { getDb } from "../db/db.service";
// import * as dotenv from "dotenv";

// dotenv.config();

// // Add appointment function
// export const addAppointment = async (c: Context) => {
//   try {
//     const db = getDb(c.env.DATABASE_URL);
//     const { userName, description, userId, lawyerId, scheduledAt } = await c.req.json();

//     // Validate required fields
//     if (!userName || !description || !userId || !lawyerId || !scheduledAt) {
//       return c.json({
//         success: false,
//         message: "All fields (userName, description, userId, lawyerId, scheduledAt) are required"
//       }, 400);
//     }

//     // Validate scheduledAt is a valid date and in the future
//     const scheduledDate = new Date(scheduledAt);
//     if (isNaN(scheduledDate.getTime())) {
//       return c.json({
//         success: false,
//         message: "Invalid date format for scheduledAt"
//       }, 400);
//     }

//     if (scheduledDate <= new Date()) {
//       return c.json({
//         success: false,
//         message: "Scheduled time must be in the future"
//       }, 400);
//     }

//     // Verify that user exists
//     const user = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, userId))
//       .limit(1);

//     if (user.length === 0) {
//       return c.json({
//         success: false,
//         message: "User not found"
//       }, 404);
//     }

//     // Verify that lawyer exists
//     const lawyer = await db
//       .select()
//       .from(lawyers)
//       .where(eq(lawyers.id, lawyerId))
//       .limit(1);

//     if (lawyer.length === 0) {
//       return c.json({
//         success: false,
//         message: "Lawyer not found"
//       }, 404);
//     }

   
//     const newAppointment = await db.insert(appointments).values({
//       userName,
//       description,
//       userId,
//       lawyerId,
//       scheduledAt: scheduledDate,
//     }).returning();

//     return c.json({
//       success: true,
//       message: "Appointment created successfully",
//       appointment: newAppointment[0]
//     }, 201);

//   } catch (error) {
//     console.log(error);
//     return c.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to create appointment"
//     }, 500);
//   }
// };

 
// export const getAllAppointments = async (c: Context) => {
//   try {
//     const db = getDb(c.env.DATABASE_URL);
    
    
//     const userId = c.req.query('userId');
//     const lawyerId = c.req.query('lawyerId');
//     const limit = parseInt(c.req.query('limit') || '50');
//     const offset = parseInt(c.req.query('offset') || '0');

 
//     const whereConditions = [];
//     if (userId) {
//       whereConditions.push(eq(appointments.userId, userId));
//     }
//     if (lawyerId) {
//       whereConditions.push(eq(appointments.lawyerId, lawyerId));
//     }

     
//     let query = db
//       .select({
//         id: appointments.id,
//         userName: appointments.userName,
//         description: appointments.description,
//         userId: appointments.userId,
//         lawyerId: appointments.lawyerId,
//         scheduledAt: appointments.scheduledAt,
//         createdAt: appointments.createdAt,
//         updatedAt: appointments.updatedAt,
//         userEmail: users.email,
//         userWalletAddress: users.walletAddress,
//         lawyerName: lawyers.name,
//         lawyerEmail: lawyers.email,
//         lawyerWalletAddress: lawyers.walletAddress
//       })
//       .from(appointments)
//       .leftJoin(users, eq(appointments.userId, users.id))
//       .leftJoin(lawyers, eq(appointments.lawyerId, lawyers.id))
//       .orderBy(desc(appointments.scheduledAt))
//       .limit(limit)
//       .offset(offset);

  
//     if (whereConditions.length > 0) {
//       if (whereConditions.length === 1) {
//         query = query.where(whereConditions[0]);
//       } else {
//         // Use the already imported 'and' function
//         query = query.where(and(...whereConditions));
//       }
//     }

//     const allAppointments = await query;

//     return c.json({
//       success: true,
//       appointments: allAppointments,
//       total: allAppointments.length,
//       limit,
//       offset
//     });

//   } catch (error) {
//     console.log(error);
//     return c.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to fetch appointments"
//     }, 500);
//   }
// };

// // Get appointment by ID function
// export const getAppointmentById = async (c: Context) => {
//   try {
//     const db = getDb(c.env.DATABASE_URL);
//     const appointmentId = c.req.param('id');

//     if (!appointmentId) {
//       return c.json({
//         success: false,
//         message: "Appointment ID is required"
//       }, 400);
//     }

//     // Get appointment with user and lawyer details
//     const appointment = await db
//       .select({
//         id: appointments.id,
//         userName: appointments.userName,
//         description: appointments.description,
//         userId: appointments.userId,
//         lawyerId: appointments.lawyerId,
//         scheduledAt: appointments.scheduledAt,
//         createdAt: appointments.createdAt,
//         updatedAt: appointments.updatedAt,
//         user: {
//           id: users.id,
//           name: users.name,
//           email: users.email,
//           walletAddress: users.walletAddress
//         },
//         lawyer: {
//           id: lawyers.id,
//           name: lawyers.name,
//           email: lawyers.email,
//           walletAddress: lawyers.walletAddress
//         }
//       })
//       .from(appointments)
//       .leftJoin(users, eq(appointments.userId, users.id))
//       .leftJoin(lawyers, eq(appointments.lawyerId, lawyers.id))
//       .where(eq(appointments.id, appointmentId))
//       .limit(1);

//     if (appointment.length === 0) {
//       return c.json({
//         success: false,
//         message: "Appointment not found"
//       }, 404);
//     }

//     return c.json({
//       success: true,
//       appointment: appointment[0]
//     });

//   } catch (error) {
//     console.log(error);
//     return c.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to fetch appointment"
//     }, 500);
//   }
// };

// // Remove appointment function
// export const removeAppointment = async (c: Context) => {
//   try {
//     const db = getDb(c.env.DATABASE_URL);
//     const appointmentId = c.req.param('id');

//     if (!appointmentId) {
//       return c.json({
//         success: false,
//         message: "Appointment ID is required"
//       }, 400);
//     }

//     // Check if appointment exists
//     const existingAppointment = await db
//       .select()
//       .from(appointments)
//       .where(eq(appointments.id, appointmentId))
//       .limit(1);

//     if (existingAppointment.length === 0) {
//       return c.json({
//         success: false,
//         message: "Appointment not found"
//       }, 404);
//     }

//     // Delete the appointment
//     await db
//       .delete(appointments)
//       .where(eq(appointments.id, appointmentId));

//     return c.json({
//       success: true,
//       message: "Appointment deleted successfully"
//     });

//   } catch (error) {
//     console.log(error);
//     return c.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to delete appointment"
//     }, 500);
//   }
// };

// // Edit appointment function
// export const editAppointment = async (c: Context) => {
//   try {
//     const db = getDb(c.env.DATABASE_URL);
//     const appointmentId = c.req.param('id');
//     const { userName, description, scheduledAt } = await c.req.json();

//     if (!appointmentId) {
//       return c.json({
//         success: false,
//         message: "Appointment ID is required"
//       }, 400);
//     }

//     // Check if appointment exists
//     const existingAppointment = await db
//       .select()
//       .from(appointments)
//       .where(eq(appointments.id, appointmentId))
//       .limit(1);

//     if (existingAppointment.length === 0) {
//       return c.json({
//         success: false,
//         message: "Appointment not found"
//       }, 404);
//     }

//     // Prepare update data (only include fields that are provided)
//     const updateData: any = {
//       updatedAt: new Date()
//     };

//     if (userName !== undefined) {
//       if (!userName.trim()) {
//         return c.json({
//           success: false,
//           message: "User name cannot be empty"
//         }, 400);
//       }
//       updateData.userName = userName;
//     }

//     if (description !== undefined) {
//       if (!description.trim()) {
//         return c.json({
//           success: false,
//           message: "Description cannot be empty"
//         }, 400);
//       }
//       updateData.description = description;
//     }

//     if (scheduledAt !== undefined) {
//       const scheduledDate = new Date(scheduledAt);
//       if (isNaN(scheduledDate.getTime())) {
//         return c.json({
//           success: false,
//           message: "Invalid date format for scheduledAt"
//         }, 400);
//       }

//       if (scheduledDate <= new Date()) {
//         return c.json({
//           success: false,
//           message: "Scheduled time must be in the future"
//         }, 400);
//       }
//       updateData.scheduledAt = scheduledDate;
//     }

//     // If no fields to update
//     if (Object.keys(updateData).length === 1) { // Only updatedAt
//       return c.json({
//         success: false,
//         message: "At least one field (userName, description, or scheduledAt) must be provided for update"
//       }, 400);
//     }

//     // Update the appointment
//     const updatedAppointment = await db
//       .update(appointments)
//       .set(updateData)
//       .where(eq(appointments.id, appointmentId))
//       .returning();

//     return c.json({
//       success: true,
//       message: "Appointment updated successfully",
//       appointment: updatedAppointment[0]
//     });

//   } catch (error) {
//     console.log(error);
//     return c.json({
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to update appointment"
//     }, 500);
//   }
// };