import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medic' })
export class Medic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'int' })
  age: number;
}
