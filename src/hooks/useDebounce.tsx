import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 500): { debouncedValue: T; isCleaning: boolean } {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isCleaning, setIsCleaning] = useState(false);

    useEffect(() => {
        setIsCleaning(true);
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            setIsCleaning(false);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return { debouncedValue, isCleaning };
}