import { queryExamByQuery } from "@/sql/exam/actions";
import { ExamQueryParams, getAllExams } from "@/sql/exam/sql";
import ExamsTable from "@/app/exams/ExamsTable";
import ExamsFilter from "@/app/exams/ExamsFilter";

export default async function Component({ searchParams } : {
  searchParams: ExamQueryParams,
}) {
  let examsByQuery = await queryExamByQuery(searchParams);

  if(!examsByQuery) {
    examsByQuery = await getAllExams();
  }

  return (
    <div className="bg-white p-8 h-screen min-w-[800px]" style={{
      position: 'relative'
    }}>
      <div className="flex flex-col space-y-4 mb-6">
        <ExamsFilter searchParams={searchParams} forStudent/>
      </div>
      <ExamsTable exams={examsByQuery} forStudent/>
      {/* <ExamsPager/> */}
    </div>
  )
}