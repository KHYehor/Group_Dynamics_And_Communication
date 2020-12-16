import {randomID} from '../common/random-id';
import {QAs} from '../common/constants/qa';

const QAsWith4 = QAs.map(qa => ({...qa, answer: 4}));

const faculties = ['ІХФ','ІПСА', 'ПБФ', 'РТФ','ТЕФ', 'ФМФ', 'ФІОТ', 'ФБТ', 'ФЕА', 'ФЕЛ', 'ФЛ', 'ФММ', 'ФПМ', 'ФСП', 'ХТФ','ЗФ']



const getGroupsByFaculty = (faculty: string) => ({
  'ІХФ': ['ІА-74', 'ІА-73'],
  'ІПСА': ['ПА-34', 'ПА-73'],
  'ПБФ': ['ІВ-72', 'ІВ-73'],
  'РТФ': ['ІТ-74', 'ІТ-73'],
  'ТЕФ': ['ІЕ-74', 'ІЕ-73'],
  'ФМФ': ['ІФ-74', 'ІФ-73'],
  'ФІОТ': ['ІП-74', 'ІП-73'],
  'ФБТ': ['ІЙ-74', 'ІЙ-73'],
  'ФЕА': ['ІР-74', 'ІР-73'],
  'ФЕЛ': ['ІН-74', 'ІН-73'],
  'ФЛ': ['ІЗ-74', 'ІЗ-73'],
  'ФММ': ['ІГ-74', 'ІГ-73'],
  'ФПМ': ['ПК-74', 'ПК-73'],
  'ФСП': ['КВ-74', 'КВ-73'],
  'ЗФ': ['ВФ-74', 'ВФ-73'],
  'ХТФ': ['ЗУ-74', 'ЗУ-73'],

})[faculty]

const getGroupsByFaculties = (faculties: string[]) => faculties.reduce((accum, faculty)=> [...accum, ...getGroupsByFaculty(faculty)], [])

const admin = {
  id: randomID(),
  username: 'Згуровський Михайло Захарович',
  login: 'loginSuperAdmin',
  password: 'password',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mykhailo_Zgurovskyi.jpg/800px-Mykhailo_Zgurovskyi.jpg',
  role: 'ADMIN',
  faculty: faculties,
  group: getGroupsByFaculties(faculties),
  university: 'КПИ',
};

const getAdminByLogin = {
  "loginSuperAdmin": admin,
};

const localAdminId0 = randomID();
const localAdminId1 = randomID();
const localAdminId2 = randomID();
const localAdminId3 = randomID();

const localAdmin0 = {
  id: localAdminId0,
  username: 'Kaile Baraflowski',
  login: 'loginAdmin0',
  password: 'password',
  role: 'LOCAL_ADMIN',
  faculty: ['ФЕЛ', 'ІПСА'],
  rating: 0,
  group: getGroupsByFaculties(['ФЕЛ', 'ІПСА']),
  university: 'КПИ'
};
const localAdmin1 = {
  id: localAdminId1,
  rating: 0,
  username: 'Eric Kartman',
  login: 'loginAdmin1',
  password: 'password',
  role: 'LOCAL_ADMIN',
  faculty: ['ФЕЛ', 'ПБФ'],
  group: getGroupsByFaculties(['ФЕЛ', 'ПБФ']),
  university: 'КПИ'
};
const localAdmin2 = {
  id: localAdminId2,
  rating: 0,
  username: 'Kenny Killed',
  login: 'loginAdmin2',
  password: 'password',
  role: 'LOCAL_ADMIN',
  faculty: ['ФЕЛ', 'ФІОТ'],
  group: getGroupsByFaculties(['ФЕЛ', 'ФІОТ']),
  university: 'КПИ'
};
const localAdmin3 = {
  id: localAdminId3,
  rating: 0,
  username: 'Stan Marsh',
  login: 'loginAdmin3',
  password: 'password',
  role: 'LOCAL_ADMIN',
  faculty: ['ЗФ'],
  group: getGroupsByFaculties(['ЗФ']),
  university: 'КПИ'
};
const getLocalAdminByLogin = {
  "loginAdmin0": localAdmin0,
  "loginAdmin1": localAdmin1,
  "loginAdmin2": localAdmin2,
  "loginAdmin3": localAdmin3,
};
const teacher0 = {
  id: localAdminId0,
  username: 'Kaile Baraflowski',
  login: 'loginAdmin0',
  password: 'password',
  role: 'TEACHER',
  faculty: ['ФЕЛ', 'ІПСА'],
  rating: 0,
  group: getGroupsByFaculties(['ФЕЛ', 'ІПСА']),
  university: 'КПИ'
};
const teacher1 = {
  id: localAdminId1,
  rating: 0,
  username: 'Eric Kartman',
  login: 'loginAdmin1',
  password: 'password',
  role: 'TEACHER',
  faculty: ['ФЕЛ', 'ПБФ'],
  group: getGroupsByFaculties(['ФЕЛ', 'ПБФ']),
  university: 'КПИ'
};
const teacher2 = {
  id: localAdminId2,
  rating: 0,
  username: 'Kenny Killed',
  login: 'loginAdmin2',
  password: 'password',
  role: 'TEACHER',
  faculty: ['ФЕЛ', 'ФІОТ'],
  group: getGroupsByFaculties(['ФЕЛ', 'ФІОТ']),
  university: 'КПИ'
};
const teacher3 = {
  id: localAdminId3,
  rating: 0,
  username: 'Stan Marsh',
  login: 'loginAdmin3',
  password: 'password',
  role: 'TEACHER',
  faculty: ['ЗФ'],
  group: getGroupsByFaculties(['ЗФ']),
  university: 'КПИ'
};

const student4Id = randomID();

const leavedReviews = [{
  rating: 4,
  review: `преподаватель требовательный, но и дает актуальные знания

всей группой довольны.`,
  QAs: QAsWith4,
  id: randomID(),
  studentId: student4Id,
  teacherId: localAdminId3,

}];

const activeReviewId1 = randomID();

const activeReviews = [{
  QAs: QAs,
  id: activeReviewId1,
  teacherId: localAdminId3,
  groups: getGroupsByFaculties(['ЗФ']),
}];

const addReview = (leavedReview) => {
  leavedReviews.push(leavedReview)  
}
const addActiveReview = (activeReview) => {
  activeReviews.push(activeReview)  
}

const getTeacherReviews = (teacherId: string) => leavedReviews.filter((review)=> { 
  if (review.teacherId === teacherId) {
    return review;
  }
})

const getStudentReviews = (studentId: string) => leavedReviews.filter((review)=> { 
  if (review.studentId === studentId) {
    return review;
  }
})

const getActiveReviewsByGroups = (groups: string[]) => activeReviews.filter(review => {
  if(existOneOfItemsInArray(review.groups, groups)){
    return review;
  }
})

const getActiveReview = ({group, teacherId}: {group: string; teacherId: string}) => activeReviews.filter(review => {
  if(review.groups.includes(group) && review.teacherId === teacherId){
    return review;
  }
})[0]

const getActiveReviewById = (reviewId: string) => activeReviews.filter(review => {
  if(review.id === reviewId){
    return review;
  }
})[0]


const student0 = {
  id: randomID(),
  username: 'Kaile Baraflowski',
  login: 'login0',
  password: 'password',
  role: 'STUDENT',
  group: 'ІП-74', 
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student1 = {
  id: randomID(),
  username: 'Eric Kartman',
  login: 'login1',
  password: 'password',
  role: 'STUDENT',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student2 = {
  id: randomID(),
  username: 'Kenny Killed',
  login: 'login2',
  password: 'password',
  role: 'STUDENT',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student3 = {
  id: randomID(),
  username: 'Stan Marsh',
  login: 'login3',
  password: 'password',
  role: 'STUDENT',
  group: 'ВФ-74',
  faculty: 'ЗФ',
  university: 'КПИ'
};
const student4 = {
  id: student4Id,
  username: 'Doil Evans',
  login: 'login4',
  password: 'password',
  role: 'STUDENT',
  group: 'ВФ-73',
  faculty: 'ЗФ',
  university: 'КПИ'
};
const student5 = {
  id: randomID(),
  username: 'Viktor Tupak',
  login: 'login5',
  password: 'password',
  role: 'STUDENT',
  group: 'ВФ-73',
  faculty: 'ЗФ',
  university: 'КПИ'
};
const getStudentsByLogin = {
  "login0": student0,
  "login1": student1,
  "login2": student2,
  "login3": student3,
  "login4": student4,
  "login5": student5,
};

const university1 = {
  rating: 0,
  id: randomID(),
  uid: 'КПИ',
  preview: 'https://kpi.ua/files/styles/story/public/images-story/2020-kp16-1.jpg?itok=t3zFp5Dv',
  name: 'Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»',
};
const getUniversities = {
  'КПИ': university1,
};

const users= [admin, teacher0, teacher1, teacher2, teacher3, localAdmin0, localAdmin1, localAdmin2, localAdmin3, student0, student1, student2, student3, student4, student5]
const universities = [university1]

const getAllUniversities = () => universities

const getStudentsByFaculties = (faculties) => users.filter(user=> {
  const userFaculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
  if (user.role === 'STUDENT' && existOneOfItemsInArray(faculties, userFaculties) ) {
    return user
  }
})
const getTeachersByFaculties = (faculties) => users.filter(user=> {
  const userFaculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
  if (user.role === 'TEACHER' && existOneOfItemsInArray(faculties, userFaculties) ) {
    return user
  }
})

const getTeachersByUniversityUid = (uid: string) => users.filter((user)=> { 
  if (user.role === 'TEACHER' && user.university === uid) {
    return user 
  }
})


const getUserById = (id: string) => {
  const u = users.filter((user)=> { 
   if (user.id === id) {
      return user 
    }
  })
  if(u.length===2){
   const [a, b] = u
   return a.role === 'LOCAL_ADMIN' ? a: b
  }
  return u[0]
}
const getUserByLogin = (login: string) => {
  const u = users.filter((user)=> {
   if (user.login === login) {
      return user 
    }
  })
  if(u.length===2){
    const [a, b] = u
    return a.role === 'LOCAL_ADMIN' ? a: b
   }
   return u[0]

}
const getUniversityById = (id: string) => universities.filter((univer)=> { 
  if (univer.id === id) {
    return univer 
  }
})[0]
const getTeacherById = (id: string) => users.filter((user)=> { 
  if (user.role === 'TEACHER' && user.id === id) {
    return user 
  }
})[0]

const getTeacherByUsername = (username: string) => users.filter((user)=> { 
  if (user.role === "TEACHER" && user.username === username) {
    return user
  }
})[0]
const getLocalAdminByUsername = (username: string) => users.filter((user)=> { 
  if (user.role === "LOCAL_ADMIN" && user.username === username) {
    return user
  }
})[0]
const getStudentByUsername = (username: string) => users.filter((user)=> { 
  if (user.role === "STUDENT" && user.username === username) {
    return user
  }
})[0]


const getLocalAdminById = (id: string) => users.filter((user)=> { 
  if (user.role === "LOCAL_ADMIN" && user.id === id) {
    return user
  }
})[0]
const getStudentById = (id: string) => users.filter((user)=> { 
  if (user.role === "STUDENT" && user.id === id) {
    return user
  }
})[0]

const getLeavedReview = ({reviewId, studentId}:{reviewId: string; studentId: string}) => leavedReviews.filter((review)=> { 
  if (review.studentId === studentId && review.id === reviewId) {
    return review
  }
})[0]

const getLeavedReviewById = (id:string) => leavedReviews.filter((review)=> { 
  if (review.id === id) {
    return review
  }
})[0]

const getLeavedReviewsByTeacherId =(teacherId: string) => leavedReviews.filter((review)=> { 
  if (review.teacherId === teacherId) {
    return review
  }
})

const updateTeacherRating = ({teacherId, newReviewRating}: {teacherId: string, newReviewRating: number})=> {
  const reviews = getLeavedReviewsByTeacherId(teacherId);
  const prevSum = reviews.reduce((accum, {rating}) => accum + rating, 0);
  const len = reviews.length + 1; 
  const rating = (prevSum/len) + (newReviewRating/len) 
  const teacher = getTeacherById(teacherId);
  //@ts-ignore
  teacher.rating = Number(rating.toFixed(2));
}

const updateUniversityRating = (universityId: string)=> {
  const univer = getUniversityById(universityId);
  const teachers = getTeachersByUniversityUid(univer.uid);
  //@ts-ignore
  const rating = teachers.reduce((accum, {rating}) => accum + rating, 0) / teachers.length;
  univer.rating = Number(rating.toFixed(2));
}

const deleteLocalAdmin = (id: string) => {
  const index =  users.findIndex((user, index)=> { 
    if (user.role === "LOCAL_ADMIN" && user.id === id) {
      return index
    }
  })
  if (index > -1) {
    users.splice(index, 1);
  }
}

const deleteActiveReview = (id: string) => {
  const index =  activeReviews.findIndex((review, index)=> { 
    if (review.id === id) {
      return index
    }
  })
  if (index > -1) {
    activeReviews.splice(index, 1);
  }
}

const deleteStudent = (id: string) => {
  const index =  users.findIndex((user, index)=> { 
    if (user.role === "STUDENT" && user.id === id) {
      return index
    }
  })
  if (index > -1) {
    users.splice(index, 1);
  }
}

const deleteTeacher = (id: string) => {
  const index =  users.findIndex((user, index)=> { 
    if (user.role === "TEACHER" && user.id === id) {
      return index
    }
  })
  if (index > -1) {
    users.splice(index, 1);
  }
}


const getLocalAdminsByUniversityId = (universityId: string) => users.filter((user)=> { 
  // console.log(universityId , getUniversities[user.university]);
  
  if (user.role === "LOCAL_ADMIN" && universityId === getUniversities[user.university].id) {
    return user; 
  }
})


const prefixData = (role: "STUDENT" | "TEACHER" | 'LOCAL_ADMIN'): string=>({
  'STUDENT': 'Студенти:\n',
  'TEACHER': 'Викладачі:\n',
  'LOCAL_ADMIN': 'Керуючі:\n', 
})[role]

const existOneOfItemsInArray = (arr: string[],items: string[] ): boolean => arr.some(f => items.includes(f))

const getExportData = (role: "STUDENT" | "TEACHER" | 'LOCAL_ADMIN', faculties: string[]):string => {
    const data = users.filter((user) => {
      const userFaculties: string[] = Array.isArray(user.faculty) ? user.faculty : [user.faculty];
      if (user.role === role && existOneOfItemsInArray(faculties, userFaculties) ) {
        return user
      }
    })
    if(data.length<1){
      return ''
    }
    const prefix = prefixData(role);
    return data.reduce((accum, ladmin, i) => {
      const {login, password, username} = ladmin
      return `${i===0? prefix :accum}${username} ${login} ${password};\n`
    },'')
}
const addLocalAdmin = (local_admin) => {
  users.push(local_admin)
}
const addStudent = (student) => {
  users.push(student)  
}
const addTeacher = (teacher) => {
  users.push(teacher)  
}

export const init = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.UsersByLogin = {
    ...getStudentsByLogin,
    ...getLocalAdminByLogin,
    ...getAdminByLogin,
  };
    // @ts-ignore
  global.UsersById = {
    ...getStudentsByLogin,
    ...getLocalAdminByLogin,
    ...getAdminByLogin,
  };
  //@ts-ignore
  global.getExportData = getExportData;
      // @ts-ignore
      global.getGroupsByFaculties = getGroupsByFaculties;
      // @ts-ignore
      global.getGroupsByFaculty = getGroupsByFaculty;
     // @ts-ignore 
  global.getUserById = getUserById;
  // @ts-ignore
  global.getUserByLogin = getUserByLogin;
  //@ts-ignore
  global.getTeacherByUsername = getTeacherByUsername;
  //@ts-ignore
  global.getLocalAdminByUsername = getLocalAdminByUsername;
   //@ts-ignore
   global.getStudentByUsername = getStudentByUsername;
  //@ts-ignore
  
  global.deleteLocalAdmin = deleteLocalAdmin;  
    //@ts-ignore
    global.deleteTeacher = deleteTeacher;  
    //@ts-ignore
    global.deleteStudent = deleteStudent;  
  //@ts-ignore
    global.getLocalAdminById = getLocalAdminById;
      //@ts-ignore
      global.getStudentById = getStudentById;
      //@ts-ignore
      global.getTeacherById = getTeacherById;
      // @ts-ignore
      global.getUniversityById = getUniversityById;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  global.getLocalAdminsByUniversityId = getLocalAdminsByUniversityId;
  // @ts-ignore
  global.ExportData = [
    ...(Object.values({...getStudentsByLogin, ...getLocalAdminByLogin, ...getAdminByLogin }).map(({ username, login, password, role })  => ({ username, login, password, role })))
  ];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.addLocalAdmin = addLocalAdmin;
  //@ts-ignore
  global.updateTeacherRating = updateTeacherRating;
  //@ts-ignore
  global.updateUniversityRating = updateUniversityRating;
  //@ts-ignore
  global.addStudent = addStudent;
  //@ts-ignore
  global.addTeacher = addTeacher;
  //@ts-ignore
  global.addReview = addReview;
  //@ts-ignore
  global.Universities = getUniversities;
  //@ts-ignore
  global.getAllUniversities = getAllUniversities;
  //@ts-ignore
  global.getTeachersByUniversityUid =getTeachersByUniversityUid;
  //@ts-ignore
  global.getStudentsByFaculties = getStudentsByFaculties;
    //@ts-ignore
    global.getTeachersByFaculties = getTeachersByFaculties;
  // @ts-ignore
  global.getTeacherReviews= getTeacherReviews;
  // @ts-ignore
  global.getStudentReviews = getStudentReviews;
  //@ts-ignore
  global.getActiveReviewsByGroups = getActiveReviewsByGroups;
  //@ts-ignore
  global.getActiveReview =getActiveReview;
  //@ts-ignore
  global.getLeavedReview = getLeavedReview;
  //@ts-ignore
  global.deleteActiveReview = deleteActiveReview;
  //@ts-ignore
  global.getActiveReviewById = getActiveReviewById;
  //@ts-ignore
  global.addActiveReview = addActiveReview;
  //@ts-ignore
  global.getLeavedReviewById = getLeavedReviewById;
};
