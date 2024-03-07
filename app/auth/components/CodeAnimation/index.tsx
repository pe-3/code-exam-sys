// CodeAnimation 组件，负责渲染代码字符动画
import './animation.css'

export default function CodeAnimation() {
  const codeSymbols = `*******************************************************************`.split('');
  // 生成并返回代码字符的动画
  return (
    <div className="absolute w-full h-full pointer-events-none">
      {codeSymbols.map((symbol, index) => (
        <span
          key={index}
          className="absolute text-xl font-bold text-blue-300 opacity-50 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}>
          {symbol}
        </span>
      ))}
    </div>
  );
}
