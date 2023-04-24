import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import RegisterValidator from "App/Validators/RegisterValidator";
import LoginValidator from "App/Validators/LoginValidator";

import Mail from "@ioc:Adonis/Addons/Mail";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
  // register

  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator);
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = await Hash.make(data.password);
    user.contactNumber = data.contactNumber;
    user.role = data.role;

    await user.save();

    // send mail
    const smtp = process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : "";

    await Mail.send((message) => {
      message
        .from(smtp)
        .to(user.email)
        .subject("WEOLCOME TO MEYDIT")
        .htmlView("emails/welcome", { name: user.name });
    });

    return response
      .status(201)
      .json({ message: "Account Created Successfull" });
  }

  // public async login({ auth, request, response }: HttpContextContract) {
  //   const data = await request.validate(LoginValidator);

  //   const user = await User.findBy("email", data.email);

  //   if (!user) {
  //     console.log("Email Not Found");
  //   } else {
  //     const passwordValid = await Hash.verify(user.password, data.password);

  //     const token = await auth.use("web").attempt(data.email, data.password);

  //     if (passwordValid) {
  //       try {
  //         return { user, token };
  //       } catch (error) {
  //         console.log(error);
  //         return response.status(401).json({ message: "Invalid Credentials" });
  //       }
  //     } else {
  //       console.log("Invalid Password");
  //     }
  //   }
  // }

  public async login({ request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator);

    const user = await User.findBy("email", data.email);

    if (!user) {
      console.log("Email Not Found");
    } else {
      const passwordValid = await Hash.verify(user.password, data.password);
      if (passwordValid) {
        try {
          return user;
        } catch (error) {
          console.log(error);
          return response.status(401).json({ message: "Invalid Credentials" });
        }
      } else {
        console.log("Invalid Password");
      }
    }
  }

  // user details by id
  public async UserDetails({ params }: HttpContextContract) {
    const id = params.id;

    try {
      const response = await Database.from("users").where("id", id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // user info update

  public async UpdateProfile({ request, response }: HttpContextContract) {
    const { id, name, email, contactNumber } = request.only([
      "id",
      "name",
      "email",
      "contactNumber",
    ]);
    const newData = await Database.from("users").where("id", id).update({
      name: name,
      email: email,
      contactNumber: contactNumber,
    });

    return response.status(200).json(newData);
  }

  // user password change
  public async UpdatePassword({ request, response }: HttpContextContract) {
    const { id, oldPassword, newPassword } = request.only([
      "id",
      "oldPassword",
      "newPassword",
    ]);
    const userFind = await User.findBy("id", id);
    if (!userFind) {
      console.log("User Not Found");
    } else {
      const passwordValid = await Hash.verify(userFind.password, oldPassword);
      if (passwordValid) {
        try {
          const password = await Hash.make(newPassword);
          const updatePassword = await Database.from("users")
            .where("id", id)
            .update({ password: password });

          return response.status(200).json(updatePassword);
        } catch (err) {
          console.log(err);
        }
      } else {
      }
    }
  }
}
