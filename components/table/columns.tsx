"use client"
import { MoreHorizontal } from "lucide-react"
 

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/Constants"
import AppointmentModal from "../AppointmentModal"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
 
export const columns: ColumnDef<Payment>[] = [
     
  {
    header: "ID",
    cell:(({row})=> <p className="text-14-medium">{row.index + 1}</p>)
  },
  {
    accessorKey: "patent",
    header: "Patient",
    cell:(({row})=> <p className="text-14-meduim">{row.original.patient.name}</p>)

  },
  {
    accessorKey: "status",
    header: "Status",
    cell:(({row})=>(
        <div className="min-w-[115px]">
            <StatusBadge
            status={row.original.status}
            />
        </div>
    ))
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell:({row})=>(
      <p className="text-14-regular">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc)=> doc.name === row.original.primaryPhysician)

      return (
        <div className="flex items-center gap-3">
          <Image src={doctor?.image}
          alt={doctor?.name}
          height={100}
          width={100}
          className="size-8"
          />

          <p className="whitespace-nowrap text-xs">
            Dr {doctor?.name}
          </p>
        </div>
      )

    },
  },
  {
    id: "actions",
    header:()=> <div className="pl-4">Actions</div>,
    cell: ({ row }) => { 
      return (
        <div className="flex gap-1">
          <AppointmentModal type = 'schedule'
          patientId = {row.original.patient.$id}
          />
          <AppointmentModal type = 'cancel'/>
        </div>
      )
    },
},
 
]