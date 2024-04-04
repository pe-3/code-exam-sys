'use client';

import React from 'react';
import * as monaco from 'monaco-editor';
import Vue, { forwardVue } from 'react-forward-vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { runCode } from '@/sql/exam/actions';

let outeditor: any = null;
let lastLanguage = 'javascript';

function getLanguageTemplate(language: string) {
  const templates = {
    javascript: `// JavaScript template
function greet() {
  console.log('Hello, World!');
}

greet();`,
    python: `# Python template
def greet():
    print("Hello, World!")

greet()`,
    java: `// Java template
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    c: `// C template
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `// C++ template
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    go: `// Go template
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
    // 添加其他语言模板...
  };

  return templates[language] || `// Unrecognized language: ${language}`;
}

const Editor = forwardVue(
  {
    name: 'Editor',
    props: {
      showConfig: {
        type: Boolean,
        default: false,
      },
      className: {
        type: String,
        default: '',
      },
      onResult: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        editor: null,
        // config
        value: getLanguageTemplate('javascript'),
        language: 'javascript',
        theme: 'vs-dark',
        // 结果
        result: '',
        // 运行中
        isRuning: false
      }
    },
    mounted() {
      if (this.editor) return;

      // 挂载编辑器
      const { value, language, theme } = this;
      const editor = monaco.editor.create(this.$refs.editor, {
        value,
        language,
        theme,
      });
      outeditor = editor;
      console.log(editor);

      this.editor = editor;
    },
    beforeUnmount() {
      if (this.editor) {
        this.editor.dispose();
      }
    },
    // 更新配置
    updated() {
      this.editor?.updateOptions({
        language: this.language,
        theme: this.theme,
      });

      if (this.language !== lastLanguage) {
        outeditor.setValue(getLanguageTemplate(this.language));
      }

      lastLanguage = this.language;
    },
    methods: {
      async run(this: any) {
        this.isRuning = true;
        const code = outeditor.getValue();
        this.result = await runCode({
          code,
          language: this.language,
        });
        this.isRuning = false;
        this.onResult(this.result);
      }
    }
  },
  (vm: Record<string, any>) => (
    <div className={`w-full h-full ${vm.className}`}>
      <div className="py-4 px-6 bg-white shadow flex gap-4 items-center">
        <Vue.If when={vm.showConfig}>
          {/* 语言选择 */}
          <Select defaultValue="javascript" onValueChange={value => vm.language = value}>
            <SelectTrigger id="language-select">
              编程语言 <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">Cpp</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="go">Go</SelectItem>
            </SelectContent>
          </Select>
          {/* 主题选择 */}
          <Select defaultValue="vs-dark" onValueChange={value => vm.theme = value}>
            <SelectTrigger id="theme-select">
              主题 <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="vs-light">Light</SelectItem>
            </SelectContent>
          </Select>
        </Vue.If>
        {/* 运行代码按钮 */}
        <Button onClick={vm.run} disabled={vm.isRuning}>运行代码</Button>
      </div>
      
      {/* 代码编辑器 */}
      <div className='flex-1 h-code-editor bg-gray-800 p-4 relative'>
        <div ref={vm.$refs.set('editor')} className="w-full h-full" />
        {/* 控制台输出区 */}
        <div className="flex-1 bg-gray-800 rounded-b-lg p-8 overflow-auto absolute bottom-0 right-0 w-full z-10">
          <pre id="console-output" className="text-green-400">
            运行结果: {!vm.isRuning ? vm.result : '运行中...'}
          </pre>
        </div>
      </div>
    </div>
  )
)

export default Editor;
