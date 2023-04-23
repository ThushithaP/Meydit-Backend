import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AcceptQuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    buyerId: schema.number(),
    makerId: schema.number(),
    jobId: schema.number(),
    quoteId: schema.number(),
    buyerName: schema.string(),
    buyerEmail: schema.string(),
    buyerAddress: schema.string(),
    buyerContactNumber: schema.string(),
    jobType: schema.string(),
    jobBudget: schema.string(),
    jobDescription: schema.string.optional(),
    makerName: schema.string(),
    makerEmail: schema.string(),
    makerContactNumber: schema.string(),
    makerPrice: schema.string(),
    makerDuration: schema.string(),
  });

  public messages: CustomMessages = {};
}
