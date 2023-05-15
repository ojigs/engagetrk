import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h2>We are sorry!</h2>
      <p>An error has occured while loading the page.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
}

export default Error;
