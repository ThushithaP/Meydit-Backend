import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "jobId" })
  public jobId: number;

  @column({ columnName: "buyerId" })
  public buyerId: number;

  @column({ columnName: "makerId" })
  public makerId: number;

  @column({ columnName: "jobType" })
  public jobType: string;

  @column({ columnName: "coverLetter" })
  public coverLetter: string;

  @column()
  public price: string;

  @column()
  public duration: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
