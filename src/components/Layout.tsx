import Nav from './Nav'
const Layout = ({children}:any) => {
  return (
    <>
    <Nav />
    {children}
    </>
  )
}

export default Layout