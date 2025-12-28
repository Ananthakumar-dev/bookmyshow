"use client"

import React from 'react'

import {
    Form,
    FormControl,
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

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {zodResolver} from "@hookform/resolvers/zod";
import theaterSchema, {theaterSchemaType} from "@/app/admin/(authenticated)/theaters/form-schema";
import cities from "@/_lib/city";

import { toast } from "sonner"

import { useRouter } from 'next/navigation';

type TheaterFormProps = {
  defaultValues: theaterSchemaType;
  mode: "add" | "edit";
  theaterId?: string;
};

const TheatreForm = (
    { defaultValues, mode, theaterId }: TheaterFormProps
) => {
    const router = useRouter();

    const form = useForm<theaterSchemaType>({
        resolver: zodResolver(theaterSchema),
        defaultValues
    });

    const onSubmit = async (values: theaterSchemaType) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as any);
            }
        });

        const url = mode === "edit" ? `/api/theaters/${theaterId}` : "/api/theaters";
        const method = mode === "edit" ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                body: formData,
            });
    
            if(res.ok) {
                toast("Theater has been created.")
                router.push("/admin/theaters");
            }
        } catch(error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Theater name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Theater description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theater located city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            cities.map(el => (<SelectItem value={el.value} key={el.value}>
                                                {el.label}
                                            </SelectItem>))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Theater located address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Theater phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Theater official email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Photo</FormLabel>
                            <FormControl>
                                <Input 
                                    type="file" 
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                    onBlur={field.onBlur}
                                    disabled={field.disabled}
                                    name={field.name}
                                    ref={field.ref}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="text-right">Submit</Button>
            </form>
        </Form>
    )
}
export default TheatreForm
