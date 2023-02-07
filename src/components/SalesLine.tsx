import styles from "../styles/Book.module.css";

// model SalesLine{
//   id 				String @id @default(cuid())
//   book 			Book @relation(fields: [bookId], references: [id])
//   bookId 		String
//   quantity 	Int
//   unitWholesalePrice Float
//   salesReconciliation		SalesReconciliation @relation(fields: [salesReconciliationId], references: [id])
//   salesReconciliationId	String
// }
type SalesLineProps = {
  // book: typeof Book;
  quantity: number;
  unitWholesalePrice: number;
};

//
// .bookh1{
//   font-size:16px;
//   width:150px;
// }
//
// .bookimg{
//   height: 30px;
//   width: 30px;
//   margin-right: 10px;
// }
//

function SalesLine(props: SalesLineProps) {
  return (
    <>
      <div className="flex items-center space-x-4 rounded-lg bg-slate-100 p-6 shadow-md">
        <div className="flex h-80 w-2/3 flex-row items-center">
          <div className="flex min-w-min items-center pr-24">
            <h1>{"SalesLine"}</h1>
            <div className="flex w-max justify-between text-center">
              <p className={styles.symbol}>{props.quantity}</p>
              <p className="w-10/12">{props.unitWholesalePrice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesLine;
