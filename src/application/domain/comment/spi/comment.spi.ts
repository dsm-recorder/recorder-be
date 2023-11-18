import { CommentResponse } from '../dto/comment.dto';
import { Comment } from '../comment';

export interface CommentPort {
    queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]>;

    queryProjectComments(projectId: string, userId: string): Promise<CommentResponse[]>;

    queryCommentById(commentId: string): Promise<Comment>;

    saveComment(comment: Comment): Promise<Comment>;

    removeComment(comment: Comment): Promise<void>;
}

export const CommentPort = Symbol('ICommentPort');
