export default class MathUtils {
    public static interpolateCycleFn(duration: number, ...values: number[]): (ts: number) => number {
        // Cycle through the values
        const valueCount = values.length;

        return (ts: number): number => {
            const cyclePosition = (ts % duration) / duration;
            const currentIndex = Math.floor(ts / duration) % valueCount;
            const nextIndex = (currentIndex + 1) % valueCount;
            const value1 = values[currentIndex];
            const value2 = values[nextIndex];

            return value1 + (value2 - value1) * cyclePosition;
        };
    }

    public static interpolateOnceFn(startTime: number, duration: number, ...values: number[]): (ts: number) => number {
        // There are (values.length - 1) segments
        const numSegments = values.length - 1;
        const segmentDuration = duration / numSegments;

        return (ts: number): number => {
            const elapsed = ts - startTime;

            // Before the start time, return the first value.
            if (elapsed <= 0) {
                return values[0];
            }
            // After the duration, return the last value.
            if (elapsed >= duration) {
                return values[values.length - 1];
            }

            // Determine which segment we're in
            const segmentIndex = Math.floor(elapsed / segmentDuration);
            // Calculate the local time within the current segment
            const localTime = elapsed - segmentIndex * segmentDuration;
            // Normalized progress (0 to 1) in this segment
            const t = localTime / segmentDuration;

            // Linear interpolation between the two values
            const startValue = values[segmentIndex];
            const endValue = values[segmentIndex + 1];

            return startValue + (endValue - startValue) * t;
        };
    }

    public static randomizeAround(value: number, maxDecrease: number, maxIncrease: number): number {
        const randomOffsetX = Math.floor(Math.random() * (maxIncrease + maxDecrease)) - maxDecrease;
        const randomizedValue = value + randomOffsetX;

        return randomizedValue;
    }
}
