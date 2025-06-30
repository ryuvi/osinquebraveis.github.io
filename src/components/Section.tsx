import React from "react";
import Home from "../app/sections/Home";
import WeAre from "../app/sections/WeAre";
import Challenge from "../app/sections/Challenge";
import Sponsor from "../app/sections/Sponsor";
import Contact from "../app/sections/Contact";
import Posts from "../app/sections/Posts";
import SponsorsGrid from "../app/sections/SponsorsShown";

const EVEN = 'bg-orange-50/50'
const ODD = 'bg-orange-600/75'

export default function Section() {

  return (
    <>
      <Home id="home" backgroundColor={EVEN} />
      <Posts id="posts" backgroundColor={ODD} />
      <WeAre id="weare" backgroundColor={EVEN} />
      <Challenge id="challenge" backgroundColor={ODD} />
      <SponsorsGrid id="sponsorsgrid" backgroundColor={EVEN} />
      <Contact id="contact" backgroundColor={ODD} />
      <Sponsor id="sponsor" backgroundColor={EVEN} />
    </>
  );
}
