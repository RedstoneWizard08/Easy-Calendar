export type TemplateFillers = { [key: string]: string | number };
export type TemplateChecks = { [key: string]: boolean };

export abstract class Component {
    private root: HTMLElement;

    public constructor(root?: HTMLElement) {
        if (root) this.root = root;
        else this.root = document.createElement("div");
    }

    public abstract getTemplate(): string;
    public abstract getTemplateFillers(): TemplateFillers;
    public abstract getTemplateChecks(): TemplateChecks;

    public getRenderedContent(): string {
        let content = this.getTemplate();

        const checks = this.getTemplateChecks();
        const checkKeys = Object.keys(checks);

        for (let i = 0; i < checkKeys.length; i++)
            if (checks[checkKeys[i]] != null && checks[checkKeys[i]] != undefined)
                content = content.replace(
                    new RegExp(`\\{\\?${checkKeys[i]}\\?\\{\\s?([^\\?]+)\\s?\\?\\}\\}`, "gm"),
                    checks[checkKeys[i]] ? "$1" : ""
                );

        const fillers = this.getTemplateFillers();
        const fillerKeys = Object.keys(fillers);

        for (let i = 0; i < fillerKeys.length; i++)
            if (fillers[fillerKeys[i]])
                content = content.replaceAll(
                    `{{ ${fillerKeys[i]} }}`,
                    fillers[fillerKeys[i]].toString()
                );

        return content;
    }

    /**
     * Note: Children MUST call `super.render()`!
     */
    public render() {
        this.root.innerHTML = this.getRenderedContent();
    }

    public getRoot() {
        return this.root;
    }
};
