export class User {

    id?: string;
    githubAccountId: string;
    profileUrl: string;
    authority: string;

    constructor(githubAccountId: string, profileUrl: string, authority: string, id?: string) {
        this.id = id;
        this.githubAccountId = githubAccountId;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }

    updateProfileUrl(newProfileUrl: string) {
        this.profileUrl = newProfileUrl;
    }
}