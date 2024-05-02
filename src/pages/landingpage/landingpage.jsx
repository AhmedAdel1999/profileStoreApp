import { SpinStretch } from "react-cssfx-loading";
const LandingPage = () =>{
    let landingStyle ={
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fbeee6"
    }
    return(
        <div style={{...landingStyle}}>
            <SpinStretch width={"100px"} height={"100px"} color="#9f8189" />
        </div>
    )
}
export default LandingPage;