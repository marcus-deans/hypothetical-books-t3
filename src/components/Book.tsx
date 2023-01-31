import styles from "../styles/Book.module.css"
type BookProps = {
    title:String,
    authors:string[],
    ISBN13:number,
    ISBN10?:number,
    publisher:String,
    publicationYear:number,
    pageCount?:number,
    //Handle Dim.
    retailPrice:number,
    genre:String

}

function Book(props:BookProps) {
  return (
    <>
        <div className = {styles.container}>
        <div className= {styles.row}>
            <div className={styles.book}>
                <h1>{props.title}</h1>
                <div className={styles.bookdata}>
                <p className={styles.symbol}>{props.authors}</p>
                <p className={styles.price}>{props.retailPrice}</p>
                <p className="coin-volume">{props.publisher}</p>
                <p className="coin-market-cap">{props.genre}</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Book