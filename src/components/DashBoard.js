import { AppBar, Toolbar,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function DashBoard ({title, description, children}) {
    const navigate = useNavigate();

    const logoutMethod = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("AuthToken");
        alert("Logged Out")
        navigate("/");
        
    }

    return (
        <div className='main-component base-component'>

             <AppBar position='static'>
               <Toolbar variant='dense'>
                <Button 
                color='inherit'
                onClick={()=>navigate("/homepage")}>
                 <span className="nav-name">HomePage</span>
                </Button>
                <Button 
                color='inherit'
                onClick={()=>navigate("/create")}>
                 <span className="nav-name">Create New Repository</span>
                </Button>

                <Button 
                color='inherit' 
                onClick={()=>navigate("/")}>
                   <span className="nav-name">Log-In</span>
                </Button>


                <Button 
                  color='inherit'
                   onClick={logoutMethod}>
                  <span className="nav-name">Logout</span> 
                     </Button>
               </Toolbar>
            </AppBar>
            <header>
               <h1 className='heading'>VERSIONER </h1>
               <p className="description"><marquee>A small scale version control system</marquee></p>
            </header>
            <main className='main-segment'>
               <h2>{description}</h2>

               <div>
                  {children}
               </div>
            </main>
          
        </div>
    )
}

export default DashBoard