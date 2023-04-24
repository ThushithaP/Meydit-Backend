/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

// user register and login
Route.post("/userRegister", "UsersController.register");
Route.post("/userLogin", "UsersController.login");
// Job posting and get job data
Route.post("/createJobs", "JobsController.store");
Route.get("/jobDetail", "JobsController.jobDetail");
// Job by id
Route.get("jobsById/:buyerId", "JobsController.JobDetailsById");
Route.get("jobsByJobId/:jobId", "JobsController.JobDetailsByJobId");
Route.delete("jobDelete/:id", "JobsController.JobDeleteById");
// Quotation
Route.post("/sendQuote", "QuotationsController.sendQuote");
Route.get("/countQuote/:jobId", "QuotationsController.countQuote");
Route.get("/quoteAll/:buyerId", "QuotationsController.QuoteAllDetails");
// qutotaion by makerId
Route.get("/quoteById/:makerId", "QuotationsController.QuoteDetailsById");
//accept quotations
Route.post("/acceptQuote", "AcceptQuotesController.confirmQuote");
Route.get(
  "/acceptQuote/:makerId",
  "AcceptQuotesController.acceptQuoteDetailsByMakerId"
);
//update job
Route.put("updateJob", "JobsController.UpdateJob");
// user details by id
Route.get("/userDetails/:id", "UsersController.UserDetails");
Route.put("/updateUser", "UsersController.UpdateProfile");
Route.put("/updatePassword", "UsersController.UpdatePassword");
