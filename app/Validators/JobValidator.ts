import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class JobValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    buyerId: schema.number(),
    firstname: schema.string(),
    lastname: schema.string(),
    phone_number: schema.string(),
    email: schema.string(),
    postcode: schema.string(),
    street: schema.string(),
    state: schema.string(),
    type: schema.string(),
    description: schema.string(),
    budget: schema.number.optional(),
    images: schema.array([rules.minLength(0), rules.maxLength(5)]).members(
      schema.file({
        extnames: ["jpg", "jpeg", "png"],
        size: "2mb",
      })
    ),
  });

  public messages: CustomMessages = {};
}
