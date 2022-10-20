import { CalendarItem } from "./ui/CalendarItem";

export const sortByDate = (array: CalendarItem[]) => {
    return array.sort((a, b) => {
        return (
            (a.props!.date instanceof Date ? a.props!.date : (a.props!.date ? new Date(a.props!.date) : new Date())).getTime() >
            (b.props!.date instanceof Date ? b.props!.date : (b.props!.date ? new Date(b.props!.date) : new Date())).getTime() ?
            1 : -1
        );
    });
};

export const formatText = (text: string) => {
    const boldItalicRegex = /\*\*\*([^\*\*\*]+)\*\*\*/gm;
    const boldRegex = /\*\*([^\*\*]+)\*\*/gm;
    const italicRegex = /\*([^\*]+)\*/gm;    
    const underlineRegex = /__([^__]+)__/gm;

    text = text.replace(boldItalicRegex, "<b><i>$1</i></b>");
    text = text.replace(boldRegex, "<b>$1</b>");
    text = text.replace(italicRegex, "<i>$1</i>");
    text = text.replace(underlineRegex, "<u>$1</u>");

    return text;
};
