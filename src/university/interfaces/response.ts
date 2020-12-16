export type IUniversity = {
    rating: number, //university's rating
    preview: string,
    name: string,
    id: string,
  };
  export type IUniversities = Array<IUniversity>;

export type IResponseDataUniversities = IUniversities;
