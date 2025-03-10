export default interface IExperiment {
    get title(): string;
    get helpHtml(): string;
    render(): void;
}
