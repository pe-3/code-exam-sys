export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <div className="flex-1 p-4" style={{ overflow: 'scroll' }}>
          {children}
        </div>
    </div>
  );
}