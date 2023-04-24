import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "jobs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("buyerId").unsigned().notNullable();
      table.string("firstname", 255).notNullable();
      table.string("lastname", 255).notNullable();
      table.string("phone_number", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("postcode", 255).notNullable();
      table.string("street", 255).notNullable();
      table.string("state", 255).notNullable();
      table.string("type", 255).notNullable();
      table.text("description").nullable();
      table.decimal("budget", 10, 2).nullable();
      table.string("image_1", 255).nullable();
      table.string("image_2", 255).nullable();
      table.string("image_3", 255).nullable();
      table.string("image_4", 255).nullable();
      table.string("image_5", 255).nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
