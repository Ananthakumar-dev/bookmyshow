import { z } from "zod"
import languages from "@/_lib/language";
import certifications from "@/_lib/certification";
import movie_status from "@/_lib/movie_status";
import cast_options from "@/_lib/cast_options";

const languageValues = languages.map(el => el.value)
const certificationValues = certifications.map(el => el.value)
const movieStatusValues = movie_status.map(el => el.value)
const castValues = cast_options.map(el => el.value)

const castSchema = z.object({
    name: z.string(),
    role: z.string()
        .refine(val => castValues.includes(val), {
            message: 'Invalid cast value selected'
        }),
    image: z.any()
        .refine(val =>
            !val || (val.length > 0 && val[0] instanceof File && val[0].type.startsWith("image/")),
            {message: 'Invalid or missing image file'}
        )
        .optional(),
    imageUrl: z.string()
        .url()
        .optional(),
})

const movieSchema = z.object({
    title: z.string().min(2, {
        message: "title required atleast 2 characters",
    }),
    description: z.string(),
    duration: z.coerce.number().min(1),
    release_date: z.coerce.date(),
    genre: z.string()
        .array(),
    language: z.string()
        .refine(val => languageValues.includes(val), {
            message: 'Invalid language selected'
        }),
    poster_url: z.string().url(),
    trailer_url: z.string().url().optional(),
    certification: z.string()
        .refine(val => certificationValues.includes(val), {
            message: 'Invalid certification selected'
        }),
    status: z.string()
        .refine(val => movieStatusValues.includes(val), {
            message: 'Invalid status'
        }),
    language_versions: z.string().array(),
    casts: z.array(castSchema).min(1, 'At least one cast member is required')
})

export type movieSchemaType = z.infer<typeof movieSchema>
export default movieSchema;