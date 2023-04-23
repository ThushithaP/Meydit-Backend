import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AcceptQuote extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "buyerId" })
  public buyerId: number;

  @column({ columnName: "makerId" })
  public makerId: number;

  @column({ columnName: "jobId" })
  public jobId: number;

  @column({ columnName: "quoteId" })
  public quoteId: number;

  @column({ columnName: "buyerName" })
  public buyerName: string;

  @column({ columnName: "buyerEmail" })
  public buyerEmail: string;

  @column({ columnName: "buyerAddress" })
  public buyerAddress: string;

  @column({ columnName: "buyerContactNumber" })
  public buyerContactNumber: string;

  @column({ columnName: "jobType" })
  public jobType: string;

  @column({ columnName: "jobBudget" })
  public jobBudget: string;

  @column({ columnName: "makerName" })
  public makerName: string;

  @column({ columnName: "makerEmail" })
  public makerEmail: string;

  @column({ columnName: "makerContactNumber" })
  public makerContactNumber: string;

  @column({ columnName: "makerPrice" })
  public makerPrice: string;

  @column({ columnName: "makerDuration" })
  public makerDuration: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
