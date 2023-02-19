import Nav from './Nav'
import Footer from './Footer'
const Layout = ({children}:any) => {
  return (
    <>
      <div className="font-sans leading-normal tracking-normal">
        <Nav />
          <div className="w-full m-0 p-0 bg-cover bg-bottom">
              <div className="container max-w-full mx-auto pt-16 md:pt-32 text-center break-normal">
              </div>
            </div>
            
            <div className="container px-4 md:px-0 max-w-full mx-auto -mt-32">
              <div className="mx-0 sm:mx-6">
                <div className="container flex items-start text-white">  
                  HEADER HERE
                </div>
              
              <div className="w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
                <center>
                  {children}
                </center>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Layout