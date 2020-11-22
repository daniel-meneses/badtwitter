import { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { useLocation } from 'react-router';

type pathnameScroll = {
    [pathname: string]: number;
}

export const usePersistedScroll = () => {

    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) { return }

    const scrollRef: HTMLElement | null = isBrowser && document.getElementById("scrollable");
    const [pathnameScroll, setPathnameScroll] = useState<pathnameScroll>({});
    const { scrollY } = useScrollY();
    const { pathname } = useLocation();

    // Save scroll posiiton to pathname { '/home' : 123 }
    useEffect(() => {
        setPathnameScroll(Object.assign({}, pathnameScroll, { [pathname]: scrollY }))
    }, [scrollY])

    // On url change, scroll to persisted position
    useEffect(() => {
        const pathScrollPos = pathnameScroll[pathname] || 0
        scrollRef?.scrollTo(0, pathScrollPos)
    }, [pathname])

}

export const useScrollY = () => {

    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) { return  { scrollY: null, scrollHeight: null} }

    const scrollRef: HTMLElement | null = isBrowser && document.getElementById("scrollable");
    const [scrollY, setScrollY] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);

    const scrollThrottle = throttle(() => {
        setScrollY(scrollRef?.scrollTop || 0)
        setScrollHeight(scrollRef?.scrollHeight || 0)
    }
    , 150)

    useEffect(() => {
        scrollRef?.addEventListener('scroll', scrollThrottle)
        return () => {
            scrollRef?.removeEventListener('scroll', scrollThrottle)
        }
    }, [])

    return { scrollY, scrollHeight }
}


export const useScrollCallback = (callback: any) => {

    const { scrollY=0, scrollHeight} = useScrollY();
    const scrollPercent = Math.round(((scrollY || 0) / (scrollHeight || 100)) * 100)
    useEffect(() => {
        callback(scrollPercent)
    }, [scrollY])
}