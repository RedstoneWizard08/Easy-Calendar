export interface WithDate {
    [key: string]: any;
    date: Date | string;
};

export interface ItemMetadata extends WithDate {
    dateUpdated: Date | string;
    title: string;
    content: string;
    id: number;
};

export interface RawItemMetadata extends WithDate {
    date_updated: string;
    title: string;
    content: string;
    id: number;
};
