import "./main.scss";
import { Calendar } from "./ui/Calendar";

const app = document.getElementById("app");

window.addEventListener("load", () => {
    const calendar = new Calendar(app!, true);

    calendar.addItem({
        content: `
        __Underline__
        **Bold**
        *Italics*
        ***BoldItalics***
        __***BoldItalicUnderline***__
        - List
        `,
        date: "Wed Oct 19 2022 23:11:25 GMT-0700 (Pacific Daylight Time)",
        title: "Post 1",
        id: 0,
    });

    calendar.addItem({
        content: `
        A second post!
        `,
        date: "Wed Oct 19 2022 23:13:25 GMT-0700 (Pacific Daylight Time)",
        title: "Post 2",
        id: 0,
    });

    calendar.postSetup();
});
