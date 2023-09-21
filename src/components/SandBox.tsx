import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";

interface SandBoxProps {

}

const SandBox: FunctionComponent<SandBoxProps> = () => {
    let theme =useContext(SiteTheme);
    return (
        <div className={`pt-5 pb-5 sandBoxStyle ${theme}`}>
            <div className="container backGround mt-5 p-5 col-md-6">
            <h1 className="text-center mb-5" style={{ fontSize: "2.5rem" }}>
            The page will be up soon...
            </h1>
             <h2 className="text-center"><img src="/Images/logo.PNG" style={{ width: "220px", height: "65px" }} /></h2>
            </div>
        </div>
    )
}

export default SandBox;