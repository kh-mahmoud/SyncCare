"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FieldType, Status } from "@/types"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { AppointmentFormValidation, UserFormValidation } from "@/lib/schemas/validation"
import { useRouter } from "next/navigation"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { CreateAppoitment, UpdateAppointment } from "@/lib/actions/appointment.action"
import { Appointment } from "@/types/appwrite"
import { Doctors } from "@/constants"
import { set } from "date-fns"



type AppointmentFormProps =
  {
    type: "create" | "cancel" | "schedule",
    patientId: string,
    userId: string,
    appointment?: Appointment
    setOpen?: (open: boolean) => void
  }




const AppointmentForm = ({ type, patientId, userId, appointment, setOpen }: AppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment && appointment.primaryPhysician || '',
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment && appointment.reason || '',
      note: appointment && appointment.note || '',
      cancellationReason: appointment && appointment.cancellationReason || '',
    },
  })


  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)
    let status

    switch (type) {
      case 'schedule':
        status = 'scheduled'
        break;
      case 'cancel':
        status = 'cancelled'
        break;

      default:
        status = 'pending'
        break;
    }

    try {

      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
          cancellationReason: values.cancellationReason
        }

        const appointment = await CreateAppoitment(appointmentData)

        if (appointment) {
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }

      } else if (appointment) {

        const appointmentUpdateData = {
          userId,
          appointmentId: appointment.$id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason || undefined
          },
          type
        }

        const updatedAppointment = await UpdateAppointment(appointmentUpdateData)

        if (updatedAppointment) {
          setOpen && setOpen(false)
          form.reset()
        }



      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {type === "create" &&
          <section>
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request new appointment in seconds</p>
          </section>
        }

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem className="cursor-pointer hover:bg-dark-500" value={doctor.name} key={doctor.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              placeholder="Select date and time"
              dateFormat="dd/MM/yyyy - hh:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
              />

              <CustomFormField
                fieldType={FieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="notes"
                placeholder="Prefer afternoon appointments, if possible"
              />
            </div>
          </>
        )
        }

        {type === "cancel" && (
          <CustomFormField
            fieldType={FieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}





        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
