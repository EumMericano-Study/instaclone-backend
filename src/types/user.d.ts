import { Upload } from "@src/types";
export declare namespace User {
    interface Item {
        id: number;
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
        password: string;
        bio: string;
        avatar: Upload.FileUpload;
        followers: User.Item[];
        following: User.Item[];
        createdAt: string;
        updatedAt: string;
    }
    interface Token {
        id: number;
    }
}
