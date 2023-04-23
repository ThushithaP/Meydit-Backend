import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
  });

  public messages: CustomMessages = {
    "email.required": "Please enter your email address.",
    "email.email": "Please enter a valid email address.",
    "password.required": "Please enter your password.",
    "password.minLength": "Your password must be at least 6 characters long.",
  };
}
