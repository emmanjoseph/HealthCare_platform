'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import AppointmentForm from './Forms/AppointmentForm'


const AppointmentModal = ({type}:{type:'schedule' | 'cancel'}) => {
    const [open,setOpen]=useState(false)
  return (
   
     <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'} text-[12px]`}>
        {type}
    </Button>
  </DialogTrigger>
  <DialogContent className='shad-dialog sm:max-w-md'>
    <DialogHeader className='mb-4 space-y-3'>
      <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
      <DialogDescription>
       Please fill in the following details to {type}
      </DialogDescription>
    </DialogHeader>
    <AppointmentForm
    type={}
    on
    />
  </DialogContent>
</Dialog>

  )
}

export default AppointmentModal
