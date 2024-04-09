# Repro

1. Run `yarn` to install deps
2. Run `yarn database:setup` to start postgres in docker
3. Run `yarn migrate:up` to run migrations

Note in the last migration `20240227170731-create_pairing_claim_table.migration.ts` we are doing 2 things.
Creating a table and then running a raw query. The raw query will fail since there is an error but the table 
creation won't be reverted in database
