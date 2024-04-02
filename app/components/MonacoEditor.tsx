'use client';

import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import Vue, { forwardVue } from 'react-forward-vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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
      }
    },
    data() {
      return {
        editor: null,
        // config
        value: '',
        language: 'javascript',
        theme: 'vs-dark',
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
        theme: this.theme
      })
    },
  },
  (vm: Record<string, any>) => (
    <div className={`${vm.className}`}>
      <div className="py-4 px-6 bg-white shadow rounded-t-lg flex gap-4 items-center">
        <Vue.If when={vm.showConfig}>
          {/* 语言选择 */}
          <Select defaultValue="javascript" onValueChange={value => vm.language = value}>
            <SelectTrigger id="language-select">
              编程语言 <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" >
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="c++">C++</SelectItem>
            </SelectContent>
          </Select>
          {/* 主题选择 */}
          <Select defaultValue="vs-dark" onValueChange={value => vm.theme = value}
          >
            <SelectTrigger id="theme-select">
              主题 <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" >
              <SelectItem value="vs-dark" >Dark</SelectItem>
              <SelectItem value="vs-light">Light</SelectItem>
            </SelectContent>
          </Select>
        </Vue.If>
      </div>
      <div className='h-code-editor bg-gray-200 rounded-b-lg p-4'>
        <div ref={vm.$refs.set('editor')} className="w-full h-full" />
      </div>
    </div>
  )
)

export default Editor;
