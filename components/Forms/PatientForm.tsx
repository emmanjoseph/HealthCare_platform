"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FaUserTag } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"

export enum FormFieldType{
    INPUT='input',
    TEXTAREA = 'textarea',
    PHONE_INPUT= 'phoneInput',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datepicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

const PatientForm=() =>{
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
       <section className="space-y-4 mb-12">
        <h1 className="header">Hi there &#x270B;</h1>
        <p className="text-dark-700">Book your first appointment today</p>
       </section>
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='name'
       label="Full Name"
       placeholder="John Doe"
       icon={FaUserTag}
       />
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='email'
       label="Email"
       placeholder="JohnDoe@gmail.com"
      icon={IoIosMail}
       />
      <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
      
       <SubmitButton isLoading={isLoading} >
        Get Started
       </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
