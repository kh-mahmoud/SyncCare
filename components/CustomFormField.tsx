'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { CustomFieldProps, FieldType } from "@/types";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "./ui/checkbox";



const RenderField = ({ field, props }: { field: any, props: CustomFieldProps }) => {

    switch (props.fieldType) {
        case FieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.icon && (
                        <Image
                            src={props.icon}
                            alt={props.iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl className="flex-1">
                        <Input
                            name={props.name}
                            placeholder={props.placeholder}
                            {...field}
                            type="text"
                            className="shad-input border-0 truncate"
                        />
                    </FormControl>
                </div>

            )

        case FieldType.TEXTAREA:
            return (
                <div className="flex rounded-md border-border-dark-500 bg-dark-400">
                    {props.icon &&
                        <Image
                            src={props.icon}
                            alt={props.iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    }
                    <FormControl>
                        <Textarea name={props.name} placeholder={props.placeholder} {...field} type="text" className="shad-textArea" />
                    </FormControl>
                </div>
            )

        case FieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    defaultCountry="US"
                    placeholder={props.placeholder}
                    international
                    value={field.value}
                    onChange={field.onChange}
                    className="input-phone"
                />

            )

        case FieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border-border-dark-500 bg-dark-400">

                    <Image
                        src={"/assets/icons/calendar.svg"}
                        alt={"calendar"}
                        width={24}
                        height={24}
                        className="ml-2"
                    />

                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={props.dateFormat}
                            placeholderText="Select your birth date"
                            isClearable
                            showTimeSelect={props?.showTimeSelect && true}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker w-full"
                        />


                    </FormControl>
                </div>
            )

        case FieldType.SKELETON:
            return (
                props.renderSkelton ? props.renderSkelton(field) : null
            )


        case FieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="shad-select-trigger ">
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>

                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )

        case FieldType.CHECKBOX:
            return (
                <div className="flex items-center gap-4">
                    <Checkbox
                        id={props.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    <label htmlFor={props.name}>{props.label}</label>
                </div>
            )

        default:
            break;
    }
}



const CustomFormField = (props: CustomFieldProps) => {

    const { control, fieldType, name, label } = props

    return (
        <div className="w-full">
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        {label && fieldType !== FieldType.CHECKBOX &&
                            <FormLabel>{label}</FormLabel>
                        }

                        <RenderField field={field} props={props} />
                        <FormMessage className="text-red-700" />
                    </FormItem>
                )}
            />
        </div>
    );
}

export default CustomFormField;
