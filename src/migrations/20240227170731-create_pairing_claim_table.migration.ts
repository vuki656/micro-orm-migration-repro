import { Migration } from "@mikro-orm/migrations"

export class Migration20240227170731_create_pairing_claim_table extends Migration {
    public async up(): Promise<void> {
        const knex = this.getKnex()

        await this.execute(
            knex.schema
                .createTable("pairing_claims", (table) => {
                    table
                        .uuid("id")
                        .primary()
                        .defaultTo(knex.raw("gen_random_uuid()"))
                    table
                        .timestamp("created_at")
                        .defaultTo(knex.fn.now())
                        .notNullable()
                    table
                        .timestamp("modified_at")
                        .defaultTo(knex.fn.now())
                        .notNullable()
                })
                .toQuery(),
        )

        await this.execute(`
            CREATE TRIGGER pairing_claim_modified_at_trigger
                BEFORE UPDATE
                ON pairing_claims
                FOR EACH ROW
            EXECUTE PROCEDURE update_modified_at();
        `)
    }

    public async down(): Promise<void> {
        const knex = this.getKnex()

        await this.execute(knex.schema.dropTable("pairing_claims").toQuery())

        await this.execute("DROP TRIGGER pairing_claim_modified_at_trigger ON pairing_claims")
    }
}
