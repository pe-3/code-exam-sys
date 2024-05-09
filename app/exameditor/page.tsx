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
import { examJudge, getExamDetail, getExamResult, saveExamDetail } from "@/sql/exam/actions";
import { useSearchParams, useRouter } from "next/navigation";
import ProgramIdeModal from "./question-editor/program-ide";
import { getTokenFromCookie } from "@/app/token";
import { getItemInVisitor } from "@/storage";
import { UserModel, UserRole } from "@/sql/user/user.type";
import MarkdownEditor from "@/components/ui/md-editor";

function scoreToColor(score: number) {
  // 确保分数在合法范围内
  score = Math.max(0, Math.min(score, 100));

  // 计算红、绿、蓝颜色的分量
  // 高分数 (接近于 100) 会是绿色，低分数 (接近于 0) 会是红色
  const red = Math.floor(255 * (1 - score / 100));
  const green = Math.floor(255 * (score / 100));
  const blue = 0; // 蓝色分量不参与分数对颜色的影响

  // 将十进制颜色值转换为十六进制字符串，并返回 CSS 颜色
  return `rgb(${red}, ${green}, ${blue})`;
}

const QuestionItem = ({ question, options, index, answerDetail, rerender, afterExam }: {
  question: any;
  options: any;
  index: number;
  answerDetail: any[];
  rerender: () => any;
  afterExam?: boolean;
}) => {
  
  return (
    <div>
      <div>{question}</div>
      <form onChange={(e) => {
        const answer = e.target.value;
        answerDetail[index] = answer;
        rerender();
      }}>
        {options.map((option) => (
          <label className="block cursor-pointer py-2" key={option.id}>
            {option.id}.&nbsp;
            <input
              type="radio"
              name={question}
              value={option.text}
              className="mr-2 leading-tight"
              defaultChecked={option.text == answerDetail[index]}
              {...(afterExam && {
                checked: option.text === answerDetail[index]
              })}
            />
            {option.text}
          </label>
        ))}
      </form>
    </div>
  );
};

const BlankItem = ({ blankStr, index, answerDetail, rerender, afterExam } : {
  blankStr: string;
  index: number;
  answerDetail: any[];
  rerender: () => any;
  afterExam?: boolean;
}) => {
  const items = blankStr.split('***');

  const blankCount = items.length - 1;

  const blankAnswer = useRef<string[]>([]);

  const submit = () => {
    if (blankAnswer.current.length === blankCount && blankAnswer.current.every(item => item)) {
      answerDetail[index] = blankAnswer.current.join(',');
      rerender();
    }
  }

  const values = answerDetail[index]?.split(',') || [];

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
            defaultValue={values[itemidx]}
            type="text"
            className="border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center w-20"
            disabled={afterExam}
          />}
        </span>
      ))
    }
  </div>)
}

const ShortItem = ({ shorStr, index, answerDetail, rerender, afterExam } : {
  shorStr: string;
  index: number;
  answerDetail: any[];
  rerender: () => any;
  afterExam?: boolean;
}) => {
  return (
    <div className="w-full">
      {shorStr}
      <Textarea
        className="min-h-[100px] mt-4"
        placeholder="请输入你对这道简单题的回答。"
        onChange={(e) => {
          answerDetail[index] = e.target.value;
          rerender();
        }}
        defaultValue={answerDetail[index]}
        disabled={afterExam}
      />
    </div>
  )
}

const ProgramItem = ({ programStr, index, answerDetail, rerender, afterExam } : {
  programStr: string;
  index: number;
  answerDetail: any[];
  rerender: () => any;
  afterExam?: boolean;
}) => {
  const [res, setRes] = useState(answerDetail[index]);

  return (
    <div className="w-full">
      {/* {programStr} */}
      <MarkdownEditor initialValue={programStr} onlyViewer className="w-1/3" />
      {afterExam ?<div className="text-yellow-500 my-2">
        结果: {answerDetail[index] || '暂无'}
      </div>: <div className="text-yellow-500 my-2">
        结果: {res || '暂无'}
      </div>}
      <div className="my-2">
        <ProgramIdeModal disabled={afterExam} ProgarmDetail={programStr} onSubmit={(res) => {
          answerDetail[index] = res;
          setRes(res);
          rerender();
        }} />
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

// Check (对号) Icon，变大且为绿色
export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32" // 修改宽度为48px
    height="32" // 修改高度为48px
    viewBox="0 0 24 24"
    fill="none"
    stroke="green" // 修改颜色为绿色
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Cross (错号) Icon，变大且为红色
export const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32" // 修改宽度为48px
    height="32" // 修改高度为48px
    viewBox="0 0 24 24"
    fill="none"
    stroke="red" // 修改颜色为红色
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Component({
  closeEdit,
  inExam,
  afterExam
}: {
  closeEdit?: boolean;
  inExam?: boolean;
  afterExam?: boolean;
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


  // 1. 题目详情
  const [choices] = useState<any[]>([]);
  const [choicesEdit] = useState<any[]>([]);
  const [choicesEditRef] = useState<any[]>([]);

  const [choicesAnswer] = useState<any[]>([]);

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

    choices.push(JSON.parse(JSON.stringify(choice)));
    rerender();
    setTimeout(() => {
       document.getElementById(`choice-${choices.length - 1}`)?.scrollIntoView({
        behavior: 'smooth'
       });
    });
  }

  const choiceTotal = useRef<number>(20);

  const [blanks] = useState<any[]>([]);
  const [blanksEdit] = useState<any[]>([]);
  const [blanksEditRef] = useState<any[]>([]);

  const [blanksAnswer] = useState<any[]>([]);

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
  const [shortsEdit] = useState<any[]>([]);
  const [shortsEditRef] = useState<any[]>([]);

  const [shortsAnswer] = useState<any[]>([]);

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

  const [programsEdit] = useState<any[]>([]);
  const [programsEditRef] = useState<any[]>([]);

  const [programsAnswer] = useState<any[]>([]);
  
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

  const [examResult] = useState<any>({});

  const scoreDetail = examResult.scoreDetail?.split(',') || [];


  // 2. 获取考试详情
  useEffect(() => {
    getExamDetail({
      ExamId: search.get('ExamId') as string,
      inExam
    }).then((ExamDetail) => {

      choices.splice(0, choices.length, ...ExamDetail.choices);
      blanks.splice(0, blanks.length, ...ExamDetail.blanks);
      shorts.splice(0, shorts.length, ...ExamDetail.shorts);
      programs.splice(0, programs.length, ...ExamDetail.programs);

      choiceTotal.current = ExamDetail.choiceTotal;
      blankTotal.current = ExamDetail.blankTotal;
      shortTotal.current = ExamDetail.shortTotal;
      programTotal.current = ExamDetail.programTotal;

      if (!inExam && !afterExam) {
        choicesAnswer.splice(0, choicesAnswer.length, ...(ExamDetail.choicesAnswer || []));
        blanksAnswer.splice(0, blanksAnswer.length, ...(ExamDetail.blanksAnswer || []));
        shortsAnswer.splice(0, shortsAnswer.length, ...(ExamDetail.shortsAnswer || []));
        programsAnswer.splice(0, programsAnswer.length, ...(ExamDetail.programsAnswer || []));
      }
          
      if (afterExam) {
        getExamResult({
          ExamId: Number(search.get('ExamId') as string),
          ResultId: Number(search.get('ResultId') as string)
        }).then(lastestExam => {
          Object.assign(examResult, lastestExam);

          const {
            choices,
            blanks,
            shorts,
            programs
          } = lastestExam.submitAnswer;

          choicesAnswer.splice(0, choices.length, ...(choices || []));
          blanksAnswer.splice(0, blanks.length, ...(blanks || []));
          shortsAnswer.splice(0, shorts.length, ...(shorts || []));
          programsAnswer.splice(0, programs.length, ...(programs || []));

          rerender();
        }).catch(err => {
          console.log(err);
        })
      }

      rerender();
    });

  }, []);

  // 3. 考试详情最后数据对象
  const currentDetail = {
    choices,
    choiceTotal: choiceTotal.current,
    blanks,
    blankTotal: blankTotal.current,
    shorts,
    shortTotal: shortTotal.current,
    programs,
    programTotal: programTotal.current,

    // 答案
    choicesAnswer: choicesAnswer,
    blanksAnswer: blanksAnswer,
    shortsAnswer: shortsAnswer,
    programsAnswer: programsAnswer
  }

  // 4. 保存编辑好的考试
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
                  {shorts.length < 4 && '简答题不少于 4'}<br/><br/>
                  {programs.length < 2 && '编程题不少于 2'}
                </div>
              }
              type={EToastType.Error}
            />
          )
        })
      }


      // 判断答案个数是否够
      if (
        choicesAnswer.length !== choices.length ||
        blanksAnswer.length !== blanks.length ||
        shortsAnswer.length !== shorts.length ||
        programsAnswer.length !== programs.length
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
        router.push('/teacher/exam-list');
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

  // 5. 判断是否有对应的考试
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
       router.push('/teacher/exam-list'); 
      });
      return;
    }
  }, []);

  // 6. 提交试卷
  const submitExam = async () => {
    const answer = {
      choices: choicesAnswer,
      blanks: blanksAnswer,
      shorts: shortsAnswer,
      programs: programsAnswer,
    }

    // 判断题是否答完
    if(
      choicesAnswer.length !== choices.length ||
      blanksAnswer.length !== blanks.length ||
      shortsAnswer.length !== shorts.length ||
      programsAnswer.length !== programs.length
    ) {
      return toast({
        render: () => (
          <UiToast
            title="未作答完毕"
            description="请先作答"
            type={EToastType.Error}
          />
        )
      });
    }

    const {
      isOk,
      score,
      err
    } = await examJudge({
      ExamId: Number(search.get('ExamId') as string),
      answer
    });

    if (isOk) {
      toast({
        render: () => (
          <UiToast
            title="考试通过"
            description={
              <div>
                考试通过，总分: <span style={{ color: scoreToColor(score || Number(score)) }}>{score}</span>
              </div>
            }
            type={EToastType.Success}
          />
        )
      });
      router.push(`/after-exam?ExamId=${search.get('ExamId') as string}&ExamName=${ExamName}`);
    } else {
      toast({
        render: () => (
          <UiToast
            title="服务出错出错"
            description={err}
            type={EToastType.Error}
          />
        )
      });
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 p-4">
      <div className="flex flex-row h-[calc(100vh-1.5rem)]">
        <div className="flex flex-1 flex-col p-4 h-[100%]">
          <div className="bg-white rounded-sm shadow p-8 h-[100%] overflow-auto relative">
            {afterExam && <div className="absolute right-24 top-8 text-5xl font-bold italic text-red-500 bg-white">
              <div>{examResult.score}</div>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500"></div>
            </div>}
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
                  {inExam || afterExam && <span>({choiceTotal.current} 分)</span>}
                </h2>
                {choices.map((choice, index) => (
                  <div className="flex items-start py-4 gap-4 whitespace-pre-wrap relative pr-24" key={index} id={`choice-${index}`}>
                    <div>{index + 1}.</div>
                    {!choicesEdit[index] ? <QuestionItem
                      question={choice.question}
                      options={choice.options}
                      index={index}
                      answerDetail={choicesAnswer}
                      rerender={rerender}
                      afterExam={afterExam}
                    /> : <MutipleChoice 
                          ref={(edit) => {
                            choicesEditRef[index] = edit;
                          }} 
                          initChoice={choice}
                    />}
                    {closeEdit || <div className="absolute right-5">
                      <div>
                        <Button
                          variant="outline"
                          className="mb-2"
                          onClick={() => {
                            if (choicesEdit[index]) {
                              // 保存操作
                              choices[index] = choicesEditRef[index];
                            }
                            choicesEdit[index] = !choicesEdit[index];
                            rerender();
                          }}
                        >{ !choicesEdit[index] ? '编辑' : '保存' }</Button>
                        <br/>
                        <Button variant="destructive" onClick={() => {
                          choices.splice(index, 1);
                          choicesEditRef.splice(index, 1);
                          choicesEdit.splice(index, 1);
                          choicesAnswer.splice(choices.length + index, 1);
                          rerender();
                        }}>删除</Button>
                      </div>
                    </div>}
                    {afterExam && <div className="absolute bottom-10 right-10">{ scoreDetail[index] === '1' ? <CheckIcon/> : <CrossIcon/>}</div> }
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
                  {inExam || afterExam && <span>({blankTotal.current} 分)</span>}
                </h2>
                {
                  blanks.map((blank, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap relative pr-48" id={`blank-${index}`}>
                      <div>{index + 1}.</div>
                      {!blanksEdit[index] 
                        ? <BlankItem 
                          rerender={rerender}
                          blankStr={blank} 
                          index={index}
                          answerDetail={blanksAnswer} 
                          afterExam={afterExam}
                        /> 
                        : <FillInTheBlank init={blank} ref={(blank) => {
                          blanksEditRef[index] = blank;
                        }} /> }
                      {closeEdit || <div className="absolute right-5">
                        <div>
                          <Button
                            variant="outline"
                            className="mr-2"
                            onClick={() => {
                              if (blanksEdit[index]) {
                                // 保存操作
                                blanks[index] = blanksEditRef[index]?.value;
                              }
                              blanksEdit[index] = !blanksEdit[index];
                              rerender();
                            }}
                          >{ !blanksEdit[index] ? '编辑' : '保存' }</Button>
                          <Button variant="destructive" onClick={() => {
                            blanks.splice(index, 1);
                            blanksEditRef.splice(index, 1);
                            blanksEdit.splice(index, 1);
                            blanksAnswer.splice(choices.length + blanks.length + index, 1);
                            rerender();
                          }}>删除</Button>
                        </div>
                      </div>}
                      {afterExam && <div className="absolute bottom-0 right-10">{ scoreDetail[index + choices.length] === '1' ? <CheckIcon/> : <CrossIcon/>}</div> }
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
                  {inExam || afterExam && <span>({shortTotal.current} 分)</span>}
                </h2>
                {
                  shorts.map((short, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap relative pr-48" id={`short-${index}`}>
                      <div>{index + 1}.</div>
                      {
                        !shortsEdit[index] 
                        ? <ShortItem
                            shorStr={short}
                            index={index}
                            answerDetail={shortsAnswer}
                            rerender={rerender}
                            afterExam={afterExam}
                          />
                        : <ShortAnswer init={short} ref={(short) => {
                          shortsEditRef[index] = short;
                        }}/>
                      }
                      {closeEdit || <div className="absolute right-5">
                        <div>
                          <Button
                            variant="outline"
                            className="mr-2"
                            onClick={() => {
                              if (shortsEdit[index]) {
                                // 保存操作
                                shorts[index] = shortsEditRef[index]?.value;
                              }
                              shortsEdit[index] = !shortsEdit[index];
                              rerender();
                            }}
                          >{ !shortsEdit[index] ? '编辑' : '保存' }</Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              shorts.splice(index, 1);
                              shortsEdit.splice(index, 1);
                              shortsEditRef.splice(index, 1);
                              shortsAnswer.splice(choices.length + blanks.length + shorts.length + index, 1);
                              rerender();
                            }}
                          >删除</Button>
                        </div>  
                      </div>}
                      {afterExam && <div className="absolute bottom-10 right-10">{ scoreDetail[index + choices.length + blanks.length] === '1' ? <CheckIcon/> : <CrossIcon/>}</div> }
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
                  {inExam || afterExam && <span>({programTotal.current} 分)</span>}
                </h2>
                {
                  programs.map((program, index) => (
                    <div key={index} className="flex items-start py-4 gap-4 whitespace-pre-wrap relative pr-48" id={`program-${index}`}>
                      <div>{index + 1}.</div>
                      {!programsEdit[index] 
                      ? <ProgramItem
                          programStr={program}
                          index={index} 
                          answerDetail={programsAnswer}
                          rerender={rerender}
                          afterExam={afterExam}
                        /> 
                      : <Programming init={program} ref={(program) => {
                        programsEditRef[index] = program;
                      }} />
                      }
                      {closeEdit || <div className="absolute right-5">
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => {
                            if (programsEdit[index]) {
                              // 保存操作
                              programs[index] = programsEditRef[index]?.value;
                            }
                            programsEdit[index] = !programsEdit[index];
                            rerender();
                          }}
                        >{ !programsEdit[index] ? '编辑' : '保存' }</Button>
                        <Button variant="destructive" onClick={() => {
                          programs.splice(index, 1);
                          programsEdit.splice(index, 1);
                          programsEditRef.splice(index, 1);
                          programsAnswer.splice(choices.length + blanks.length + shorts.length + programs.length + index, 1);
                          rerender();
                        }}>删除</Button>
                      </div>}
                      {afterExam && <div className="absolute bottom-10 right-10">{ scoreDetail[index + choices.length + blanks.length + shorts.length] === '1' ? <CheckIcon/> : <CrossIcon/>}</div> }
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
            {
              inExam && <div className="flex justify-end">
                <Button onClick={submitExam}>交卷</Button>
              </div>
            }
            {
              afterExam && <div className="flex justify-end">
              <Button variant="secondary" onClick={async () => {
                const salt = await getItemInVisitor('TOKEN_SALT');
                const user = await getTokenFromCookie(salt) as UserModel;
                if (user.role === UserRole.Student) {
                  router.push('/student');
                } else if (user.role === UserRole.Teacher) {
                  router.push('/teacher');
                }
              }}>返回主页</Button>
            </div>
            }
          </div>
        </div>
        {/* 右侧考试题目导航 */}
        {afterExam || <div className="p-4 h-[calc(100vh-1.5rem)]">
          <div className="flex-1 p-4 bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            {/* 题型导航 */}
            <Button size="sm" variant="ghost">
              一
            </Button>
            {/* 题型导航下面的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {choices.map((_, num) => (
                <Button 
                  key={num} 
                  className={choicesAnswer[num] ? 'w-10 h-10' : 'w-10 h-10 bg-slate-400'}
                  onClick={() => {
                    const dom = document.getElementById(`choice-${num}`);
                    dom?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
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
                <Button
                  key={num}
                  className={blanksAnswer[num] ? 'w-10 h-10' : 'w-10 h-10 bg-slate-400'}
                  onClick={() => {
                    const dom = document.getElementById(`blank-${num}`);
                    dom?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
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
                <Button 
                  key={num} 
                  className={shortsAnswer[num] ? 'w-10 h-10' : 'w-10 h-10 bg-slate-400'}
                  onClick={() => {
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
                <Button
                  key={num}
                  className={programsAnswer[num] ? 'w-10 h-10' : 'w-10 h-10 bg-slate-400'}
                  onClick={() => {
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
        </div>}
        {afterExam && <div className="p-4 h-[calc(100vh-1.5rem)]">
          <div className="flex-1 p-4 bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            {/* 题型导航 */}
            <Button size="sm" variant="ghost">
              一
            </Button>
            {/* 题型导航下面的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {choices.map((_, num) => (
                <Button 
                  key={num} 
                  className={scoreDetail[num] === '1' ? 'w-10 h-10 bg-green-400' : 'w-10 h-10 bg-red-400'}
                  onClick={() => {
                    const dom = document.getElementById(`choice-${num}`);
                    dom?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
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
                <Button
                  key={num}
                  className={scoreDetail[num + choices.length] === '1' ? 'w-10 h-10 bg-green-400' : 'w-10 h-10 bg-red-400'}
                  onClick={() => {
                    const dom = document.getElementById(`blank-${num}`);
                    dom?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
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
                <Button 
                  key={num} 
                  className={scoreDetail[num + choices.length + blanks.length] === '1' ? 'w-10 h-10 bg-green-400' : 'w-10 h-10 bg-red-400'}
                  onClick={() => {
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
                <Button
                  key={num}
                  className={scoreDetail[num + choices.length + blanks.length + shorts.length] === '1' ? 'w-10 h-10 bg-green-400' : 'w-10 h-10 bg-red-400'}
                  onClick={() => {
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
        </div>}
      </div>
    </div>
  )
}

