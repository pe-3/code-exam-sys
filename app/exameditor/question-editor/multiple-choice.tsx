import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { set } from 'lodash'

const MultipleChoice = forwardRef(function MutipleChoice({
  initChoice
}: {
  initChoice?: any;
}, ref: any) {

  const { question, options } = initChoice || {};

  const choiceRef = useRef({
    id: 'question1',
    question: question || '',
    options: options || [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' },
    ],
  });

  const choice = choiceRef.current;

  useImperativeHandle(ref, () => (choice));

  type key = string | number

  const changeHandler = (dataPath: key[] | key) => (e: any) => {
    set(choice, dataPath, e.target.value)
  }

  return (
    <form className="space-y-4 w-full" ref={ref}>
      <div className="space-y-4">
        <Textarea
          className="min-h-[100px]"
          defaultValue={choice.question}
          placeholder="输入你的问题。"
          onChange={changeHandler('question')}
        />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          {
            choice.options.map((option, index) => (
              <div className="flex items-center space-x-2 ml-[-26px]" key={index}>
                <div />
                <Label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                  htmlFor="d"
                >
                  {option.id}
                </Label>
                <Input
                  className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
                  id="d"
                  placeholder="输入选项 D"
                  defaultValue={option.text}
                  onChange={changeHandler(['options', index, 'text'])}
                />
              </div>
            ))
          }
        </div>
      </div>
    </form>
  )
})

export default MultipleChoice;