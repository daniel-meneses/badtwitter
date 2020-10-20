import React, { useEffect, useState } from 'react';
import {throttle, debounce} from 'lodash';


export const usePersistedScroll = ({ref, initPos, onScroll, onExit}) => {

  const pos = useScrollCallback(ref)

  useEffect( () => {
    initPos && ref?.scrollTo(0, initPos)
  }, [initPos])

  useEffect(() => {
    return () => onExit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { onScroll(pos) }, [pos])
}


const useScrollCallback = (ref): void => {

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
