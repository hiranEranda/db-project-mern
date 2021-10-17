import React from "react";
import Register from "../auth/Register";

function ShowCase() {
  return (
    <>
      <section className="bg-dark text-light p-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Hello <span className="text-warning">!!!</span>
              </h1>
              <p className="lead my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                odio obcaecati quos aliquam laborum praesentium doloremque
                commodi impedit corporis deserunt vitae, harum suscipit
                eligendi? Officia reiciendis inventore delectus alias corrupti!
              </p>
              <button
                className="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Register
              </button>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src="/assets/showcase.png "
              alt=""
            />
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------------------------- */}
        {/* Register Modal */}
        <div className="container">
          <div
            className="modal fade"
            id="registerModal"
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="registerModalLabel">
                    Register
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-dark">
                  <p className="lead">Enter your details to register</p>
                  <Register />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowCase;
