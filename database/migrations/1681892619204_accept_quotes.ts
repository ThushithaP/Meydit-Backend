import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "accept_quotes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("buyerId").notNullable();
      table.integer("makerId").notNullable();
      table.integer("jobId").notNullable();
      table.integer("quoteId").notNullable();
      table.string("buyerName", 255).notNullable();
      table.string("buyerEmail", 255).notNullable();
      table.string("buyerAddress", 255).notNullable();
      table.string("buyerContactNumber", 20).notNullable();
      table.string("jobType", 255).notNullable();
      table.decimal("jobBudget", 10, 2).notNullable();
      table.string("makerName", 255).notNullable();
      table.string("makerEmail", 255).notNullable();
      table.string("makerContactNumber", 20).notNullable();
      table.decimal("makerPrice", 10, 2).notNullable();
      table.string("makerDuration", 255).notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
