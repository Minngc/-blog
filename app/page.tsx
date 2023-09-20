"use client";

import Link from "next/link";

const Index = () => {
  return (
    <>
      <button
        onClick={() => {
          document.getElementsByTagName("html")[0].dataset.theme = "white";
        }}
      >
        123
      </button>
      This page is on building.
      <Link href="/home">Click to see the Home page.</Link>
    </>
  );
};

export default Index;
