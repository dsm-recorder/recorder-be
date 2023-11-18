import { CommentResponse } from '../dto/comment.dto';

export interface CommentPort {

    queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]>;
}

export const CommentPort = Symbol('ICommentPort');