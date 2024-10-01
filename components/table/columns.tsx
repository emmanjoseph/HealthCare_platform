"use client"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/Constants"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

 
export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <p className="text-14-medium">{row.original.patient?.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || "/images/default-doctor.png"} // Provide a default image
            alt={doctor?.name || "Unknown Doctor"}
            height={32}
            width={32}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap text-xs">Dr {doctor?.name || "Unknown"}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient?.$id}
            userId={data.userId}
            appointment={data}         
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient?.$id}
            userId={data.userId}
            appointment={data}    
          />
        </div>
      );
    },
  },
];
