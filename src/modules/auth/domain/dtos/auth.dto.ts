// import User from '../../../user/domain/user';
// import UserFactory from '../../../user/domain/user-factory';
// import { EmailVO } from '../../../driver/domain/value-objects/email.vo';

// export class AuthGetUserDto {
//   mapping(data: {email: string, password: string, lastname: string, name: string}): User {
//     const userFactory = new UserFactory()
//     const {password, name, lastname} = data
//     const emailResult = EmailVO.create(data.email);
//     if (emailResult.isErr()) {
//       throw new Error(emailResult.error.message)
//     }
//     const email = emailResult.value;
//     userFactory.create(name, lastname, email, password)
//   }
// }
