import React, { useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css';

function MarkdownEditor({ initialValue, onChange, onlyViewer, ...restProps }: {
  initialValue: string;
  onChange?: (markdown: string) => void;
  onlyViewer?: boolean;
  [key: string]: any
}) {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  // 初始化编辑器或预览器实例
  useEffect(() => {
    // 根据 onlyViewer 的值选择初始化编辑器还是预览器
    if (onlyViewer) {
      editorInstance.current = new Viewer({
        el: editorRef.current,
        initialValue,
      });
    } else {
      editorInstance.current = new Editor({
        el: editorRef.current,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '500px',
        initialValue,
      });

      // 设置内容改变的回调处理
      editorInstance.current.on('change', () => {
        const markdown = editorInstance.current.getMarkdown();
        if (onChange) {
          onChange(markdown);
        }
      });
    }
    // 组件卸载时销毁Editor或Viewer实例
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);


  return <div {...restProps} ref={editorRef}></div>;
}

export default MarkdownEditor;