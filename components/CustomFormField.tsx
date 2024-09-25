'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Control } from 'react-hook-form'
import { FormFieldType } from './Forms/PatientForm'
import { IconType } from 'react-icons'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select } from './ui/select'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    label?: string,
    placeholder?: string,
    icon?: IconType,   // React Icon passed as a component
    name: string,
    disabled?: boolean,
    dateformat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, icon: Icon, placeholder,showTimeSelect,dateformat,renderSkeleton} = props
  

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex items-center rounded-md border border-dark-500 bg-dark-400 p-2'>
                    {Icon && <Icon className="ml-2" size={20} />}  {/* Render the icon if provided */}
                   <FormControl>
                    <Input
                    placeholder={placeholder}
                    {...field}
                    className='shad-input border-0'

                    />
                   </FormControl>
                </div>
            )
        // Add other cases if you have more field types, e.g., DatePicker, TextArea, etc.
        case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

      case FormFieldType.DATEPICKER:
    return (
        <div className='flex items-center rounded-md border border-dark-500 bg-dark-400 p-2'>
            <FormControl>
                <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat={dateformat ?? (showTimeSelect ? 'MM/dd/yyyy h:mm aa' : 'MM/dd/yyyy')}
                    showTimeSelect={showTimeSelect ?? false}
                    wrapperClassName = 'date-picker'
                    timeCaption="Time"  // Optional: adds caption to time section
                />
            </FormControl>
        </div>
    )
    case FormFieldType.SELECT:
        return renderSkeleton ? renderSkeleton
        (field) : null

        default:
            return null
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props

    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        {fieldType !== FormFieldType.CHECKBOX && label && (
                            <FormLabel>{label}</FormLabel>
                        )}
                        <RenderField field={field} props={props} />
                        <FormMessage className='shad-error' />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default CustomFormField
