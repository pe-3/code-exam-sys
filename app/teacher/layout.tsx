import StudentSidebar from '../layout/StudentSidebar';
import TopBar from '../layout/TopBar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='pt-[64px]'>
      <TopBar role='老师' />
      <div className="flex" style={{ height: 'calc(100vh - 64px)'}}>
        <div className="w-auto"> {/* 调整这个宽度以适应你的sidebar设计 */}
          <StudentSidebar forWhat='teacher' />
        </div>
        <div className="flex-1 p-4" style={{ overflow: 'scroll' }}> {/* 主内容区域 */}
          {children}
        </div>
      </div>
    </div>
  );
}