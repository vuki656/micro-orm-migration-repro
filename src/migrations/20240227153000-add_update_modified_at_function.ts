import { Migration } from '@mikro-orm/migrations'

export class Migration2024022715000_add_update_modified_at_function extends Migration {
    public async up(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.raw(`
            CREATE OR REPLACE FUNCTION update_modified_at()
                RETURNS TRIGGER AS $$
            BEGIN
                NEW.modified_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `)
    }

    public async down(): Promise<void> {
        const queryBuilder = this.getKnex()

        await queryBuilder.raw('DROP FUNCTION IF EXISTS update_modified_at() CASCADE;')
    }
}

