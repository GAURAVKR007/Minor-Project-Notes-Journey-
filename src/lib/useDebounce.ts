import React, { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value);
        },delay)
        return () => {
            clearTimeout(handler);
        }
    },[value,delay])

    return debounceValue;
}