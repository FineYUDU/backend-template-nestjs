import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Get, UseGuards, SetMetadata } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
     return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
     return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  privateRoute(
   @GetUser() user: User,
   @GetUser('email') userEmail:string,
   @RawHeaders() rawHeaders: string[],

  ) {


   return {
      ok:true,
      user,
      userEmail,
      rawHeaders,
   }
  }
  
  @Get('private2')
  @RoleProtected( ValidRoles.superUser )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
   @GetUser() user: User,
  ){
   return {
      ok:true,
      user,
   }
  }
  
  @Get('private3')
  @Auth(ValidRoles.superUser)
  privateRoute3(
   @GetUser() user: User,
  ){
   return {
      ok:true,
      user,
   }
  }
}
