import {  useEffect, useState} from 'react';
import ResizeObserver from 'resize-observer-polyfill';



// Custom Hook observe dom element and return size

 const useResizeObserver = (ref) => {
    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
        const ObserveTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries)=>{ 
            entries.forEach(element => {
                setDimensions(element.contentRect);
            });         
        });
        resizeObserver.observe(ObserveTarget);
        return () => {
            resizeObserver.unobserve(ObserveTarget);
        }
    },[ref]);

    return dimensions;
}

export default useResizeObserver;