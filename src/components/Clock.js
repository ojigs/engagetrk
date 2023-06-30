import React, { useState, useEffect } from "react";

function formatDate(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };

  const day = date.getDate();
  const suffix = getSuffix(day);
  return date
    .toLocaleDateString("en-US", options)
    .replace(/(\d{1,2})/, day + suffix);
}

function getSuffix(day) {
  // const daySuffixes = [
  //   "st",
  //   "nd",
  //   "rd",
  //   "th",
  //   "th",
  //   "th",
  //   "th",
  //   "th",
  //   "th",
  //   "th",
  // ];
  // if (day >= 11 && day <= 13) {
  //   return "th";
  // }
  // return daySuffixes[(day % 10) + 1];
  switch (day) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
}

function Clock() {
  const [date, setDate] = useState(new Date());
  console.log("date: ", date);

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timerID);
  }, []);

  const formattedDate = formatDate(date);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  console.log("formattedDate: ", formattedDate);

  return (
    <section className="clock mb-5">
      <div className="container d-flex gap-4 align-items-end">
        <span className="display-6 text-muted">{formattedDate}</span>
        <span className=" fs-4 fw-bold text-danger">{formattedTime}</span>
      </div>
    </section>
  );
}

export default Clock;
