type BookProps = {
    title?:String,
    pageCount?:number,
}

function Book(props:BookProps) {
  return (
    <>
    <h1>{props.title}</h1>
    </>
  )
}

export default Book