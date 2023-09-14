import Header from "./header";

const LayoutWrapper = ({children}:React.PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-neutral-700">
      <Header/>
      <section>
        {children}
      </section>
    </main>
  );
}

export default LayoutWrapper;