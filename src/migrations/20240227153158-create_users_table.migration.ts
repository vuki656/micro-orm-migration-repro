import { Migration } from '@mikro-orm/migrations'

export class Migration20240227153158_create_users_table extends Migration {
    public async up(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.schema.createTable('users', (table) => {
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
            CREATE TRIGGER users_modified_at_trigger
                BEFORE UPDATE
                ON users
                FOR EACH ROW
            EXECUTE PROCEDURE update_modified_at();
        `)
    }

    public async down(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.schema.dropTable('users')
        await queryBuilder.raw('DROP TRIGGER users_modified_at_trigger ON users')
    }
}

