import z, { string } from 'zod'

export const passwordSchema = z.object({
  password: z.string()
    .min(1, "Password is Required")
})

export const createPasswordSchema = passwordSchema.extend({
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
})

export const createPasswordOutputSchema = z.object({
  password: z.string()
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