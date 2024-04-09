import { randomUUID } from 'node:crypto'

import {
    Entity,
    PrimaryKey,
} from '@mikro-orm/core'

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey({ type: 'uuid' })
    public id: string

    constructor() {
        this.id = randomUUID()
    }
}
