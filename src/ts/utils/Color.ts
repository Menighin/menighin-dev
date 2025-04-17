export default class Color {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;

    constructor(red: number, green: number, blue: number, alpha = 1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public toRgba(): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    public static fromRgb(red: number, green: number, blue: number, alpha = 1): Color {
        return new Color(red, green, blue, alpha);
    }

    public static fromHex(hex: string): Color {
        const hexValue = parseInt(hex.replace('#', ''), 16);
        return new Color((hexValue >> 16) & 0xff, (hexValue >> 8) & 0xff, hexValue & 0xff);
    }

    public static interpolateFn(duration: number, ...colors: Color[]): (ts: number) => Color {
        // Cycle through our colors.
        const colorCount = colors.length;

        return (ts: number) => {
            const cyclePosition = (ts % duration) / duration;
            const currentIndex = Math.floor(ts / duration) % colorCount;
            const nextIndex = (currentIndex + 1) % colorCount;
            const color1 = colors[currentIndex];
            const color2 = colors[nextIndex];

            const red = color1.red + (color2.red - color1.red) * cyclePosition;
            const green = color1.green + (color2.green - color1.green) * cyclePosition;
            const blue = color1.blue + (color2.blue - color1.blue) * cyclePosition;
            const alpha = color1.alpha + (color2.alpha - color1.alpha) * cyclePosition;
            return new Color(red, green, blue, alpha);
        };
    }
}
