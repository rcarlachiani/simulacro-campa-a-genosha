import React from "react";
import Countdown from "react-countdown";
import Link from "next/link";

const Renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex flex-col mt-4 md:mt-8 xl:mt-8 md:mt-9 xl:mt-9 space-y-4 md:mt-0 md:flex-row md:space-y-0 md:space-x-8">
      <Circle label="DÍAS" value={days} max={365} />
      <Circle label="HORAS" value={hours} max={24} />
      <Circle label="MINUTOS" value={minutes} max={60} />
      <Circle label="SEGUNDOS" value={seconds} max={60} />
    </div>
  );
};

const Circle = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="px-8 py-4 text-center bg-opacity-75 rounded-xl md:px-5 bg-clockBackground">
      <div className="relative">
        <svg
          viewBox="0 0 33.83098862 33.83098862"
          className="items-center w-24 h-24 mx-auto lg:h-32 lg:w-32 xl:h-48 xl:w-48"
        >
          <circle
            className="text-white"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            cx="16.91549431"
            cy="16.91549431"
            r="15.91549431"
          />
          <circle
            className="duration-1000 ease-linear origin-center transform -rotate-90 text-olive"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            fill="none"
            cx="16.91549431"
            cy="16.91549431"
            r="15.91549431"
          />
        </svg>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-4xl font-light md:text-4xl lg:text-4xl xl:text-4xl text-white">
          <h3>{value}</h3>
        </div>
      </div>
      <h1 className="mt-5 text-2xl font-normal text-white">{label}</h1>
    </div>
  );
};

function Count({ date, selectedDate, selectedHour }) {
  const selectedDay = selectedDate
  const selectedSchedule = selectedHour

  return (
    <section
      className="flex items-center flex-col h-full min-h-screen h-full min-h-screen"
    >
      <div id="header" className="flex items-center justify-center flex-row">
        <div className="pt-24 md:pt-16 xl:pt-16">
          <h1 className="font-Montserrat text-center leading-none text-white font-bold text-[32px] md:text-[52px] xl:text-[52px] xxl:text-[52px]">
            Su turno es el día
          </h1>
          <p className="font-normal text-center text-yellow font-bold text-[32px] md:text-[42px] xl:text-[42px] xxl:text-[42px]">
            {selectedDay} a las {selectedSchedule}
          </p>
          <br />
        </div>
      </div>
      <h2 className="font-Montserrat text-center leading-none text-white font-bold text-[25px] md:text-[30px] xl:text-[30px] xxl:text-[30px]">FALTAN:</h2>
      <div className="mt-2">
        <Countdown
          date={date}
          renderer={(props) => {
            return <Renderer {...props} />;
          }}
        />
      </div>
      <h2 className="mt-8 font-Montserrat text-center leading-none text-white font-bold text-[25px] md:text-[30px] xl:text-[30px] xxl:text-[30px]">¡Te esperamos!</h2>
      <Link href='/'>
        <div className="mt-5 flex items-center justify-center">
          <button type="submit" className="text-white bg-lightgreen font-Montserrat font-bold my-3 py-3 px-10 border border-lightgreen rounded-full flex flex-col justify-content align-content-center items-center">
            REGISTRAR OTRO TURNO
          </button>
        </div>
      </Link>
    </section>
  );
}

export default Count;
