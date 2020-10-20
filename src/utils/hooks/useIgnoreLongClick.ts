import React, { useState, useEffect } from "react"

type Props = {
  ref: any;//HTMLElement | null;
  action: (e?: MouseEvent) => void;
}

const useIgnoreLongClick = ({ref, action}: Props) => {

  if (!ref) { return }
  const [mouseDownPos, setMouseDownPos] = useState(0);

  useEffect(() => {
    ref.current?.addEventListener("mousedown", setDownPos);
    ref.current?.addEventListener("mouseup", handleClick);
    return () => {
      ref.current?.removeEventListener("mousedown", setDownPos);
      ref.current?.removeEventListener("mouseup", handleClick);
    }
  }, [mouseDownPos])

  const setDownPos = (e: MouseEvent) => {
    setMouseDownPos(e.pageX);
  }

  const handleClick = (e: MouseEvent) => {
    console.log(e);

    e.preventDefault();
    if (mouseDownPos === e.pageX) {
      action()
    }
  }
}

export default useIgnoreLongClick;
