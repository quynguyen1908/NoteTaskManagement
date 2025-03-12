export interface Note {
    _id: string;
    title: string;
    content: string;
    createdDate: Date;
    updatedDate: Date;
    deleted: boolean;
    status: string;
}