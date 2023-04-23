import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(20),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/),
    ]),
    contactNumber: schema.string(),
    role: schema.string(),
  });

  public messages: CustomMessages = {
    "buyername.required": "Username is required",
    "buyername.minLength":
      "buyername should be at least {{ options.minLength }} characters long",
    "buyername.maxLength":
      "buyername should not be longer than {{ options.maxLength }} characters",
    "email.required": "Email is required",
    "email.email": "Please enter a valid email address",
    "email.unique": "Email address is already in use",
    "password.required": "Password is required",
    "password.minLength":
      "Password should be at least {{ options.minLength }} characters long",
  };
}
