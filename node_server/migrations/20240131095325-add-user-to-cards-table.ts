import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1587131893261 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE card ADD COLUMN price int`);
    }
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
