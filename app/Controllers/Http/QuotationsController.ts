import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Quotation from "App/Models/Quotation";

import QuotationValidator from "App/Validators/QuotationValidator";

export default class QuotationsController {
  // send quotation
  public async sendQuote({ request, response }: HttpContextContract) {
    const data = await request.validate(QuotationValidator);

    const quote = new Quotation();
    (quote.jobId = data.jobId),
      (quote.buyerId = data.buyerId),
      (quote.makerId = data.makerId),
      (quote.jobType = data.jobType),
      (quote.coverLetter = data.coverLetter),
      (quote.price = data.price),
      (quote.duration = data.duration);
    await quote.save();

    // send mail
    const email = data.email;
    const smtp = process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : "";
    await Mail.send((message) => {
      message
        .from(smtp)
        .to(email)
        .subject("Qutotation Received")
        .htmlView("emails/quote", {
          coverLetter: data.coverLetter,
          price: data.price,
          duration: data.duration,
        });
    });

    return response
      .status(201)
      .json({ message: "Quaotation send successfully" });
  }

  // count quotation

  public async countQuote({ params, response }: HttpContextContract) {
    const jobId = params.jobId;

    const count = await Database.from("quotations")
      .where("jobId", jobId)
      .count("* as count")
      .first();
    // console.log(`Number of quotations with jobId = ${jobId}: ${count.count}`);
    return response.status(200).json(count.count);
  }

  public async QuoteAllDetails({ params }: HttpContextContract) {
    const buyerId = params.buyerId;
    // fetch all data from quotations
    const QuotationDetails = await Database.from("quotations").where(
      "buyerId",
      buyerId
    );

    // fetch all data from user for given buyerId
    const UserDetails = await Promise.all(
      QuotationDetails.map(async (QuoteDetail) => {
        const makerId = QuoteDetail.makerId;
        const user = await Database.from("users").where("id", makerId).first();
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          contactNumber: user.contactNumber,
        };
      })
    );
    return { QuotationDetails, UserDetails };
  }

  public async QuoteDetailsById({ params }: HttpContextContract) {
    try {
      const makerId = params.makerId;
      const quoteDetails = await Database.from("quotations").where(
        "makerId",
        makerId
      );
      return quoteDetails;
    } catch (error) {
      console.log(error);
    }
  }
}
