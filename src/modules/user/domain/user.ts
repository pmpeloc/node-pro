import { IEntity } from '../../shared/interfaces/entity.interface';
import { EmailVO } from './value-objects/email.vo';
import { Role } from '../../role/domain/role';

export interface UserRequired {
  name: string;
  lastname: string;
  email: EmailVO;
  password: string;
  roles: number[] | string[] | Role[];
}

interface UserOptional {
  refreshToken: string;
  active: boolean;
  guid: string;
}

export type UserUpdate = {
  name: string;
  lastname: string;
  email: EmailVO;
  password: string;
  refreshToken: string;
  roles: number[] | string[] | Role[];
};

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export default class User implements IEntity<UserProperties, UserUpdate> {
  private name!: string;
  private lastname!: string;
  private readonly email!: EmailVO;
  private password!: string;
  private refreshToken!: string;
  private active!: boolean;
  private readonly guid!: string | null;
  private roles!: number[] | string[] | Role[];

  constructor(userProperties: UserProperties) {
    this.active = true;
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      active: this.active as boolean,
      guid: this.guid as string,
      roles: this.roles,
    };
  }

  update(fields: Partial<UserUpdate>) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
