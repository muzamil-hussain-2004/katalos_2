import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { createUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor (private dbService: DbService) {}

  async findByEmail(email: string) {
    return this.dbService.user.findUnique({ where: { email }});
  }

  async createUser(data: createUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.dbService.user.create({
      data:{
        name: data.name,
        email: data.email,
        designation: data.designation,
        department: data.department,
        role:  Role.ADMIN,
        password: hashedPassword
      }
    });
  }

  async getAllUsers() {
    return this.dbService.user.findMany(
      
    );
  }

  async getUserById(id: number) {
    return this.dbService.user.findUnique({ where: { id }});
  }

}
