import { useRouteError, Link } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row justify-content-md-center align-items-center">
          <div className="col-md-6">
            <img src="./error.png" alt="Error" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1 className="display-1 fw-bold">{error.status}</h1>
            <h2>We are sorry!</h2>
            <p>An error has occured while loading the page.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <Link className="btn btn-primary" to={"/"}>
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
