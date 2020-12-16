import {Controller, Get,Post, Res, Headers, HttpException, HttpStatus, Query, Body} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import {IResponseDataActiveStudentReview, IResponseDataAddGeneratedReview, IResponseDataDeleteGeneratedReview, IResponseDataGeneratedReviews, IResponseDataLeaveReview, IResponseDataStudentReviews, IResponseDataTeacherReviews  } from './interfaces/response';
import { ReviewService } from "./review.service";

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  
  @Get("/teacher-reviews/:teacherId")
  async getTeacherReviews(@Headers('Authorization') token, @Query() params, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
    const responseData: IResponseDataTeacherReviews = this.reviewService.getTeacherReviews({...params}, token);    
    return response.send(responseData);
  }

  @Get("/student-reviews")
  async getStudentReviews(@Headers('Authorization') token, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
    const responseData: IResponseDataStudentReviews = this.reviewService.getStudentReviews(token);    
    return response.send(responseData);
  }
  @Get("/generated-reviews")
  async getGeneratedReviews(@Headers('Authorization') token, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
    const responseData: IResponseDataGeneratedReviews = this.reviewService.getGeneratedReviews(token);    
    return response.send(responseData);
  }

  @Get("/student-reviews/active-review/:teacherId")
  async getActiveReviewForStudent(@Headers('Authorization') token, @Query() params, @Res() response) {      
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
    const responseData: IResponseDataActiveStudentReview = this.reviewService.getActiveReviewForStudent({...params}, token);    
    return response.send(responseData);
  }

  @Post('/student-reviews/leave-review')
  async leaveReview(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataLeaveReview = this.reviewService.leaveReview(body, token);    
    return response.send(responseData);
  }

  @Post('/generated-reviews/add')
  async addGeneratedReview(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataAddGeneratedReview = this.reviewService.addGeneratedReview(body, token);    
    return response.send(responseData);
  }
  @Post('/generated-reviews/delete')
  async deleteGeneratedReview(@Headers('Authorization') token,@Body() body, @Res() response) {
    if(!token) {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
      } 
      
    const responseData: IResponseDataDeleteGeneratedReview = this.reviewService.deleteGeneratedReview(body, token);    
    return response.send(responseData);
  }
}
