"use client"

import React from 'react'
import screenSchema, {screenSchemaType} from '@/app/admin/(authenticated)/screens/form-schema'
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Plus, Trash} from "lucide-react";
import Layout from "@/components/SeatLayout/Layout";
import statuses from "@/_lib/status";
import special_formats from "@/_lib/special_formats";

const ScreenForm = (
    { defaultValues }: { defaultValues: screenSchemaType }
) => {
    const form = useForm<screenSchemaType>({
        resolver: zodResolver(screenSchema),
        defaultValues
    });

    const onSubmit = (values: screenSchemaType) => {
        console.log(values)
    }

    const { fields: formats, append: formatsAppend, remove: formatsRemove } = useFieldArray({
        control: form.control,
        name: 'formats'
    })
    const watchFormats = form.watch('formats');

    return (
        <div className="space-y-2">
            <Alert variant="default">
                <AlertTitle>Customize seat layout</AlertTitle>
                <AlertDescription>
                    <Sheet>
                        <SheetTrigger>
                            <span className="text-blue-500">Click here</span>
                        </SheetTrigger>

                        <SheetContent
                            side="bottom"
                            className="h-screen rounded-none overflow-auto"
                        >
                            <SheetHeader>
                                <SheetTitle>Customize seat layout</SheetTitle>
                                <SheetDescription>Here you can customize seat layout for the screen - {form.getValues('name')}</SheetDescription>
                            </SheetHeader>

                            <Layout />
                        </SheetContent>
                    </Sheet>
                </AlertDescription>
            </Alert>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Screen name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="order"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormDescription>This is the screen number of theater. if theater has multi screen this
                                    order number has used to identify the screen number</FormDescription>
                                <FormControl>
                                    <Input type="number" placeholder="Screen order number" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="shadow-sm space-y-2">
                        <div>
                            <h6 className="mb-0">Formats</h6>
                            <span className="text-xs">Like 4k, 3D and so on</span>
                        </div>

                        {
                            formats.map((el, index) => {
                                const checkCustomFormatChecked = watchFormats[index].custom_format

                                return (
                                    <div className="flex items-center gap-2" key={el.id}>
                                        <FormField
                                            control={form.control}
                                            name={`formats.${index}.format`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select format"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    special_formats.map(el => (
                                                                        <SelectItem value={el.value} key={el.value}>
                                                                            {el.label}
                                                                        </SelectItem>))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`formats.${index}.custom_format`}
                                            render={({field}) => {
                                                return (
                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            Are you want to add custom format?
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {
                                            checkCustomFormatChecked && (
                                                <FormField
                                                    control={form.control}
                                                    name={`formats.${index}.custom_format_name`}
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="Custom format name" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        }

                                        <div className="actions">
                                            {
                                                formats.length === index + 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        onClick={() => formatsAppend({
                                                            format: '',
                                                            custom_format: false,
                                                            custom_format_name: ''
                                                        })}
                                                    >

                                                        <Plus/>
                                                    </Button>
                                                )
                                            }

                                            {
                                                index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        onClick={() => formatsRemove(index)}
                                                    >
                                                        <Trash/>
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                statuses.map(el => (
                                                    <SelectItem value={el.value} key={el.value}>
                                                        {el.label}
                                                    </SelectItem>))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}
export default ScreenForm
