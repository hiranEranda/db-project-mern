import React, { useState } from "react";

function Hook() {
  const [flags, setFlags] = useState({
    today: false,
    week: false,
    month: false,
    all: true,
  });

  console.log(flags);
  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() =>
          setFlags({
            today: true,
            week: true,
            month: true,
            all: true,
          })
        }
      >
        This week
      </button>
    </div>
  );
}

export default Hook;
