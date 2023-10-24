import React from "react";

const Spinner = () => {
  return (
    <section className="spinner-container flex justify-center items-center h-[80vh] w-screen">
      <div
        className="w-12 h-12 rounded-full animate-spin
              border-8 border-solid border-orange-500 border-t-transparent"
      />
    </section>
  );
};

export default Spinner;
