import React from 'react';

function Applyform() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="operationaldiv border w-1/3 h-3/4 shadow-md shadow-sky-500  ">
        <br />
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-sky-500 text-2xl">Apply Here...</h1>
        </div>
        <br />

        <div className=" w-full ">
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
              <label
                htmlFor="username"
                className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
              >
                Name
              </label>
            </div>
          </div>
          <br />

          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userwork"
                name="userwork"
                type="text"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
              <label
                htmlFor="userwork"
                className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
              >
                Work
              </label>
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userphonenumber"
                name="userphonenumber"
                type="text"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
              <label
                htmlFor="userphonenumebr"
                className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
              >
                Phone Number
              </label>
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="useremail"
                name="useremail"
                type="text"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
              <label
                htmlFor="useremail"
                className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
              >
                Email (if any)
              </label>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default Applyform;
