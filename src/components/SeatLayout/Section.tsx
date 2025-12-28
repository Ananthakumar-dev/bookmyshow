import React from 'react'
import {useFieldArray} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowRight, Plus, Trash} from "lucide-react";
import {useSeatLayout} from "@/context/SeatLayoutContext";
import ColumnForm from "@/components/SeatLayout/ColumnForm";

const Section = () => {
    const {form, moveToNextStep, activeDivision} = useSeatLayout();
    const {fields: sectionFields, append: sectionAppend, remove: sectionRemove} = useFieldArray({
        control: form.control,
        name: 'sections'
    })

    return (
        <>
            <div className="space-y-2 p-4">
                {
                    sectionFields.map((sectionEl, index) => {
                        return (
                            <div key={sectionEl.id} className="space-y-2">
                                <div className="pl-4">
                                    <div className={`${activeDivision === 0 ? 'block' : 'hidden'}`}>
                                        <h6>Section {index + 1}</h6>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <FormField
                                                control={form.control}
                                                name={`sections.${index}.name`}
                                                render={({field}) => (
                                                    <FormItem className="min-w-[30%]">
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Section name" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`sections.${index}.section_number`}
                                                render={({field}) => (
                                                    <FormItem className="min-w-[30%]">
                                                        <FormLabel>Section No</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Section No" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`sections.${index}.price`}
                                                render={({field}) => (
                                                    <FormItem className="min-w-[30%]">
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input type="number"
                                                                   placeholder="Section price" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`sections.${index}.number_of_rows`}
                                                render={({field}) => (
                                                    <FormItem className="min-w-[30%]">
                                                        <FormLabel>Number of rows</FormLabel>
                                                        <FormControl>
                                                            <Input type="number"
                                                                   placeholder="Now of rows per section" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="text-right">
                                            {
                                                sectionFields.length === index + 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        onClick={() => sectionAppend({
                                                            id: index + 1,
                                                            name: '',
                                                            price: 0,
                                                            section_number: index + 2,
                                                            number_of_rows: 0,
                                                            number_of_columns_that_section_contains: 1,
                                                            columns: [
                                                                {
                                                                    max_seats_that_column_contains: 1
                                                                }
                                                            ]
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
                                                        onClick={() => sectionRemove(index)}
                                                    >
                                                        <Trash/>
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>


                                    <div className={activeDivision === 1 ? 'block pb-1 border-b' : 'hidden'}>
                                        {index === 0 && (
                                            <h5 className="text-xl mb-2 text-primary">Columns Customization</h5>)}

                                        <p>Section - {index + 1}</p>
                                        <ColumnForm
                                            key={sectionEl.id}
                                            control={form.control}
                                            index={index}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="text-right">
                <Button type="button" variant="link" onClick={moveToNextStep}>
                    Next
                    <ArrowRight/>
                </Button>
            </div>
        </>
    )
}
export default Section
