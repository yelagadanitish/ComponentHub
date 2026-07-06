import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser }

from "../../services/userService";

function UserLogin() {

  const [

    username,

    setUsername

  ]

  =

  useState("");

  const [

    password,

    setPassword

  ]

  =

  useState("");

  const navigate =
  useNavigate();

  const handleLogin =
  async () => {

    try {

      await loginUser(

        username,

        password

      );

      toast.success(

        "Login Successful"

      );

      navigate("/visitor");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">

          User Login

        </h1>

        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          className="w-full border p-4 rounded-2xl mb-5"

        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="w-full border p-4 rounded-2xl"

        />

        <button

          onClick={handleLogin}

          className="
          w-full
          bg-blue-600
          text-white
          py-4
          rounded-2xl
          mt-8
          "

        >

          Login

        </button>

      </div>

    </div>

  );

}

export default UserLogin;