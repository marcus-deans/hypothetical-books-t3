type SalesReconciliationProps = {
  date: string;
  title: string;
  // salesLines: (typeof SalesLine)[];
};

function SalesReconciliation(props: SalesReconciliationProps) {
  return (
    <>
      <div className="flex items-center space-x-4 rounded-lg bg-slate-100 p-6 shadow-md">
        <div className="flex h-80 w-2/3 flex-row items-center">
          <div className="flex min-w-min items-center pr-24">
            <h1>{props.title}</h1>
            <div className="flex w-max justify-between text-center">
              <p>{props.date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesReconciliation;
