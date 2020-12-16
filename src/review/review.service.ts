import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {IPayload} from '../common/interfaces/payload';
import {NOT_AUTHORIZED,LEAVED_REVIEW_ALREADY_EXIST, TEACHER_REVIEWS_NOT_EXISTS, TEACHER_NOT_EXISTS, SERVER_ERROR, ACTIVE_REVIEW_NOT_FOUND, LEAVE_REVIEW_NOT_ALLOW, FIELDS_REQUEST} from '../common/constants';
import { IResponseDataTeacherReviews, IReviews, IReview, IResponseDataStudentReviews, ILeavedReviews, ILeavedReview, IActiveReview, IActiveReviews, IResponseDataActiveStudentReview, IResponseDataLeaveReview, IQAs, IResponseDataGeneratedReviews, IGeneratedReviews, IGeneratedReview, IResponseDataDeleteGeneratedReview, IResponseDataAddGeneratedReview } from './interfaces/response';
import {QAs} from '../common/constants/qa';
import { randomID } from '../common/random-id';

const validQAs = (Qas: IQAs) => Qas.every(qa => qa.answer >=1 && qa.answer<=5)
const getRatingReview = (Qas: IQAs) => {
    const num: number = Qas.reduce((accum, qa)=> accum + qa.answer, 0) / Qas.length
    return Number(num.toFixed(2));
} 
@Injectable()
export class ReviewService {
  constructor(
    private jwtService: JwtService,
  ) {}

  getTeacherReviews(params, token: string): IResponseDataTeacherReviews {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}}: IPayload = decoded;
    
    if(!["LOCAL_ADMIN", 'ADMIN', 'STUDENT', 'TEACHER'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {teacherId} = params;
    //@ts-ignore
    const teacher = global.getTeacherById(teacherId);
    if(!teacher)  {
        throw new HttpException(TEACHER_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    //@ts-ignore
    const reviews = global.getTeacherReviews(teacherId);

    if(!Array.isArray(reviews) || reviews.length<1)  {
        throw new HttpException(TEACHER_REVIEWS_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
    
    const mappedReviews: IReviews = reviews.map((review): IReview => ({
        rating: review.rating,
        review: review.review,
        QAs: review.QAs,
        id: review.id,
    }))

return mappedReviews
  }
  
  getActiveReviewForStudent(params, token: string): IResponseDataActiveStudentReview {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}, university: {id: universityId}}: IPayload = decoded;
    
    if(!['STUDENT'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {teacherId} = params;
    //@ts-ignore
    const student = global.getStudentById(id);
    //@ts-ignore
    const u = global.getUniversityById(universityId);
    if(student.university!== u.uid)  {
        throw new HttpException(LEAVE_REVIEW_NOT_ALLOW, HttpStatus.BAD_REQUEST);
    }
    //@ts-ignore
    const activeReview = global.getActiveReview({teacherId, group: student.group});

    if(!activeReview)  {
        throw new HttpException(ACTIVE_REVIEW_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    //@ts-ignore
    const leavedReview = global.getLeavedReview({reviewId: activeReview.id, studentId: student.id})
    if(leavedReview)  {
        throw new HttpException(LEAVED_REVIEW_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }

return activeReview;
  }

  getStudentReviews(token: string): IResponseDataStudentReviews {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role, id}}: IPayload = decoded;
    
    if(!['STUDENT'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    //@ts-ignore
    const student = global.getStudentById(id);
    if(!student)  {
        throw new HttpException(SERVER_ERROR, HttpStatus.BAD_REQUEST);
    }

    //@ts-ignore
    const leavedReviews = global.getStudentReviews(id) ?? [];
      //@ts-ignore
    const activeReviews = global.getActiveReviewsByGroups([student.group]) ?? [];
    
    const mappedLeavedReviews: ILeavedReviews = leavedReviews.map((review): ILeavedReview => {
        //@ts-ignore
        const teacher = global.getTeacherById(review.teacherId);
       return {
            id: review.id,
            QAs: review.QAs,
            teacherId: review.teacherId,
            rating: review.rating,
            review: review.review,
            username: teacher.username,
       }    
    })

    const mappedActiveReviews: IActiveReviews = activeReviews.map((review): IActiveReview => {
        //@ts-ignore
        const teacher = global.getTeacherById(review.teacherId);
       return {
            id: review.id,
            QAs: review.QAs,
            teacherId: review.teacherId,
            username: teacher.username,
       }    
    }).filter(review=> {
        //@ts-ignore
        const rev = global.getLeavedReview({reviewId: review.id, studentId: id});
        if(!rev){
            return review;
        }

    })

    const mappedReviews: IResponseDataStudentReviews = {
        active: mappedActiveReviews,
        leaved: mappedLeavedReviews,
    }

    return mappedReviews;
  }

  getGeneratedReviews(token: string): IResponseDataGeneratedReviews {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role, id}}: IPayload = decoded;
    
    if(!['LOCAL_ADMIN'].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    //@ts-ignore
    const localAdmin = global.getLocalAdminById(id);
    if(!localAdmin)  {
        throw new HttpException(SERVER_ERROR, HttpStatus.BAD_REQUEST);
    }

      //@ts-ignore
    const reviews = global.getActiveReviewsByGroups(localAdmin.group) ?? [];
    
    const mappedReviews: IGeneratedReviews = reviews.map((review): IGeneratedReview => {
        //@ts-ignore
        const teacher = global.getTeacherById(review.teacherId);
       return {
            id: review.id,
            teacherId: review.teacherId,
            username: teacher.username,
            rating: teacher.rating,
            groups: review.groups,
       }    
    })

    return mappedReviews;
  }

  leaveReview(body, token: string): IResponseDataLeaveReview {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role, id: studentId}, university: {id: universityId}}: IPayload = decoded;
    
    if(!["STUDENT"].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    
    const {teacherId, activeReviewId, QAs, review} = body;
    if(!teacherId || !activeReviewId || !review || !Array.isArray(QAs) || QAs.length!==9 || !validQAs(QAs))  {
        throw new HttpException(FIELDS_REQUEST, HttpStatus.BAD_REQUEST);
    }

     //@ts-ignore
     const leavedReview = global.getLeavedReview({activeReviewId, studentId });
     console.log(leavedReview);
     
     if(leavedReview)  {
        throw new HttpException(LEAVED_REVIEW_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
     }

    const rating = getRatingReview(QAs);
    //@ts-ignore
    const newReview = {
        review,
        QAs,
        id: activeReviewId,
        teacherId,
        studentId,
        rating,
    }
    //@ts-ignore
    global.addReview(newReview);
    //@ts-ignore
    global.updateTeacherRating({teacherId, newReviewRating: rating});
    //@ts-ignore
    global.updateUniversityRating(universityId);
return true;
  }


  deleteGeneratedReview(body, token: string): IResponseDataDeleteGeneratedReview {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}}: IPayload = decoded;
    
    if(!["LOCAL_ADMIN"].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {reviewId} = body;
  
    //@ts-ignore
    const activeReview = global.getActiveReviewById(reviewId);
    if(!activeReview)  {
        return true;
    }
    //@ts-ignore

    global.deleteActiveReview(reviewId);         


return true;
  }
  addGeneratedReview(body, token: string): IResponseDataAddGeneratedReview {
    
    const decoded = this.jwtService.decode(token);
        // @ts-ignore
    const {user: {role}}: IPayload = decoded;
    
    if(!["LOCAL_ADMIN"].includes(role))  {
        throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const {teacherUsername, groups} = body;

    if(!teacherUsername || !Array.isArray(groups) || groups.length < 1)  {
        throw new HttpException(FIELDS_REQUEST, HttpStatus.BAD_REQUEST);
    }
    //@ts-ignore
    const teacher = global.getTeacherByUsername(teacherUsername);
    if(!teacher)  {
        throw new HttpException(TEACHER_NOT_EXISTS, HttpStatus.BAD_REQUEST);
    }
 
    const newReview = {
        QAs,
        id: randomID(),
        teacherId: teacher.id,
        groups
    }
    //@ts-ignore

    global.addActiveReview(newReview);         


return true;
  }

}
