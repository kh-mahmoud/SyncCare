'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite";
import AppointmentForm from "./forms/AppointmentForm";


type AppointmentModalProps = {
  type: "schedule" | "cancel"
  patientId: string
  userId: string
  appointment: Appointment
  title: string
  description: string
}


const AppointmentModal = ({ type,patientId,userId,appointment }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={cn("capitalize  hover:bg-[rgba(255,255,255,0.1)]", {
          "text-red-500": type === "cancel",
          "text-green-500": type === "schedule"
        })}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} the appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
             type={type}
             patientId={patientId}
             userId={userId}
             appointment={appointment}
             setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>

  );
}

export default AppointmentModal;
