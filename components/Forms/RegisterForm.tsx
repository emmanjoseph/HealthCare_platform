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
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import {registerPatients } from "@/lib/actions/patients.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/Constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"



const RegisterForm =({user}:{user:User}) =>{
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone:""
    },
  })

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setisLoading(true);
    let formData;
 
    if (values.identificationDocument && values.identificationDocument.length > 0) {
       const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
       });
 
       formData = new FormData();
       formData.append('blobFile', blobFile);
       formData.append('fileName', values.identificationDocument[0].name);
    }
 
    try {
       const patientData = {
          ...values,
          userId: user.$id,
          birthDate: new Date(values.birthDate),
          identificationDocument: formData,
       };

       // @ts-ignore
       const patient = await registerPatients(patientData);
 
       if (patient) {
          router.push(`/patients/${user.$id}/new-appointment`);
       }
    } catch (error) {
       // Handle the error
       console.log(error);
       
    } finally {
       setisLoading(false);  // This ensures loading state is reset even if there's an error
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
        <div className="xl:w-1/2">
        <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='email'
       label="Email"
       placeholder="JohnDoe@gmail.com"
      icon={IoIosMail}
       />
        </div>
        <div className="xl:w-1/2">
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
        </div>
    
       </div>

       <div  className="flex flex-col gap-6 xl:flex-row">
        <div className="xl:w-1/2">
        <CustomFormField
       fieldType={FormFieldType.DATEPICKER}
       control={form.control}
       name='birthDate'
       label="Date of birth"
       placeholder="JohnDoe@gmail.com"
      icon={IoIosMail}
       />
        </div>
      
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
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='address'
       label="Address"
       placeholder="Utalii street , Nairobi"
      // icon={FaLocationPin}
       />
       </div>
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='occupation'
       label="Occupation"
       placeholder="Lawyer , teacher"
      // icon={IoIosMail}
       />
       </div>
       </div>
       {/*  */}
       <div  className="flex flex-col gap-6 xl:flex-row">
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='emergencyContactName'
       label="Emergency contact name"
       placeholder="Guardians / Partners name"
      // icon={IoPersonSharp}
       />
       </div>
       <div className="xl:w-1/2">
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency contact number"
          placeholder="(555) 123-4567"
        />
        </div>
       </div>
       {/*  */}
        <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">
            Medical information
        </h2>
        </div>
        
       </section>
       <CustomFormField
       fieldType={FormFieldType.SELECT}
       control={form.control}
       label="Primary Physician"
       name='primaryPhysician'
       placeholder="select a physician"
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
       <div  className="flex flex-col gap-6 xl:flex-row">
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='insuranceProvider'
       label="Insurance Provider"
       placeholder="Jubilee Insurance"
      // icon={FaLocationPin}
       />
       </div>
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       name='insurancePolicyNumber'
       label="Insurance Policy Number"
       placeholder="ABC123456789"
      // icon={IoIosMail}
       />
       </div>
       </div>
       <div  className="flex flex-col gap-6 xl:flex-row">
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.TEXTAREA}
       control={form.control}
       name='allergies'
       label="Allergies (if any)"
       placeholder="ex: Peanuts,Penicilin,Condoms,Pollen,Cat fur"
      // icon={FaLocationPin}
       />
       </div>
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.TEXTAREA}
       control={form.control}
       name='currentMedication'
       label="Current Medication (if any)"
       placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
      // icon={IoIosMail}
       />
       </div>
       </div>
       <div  className="flex flex-col gap-6 xl:flex-row">
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.TEXTAREA}
       control={form.control}
       name='familyMedicalHistory'
       label="Family Medical History"
       placeholder="ex: sister suffered from diabetes"
      // icon={FaLocationPin}
       />
       </div>
       <div className="xl:w-1/2">
       <CustomFormField
       fieldType={FormFieldType.TEXTAREA}
       control={form.control}
       name='pastMedicalHistory'
       label="Past Medical History"
       placeholder="ex: asthma diagnosis in childhood"
      // icon={IoIosMail}
       />
       </div>
       </div>

       <section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">
            Identification and verification
        </h2>
        </div>
        
       </section>

       <CustomFormField
       fieldType={FormFieldType.SELECT}
       control={form.control}
       label="identification type"
       name='identificationType'
       placeholder="Select Identification Type"
       icon={FaUserTag}
       >
        {IdentificationTypes.map((id)=>{
          return <SelectItem key={id} value={id}>
            <div className="flex cursor-pointer gap-2 items-center">
             <p>{id}</p>
            </div>
          </SelectItem>
        })}
       </CustomFormField>
       <CustomFormField
       fieldType={FormFieldType.INPUT}
       control={form.control}
       label="Identification number"
       name='identificationNumber'
       placeholder="ex 1234567"
      //  icon={FaUserTag}
       />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="IdentificationDocumentUrl"
          label="Scanned Copy of Identification Document"
      icon={IoIosMail}

          renderSkeleton={(field)=>(
            <FormControl>
               <FileUploader
               files={field.value}
               onChange={field.onChange}
               />
            </FormControl>
          )}
        />

<section className="space-y-6">
        <div className="mb-9 space-y-1">
        <h2 className="sub-header">
           Consent and privacy
        </h2>
        </div>
        
       </section>

       <CustomFormField
       fieldType={FormFieldType.CHECKBOX}
       control={form.control}
       name='treatmentConsent'
       label="I consent to treatment"
       />
       <CustomFormField
       fieldType={FormFieldType.CHECKBOX}
       control={form.control}
       name='disclosureConsent'
       label="I consent to the use and disclosure of my health information for treatment purposes."
       />
       <CustomFormField
       fieldType={FormFieldType.CHECKBOX}
       control={form.control}
       name='privacyConsent'
       label="I acknowledge that I have reviewed and agree to the privacy policy"
       />
      
       <SubmitButton isLoading={isLoading} >
        Get Started
       </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
