"use client"

import { Appointment } from "@/types/appwrite"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import StatusBadge from "./StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "./AppointmentModal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
    {
        header: "ID",
        cell: ({ row }) => (<p className="text-14-medium">{row.index + 1}</p>),

    },
    {
        accessorKey: "patient",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Patient" />
        ),
        cell: ({ row }) => {
            const appointment = row.original

            return <p className="text-14-medium">{appointment.patient.name}</p>
        },

    },
    {
        accessorKey: "schedule",
        header: ({ column }) => (
            <div ><DataTableColumnHeader column={column} title="Appointment" /></div>
        ),
        cell: ({ row }) => {

            return <p className="text-14-regular">{formatDateTime(row.original.schedule).dateTime}</p>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {

            return (
                <div className="min-w-[115px] ">
                    <StatusBadge status={row.original.status} />
                </div>
            )

        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },

    },
    {
        accessorKey: "primaryPhysician",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Doctor" />
        ),
        cell: ({ row }) => {

            const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image!}
                        alt={doctor?.name!}
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p>Dr.{doctor?.name}</p>
                </div>
            )

        },
    },
    {
        id: "actions",

        header: () => (
            <div>Actions</div>
        ),        cell: ({ row }) => {
            return (
                <div className="flex gap-1">
                    <AppointmentModal
                        type={"schedule"}
                        patientId={row.original.patient.$id}
                        userId={row.original.userId}
                        appointment={row.original}
                        title={"Schedule Appointment"}
                        description={"Please confirm the following details to schedule"}
                    />
                    <AppointmentModal
                        type={"cancel"}
                        patientId={row.original.patient.$id}
                        userId={row.original.userId}
                        appointment={row.original}
                        title={"Cancel Appointment"}
                        description={"Are you sure you want to cancenl this appointment?"} 
                    />

                </div>
            )
        },
    },
]
