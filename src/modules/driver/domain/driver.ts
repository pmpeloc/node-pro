import { IEntity } from '../../shared/interfaces/entity.interface';
import { EmailVO } from './value-objects/email.vo';

export interface DriverRequired {
  name: string;
  lastname: string;
  email: EmailVO;
}

interface DriverOptional {
  driverLicense: string;
  active: boolean;
  guid: string;
  photo: string;
}

export type DriverUpdate = {
  name: string;
  lastname: string;
  email: EmailVO;
};

export type DriverProperties = Required<DriverRequired> &
  Partial<DriverOptional>;

export default class Driver implements IEntity<DriverProperties, DriverUpdate> {
  private name!: string;
  private lastname!: string;
  private readonly email!: EmailVO;
  private active!: boolean;
  private photo!: string;
  private readonly guid!: string | null;

  constructor(userProperties: DriverProperties) {
    this.active = true;
    Object.assign(this, userProperties);
  }

  properties(): DriverProperties {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      active: this.active as boolean,
      photo: this.photo,
      guid: this.guid as string,
    };
  }

  update(fields: Partial<DriverUpdate>) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
