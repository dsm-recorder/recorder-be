export class User {

    constructor(githubAccountId: string, profileUrl: string, authority: string, id?: string) {
        this.id = id;
        this.githubAccountId = githubAccountId;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }

    id?: string;
    githubAccountId: string;
    profileUrl: string;
    authority: string;

    updateProfileUrl(newProfileUrl: string) {
        this.profileUrl = newProfileUrl;
    }
}