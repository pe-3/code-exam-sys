import StudentSidebar from '../layout/StudentSidebar';
import TopBar from '../layout/TopBar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopBar />
      <div className="flex" style={{ height: 'calc(100vh - 52px)'}}>
        <div className="w-auto"> {/* 调整这个宽度以适应你的sidebar设计 */}
          <StudentSidebar />
        </div>
        <div className="flex-1 p-4" style={{ overflow: 'scroll' }}> {/* 主内容区域 */}
          {children}
          {/* <Outlet />  子路由渲染区域 */}
        </div>
      </div>
    </div>
  );
}