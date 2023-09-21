import { FunctionComponent } from "react";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <>
           <div className={`pt-3 pb-5 sandBoxStyle`}>
                <div className="container backGround mt-5 p-5 col-md-6">
                <h1 className="text-center mb-5" style={{ fontSize: "2rem" }}>
               Page Not Found
                </h1>
                <h2 className="text-center"><img src="/Images/logo.PNG" style={{ width: "220px", height: "65px" }} /></h2>
                </div>
                </div>
        </>
    )
}

export default PageNotFound;