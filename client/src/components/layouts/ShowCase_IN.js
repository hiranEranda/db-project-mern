import React from "react";

function ShowCase_IN() {
  return (
    <>
      <section className="bg-dark text-light p-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Welcome <span className="text-warning">again!!!</span>
              </h1>
              <p className="lead my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                odio obcaecati quos aliquam laborum praesentium doloremque
                commodi impedit corporis deserunt vitae, harum suscipit
                eligendi? Officia reiciendis inventore delectus alias corrupti!
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src="/assets/showcase.png "
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowCase_IN;
