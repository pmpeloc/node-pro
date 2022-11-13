import { IEntity } from '../../shared/interfaces/entity.interface';

export interface UserRequired {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserOptional {
  refreshToken: string;
  active: boolean;
  guid: string;
}

type UserUpdate = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserInsert = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export default class User implements IEntity<UserProperties, UserUpdate> {
  private name!: string;
  private lastname!: string;
  private readonly email!: string;
  private password!: string;
  private refreshToken!: string;
  private active!: boolean;
  private readonly guid!: string | null;

  constructor(userProperties: UserProperties) {
    this.active = true;
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      // id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      active: this.active as boolean,
      guid: this.guid as string,
    };
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
