import { CommentResponse } from '../dto/comment.dto';
import { Comment } from '../comment';

export interface CommentPort {
    queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]>;

    saveComment(comment: Comment): Promise<Comment>;
}

export const CommentPort = Symbol('ICommentPort');
