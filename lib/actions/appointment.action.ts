'use server'

import { ID, Query } from "node-appwrite";
import { appwriteConfig, databases, messaging } from '../appwrite.config';
import { AlertTriger, formatDateTime, parseStringify } from "../utils";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GetPatient } from "./patient.actions";
import { Appointment } from "@/types/appwrite";
import { revalidatePath } from "next/cache";
import axios from "axios"
import { CANCELLED } from "dns";

export const CreateAppoitment = async (appoitment: CreateAppointmentParams) => {

    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const patient = await GetPatient(appoitment.userId)

        const MedicalFile =
            `allergies: ${patient.allergies},
            currentMedication:${patient.currentMedication},
            familyMedicalHistory:${patient.familyMedicalHistory},
            pastMedicalHistory:${patient.pastMedicalHistory},
            appointmentReasons:${appoitment.reason},
            notes:${appoitment.note}`


        const result = await model.generateContent(process.env.NEXT_PUBLIC_GEMINI_PROMPT! + MedicalFile);
        const response = await result.response;
        const score = Number(response.text());


        const newAppointment = await databases.createDocument(
            appwriteConfig.databaseId!,
            appwriteConfig.appointementCollection!,
            ID.unique(),
            {
                ...appoitment,
                score
            },
        );

        if (newAppointment) {
            AlertTriger()
        }



        return newAppointment
    } catch (error) {
        console.log(error)
    }
}


export const GetAppointment = async (appoitmentId: string) => {

    try {
        const appointment = await databases.getDocument(
            appwriteConfig.databaseId!,
            appwriteConfig.appointementCollection!,
            appoitmentId,
        );

        return parseStringify(appointment)

    } catch (error) {
        console.log(error)
    }
}

export const GetAppointments = async () => {
    try {

        const appointments = await databases.listDocuments(
            appwriteConfig.databaseId!,
            appwriteConfig.appointementCollection!,
            [
                Query.orderDesc("score"),
                Query.orderDesc("$createdAt"),
            ]
        );

        const initialCounts = {
            scheduled: 0,
            pending: 0,
            cancelled: 0,
        }

        // @ts-ignore
        const counts = (appointments.documents as Appointment[]).reduce((acc, current) => {
            if (current.status === "scheduled") {
                acc.scheduled += 1
            } else if (current.status === "pending") {
                acc.pending += 1
            } else if (current.status === "cancelled") {
                acc.cancelled += 1
            }
            return acc
        }, initialCounts)

        const data = {
            Totalcount: appointments.total,
            ...counts,
            data: appointments.documents
        }

        return parseStringify(data)
    } catch (error) {
        console.log(error)
    }
}

export const UpdateAppointment = async ({userId,appointmentId, appointment,type }: UpdateAppointmentParams) => {

    try {
        const udpdatedAppointment = await databases.updateDocument(
            appwriteConfig.databaseId!,
            appwriteConfig.appointementCollection!,
            appointmentId,
            appointment,
        );

        if (!UpdateAppointment) {
            throw new Error('Appointment not found')
        }

        const Message = `Hi, it's SyncCare. ${
            type === "schedule"
                ? `Your appointment has been scheduled with Dr.${appointment.primaryPhysician} for ${formatDateTime(appointment.schedule).dateTime}.`
                : `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}.`
        }`;

        await SendSmsNotifications(userId,Message)
        

        revalidatePath("/admin")
        return parseStringify(udpdatedAppointment)

    } catch (error) {
        console.log(error)
    }

}

export const SendSmsNotifications= async(userId:string,content:string)=>{

    try {
         const message= await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
            
         ) 

         return parseStringify(message)


    } catch (error) {
        console.log(error)
    }

}