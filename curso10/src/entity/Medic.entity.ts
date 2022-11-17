import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Hospital } from './Hospital.entity';

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

  @ManyToOne((type) => Hospital, (hospital) => hospital.medics)
  hospital: Hospital;
}
