"use client"

import React from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"

import {
    Command,
    CommandInput,
    CommandItem,
    CommandGroup,
    CommandEmpty,
} from "@/components/ui/command";

import {useFieldArray, useForm} from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {CalendarIcon, Plus, Trash} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod";
import movieSchema, { movieSchemaType } from "@/app/admin/(authenticated)/movies/form-schema";
import genre from "@/_lib/genre";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import language from "@/_lib/language";
import certification from "@/_lib/certification";
import movie_status from "@/_lib/movie_status"
import cast_options from "@/_lib/cast_options";
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type MovieFormProps = {
  defaultValues: movieSchemaType;
  mode: "add" | "edit";
  movieId?: string;
};

const MovieForm = (
    { defaultValues, mode, movieId }: MovieFormProps
) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(movieSchema),
        defaultValues
    })

    const { fields: castFields, append, remove } = useFieldArray({
        control: form.control,
        name: "casts"
    })

    const onSubmit = async (values: movieSchemaType) => {
        const url = mode === "edit" ? `/api/movies/${movieId}` : "/api/movies";
        const method = mode === "edit" ? "PATCH" : "POST";
        const msg = mode === "edit" ? "Movie has been updated." : "Movie has been created.";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if(res.ok) {
                toast(msg)
                router.push("/admin/movies");
            } else {
                toast.error("Something went wrong!");    
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Movie name" {...field} />
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
                                <Textarea placeholder="Movie description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration (In Minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Movie duration in minutes" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="release_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Release Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => {
                        const toggleGenre = (val: string) => {
                            if(field.value.includes(val)) {
                                field.onChange(field.value.filter((v: string) => v !== val))
                            } else {
                                field.onChange([...field.value, val])
                            }
                        };

                        const selectedLabels = genre
                            .filter((g) => field.value.includes(g.value))
                            .map((g) => g.label);

                        return (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline" type="button" className="w-full justify-start">
                                                {
                                                    selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Select Label'
                                                }
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search genres..." />
                                            <CommandEmpty>No genres found.</CommandEmpty>
                                            <CommandGroup>
                                                {genre.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        onSelect={() => toggleGenre(option.value)}
                                                    >
                                                        <Checkbox
                                                            checked={field.value.includes(option.value)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Movie language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            language.map(el => (<SelectItem value={el.value} key={el.value}>
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
                    name="poster_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Poster Url</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="Poster Url" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="trailer_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trailer Url</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="Trailer Url" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="certification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Certification</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Movie certification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            certification.map(el => (<SelectItem value={el.value} key={el.value}>
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
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Movie status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            movie_status.map(el => (<SelectItem value={el.value} key={el.value}>
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
                    name="language_versions"
                    render={({ field }) => {
                        const toggleLanguageVersions = (val: string) => {
                            if(field.value.includes(val)) {
                                field.onChange(field.value.filter((v: string) => v !== val))
                            } else {
                                field.onChange([...field.value, val])
                            }
                        };

                        const selectedLanguageVersions = language
                            .filter((selectedLanguage) => field.value.includes(selectedLanguage.value))
                            .map((selectedLanguage) => selectedLanguage.label);

                        return (
                            <FormItem>
                                <FormLabel>Language versions</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline" type="button" className="w-full justify-start">
                                                {
                                                    selectedLanguageVersions.length > 0 ? selectedLanguageVersions.join(', ') : 'Select Label'
                                                }
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search languages..." />
                                            <CommandEmpty>No languages found.</CommandEmpty>
                                            <CommandGroup>
                                                {language.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        onSelect={() => toggleLanguageVersions(option.value)}
                                                    >
                                                        <Checkbox
                                                            checked={field.value.includes(option.value)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Ex: Some movies originally production in one language. But it dubbed in so many other languages.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <div className="border shadow-sm p-4 space-y-4">
                    <h6>Casts</h6>
                    {
                        castFields.map((el, index) => {
                            return (
                                <div className="flex items-center gap-4 w-full" key={el.id}>
                                    <FormField
                                        control={form.control}
                                        name={`casts.${index}.role`}
                                        render={({field}) => (
                                            <FormItem className="w-[22%]">
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Cast role"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                cast_options.map(el => (
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
                                        name={`casts.${index}.name`}
                                        render={({field}) => (
                                            <FormItem className="w-[22%]">
                                                <FormControl>
                                                    <Input placeholder="Cast name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`casts.${index}.image`}
                                        render={({field}) => (
                                            <FormItem className="w-[22%]">
                                                <FormControl>
                                                    <Input type="file" accept="image/*" placeholder="Cast image" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`casts.${index}.imageUrl`}
                                        render={({field}) => (
                                            <FormItem className="w-[22%]">
                                                <FormControl>
                                                    <Input type="url" placeholder="Cast image url" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {
                                        castFields.length === index + 1 && (
                                            <Button
                                                type="button"
                                                variant="link"
                                                onClick={() => append({ name: '', role: '', image: '', imageUrl: '' })}
                                                className="w-fit max-w-[22%]"
                                            >

                                                <Plus />
                                            </Button>
                                        )
                                    }

                                    {
                                        index > 0 && (
                                            <Button
                                                type="button"
                                                variant="link"
                                                className="w-fit max-w-[22%]"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash />
                                            </Button>
                                        )
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                
                <div className="text-right">
                    <Link href="/admin/movies">
                        <Button type="button" variant="link">Cancel</Button>
                    </Link>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default MovieForm