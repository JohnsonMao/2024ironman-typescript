import { ZodIssue } from 'zod';

export default function validateZodIssue(error: unknown): error is ZodIssue[] {
    return Array.isArray(error) && error.every((e) => e.message && Array.isArray(e.path));
}
