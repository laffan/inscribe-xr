import { auth } from "./../../../firebase/config";

const Logout = () => {
  const signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(
      function () {
        // Sign-out successful.
        console.log("Signed out");
      },
      function (error) {
        // An error happened.
      }
    );
  };

  return <a onClick={signOut}>Log Out</a>;
};

export default Logout;
