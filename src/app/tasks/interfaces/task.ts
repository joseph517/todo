export interface Task {
    id: number;
    name_task: string;
    deadline: Date;
    state: boolean;
    users: User[];
}

export interface User {
    name: string;
    age: string;
    skills: string[];
}