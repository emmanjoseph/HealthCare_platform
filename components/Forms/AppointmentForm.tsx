"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { z } from "zod"

// import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FaCalendar, FaUserTag } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/Constants"
import { SelectItem } from "../ui/select"




const AppointmentForm=({type,userId,patientId}:{
    type:'create'|'cancel'|'schedule',
    userId:string,
    patientId:string
}) =>{
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(value: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true)

    try {
      const userData={
        name:value.name,
        email:value.email,
        phone:value.phone
      }
      const user = await createUser(userData)

      if(user)router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
      
    }
  
  }

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = "Create Appointment";
      break;
    case 'schedule':
      buttonLabel = "Schedule Appointment";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
       <section className="space-y-4 mb-12">
        <h1 className="header">New appointment</h1>
        <p className="text-dark-700">Request a new appointment in less than 10 seconds</p>
       </section>

       {
        type !== 'cancel' && (
            <>
             <CustomFormField
       fieldType={FormFieldType.SELECT}
       control={form.control}
       label="Doctor"
       name='primaryPhysician'
       placeholder="Select a doctor"
       icon={FaUserTag}
       >
        {Doctors.map((doctor)=>{
          return <SelectItem key={doctor.name} value={doctor.name}>
            <div className="flex cursor-pointer gap-2 items-center">
             <Image src={doctor.image} alt={doctor.name}
             width={32}
             height={32}
             className="rounded-full object-fill border-dark-500"
             />
             <p>{doctor.name}</p>
            </div>
          </SelectItem>
        })}
       </CustomFormField>

       <CustomFormField
       fieldType={FormFieldType.DATEPICKER}
       control={form.control}
       name="schedule"
       label="Expected appointment date"
       showTimeSelect
       dateformat="dd/MM/yyyy - h:mm aa"
       icon={FaCalendar}
       placeholder="DD/MM/YYYY - 00:00AM"
       
       />

       <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-1/2">
        <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name='reason'
        label="Reason for appointment"
        placeholder="Enter reason for appointment"
        />
        </div>
        <div className="xl:w-1/2">
        <CustomFormField
        fieldType={FormFieldType.TEXTAREA}
        control={form.control}
        name='notes'
        label="Additional comments/notes"
        placeholder="Enter notes"
        />
        </div>
        
       
       </div>
            </>
        )
       }

       {type !== 'cancel' && (
         <CustomFormField
         fieldType={FormFieldType.TEXTAREA}
         control={form.control}
         name='cancellationReason'
         label="Reason for cancellation"
         placeholder="Enter reason for cancellation"
         />
       ) }
     
      
       <SubmitButton isLoading={isLoading} 
       className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
       >
     {buttonLabel}
       </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
