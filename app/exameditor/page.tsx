'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aJAZHj1ZGXd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import MutipleChoice from "./question-editor/multiple-choice";
import FillInTheBlank from "./question-editor/fill-in-the-blank";
import ShortAnswer from "./question-editor/short-answer";
import Programming from "./question-editor/programming";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { get } from 'lodash';
import { useToast } from "@chakra-ui/react";
import UiToast, { EToastType } from "../auth/components/Toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getExamDetail, saveExamDetail } from "@/sql/exam/actions";
import { useSearchParams, useRouter } from "next/navigation";
import ProgramIdeModal from "./question-editor/program-ide";


const QuestionItem = ({ question, options, index, answerDetail }: any) => {
  return (
    <div>
      <div>{question}</div>
      <form onChange={(e) => {
        const answer = e.target.value;
        answerDetail[index] = answer;
      }}>
        {options.map((option) => (
          <label className="block cursor-pointer py-2" key={option.id}>
            <input
              type="radio"
              name={question}
              value={option.text}
              className="mr-2 leading-tight"
            />
            {option.text}
          </label>
        ))}
      </form>
    </div>
  );
};

const BlankItem = ({ blankStr, index, answerDetail } : {
  blankStr: string;
  index: number;
  answerDetail: any[];
}) => {
  const items = blankStr.split('***');

  const blankCount = items.length - 1;

  const blankAnswer = useRef<string[]>([]);

  const submit = () => {
    if (blankAnswer.current.length === blankCount && blankAnswer.current.every(item => item)) {
      answerDetail[index] = blankAnswer.current.join(',');
    }
  }

  return (<div>
    {
      items.map((item, itemidx) => (
        <span key={itemidx}>
          {item}
          {itemidx < items.length - 1 && <input
            onChange={(e) => {
              blankAnswer.current[itemidx] = e.target.value;
              submit();
            }}
            type="text"
            className="border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center w-20"
          />}
        </span>
      ))
    }
  </div>)
}

const ShortItem = ({ shorStr, index, answerDetail } : {
  shorStr: string;
  index: number;
  answerDetail: any[];
}) => {
  return (
    <div className="w-full">
      {shorStr}
      <Textarea className="min-h-[100px] mt-4" placeholder="请输入你对这道简单题的回答。" onChange={(e) => {
        answerDetail[index] = e.target.value;
      }}/>
    </div>
  )
}

const ProgramItem = ({ programStr, index, answerDetail } : {
  programStr: string;
  index: number;
  answerDetail: any[];
}) => {
  return (
    <div className="w-full">
      {programStr}
      <div className="my-2">
        <ProgramIdeModal ProgarmDetail={programStr} />
      </div>
    </div>
  )
}

type key = string | number

const judgePathEmpty = (target: Record<string, any>,pathArr: key[][]) => {
  for (let path of pathArr) {
    if (!get(target, path)) {
      return true
    }
  }
  return false;
}

export default function Component({
  closeEdit,
}: {
  closeEdit: boolean
}) {
  // 刷新函数
  const [_, render] = useState(0);
  const rerender = () => render(pre => pre + 1);

  const search = useSearchParams();
  const router = useRouter();

  const toast = useToast({
    duration: 3000,
    position: 'top-right',
  });

  const answerDetail = useRef([]);

  const [choices] = useState<any[]>([]);
  const editChoiceRef = useRef<any>();
  const addChoice = () => {
    const choice = editChoiceRef.current;
    // 判空
    if (judgePathEmpty(
      choice || {},
      [
        ['question'],
        ['options', 0, 'text'],
        ['options', 1, 'text'],
        ['options', 2, 'text'],
        ['options', 3, 'text']
      ]
    )) {
      toast({
        render: () => (
          <UiToast
            title="填写完整"
            description="不能保存空的选择题"
            type={EToastType.Error}
          />
        )
      });
      return;
    }

    choices.push(choice);
    rerender();
    setTimeout(() => {
       document.getElementById(`choice-${choices.length - 1}`)?.scrollIntoView({
        behavior: 'smooth'
       });
    });
  }

  const choiceTotal = useRef<number>(20);

  const [blanks] = useState<any[]>([]);
  const editBlankRef = useRef<any>();
  const addBlank = () => {
    const item = editBlankRef.current?.value;
    if (!item) {
      toast({
        render: () => (
          <UiToast
            title="填写完整"
            description="不能提交空的填空题"
            type={EToastType.Error}
          />
        )
      });
      return ;
    }
    if(!/\*\*\*/.test(item)) {
      toast({
        render: () => (
          <UiToast
            title="填写完整"
            description="不能提交没有空格位的填空题，空格位是 *** （三个表示）"
            type={EToastType.Error}
          />
        )
      });
      return ;
    }
    blanks.push(item);
    rerender();
    setTimeout(() => {
      document.getElementById(`blank-${blanks.length - 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const blankTotal = useRef<number>(20);

  const [shorts] = useState<any[]>([]);
  const editShortRef = useRef<any>();
  const addShort = () => {
    const item = editShortRef.current?.value;
    if (!item) {
      toast({
        render: () => (
          <UiToast
            title="填写完整"
            description="不能提交空的简答题"
            type={EToastType.Error}
          />
        )
      });
      return ;
    }
    shorts.push(item);
    rerender();
    setTimeout(() => {
      document.getElementById(`short-${shorts.length - 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const shortTotal = useRef<number>(20);

  const [programs] = useState<any[]>([]);
  const editProgramRef = useRef<any>();
  const addProgram = () => {
    const item = editProgramRef.current?.value;
    if (!item) {
      toast({
        render: () => (
          <UiToast
            title="填写完整"
            description="不能提交空的编程题"
            type={EToastType.Error}
          />
        )
      });
      return ;
    }
    programs.push(item);
    rerender();
    setTimeout(() => {
      document.getElementById(`program-${programs.length - 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const programTotal = useRef<number>(40);

  useEffect(() => {
    getExamDetail({
      ExamId: search.get('ExamId') as string
    }).then((ExamDetail) => {
      choices.splice(0, choices.length, ...ExamDetail.choices);
      blanks.splice(0, blanks.length, ...ExamDetail.blanks);
      shorts.splice(0, shorts.length, ...ExamDetail.shorts);
      programs.splice(0, programs.length, ...ExamDetail.programs);

      choiceTotal.current = ExamDetail.choiceTotal;
      blankTotal.current = ExamDetail.blankTotal;
      shortTotal.current = ExamDetail.shortTotal;
      programTotal.current = ExamDetail.programTotal;

      Array.isArray(ExamDetail.answerDetail) && (answerDetail.current = ExamDetail.answerDetail.split(';'));

      rerender();
    });
  }, [])

  // 考试详情最后数据对象
  const currentDetail = {
    choices,
    choiceTotal: choiceTotal.current,
    blanks,
    blankTotal: blankTotal.current,
    shorts,
    shortTotal: shortTotal.current,
    programs,
    programTotal: programTotal.current,
    answerDetail: answerDetail.current.join(';')
  }

  const save = async () => {
    try {
      // 判断题目个数是否足够
      if (
        choices.length < 5 || blanks.length < 5 || shorts.length < 4 || programs.length < 2
      ) {
        return toast({
          render: () => (
            <UiToast
              title="考试题目过少"
              description={
                <div>
                  {choices.length < 5 && '选择题不少于 5'}<br/><br/>
                  {blanks.length < 5 && '填空题不少于 5'}<br/><br/>
                  {shorts.length < 4 && '简单题不少于 4'}<br/><br/>
                  {programs.length < 2 && '编程题不少于 2'}
                </div>
              }
              type={EToastType.Error}
            />
          )
        })
      }

      console.log(answerDetail.current);

      // 判断答案个数是否够
      if (
        answerDetail.current.length !== choices.length + blanks.length + shorts.length + programs.length
        && answerDetail.current.every((item) => item)
      ) {
        return toast({
          render: () => (
            <UiToast
              title="答案个数不匹配"
              description="答案个数不匹配，请检查答案是否填写完整，答案在原题上作答即可"
              type={EToastType.Error}
            />
          )
        })
      }


      const formData = new FormData();
      formData.append('ExamId', search.get('ExamId') as string);
      formData.append('file', new File([JSON.stringify(currentDetail)], `exam-detail-1.json`));

      const isSaved = await saveExamDetail(formData);
      if (isSaved) {
        toast({
          render: () => (
            <UiToast
              title="保存成功"
              description="考试详情已保存，前往考试列表页进行发布"
              type={EToastType.Success}
            />
          )
        });
        router.push('/exams');
      } else {
        toast({
          render: () => (
            <UiToast
              title="保存失败"
              description="考试详情保存失败，没有成功"
              type={EToastType.Error}
            />
          )
        });

      }
    } catch (err) {
      console.log(err);

      toast({
        render: () => (
          <UiToast
            title="保存失败"
            description="考试详情保存失败"
            type={EToastType.Error}
          />
        )
      });
    }
  }

  const ExamName = search.get('ExamName') || '';

  useEffect(() => {
    if (!search.get('ExamId')) {
      toast({
        render: () => (
          <UiToast
            title="没有考试ID"
            description="没有考试ID，请返回考试列表页"
            type={EToastType.Error}
          />
        )
      });
      setTimeout(() => {
       router.push('/exams'); 
      });
      return;
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 p-4">
      <div className="flex flex-row h-[calc(100vh-1.5rem)]">
        <div className="flex flex-1 flex-col p-4 h-[100%] ">
          <div className="bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            <header className="flex items-center justify-between pb-4">
              <h1 className="text-2xl font-bold">{ExamName}</h1>
            </header>
            <div className="grid gap-4 pt-4">
              {/* 选择题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold flex gap-4 justify-between items-center">一、单项选择题 
                  {closeEdit || <Input type="number" placeholder="输入选择分数，默认 20" className="w-30" onChange={(e) => {
                    choiceTotal.current = Number(e.target.value) || 20;
                    rerender();
                  }}/>}
                </h2>
                {choices.map((choice, index) => (
                  <div className="flex items-start py-4 gap-4 whitespace-pre-wrap" key={index} id={`choice-${index}`}>
                    <div>{index + 1}.</div>
                    <QuestionItem
                      key={choice.id}
                      question={choice.question}
                      options={choice.options}
                      index={index}
                      answerDetail={answerDetail.current}
                    />
                  </div>
                ))}
                {closeEdit || <div className="flex items-start my-4 gap-4">
                  <div className="mt-1">{choices.length + 1}.</div>
                  <div className="w-full">
                    <MutipleChoice ref={editChoiceRef} />
                    <Button size='sm' onClick={addChoice} className="mt-4">保存并编辑下一个</Button>
                  </div>
                </div>}
              </div>
              {/* 填空题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold flex gap-4 justify-between items-center">二、填空题
                  {closeEdit || <Input type="number" placeholder="输入填空分数，默认 20" className="w-30" onChange={(e) => {
                    blankTotal.current = Number(e.target.value) || 20;
                    rerender();
                  }} />}
                </h2>
                {
                  blanks.map((blank, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap" id={`blank-${index}`}>
                      <div>{index + 1}.</div>
                      <BlankItem blankStr={blank} index={choices.length + index} answerDetail={answerDetail.current} />
                    </div>
                  ))
                }
                {closeEdit || <div className="flex items-start my-4 gap-4">
                  <div className="mt-1">{blanks.length + 1}.</div>
                  <div className="w-full">
                    <FillInTheBlank ref={editBlankRef} />
                    <Button size='sm' className="mt-4" onClick={addBlank}>保存并编辑下一个</Button>
                  </div>
                </div>}
              </div>
              {/* 简答题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold flex gap-4 justify-between items-center">三、简答题
                  {closeEdit || <Input type="number" placeholder="输入简答分数，默认 20" className="w-30" onChange={(e) => {
                    shortTotal.current = Number(e.target.value) || 20;
                    rerender();
                  }} />}
                </h2>
                {
                  shorts.map((short, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap" id={`short-${index}`}>
                      <div>{index + 1}.</div>
                      <ShortItem shorStr={short} index={choices.length + blanks.length + index} answerDetail={answerDetail.current} />
                    </div>
                  ))
                }
                {closeEdit || <div className="flex items-start my-4 gap-4">
                  <div className="mt-1">{shorts.length + 1}.</div> 
                  <div className="w-full">
                    <ShortAnswer ref={editShortRef} />
                    <Button size='sm' onClick={addShort}>保存并编辑下一个</Button>
                  </div>
                </div>}
              </div>
              {/* 编程题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold flex gap-4 justify-between items-center">四、编程题
                  {closeEdit || <Input type="number" placeholder="输入编程分数，默认 40" className="w-30" onChange={(e) => {
                    programTotal.current = Number(e.target.value) || 40;
                    rerender();
                  }} />}
                </h2>
                {
                  programs.map((program, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap" id={`program-${index}`}>
                      <div>{index + 1}.</div>
                      <ProgramItem programStr={program} index={
                        choices.length + blanks.length + shorts.length + index
                      } answerDetail={answerDetail.current} />
                    </div>
                  ))
                }
                {closeEdit || <div className="flex items-start my-4 gap-4">
                  <div className="mt-1">{programs.length + 1}.</div> 
                  <div className="w-full" >
                    <Programming ref={editProgramRef} />
                    <Button size='sm' onClick={addProgram} className="mt-4">保存并编辑下一个</Button>
                  </div>
                </div>}
              </div>
            </div>
            {closeEdit || <div className="flex justify-end">
              <Button onClick={save}>整体提交保存</Button>
            </div>}
          </div>
        </div>
        {/* 右侧考试题目导航 */}
        <div className="p-4 h-[calc(100vh-1.5rem)]">
          <div className="flex-1 p-4 bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            {/* 题型导航 */}
            <Button size="sm" variant="ghost">
              一
            </Button>
            {/* 题型导航下面的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {choices.map((_, num) => (
                <Button key={num} className="w-10 h-10 bg-slate-200" onClick={() => {
                  const dom = document.getElementById(`choice-${num}`);
                  dom?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>
                  {num + 1}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              二
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {blanks.map((_, num) => (
                <Button key={num} className="w-10 h-10 bg-slate-200" onClick={() => {
                  const dom = document.getElementById(`blank-${num}`);
                  dom?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }}>
                  {num + 1}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              三
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {shorts.map((_, num) => (
                <Button key={num} className="w-10 h-10 bg-slate-200" onClick={() => {
                  const dom = document.getElementById(`short-${num}`);
                  dom?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>
                  {num + 1}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              四
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {programs.map((_, num) => (
                <Button key={num} className="w-10 h-10 bg-slate-200" onClick={() => {
                  const dom = document.getElementById(`program-${num}`);
                  dom?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>
                  {num + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

