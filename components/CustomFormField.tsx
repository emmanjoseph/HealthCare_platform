'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Control } from 'react-hook-form'
import { FormFieldType } from './Forms/PatientForm'
import { IconType } from 'react-icons'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    label?: string,
    placeholder?: string,
    icon?: IconType,
    name: string,
    disabled?: boolean,
    dateformat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    return <Input {...field} placeholder={props.placeholder} disabled={props.disabled} />
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
