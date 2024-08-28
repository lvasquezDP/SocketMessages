export interface IUser {
    avatar?:         Avatar;
    img?:         Avatar;
    email:          string;
    emailValidated: boolean;
    id:             string;
    name:           string;
    role:           string[];
}

export interface Avatar {
    Media:      string;
    created_at: Date;
    id:         string;
    owner:      string;
}
