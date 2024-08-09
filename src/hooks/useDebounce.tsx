import { useEffect, useState } from "react";




const useDebounce = (value: unknown, delay = 500) => {
        
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(()=>{
            console.log('setting timeout');
            setDebouncedValue(value)
        }, delay);
        return () => {console.log('clear timeout');
         clearTimeout(id)};
    }, [value, delay]);
    
  return  debouncedValue
}

export default useDebounce