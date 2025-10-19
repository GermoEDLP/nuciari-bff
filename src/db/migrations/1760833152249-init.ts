import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1760833152249 implements MigrationInterface {
    name = 'Init1760833152249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "info_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requester" character varying(160) NOT NULL, "contactEmail" character varying(160) NOT NULL, "type" character varying(50) NOT NULL, "payload" jsonb NOT NULL DEFAULT '{}', "status" character varying(40) NOT NULL DEFAULT 'open', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_afa26d9c9c1bb77d4ed3e862725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budgets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientName" character varying(160) NOT NULL, "clientEmail" character varying(160) NOT NULL, "items" jsonb NOT NULL DEFAULT '[]', "total" numeric(12,2) NOT NULL DEFAULT '0', "status" character varying(40) NOT NULL DEFAULT 'draft', "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c8a51748f82387644b773da482" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "budgets"`);
        await queryRunner.query(`DROP TABLE "info_requests"`);
    }

}
