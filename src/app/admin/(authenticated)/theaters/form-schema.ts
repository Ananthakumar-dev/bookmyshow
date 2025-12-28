import { z } from "zod"

const theaterSchema = z.object({
    name: z.string().min(2, {
        message: "Name required atleast 2 characters",
    }),
    description: z.string(),
    city: z.string().min(2),
    address: z.string(),
    phone: z.string().min(2),
    email: z.string(),
    photo: z.instanceof(File).optional(),
    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
})

export type theaterSchemaType = z.infer<typeof theaterSchema>
export default theaterSchema;