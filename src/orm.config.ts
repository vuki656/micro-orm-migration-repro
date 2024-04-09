import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'

export default defineConfig({
    allowGlobalContext: true,
    dbName: 'test',
    disableIdentityMap: false,
    extensions: [Migrator],
    host: 'localhost',
    migrations: {
        allOrNothing: false,
        fileName: (timestamp, name) => `${timestamp}-${name}.migration`,
        path: './migrations',
        tableName: '_changelogs',
    },
    password: 'postgres',
    port: 5432,
    user: 'postgres',
})
