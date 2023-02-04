import styles from "../styles/Book.module.css";

type BookProps = {
  title: string;
  authors: string[];
  ISBN13: number;
  ISBN10?: number;
  publisher: string;
  publicationYear: number;
  pageCount?: number;
  //Handle Dim.
  retailPrice: number;
  genre: string;
};

function Book(props: BookProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.book}>
            <h1>{props.title}</h1>
            <div className={styles.bookdata}>
              <p className={styles.symbol}>{props.authors}</p>
              <p className={styles.price}>{props.retailPrice}</p>
              <p>{props.publisher}</p>
              <p>{props.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
