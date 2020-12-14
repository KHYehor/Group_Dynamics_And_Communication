import {Controller, Get, Headers, Query, SetMetadata} from '@nestjs/common';
import {AssignmentService} from "./assignment.service";
// import {RoleGuard} from "../common/guards/role.guard";
import {JWTUser} from "../common/decorators/auth.decorator";
import {IJWTUser} from '../auth/interfaces/user';
import {IAssignments} from './interface/assignments';
import {JwtService} from "@nestjs/jwt";

@SetMetadata('roles', ['Student'])
// @UseGuards(AuthGuard('jwt'))
@Controller()
export class AssignmentController {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly jwtService: JwtService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAssignments(
    @JWTUser() jwtUser: IJWTUser,
    @Query('type') type: IAssignments
  ) {
    console.trace('here');
      const result = await this.assignmentService.getAssignments(jwtUser, type);
      // if (!result) {
      //   // TODO:
      //   throw new HttpException('', 500);
      // }
      // if (!result.length) {
      //   // TODO:
      //   throw new HttpException('', 500);
      // }
      return result;
    }

  @Get('export-all')
  exportAll() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.values(global.ExportData);
  }

  @Get('faculties')
  getFaculties(@Headers('Authorization') token) {
    const tok = token.split(' ');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decoded = this.jwtService.decode(tok[1]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Array.isArray(decoded.faculty) ? decoded.faculty : [decoded.faculty];
  }

  @Get('universities')
  getUniversities(@Headers('Authorization') token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return global.Universities;
  }

  // type IUniversity = {
  //   rating: number, //university's rating
  //   preview: string,
  //   name: string,
  //   id: string,
  // };
}
