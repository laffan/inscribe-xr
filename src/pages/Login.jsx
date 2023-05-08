import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./../firebase/config";

const provider = new GoogleAuthProvider();

const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // console.log( error );
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      alert(errorCode);

      var errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
};

const Login = () => {
  return (
    <div className="Login">
      <main>
        <div className="Login__Logo"></div>
        <div className="Login__Description">
          <p>
            A WebXR space that explores the relationship between environment and
            reflection.
          </p>
        </div>
        <div className="Login__Links">
          <a href="/credits" target="_blank">Credits</a> | <a href="https://github.com/laffan/inscribe-xr" target="_blank">GitHub</a>
        </div>
        <button className="Login__SignInBtn" onClick={signIn}></button>
      </main>
      <div className="Login__BottomBar">
        A{" "}
        <a href="https://setlab.soe.ucsc.edu/research/" target="_blank">SET Lab Project</a>{" "}
        from{" "}
        <a href="https://www.ucsc.edu/" target="_blank">
          The University of California Santa Cruz
        </a>
      </div>
    </div>
  );
};

export default Login;
