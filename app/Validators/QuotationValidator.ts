import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QuotationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    jobId: schema.number(),
    buyerId: schema.number(),
    makerId: schema.number(),
    jobType: schema.string(),
    coverLetter: schema.string(),
    price: schema.string(),
    duration: schema.string(),
    email: schema.string(),
  });

  public messages: CustomMessages = {};
}
