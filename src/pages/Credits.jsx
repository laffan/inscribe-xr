const Credits = () => {
  return (
    <div className="Credits">
      <a href="./">⬅️ Back</a>
      <h1>Credits</h1>
      <p>
        This project depends not only on a huge number of open source libraries,
        but example code from wide range of developers. (I have tried to keep
        track of all who have helped, but please let me know if you feel you
        deserve credit and aren't on this list.)
      </p>
      <h2>Libraries</h2>
      Here's a list of the main packages with their respective links and short
      descriptions:
      <ol>
        <li>
          <a href="https://threejs.org/" target="_blank">
            Three.js
          </a>{" "}
          - A JavaScript library for 3D graphics and WebGL.
        </li>
        <li>
          <a href="https://github.com/pmndrs/react-three-fiber" target="_blank">
            @react-three
          </a>{" "}
          - A React-friendly wrapper for Three.js, including a collection of
          helper components :{" "}
          <a href="https://github.com/pmndrs/drei" target="_blank">
            drei
          </a>
          ,{" "}
          <a href="https://github.com/pmndrs/react-xr" target="_blank">
            xr
          </a>
          .
        </li>
        <li>
          <a href="https://github.com/fontsource/fontsource" target="_blank">
            @fontsource/public-sans
          </a>{" "}
          - A great open source typeface.
        </li>
        <li>
          <a href="https://date-fns.org/" target="_blank">
            date-fns
          </a>{" "}
          - Modern JavaScript date utility library.
        </li>
        <li>
          <a href="https://easy-peasy.vercel.app/" target="_blank">
            easy-peasy
          </a>{" "}
          - Responsible for state management.
        </li>
        <li>
          <a href="https://firebase.google.com/" target="_blank">
            firebase
          </a>{" "}
          &{" "}
          <a href="https://firebase.google.com/docs/functions" target="_blank">
            firebase-functions
          </a>{" "}
          - Realtime database and cloud functions for serverless apps.
        </li>
        <li>
          <a href="https://howlerjs.com/" target="_blank">
            howler
          </a>{" "}
          - Audio library for the modern web.
        </li>
        <li>
          <a href="https://html2canvas.hertzen.com/" target="_blank">
            html2canvas
          </a>{" "}
          - Screenshot-like functionality for the web.
        </li>
        <li>
          <a href="https://lodash.com/" target="_blank">
            lodash
          </a>{" "}
          - A modern JavaScript utility library.
        </li>
        <li>
          <a href="https://www.npmjs.com/package/npm" target="_blank">
            npm
          </a>{" "}
          - Node Package Manager.
        </li>
        <li>
          <a
            href="https://github.com/react-hook-form/react-hook-form"
            target="_blank"
          >
            r3f-form
          </a>{" "}
          - React Hook Form for react-three-fiber.
        </li>
        <li>
          <a href="https://reactjs.org/" target="_blank">
            react
          </a>{" "}
          &{" "}
          <a href="https://reactjs.org/docs/react-dom.html" target="_blank">
            react-dom
          </a>{" "}
          - React is a JavaScript library for building user interfaces.
        </li>
        <li>
          <a href="https://react-dropzone.js.org/" target="_blank">
            react-dropzone
          </a>{" "}
          - Flexible HTML5 drag-and-drop zone for files.
        </li>
        <li>
          <a href="https://github.com/remarkjs/react-markdown" target="_blank">
            react-markdown
          </a>{" "}
          - Markdown component for React.
        </li>
        <li>
          <a
            href="https://www.npmjs.com/package/remove-markdown"
            target="_blank"
          >
            Remove Markdown
          </a>{" "}
          - Removes Markdown syntax from text.
        </li>
        <li>
          <a href="https://sass-lang.com/" target="_blank">
            Sass
          </a>{" "}
          - A CSS preprocessor, adding powerful features and syntax to CSS.
        </li>
        <li>
          <a href="https://www.npmjs.com/package/slugify" target="_blank">
            Slugify
          </a>{" "}
          - Converts text into URL-friendly slugs.
        </li>

        <li>
          <a href="https://yarnpkg.com/" target="_blank">
            Yarn
          </a>{" "}
          - A package manager for your code, allowing you to manage dependencies
          and versioning.
        </li>
      </ol>
    </div>
  );
};

export default Credits;
