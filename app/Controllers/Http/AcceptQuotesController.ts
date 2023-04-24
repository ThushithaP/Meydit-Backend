import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
// import AcceptQuote from "App/Models/AcceptQuote";
import Mail from "@ioc:Adonis/Addons/Mail";
import AcceptQuoteValidator from "App/Validators/AcceptQuoteValidator";

export default class AcceptQuotesController {
  //save accept quote details to database and send mail to maker
  public async confirmQuote({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(AcceptQuoteValidator);
      const confirmQuote = await Database.table("acceptQuotes").insert({
        buyerId: data.buyerId,
        makerId: data.makerId,
        jobId: data.jobId,
        quoteId: data.quoteId,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerAddress: data.buyerAddress,
        buyerContactNumber: data.buyerContactNumber,
        jobType: data.jobType,
        jobBudget: data.jobBudget,
        makerName: data.makerName,
        makerEmail: data.makerEmail,
        makerContactNumber: data.makerContactNumber,
        makerPrice: data.makerPrice,
        makerDuration: data.makerDuration,
      });
      //   send Mail to maker
      const email = data.makerEmail;
      const description = data.jobDescription;

      const smtp = process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : "";
      await Mail.send((message) => {
        message
          .from(smtp)
          .to(email)
          .subject("Qutotation Confirm")
          .htmlView("emails/confirm", {
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyerAddress: data.buyerAddress,
            buyerContactNumber: data.buyerContactNumber,
            description: description,

            makerPrice: data.makerPrice,
            makerDuration: data.makerDuration,
          });
      });

      return response.created(confirmQuote);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // fetch accept quote data by makerId
  public async acceptQuoteDetailsByMakerId({ params }: HttpContextContract) {
    const makerId = params.makerId;

    try {
      const response = await Database.from("acceptQuotes").where(
        "makerId",
        makerId
      );
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
