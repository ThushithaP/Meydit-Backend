import { DateTime } from "luxon";
import { BaseModel, column, beforeSave } from "@ioc:Adonis/Lucid/Orm";

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "buyerId" })
  public buyerId: number;

  @column()
  public firstname: string;

  @column()
  public lastname: string;

  @column()
  public phoneNumber: string;

  @column()
  public email: string;

  @column()
  public postcode: string;

  @column()
  public street: string;

  @column()
  public state: string;

  @column()
  public type: string;

  @column()
  public description: string;

  @column()
  public budget: string;

  @column()
  public image_1: string;

  @column()
  public image_2: string;

  @column()
  public image_3: string;

  @column()
  public image_4: string;

  @column()
  public image_5: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static formatPhoneNumber(job: Job) {
    const regex = /^\+?\d{8,16}$/;
    if (job.phoneNumber && !regex.test(job.phoneNumber)) {
      throw new Error("Invalid phone number format");
    }
  }
}
