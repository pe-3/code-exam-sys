import { ExamQueryParams, getAllExams } from "@/sql/exam/sql"
import ExamsFilter from "./ExamsFilter"
import ExamsPager from "./ExamsPager"
import ExamsTable from "./ExamsTable"
import { GetServerSideProps } from "next";
import { ExamModel } from "@/sql/exam/exam.type";
import { queryExamByQuery } from "@/sql/exam/actions";
import { useRef } from "react";

export default async function Component({ searchParams } : {
  searchParams: ExamQueryParams
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
        <ExamsFilter searchParams={searchParams} />
      </div>
      <ExamsTable exams={examsByQuery} />
      {/* <ExamsPager/> */}
    </div>
  )
}