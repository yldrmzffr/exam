import { University } from '../../universities/schemas/university.schema';
import { StudentForExam } from '../../students/types/student-for-exam.type';

export function formatDate(date: Date): string {
  const formattedDate = date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [day, month, year] = formattedDate.split('.');
  return `${year}/${month}/${day}`;
}

export function calculateScore(
  studentName: string,
  articleTitle: string,
): number {
  const nameSet = new Set(studentName.toLowerCase().match(/[a-z]/g));
  const titleSet = new Set(articleTitle.toLowerCase().match(/[a-z]/g));
  const intersection = new Set([...nameSet].filter((x) => titleSet.has(x)));
  return intersection.size;
}

export function placementToUniversity(
  universities,
  examResults,
): Promise<University[]> {
  return Promise.all(
    universities.map((university) => {
      const winners = examResults.splice(0, 5);
      const winnerIds = winners.map((winner) => winner.studentId);
      return {
        name: university.name,
        country: university.country,
        web_pages: university.web_pages,
        students: winnerIds,
      };
    }),
  );
}

export async function makeExamAndSortResult(students, articles) {
  const results = await Promise.all(
    students.map((student) => {
      let totalScore = 0;

      articles.map((article) => {
        const score = calculateScore(student.name, article.title);
        totalScore += score;
      });

      return {
        studentId: student.id,
        result: totalScore,
      };
    }),
  );

  return results.sort((a, b) => b.result - a.result);
}

export function isFutureDate(date: Date): boolean {
  const currentDate: Date = new Date();
  return date.getTime() > currentDate.getTime();
}

export function populateStudents(
  placement: University[],
  students: StudentForExam[],
) {
  return placement.map((university) => {
    const universityStudents = university.students.map((uStudent: string) => {
      return students.find((student) => student.id === uStudent);
    });

    return {
      ...university,
      students: universityStudents,
    };
  });
}
