import { In } from 'typeorm';

import { Role } from '../domain/role';
import { RoleRepository } from '../domain/role.repository';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { RoleEntity } from './role.entity';
import { RoleFindByIdsDto } from './dtos/find-by-ids.dto';

export default class RoleInfrastructure implements RoleRepository {
  async findByIds(ids: number[]): Promise<Role[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(RoleEntity);
    const result = await repo.findBy({ roleId: In(ids) });
    return RoleFindByIdsDto.fromDataToDomain(result);
  }
}
