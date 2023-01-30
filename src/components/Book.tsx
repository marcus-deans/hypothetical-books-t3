type BookProps = {
    title:String,
    authors:string[],
    ISBN13:number,
    ISBN10?:number,
    publisher:String,
    publicationYear:number,
    pageCount?:number,
    //Handle Dimensions
    retailPrice:number,
    genre:String

}

function Book(props:BookProps) {
  return (
    <>
    <h1>{props.title}</h1>
    </>
  )
}

export default Book