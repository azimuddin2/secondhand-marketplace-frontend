import { z } from 'zod';

export const listingSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  price: z.string({ required_error: 'Price is required' }),
  condition: z.string({ required_error: 'Condition is required' }),
  description: z.string({ required_error: 'Description is required' }),
});
