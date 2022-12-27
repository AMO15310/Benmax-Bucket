import { Component } from "react";
import "./login.scss";
import login from "./login.png";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import SigninWithGoogle from "./googlesignin";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";

// export default Navigation;

const LoginForm = () => {
  // const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleEmailChange = (event) => {
  //   setEmail({
  //     [event.target.name]: event.target.value,
  //   });
  // };
  // const handlePassChange = (event) => {
  //   setpassword({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const hidepass = () => {
    setInputType("password");
  };
  const unhidepass = () => {
    setInputType("text");
  };

  const handleForm = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return false;
    }
    const Logindetails = {
      email: email,
      password: password,
    };
    signInWithEmailAndPassword(auth, Logindetails.email, Logindetails.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(error);
        console.log(errorMessage);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 4000);
      });
  };
  return (
    <div className="logs">
      {/* {user && <Navigate to="/" replace={true} />} */}
      <form className="loginform" onSubmit={handleForm} action="">
        {error && (
          <div className="messages">
            <p className="mess">Please your check email or password!!</p>
          </div>
        )}
        <img src={login} alt="Logo" />
        <p className="title">Welcome Back</p>
        <label className="emaillabel" htmlFor="email">
          email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <label htmlFor="password">
          password{" "}
          {inputType === "password" ? (
            <AiOutlineEye className="eye" onClick={unhidepass} />
          ) : (
            <AiFillEye className="eye" onClick={hidepass} />
          )}{" "}
        </label>
        <input
          type={inputType}
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="password"
          required
        />
        <button onClick={handleForm}>Log in</button>
        <p className="or">
          OR <br></br>
        </p>
        <SigninWithGoogle />

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p className="haveone">
            Don't have an account ? <span className="sign">Sign up</span>{" "}
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;

// class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       inputType: "password",
//       error: false,
//       user: null,
//     };
//   }
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   hidepass = () => {
//     this.setState({
//       inputType: "password",
//     });
//   };
//   unhidepass = () => {
//     this.setState({
//       inputType: "text",
//     });
//   };

//   handleForm = (event) => {
//     event.preventDefault();
//     if (!this.state.email || !this.state.password) {
//       return false;
//     }
//     const Logindetails = {
//       email: this.state.email,
//       password: this.state.password,
//     };

//     signInWithEmailAndPassword(auth, Logindetails.email, Logindetails.password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         contextChanger(user);
//         this.setState({
//           user: user,
//         });

//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ...
//         console.log(error);
//         console.log(errorMessage);
//         this.setState({
//           error: true,
//         });
//         setTimeout(() => {
//           this.setState({
//             error: false,
//           });
//         }, 4000);
//       });
//   };
//   componentDidMount() {
//     document.title = "Log in ";
//   }
//   render() {
//     let { user, error } = this.state;
//     return (
//       <div className="logs">
//         {user && <Navigate to="/" replace={true} />}
//         <form
//           className="loginform"
//           onSubmit={(event) => this.handleForm(event)}
//           action=""
//         >
//           {this.state.error && (
//             <div className="messages">
//               <p className="mess">Please your check email or password!!</p>
//             </div>
//           )}
//           <img src={login} alt="Logo" />
//           <p className="title">Welcome Back</p>
//           <label className="emaillabel" htmlFor="email">
//             email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//             placeholder="email"
//             required
//           />
//           <label htmlFor="password">
//             password{" "}
//             {this.state.inputType === "password" ? (
//               <AiOutlineEye className="eye" onClick={this.unhidepass} />
//             ) : (
//               <AiFillEye className="eye" onClick={this.hidepass} />
//             )}{" "}
//           </label>
//           <input
//             type={this.state.inputType}
//             name="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             placeholder="password"
//             required
//           />
//           <button onClick={(event) => this.handleForm(event)}>Log in</button>
//           <p className="or">
//             OR <br></br>
//           </p>
//           <SigninWithGoogle />

//           <Link to="/signup" style={{ textDecoration: "none" }}>
//             <p className="haveone">
//               Don't have an account ? <span className="sign">Sign up</span>{" "}
//             </p>
//           </Link>
//         </form>
//       </div>
//     );
//   }
// }

// export default LoginForm;
