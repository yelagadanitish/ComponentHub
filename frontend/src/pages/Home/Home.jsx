import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaCog } from "react-icons/fa";

import logo from "../../assets/logo/innomayi-logo.png";

import esp32 from "../../assets/home/esp32.png";
import lcd from "../../assets/home/lcd.png";
import breadboard from "../../assets/home/breadboard.png";
import capacitor from "../../assets/home/capacitor.png";
import sensor from "../../assets/home/sensor.png";
import chip from "../../assets/home/chip.png";
import resistor from "../../assets/home/resistor.png";
import pcb from "../../assets/home/pcb.svg";

function Home() {

  const navigate = useNavigate();

  return (

    <div
      className="
      relative
      overflow-hidden
      min-h-screen
      bg-[#EDF3FB]
      flex
      flex-col
      "
    >

      {/* ================= BACKGROUND ================= */}

      {/* PCB Pattern */}

      <img
        src={pcb}
        className="
        absolute
        right-0
        top-24
        h-[80%]
        opacity-10
        -z-10
        "
      />

      {/* Left Side */}

      <img
        src={esp32}
        className="
        absolute
        left-0
        top-40
        w-52
        opacity-25
        rotate-[-25deg]
        -z-0
        "
      />

      <img
        src={capacitor}
        className="
        absolute
        left-10
        top-[420px]
        w-24
        opacity-25
        -z-0
        "
      />

      <img
        src={sensor}
        className="
        absolute
        left-24
        top-[560px]
        w-24
        opacity-25
        -z-0
        "
      />

      {/* Right Side */}

      <img
        src={chip}
        className="
        absolute
        top-32
        right-28
        w-32
        opacity-20
        rotate-[20deg]
        -z-0
        "
      />

      <img
        src={resistor}
        className="
        absolute
        top-[450px]
        right-40
        w-20
        opacity-20
        rotate-[15deg]
        -z-10
        "
      />

       <img
        src={breadboard}
        className="
        absolute
        right-0
        bottom-10
        w-56
        opacity-20
        -z-0
        "
      />


      <img
        src={lcd}
        className="
        absolute
        bottom-52
        right-16
        w-40
        opacity-20
        rotate-[15deg]
        -z-0
        "
      />

      
      {/* Top Left Dots */}

      <div
        className="
        absolute
        top-32
        left-20
        grid
        grid-cols-5
        gap-2
        opacity-20
        -z-10
        "
      >

        {[...Array(25)].map((_, i) => (

          <div
            key={i}
            className="
            w-2
            h-2
            rounded-full
            bg-blue-300
            "
          />

        ))}

      </div>

      {/* Top Right Dots */}

      <div
        className="
        absolute
        top-40
        right-20
        grid
        grid-cols-5
        gap-2
        opacity-20
        -z-10
        "
      >

        {[...Array(25)].map((_, i) => (

          <div
            key={i}
            className="
            w-2
            h-2
            rounded-full
            bg-blue-300
            "
          />

        ))}

      </div>

      {/* Header */}

      <div
        className="
        bg-white
        border-b
        border-slate-200
        shadow-md
        px-8
        py-4
        flex
        items-center
        "
      >

        <img
          src={logo}
          alt="Innomayi"
          className="
          h-12
          md:h-14
          "
        />

        <div className="ml-5">

          <h1
            className="
            text-[#072A95]
            font-bold
            text-xl
            md:text-3xl
            "
          >

            COMPONENT VAULT

          </h1>

          <p
            className="
            text-slate-500
            text-sm
            md:text-base
            "
          >

            Smart Inventory System

          </p>

        </div>

      </div>

      {/* Main */}

      <div
        className="
        flex-1
        flex
        flex-col
        items-center
        justify-center
        px-5
        "
      >

        <motion.h1

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="
          text-5xl
          md:text-7xl
          font-bold
          text-slate-800
          text-center
          "
        >

          Welcome!

        </motion.h1>

        <p
          className="
          text-slate-500
          mt-4
          text-center
          text-lg
          "
        >

          Please select your role to continue

        </p>

      <div
  className="
  mt-16
  flex
  flex-col
  lg:flex-row
  gap-10
  items-center
  justify-center
  "
>

  {/* USER CARD */}

  <motion.div

    whileHover={{
      y: -8,
      scale: 1.03
    }}

    className="
    w-80
    bg-white
    rounded-3xl
    shadow-xl
    p-10
    text-center
    "
  >

    <div
      className="
      w-24
      h-24
      rounded-full
      bg-blue-100
      mx-auto
      flex
      items-center
      justify-center
      "
    >

      <FaUsers

        size={40}

        className="text-blue-600"

      />

    </div>


    <h2
      className="
      text-4xl
      font-bold
      text-slate-800
      mt-8
      "
    >

      USER

    </h2>


    <p
      className="
      text-slate-500
      mt-6
      "
    >

      Search and view component availability

    </p>


    <button

      onClick={() => navigate("/user/login")}

      className="
      w-full
      mt-10
      bg-blue-600
      hover:bg-blue-700
      text-white
      py-4
      rounded-2xl
      font-semibold
      duration-300
      "

    >

      Enter as User →

    </button>

  </motion.div>



  {/* ADMIN CARD */}

  <motion.div

    whileHover={{
      y: -8,
      scale: 1.03
    }}

    className="
    w-80
    bg-white
    rounded-3xl
    shadow-xl
    p-10
    text-center
    "
  >

    <div
      className="
      w-24
      h-24
      rounded-full
      bg-green-100
      mx-auto
      flex
      items-center
      justify-center
      "
    >

      <FaCog

        size={40}

        className="text-green-600"

      />

    </div>


    <h2
      className="
      text-4xl
      font-bold
      text-slate-800
      mt-8
      "
    >

      ADMIN

    </h2>


    <p
      className="
      text-slate-500
      mt-6
      "
    >

      Manage components, stock and inventory

    </p>


    <button

      onClick={() => navigate("/admin/login")}

      className="
      w-full
      mt-10
      bg-green-600
      hover:bg-green-700
      text-white
      py-4
      rounded-2xl
      font-semibold
      duration-300
      "

    >

      Enter as Admin →

    </button>

  </motion.div>

</div>


{/* Bottom Left Circle */}

<div
  className="
  absolute
  -bottom-56
  -left-56
  w-[500px]
  h-[500px]
  rounded-full
  border
  border-blue-200
  opacity-20
  -z-10
  "
/>

<div
  className="
  absolute
  -bottom-72
  -left-72
  w-[650px]
  h-[650px]
  rounded-full
  border
  border-blue-200
  opacity-20
  -z-10
  "
/>


{/* Bottom Right Circle */}

<div
  className="
  absolute
  -bottom-56
  -right-56
  w-[500px]
  h-[500px]
  rounded-full
  border
  border-blue-200
  opacity-20
  -z-10
  "
/>

<div
  className="
  absolute
  -bottom-72
  -right-72
  w-[650px]
  h-[650px]
  rounded-full
  border
  border-blue-200
  opacity-20
  -z-10
  "
/>

</div>


{/* Footer */}

<div
  className="
  bg-gradient-to-r
  from-[#072A95]
  to-[#0B55FF]
  text-white
  py-5
  flex
  flex-col
  md:flex-row
  items-center
  justify-center
  gap-3
  text-sm
  "
>

  <span>

    © 2026 Innomayi. All rights reserved.

  </span>

  <span className="hidden md:block">

    |

  </span>

  <span>

    <a
  href="https://innomayi.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-gray-300 transition"
>
  🌐 Innomayi
</a>

  </span>

</div>

</div>

);

}

export default Home;


