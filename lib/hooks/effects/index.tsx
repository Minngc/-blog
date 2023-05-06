import { Dispatch, SetStateAction, useEffect } from "react";

type WidthSizeType = "mobile" | "small" | "middle" | "small" | "large";
function useWidthSizeEffect(
  setState: Dispatch<SetStateAction<WidthSizeType | undefined>>,
) {
  useEffect(() => {
    console.log("effect");
    const handleWidthSize: SetStateAction<
      WidthSizeType | undefined
    > = (): WidthSizeType => {
      const width = window.innerWidth;
      if (width <= 590) {
        return "mobile";
      }
      if (width <= 960) {
        return "small";
      }
      if (width <= 1600) {
        return "middle";
      }
      return "large";
    };
    setState(handleWidthSize);
    function handleResize() {
      setState(handleWidthSize);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setState]);
}

function useHeaderNavHiddenEffect(
  setState: Dispatch<SetStateAction<boolean | undefined>>,
) {
  useEffect(() => {
    console.log("effect!");
    handleScroll();
    function handleScroll() {
      if (window.pageYOffset >= 65) {
        setState(true);
      } else {
        setState(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setState]);
}

function useRouterEffect(setState: Dispatch<SetStateAction<string>>) {
  useEffect(() => {
    function handlePopState(e: PopStateEvent) {
      console.log(e.state);
      if (e.state) setState(`/${e.state.url.split("/")[1]}`);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [setState]);
}

export { useHeaderNavHiddenEffect, useWidthSizeEffect, useRouterEffect };
