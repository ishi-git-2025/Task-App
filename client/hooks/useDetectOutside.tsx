import React, { useEffect } from "react";

interface DetectOutsideProps {
  ref: React.RefObject<HTMLDivElement>; //reference to the element you want to watch
  callback: () => void; //func run when a click happens outside that element
}

function useDetectOutside({ ref, callback }: DetectOutsideProps) {
  
  useEffect(() => {
    // handler to detect clicks outside the ref
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); //run the callback when clicked outside ref.current
      }
    };

    // add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup func, runs When the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useDetectOutside;