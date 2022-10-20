import { formatText } from "../util";
import "./CalendarItem.scss";
import { Component, TemplateChecks, TemplateFillers } from "./Common";

export interface CalendarProps {
    id?: number;

    title?: string;
    content?: string;

    date?: Date | string;
    dateUpdated?: Date | string;
};

export class CalendarItem extends Component {
    public props?: CalendarProps;
    public expanded: boolean;
    public postId: number;

    public constructor(root?: HTMLElement, props?: CalendarProps) {
        super(root);

        this.expanded = false;
        this.postId = Math.floor(Math.random() * 1000);

        this.setProps(props);
    }

    private setProps(props?: CalendarProps) {
        if (!props) {
            this.props = {
                id: 0,
                title: "",
                content: "",
                date: new Date(),
            };

            return;
        }
        
        if (!props.id) props.id = 0;
        if (!props.title) props.title = "";
        if (!props.content) props.content = "";
        if (!props.date) props.date = new Date();

        if (typeof props.date == "string") props.date = new Date(props.date);

        this.props = props;
        return;
    }

    public getTemplate(): string {
        return `
            <div class="item">
                <div class="info">
                    <div class="inner">
                        <p class="title">{{ postTitle }}</p>
                        <p class="date">{{ postedDate }}</p>
                    </div>

                    {?isUpdated?{ <p class="date">(Updated: {{ postUpdated }})</p> ?}}
                </div>

                <div class="expandable" id="post-${this.postId}">
                    <hr class="divider" />

                    <p class="content">
                        {{ postContent }}
                    </p>
                </div>
            </div>
        `;
    }

    public getTemplateFillers(): TemplateFillers {
        return {
            postTitle: this.props?.title || "Unknown Post",
            postedDate: this.props?.date?.toLocaleString("en-US") || new Date().toLocaleString("en-US"),
            postUpdated: this.props?.dateUpdated?.toLocaleString("en-US") || new Date().toLocaleString("en-US"),
            postContent: formatText(this.props?.content?.trim().replaceAll("\n", "<br />") || "*No Content*").trim(),
        };
    }

    public getTemplateChecks(): TemplateChecks {
        return {
            isUpdated: (this.props?.dateUpdated != null && this.props?.dateUpdated != undefined),
            isExpanded: this.expanded,
        };
    }

    public toggleExpand() {
        this.expanded = !this.expanded;
        document.getElementById("post-" + this.postId)?.setAttribute("expanded", this.expanded.toString());
    }

    public setup() {
        document.getElementById("post-" + this.postId + "-container")?.addEventListener("click", this.toggleExpand.bind(this));
    }
};
