import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "quotations";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("jobId").unsigned().nullable();
      table.integer("buyerId").unsigned().nullable();
      table.integer("makerId").unsigned().nullable();
      table.string("jobType", 100).nullable();
      table.string("coverLetter", 500).nullable();
      table.string("price", 50).nullable();
      table.string("duration", 50).nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
