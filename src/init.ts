const admin = {
  id: '0',
  username: 'Згуровський Михайло Захарович',
  login: 'loginSuperAdmin',
  password: 'password',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mykhailo_Zgurovskyi.jpg/800px-Mykhailo_Zgurovskyi.jpg',
  role: 'ADMIN',
  faculty: ['ФЭЛ', 'ІПСА', 'ПБФ', 'ФІОТ', 'ЗФ'],
  group: ['ІП-74', 'ІП-73'],
};
const getAdminById = {
  "loginSuperAdmin": admin,
};

const localAdmin0 = {
  id: '0',
  username: 'Kaile Baraflowski',
  login: 'loginAdmin0',
  password: 'password',
  avatar: 'randmon link',
  role: 'LocalAdmin',
  faculty: ['ФЭЛ', 'ІПСА'],
  group: ['ІП-74', 'ІП-73'],
  university: 'КПИ'
};
const localAdmin1 = {
  id: '1',
  username: 'Eric Kartman',
  login: 'loginAdmin1',
  password: 'password',
  avatar: 'randmon link',
  role: 'LocalAdmin',
  faculty: ['ФЭЛ', 'ПБФ'],
  group: ['ІП-74', 'ІП-73'],
  university: 'КПИ'
};
const localAdmin2 = {
  id: '2',
  username: 'Kenny Killed',
  login: 'loginAdmin2',
  password: 'password',
  avatar: 'randmon link',
  role: 'LocalAdmin',
  faculty: ['ФЭЛ', 'ФІОТ'],
  group: ['ІП-74', 'ІП-73'],
  university: 'КПИ'
};
const localAdmin3 = {
  id: '3',
  username: 'Stan Marsh',
  login: 'loginAdmin3',
  password: 'password',
  avatar: 'randmon link',
  role: 'LocalAdmin',
  group: ['ІП-74', 'ІП-73'],
  faculty: ['ЗФ'],
  university: 'КПИ'

};
const getLocalAdminById = {
  "loginAdmin0": localAdmin0,
  "loginAdmin1": localAdmin1,
  "loginAdmin2": localAdmin2,
  "loginAdmin3": localAdmin3,
};

const student0 = {
  id: '0',
  username: 'Kaile Baraflowski',
  login: 'login0',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student1 = {
  id: '1',
  username: 'Eric Kartman',
  login: 'login1',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student2 = {
  id: '2',
  username: 'Kenny Killed',
  login: 'login2',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student3 = {
  id: '3',
  username: 'Stan Marsh',
  login: 'login3',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-74',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student4 = {
  id: '4',
  username: 'Doil Evans',
  login: 'login4',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-73',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const student5 = {
  id: '5',
  username: 'Viktor Tupak',
  login: 'login4',
  password: 'password',
  avatar: 'randmon link',
  role: 'Student',
  group: 'ІП-73',
  faculty: 'ФІОТ',
  university: 'КПИ'
};
const getStudents = {
  "login0": student0,
  "login1": student1,
  "login2": student2,
  "login3": student3,
  "login4": student4,
  "login5": student5,
};

const university1 = {
  rating: 5,
  id: '1',
  uid: 'КПИ',
  preview: 'https://kpi.ua/files/styles/story/public/images-story/2020-kp16-1.jpg?itok=t3zFp5Dv',
  name: 'Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»',
};
const getUniversities = {
  'КПИ': university1,
};

export const init = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.UsersByLogin = {
    ...getStudents,
    ...getLocalAdminById,
    ...getAdminById,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.ExportData = [
    ...(Object.values({...getStudents, ...getLocalAdminById, ...getAdminById }).map(({ username, login, password, role })  => ({ username, login, password, role })))
  ];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.Universities = getUniversities;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
};
