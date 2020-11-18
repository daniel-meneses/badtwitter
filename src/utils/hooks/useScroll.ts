import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

export type scrollPosition = {
  y: number;
  total: number;
} | undefined

type Props = {
  ref: any;
  initPos: number;
  onScroll: (position: scrollPosition) => void;
  onExit: (e?: any) => void;
}

export const usePersistedScroll = ({ref, initPos, onScroll, onExit}: Props) => {

  const pos:scrollPosition = useScrollCallback(ref)

  useEffect(() => {
    /*
      On view render, scroll to position if any
    */
    initPos && ref?.scrollTo(0, initPos)
    return () => {
      /*
        On exit callback, pass some method for
        persisting scroll on view exit
      */
      onExit(ref)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { onScroll(pos) }, [pos])
}


const useScrollCallback = (ref: any): scrollPosition => {

  if (typeof document === "undefined") { return }
  const [y, setY] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
      ref?.addEventListener('scroll', scrollThrottle)
    return () => {
      ref?.removeEventListener('scroll', scrollThrottle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPosition = () => {
    let top = ref?.scrollTop || 0
    let total = ref?.scrollHeight
    setY(top)
    setTotal(total)    
  }

  const scrollThrottle = throttle(setPosition, 100)

  return ({y, total})
}

export default useScrollCallback;
