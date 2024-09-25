"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FaUserTag } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/Constants"
import { Label } from "../ui/label"



const RegisterForm =({user}:{user:User}) =>{
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
       <section className="space-y-4">
        <h1 className="header">Hi there &#x270B;</h1>
        <p className="text-dark-700">Let us know more about yourself</p>
       </section>

       <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">
            Personal information
        </h2>
        </div>
        
       </section>
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       label="Full name"
       name='name'
       placeholder="John Doe"
       icon={FaUserTag}
       />
       <div className="flex flex-col gap-6 xl:flex-row">
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
       </div>

       <div  className="flex flex-col gap-6 xl:flex-row">
       <CustomFormField
       fieldType={FormFieldType.DATEPICKER}
       control={form.control}
       name='birthDate'
       label="Date of birth"
       placeholder="JohnDoe@gmail.com"
      icon={IoIosMail}
       />
      <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
      icon={IoIosMail}

          renderSkeleton={(field)=>(
            <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange}
                defaultValue={field.vale}
                >
                    {GenderOptions.map((option)=>{
                        return (
                            <div key={option}
                            className="radio-group"
                            >
                                <RadioGroupItem
                                value={option}
                                id={option}
                                />
                                <Label className="cursor-pointer" htmlFor={option}>
                                    {option}
                                </Label>

                            </div>
                        )
                    })}
                </RadioGroup>
            </FormControl>
          )}
        />
       </div>
       {/*  */}
       <div  className="flex flex-col gap-6 xl:flex-row">

       </div>
       {/*  */}
       <div  className="flex flex-col gap-6 xl:flex-row">

       </div>
       {/*  */}
       <div  className="flex flex-col gap-6 xl:flex-row">

       </div>
      
       <SubmitButton isLoading={isLoading} >
        Get Started
       </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
