export type IQAs = Array<{No: number; question: string; answer: number}>

export type IReview = {
    rating: number, //review's rating(average of answers)
    review: string,
    QAs: IQAs, 
    id: string,
  };
  export type IReviews = Array<IReview>;

  export type IActiveReview = {
    id: string,
    QAs: IQAs,
    teacherId: string,
    avatar?: string,
    username: string,
  };
  
  export type IActiveReviews = Array<IActiveReview>;
  
  export type ILeavedReview = {
    id: string,
    QAs: IQAs,
    teacherId: string,
    review: string,
    username: string,
    avatar?: string,
    rating: number, //review's rating(average of answers)
  };
  
  export type ILeavedReviews = Array<ILeavedReview>;
  export type IGeneratedReview = {
    id: string,
    teacherId: string,
    username: string,
    avatar?: string,
    rating: number, //teacher's rating
    groups: string[],
  };
  
  export type IGeneratedReviews = Array<IGeneratedReview>;

  export type IResponseDataTeacherReviews = IReviews;
  export type IResponseDataStudentReviews = {
      active: IActiveReviews,
      leaved: ILeavedReviews,
  }
  export type IResponseDataActiveStudentReview = IActiveReview;
  export type IResponseDataGeneratedReviews = IGeneratedReviews;
  export type IResponseDataLeaveReview = boolean;
  export type IResponseDataDeleteGeneratedReview = boolean;
  export type IResponseDataAddGeneratedReview = boolean;

