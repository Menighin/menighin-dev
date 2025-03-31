export default class FnUtils {
    public static throttleFn<T extends (...args: any[]) => void>(
        fn: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timerFlag: ReturnType<typeof setTimeout> | null = null; // Variable to keep track of the timer

        // Returning a throttled version
        return (...args: Parameters<T>) => {
            if (timerFlag === null) {
                // If there is no timer currently running
                fn(...args);
                timerFlag = setTimeout(() => {
                    // Set a timer to clear the timerFlag after the specified delay
                    timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
                }, delay);
            }
        };
    }
}
