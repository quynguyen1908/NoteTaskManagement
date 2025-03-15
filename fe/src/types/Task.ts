export interface Task {
    description: string;
    _id: string;
    title: string;
    content: string;
    place: string;
    beginDate: string;
    endDate: string;
    createdDate: Date;
    updatedDate: Date;
    deleted: boolean;
    status: string;
}       