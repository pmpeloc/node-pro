import { EntityManager } from 'typeorm';
import { IUnitOfWork } from './unit-of-work.interface';

export class UnitOfWork implements IUnitOfWork {
  start(): void {
    throw new Error('Method not implemented.');
  }
  complete(work: () => Promise<void>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getManager(): EntityManager {
    throw new Error('Method not implemented.');
  }
}
