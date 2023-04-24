import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Job from "App/Models/Job";

import JobValidator from "App/Validators/JobValidator";

export default class JobsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // Create an instance of the ClothingOrderValidator class
      const validatedData = await request.validate(JobValidator);

      // Store the images  and get their paths
      const imagePaths: (string | any)[] = [];

      for (const image of validatedData.images) {
        const path = `/orders/${image.clientName}`;
        await image.move("../frontend/meydit/public/orders", {
          name: `${image.clientName}`,
        });

        imagePaths.push(path);
      }

      // Save the clothing order to the database
      const job = await Database.table("jobs").insert({
        buyerId: validatedData.buyerId,
        firstname: validatedData.firstname,
        lastname: validatedData.lastname,
        phone_number: validatedData.phone_number,
        email: validatedData.email,
        postcode: validatedData.postcode,
        street: validatedData.street,
        state: validatedData.state,
        type: validatedData.type,
        description: validatedData.description,
        budget: validatedData.budget,
        image_1: imagePaths[0]?.toString(),
        image_2: imagePaths[1]?.toString(),
        image_3: imagePaths[2]?.toString(),
        image_4: imagePaths[3]?.toString(),
        image_5: imagePaths[4]?.toString(),
      });

      return response.created(job);
    } catch (error) {
      console.log(error);

      return response.status(422).json({
        success: false,
        message: "Validation error",
        errors: error.messages.errors,
      });
    }
  }

  // ----get job details---//

  public async jobDetail({ response }) {
    try {
      // Retrieve all job from database
      const job = await Job.all();
      // console.log(response);

      return response.status(200).json(job);
    } catch (error) {
      console.error(error);

      return response.badRequest({
        message: "Error retrieving clothing orders",
        error,
      });
    }
  }

  //get jobdetails by buyerid

  public async JobDetailsById({ params }: HttpContextContract) {
    const buyerId = params.buyerId;
    //fetch data from jobs table
    const Jobs = await Database.from("jobs").where("buyerId", buyerId);

    return Jobs;
  }

  // get jobdetails by jobid
  public async JobDetailsByJobId({ params }: HttpContextContract) {
    const jobId = params.jobId;
    const Jobs = await Database.from("jobs").where("id", jobId);
    return Jobs;
  }

  // update job

  public async UpdateJob({ request, response }: HttpContextContract) {
    try {
      const {
        id,
        firstname,
        lastname,
        phone_number,
        email,
        postcode,
        street,
        state,
        type,
        budget,
        description,
      } = request.only([
        "id",
        "firstname",
        "lastname",
        "phone_number",
        "email",
        "postcode",
        "street",
        "state",
        "type",
        "budget",
        "description",
      ]);

      const newJobData = await Database.from("jobs").where("id", id).update({
        id: id,
        firstname: firstname,
        lastname: lastname,
        phone_number: phone_number,
        email: email,
        postcode: postcode,
        street: street,
        state: state,
        type: type,
        description: description,
        budget: budget,
      });

      return response.status(200).json(newJobData);
    } catch (error) {
      console.log(error);
      return "Error during job update";
    }
  }

  // delete job
  public async JobDeleteById({ params, response }: HttpContextContract) {
    try {
      const Jobid = params.id;
      //delete data from jobs table
      await Database.from("jobs").where("id", Jobid).delete();
      return response
        .status(200)
        .json({ message: `Job with ID ${Jobid} has been deleted` });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
