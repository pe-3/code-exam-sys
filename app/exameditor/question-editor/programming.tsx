import Editor from "@/app/components/MonacoEditor"
import { Label } from "@/components/ui/label"
import MarkdownEditor from "@/components/ui/md-editor"
import { forwardRef, useImperativeHandle, useState } from "react"

const Programming = forwardRef(function Programming({
  init
}: {
  init?: any;
}, ref: any) {
  const [mdtext, setMdText] = useState(init);

  useImperativeHandle(ref, () => ({
    value: mdtext
  }));

  return (
    <div className="space-y-4 mb-4 w-full">
      <div className="space-y-4">
        <MarkdownEditor
          initialValue={mdtext}
          className="min-h-[100px] min-w-[500px]"
          onChange={(val) => setMdText(val)}
        />
      </div>
    </div>
  )
})

export default Programming;