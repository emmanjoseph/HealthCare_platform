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
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

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
  selected={field.value || new Date()}
  onChange={(date) => {
    console.log("Selected date:", date);  // Log selected date
    field.onChange(date);
  }}
  dateFormat={dateformat ?? (showTimeSelect ? 'MM/dd/yyyy h:mm aa' : 'MM/dd/yyyy')}
  showTimeSelect={showTimeSelect ?? false}
  wrapperClassName="date-picker"
  timeCaption="Time"
  placeholderText={placeholder}
/>


            </FormControl>
        </div>
    )
    case FormFieldType.SKELETON:
        return renderSkeleton ? renderSkeleton
        (field) : null

    case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                        {/* This should only contain one direct child */}
                        <SelectTrigger className='shad-select-trigger'>
                        <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                       
                        <SelectContent className='shad-select-content'>
                            {React.Children.count(props.children) === 1 ? props.children : <>{props.children}</>}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
     case FormFieldType.TEXTAREA:
        return (
            <FormControl>
                <Textarea
                {...field}
                placeholder={placeholder}
                className='shad-textArea resize-none'
                disabled={props.disabled}
                />
            </FormControl>
        )       

    case FormFieldType.CHECKBOX:
        return(
            <FormControl>
                <div className="flex items-center gap-4">
                    <Checkbox
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                <label htmlFor={props.name}
                className='checkbox-label'
                >{props.label}</label>
                </div>
            </FormControl>
        )

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
