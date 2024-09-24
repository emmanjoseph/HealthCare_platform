"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FaUserTag } from "react-icons/fa";

export enum FormFieldType{
    INPUT='input',
    TEXTAREA = 'textarea',
    PHONE_INPUT= 'phone_input',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datepicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PatientForm=() =>{
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PatientForm
