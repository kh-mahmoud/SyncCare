/* eslint-disable no-unused-vars */

import React, { ReactNode } from "react";
import { Control, Noop, RefCallBack } from "react-hook-form";
import {Appointment, UpdateAppointment } from "./appwrite";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Gender = "male" | "female";
export type Status = "pending" | "scheduled" | "cancelled";

export type CreateUserParams = {
  name: string;
  email: string;
  phone: string;
}

export type User = {
  $id: string;
  name: string;
  email: string;
  phone: string;
}

export type RegisterUserParams = {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string ;
  currentMedication?: string ;
  familyMedicalHistory?: string ;
  pastMedicalHistory?: string ;
  identificationType?: string ;
  identificationNumber?: string ;
  identificationDocument?: FormData;
  PrivacyConsent: boolean;
}

export type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: UpdateAppointment;
  type:string
};


export type CustomFieldProps = {
  control: Control<any>,
  fieldType: FieldType,
  name: string,
  label?: string,
  placeholder?: string,
  icon?: string,
  iconAlt?: string,
  renderSkelton?: any
  children?: ReactNode[],
  showTimeSelect?:boolean
  dateFormat?:string
}

export enum FieldType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  SELECT = "select",
  TEXTAREA = "textarea",
  SKELETON = "skeleton",
  DATE_PICKER = "datePicker",
  PHONE_INPUT = "phoneInput"
}


export type ButtonProps = {
  isLoading: boolean
  className?: string
  children: React.ReactNode
}

export type Field = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: any;
  disabled: boolean | undefined;
  name: string;
  ref: RefCallBack;
}

