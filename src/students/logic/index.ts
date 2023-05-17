import { Student } from '../schemas/student.schema';
import { StudentApiResponse } from '../../bootstrap/http-client/student.http-client/student.http-client.types';

export async function prepareStudents(
  students: StudentApiResponse,
): Promise<Student[]> {
  return Promise.all(
    students.results.map(
      async (s): Promise<Student> => ({
        gender: s.gender,
        name: `${s.name.first} ${s.name.last}`,
        birthdate: s.dob.date,
        country: s.location.country,
        email: s.email,
        phone: s.phone,
      }),
    ),
  );
}

export async function maskStudents(students: Student[]) {
  return students.map((student: Student) => ({
    id: student._id,
    name: student.name,
  }));
}
