import { UpdateAppointment } from '@/lib/actions/appointment.action';
import { Models } from "node-appwrite";
import { Gender, Status } from ".";

export type Patient ={
  $id:string,
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  PrivacyConsent: boolean;
}

export type Appointment =  {
  $id:string 
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string | undefined;
  userId: string;
  cancellationReason: string | undefined;
}
 
export type UpdateAppointment= Omit<Appointment, "$id" |"patient" | "reason" | "note" | "userId">