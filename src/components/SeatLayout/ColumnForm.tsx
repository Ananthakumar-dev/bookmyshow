import React, {useEffect} from 'react'
import {useFieldArray, useWatch} from "react-hook-form"
import {
    FormField,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const ColumnForm = ({ control, index }) => {
    const { fields: columnFields, append, remove } = useFieldArray({
        control,
        name: `sections.${index}.columns`
    });

    const numberOfColumns = useWatch({
        control,
        name: `sections.${index}.number_of_columns_that_section_contains`
    });

    useEffect(() => {
        if (Number(numberOfColumns) >= 0) {
            const diff = numberOfColumns - columnFields.length;
            if (diff > 0) {
                Array.from({ length: diff }).forEach(() =>
                    append({ max_seats_that_column_contains: 1 })
                );
            } else if (diff < 0) {
                Array.from({ length: -diff }).forEach(() =>
                    remove(columnFields.length - 1)
                );
            }
        }
    }, [numberOfColumns, columnFields.length, append, remove]);

    return (
        <div>
            {/* Render number_of_columns_that_section_contains input */}
            <div>
                <span>Number of columns that section contains</span>
                <FormField
                    control={control}
                    name={`sections.${index}.number_of_columns_that_section_contains`}
                    render={({field}) => (
                        <Input type="number" placeholder="Number of columns" {...field} />
                    )}
                />
            </div>

            {/* Render column fields */}
            <div>
                <p>Max number of seats that each column contains</p>
                <div className="flex flex-wrap gap-2">
                    {columnFields.map((columnEl, columnIndex) => (
                        <HoverCard key={columnEl.id}>
                            <HoverCardTrigger>
                                <FormField
                                    control={control}
                                    name={`sections.${index}.columns.${columnIndex}.max_seats_that_column_contains`}
                                    render={({field}) => (
                                        <Input
                                            type="number"
                                            placeholder={`Max seats for column ${columnIndex + 1}`}
                                            className="max-w-[200px]"
                                            {...field}
                                        />
                                    )}
                                />
                            </HoverCardTrigger>
                            <HoverCardContent align="end">
                                For Column - {columnIndex + 1}
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ColumnForm
