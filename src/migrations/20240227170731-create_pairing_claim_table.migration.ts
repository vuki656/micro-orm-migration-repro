import { Migration } from '@mikro-orm/migrations'

export class Migration20240227170731_create_pairing_claim_table extends Migration {
    public async up(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.schema.createTable('pairing_claims', (table) => {
            table.uuid('id')
                .primary()
                .defaultTo(this.getKnex().raw('gen_random_uuid()'))
            table.timestamp('created_at')
                .defaultTo(this.getKnex().fn.now())
                .notNullable()
            table.timestamp('modified_at')
                .defaultTo(this.getKnex().fn.now())
                .notNullable()
        })

        await queryBuilder.raw(`
            CREATE TRIGGER pairing_claim_modified_at_trigger
                BEFORE UPDATE 1111
                ON pairing_claims
                FOR EACH ROW
            EXECUTE PROCEDURE update_modified_at();
        `)
    }

    public async down(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.schema.dropTable('pairing_claims')
        await queryBuilder.raw('DROP TRIGGER pairing_claim_modified_at_trigger ON pairing_claims')
    }
}
