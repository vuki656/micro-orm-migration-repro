import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'
import { User } from './entities/user.entity'
import { PairingClaim } from './entities/pairing-claim.entity'

export default defineConfig({
    allowGlobalContext: true,
    dbName: 'test',
    disableIdentityMap: false,
    extensions: [Migrator],
    entitiesTs: [User, PairingClaim],
    entities: [User, PairingClaim],
    host: 'localhost',
    migrations: {
        allOrNothing: false,
        fileName: (timestamp, name) => `${timestamp}-${name}.migration`,
        path: 'src/migrations',
        tableName: '_changelogs',
    },
    password: 'postgres',
    port: 5432,
    user: 'postgres',
})
