import "./Calendar.scss";
import { sortByDate } from "../util";
import { CalendarItem, CalendarProps } from "./CalendarItem";
import { Component, TemplateChecks, TemplateFillers } from "./Common";

export class Calendar extends Component {
    public items: CalendarItem[];
    private reverse: boolean;

    public constructor(root?: HTMLElement, reverse?: boolean) {
        super(root);

        this.items = [];
        this.reverse = (reverse == null || reverse == undefined) ? false : reverse;
    }

    public getTemplate(): string {
        return `
            <div class="calendar">
                ${this.items.map((i) => `
                    <div id="post-${i.postId}-container">${i.getRenderedContent()}</div>
                `).join("")}
            </div>
        `;
    }

    public getTemplateFillers(): TemplateFillers {
        return {};
    }
    
    public getTemplateChecks(): TemplateChecks {
        return {};
    }

    public addItem(data: CalendarProps) {
        this.items.push(new CalendarItem(undefined, data));
        this.items = sortByDate(this.items);

        if (this.reverse) this.items = this.items.reverse();
        
        this.render();
    }

    public postSetup() {
        for (const item of this.items)
            item.setup();
    }
};
