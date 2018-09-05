import React from "react";
import Logo from "./Logo";

const LOGOS = [
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/react.svg"
        alt="react-logo"
        className="logo-svg"
      />
    ),
    title: "React.js"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/redux.svg"
        alt="redux-logo"
        className="logo-svg"
      />
    ),
    title: "Redux.js"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/redux-saga.svg"
        alt="redux-saga-logo"
        className="logo-svg"
      />
    ),
    title: "Redux-saga"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/bootstrap-4.svg"
        alt="Bootstrap-logo"
        className="logo-svg"
      />
    ),
    title: "Bootstrap 4"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/css-3-1.svg"
        alt="CSS-3-logo"
        className="logo-svg"
      />
    ),
    title: "CSS-3"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/html-5.svg"
        alt="HTML-5-logo"
        className="logo-svg"
      />
    ),
    title: "HTML-5"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
        alt="Node.js-logo"
        className="logo-svg"
      />
    ),
    title: "Node.js"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
        alt="Express.js-logo"
        className="logo-svg"
      />
    ),
    title: "Express.js"
  },
  {
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/mongodb.svg"
        alt="mongoDB-logo"
        className="logo-svg"
      />
    ),
    title: "mongoDB"
  }
];

const LogoList = () => {
  let logoList = LOGOS.map((l, i) => (
    <Logo key={i} logo={l.logo} title={l.title} />
  ));

  return <div className="logo-list">{logoList}</div>;
};

export default LogoList;
