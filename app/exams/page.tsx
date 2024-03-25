import { getAllExams } from "@/sql/exam/sql"
import ExamsFilter from "./ExamsFilter"
import ExamsPager from "./ExamsPager"
import ExamsTable from "./ExamsTable"

export default async function Component() {
  const exams = await getAllExams();

  return (
    <div className="bg-white p-8 h-screen" style={{
      position: 'relative'
    }}>
      <div className="flex flex-col space-y-4 mb-6">
        <ExamsFilter />
      </div>
      <ExamsTable exams={exams}/>
      <ExamsPager/>
    </div>
  )
}

