import z, { string } from 'zod'

export const createPasswordOutputSchema = z.object({
  password: z.string()
})

export const customUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
}).nullable()

export const passwordSchema = z.object({
  user: customUserSchema,
  password: z.string()
    .min(1, "Password is Required")
})

export const createPasswordSchema = passwordSchema.extend({
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
})

export type LoginUserInput = z.TypeOf<typeof passwordSchema>

export type CreateUserInput = z.TypeOf<typeof createPasswordSchema>

export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default('/'),
})

export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
  hash: z.string(),
})

export type CustomUser = z.TypeOf<typeof customUserSchema>