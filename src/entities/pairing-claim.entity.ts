import { randomUUID } from 'node:crypto'

import {
    Entity,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'

@Entity({ tableName: 'pairing_claims' })
export class PairingClaim {
    @PrimaryKey({ type: 'uuid' })
    public id: string

    constructor() {
        this.id = randomUUID()
    }
}
