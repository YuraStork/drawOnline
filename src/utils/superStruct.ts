import { number, object, string } from "superstruct";

export const UserDataStructure = object({
  id: string(),
  name: string(),
  age: number(),
  role: string(),
  email: string(),
  country: string(),
  city: string(),
  color: string(),
  gander: string(),
  biography: string(),
  date: string(),
})