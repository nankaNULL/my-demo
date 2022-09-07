import { useEffect, useState } from "react";

const easing = {
    linear: (n: number) => n,
    elastic: (n: number) =>
        n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
    inExpo: (n: number) => Math.pow(2, 10 * (n - 1))
};

type AnimationType = keyof (typeof easing);
export const useAnimation = (
    animationType: AnimationType,
    duration: number,
    delay: number
) => {
    const elapsed = useAnimationFrame(duration, delay);
    console.log(elapsed);
    return easing[animationType](elapsed);
}

const useAnimationFrame = (
    duration: number,
    delay: number
) => {
    const [elapsed, setElapsed] = useState<number>(0);

    useEffect(() => {
        let animationFrameId: number;
        let start: number;
        let timeDuration: NodeJS.Timeout;

        function loop() {
            animationFrameId = requestAnimationFrame(frameCallback)
        }

        function frameCallback() {
            onCalculate();
            loop();
        }

        function cancelFrame() {
            cancelAnimationFrame(animationFrameId);
            onCalculate();
        }

        function onCalculate() {
            const newElapsed = Math.min(duration, (Date.now() - start) / duration);
            setElapsed(newElapsed);
        }

        function onStart() {
            start = Date.now();
            loop();
            timeDuration = setTimeout(cancelFrame, duration);
        }

        const timeDelay = setTimeout(onStart, delay);

        return () => {
            clearTimeout(timeDelay);
            clearTimeout(timeDuration);
            cancelFrame();
        }
    }, [duration, delay]);

    return elapsed;
}