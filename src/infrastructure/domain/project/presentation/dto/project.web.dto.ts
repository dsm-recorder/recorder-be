export class CreateProjectRequest {
    projectName: string;
    repositoryName: string;
    logoImageUrl: string;
    description: string;
    skills: string[];
}

export class PublishProjectRequest {
    role: string;
    learned: string;
    prRecordIds: string[];
}
INSERT INTO `tbl_project`(`project_id`, `name`, `skills`, `logo_url`, `description`, `github_owner_repository`, `is_published`, `role`, `learned`, `like_count`, `created_at`, `finish_date`, `user_id`)
["d247f50a-29d6-4876-a2c3-d762f65c7ebf","asdf","asdfjkalsdfkj,aslkdfjas,asdlkfj","https://recorder-bucket.s3.ap-northeast-2.amazonaws.com/9.png","EntryDSM/Entry2.0","asdflk;ajsdfl;",false,0,null,"3ff98efb-0eb4-453c-b798-3545f0cd2c76"]