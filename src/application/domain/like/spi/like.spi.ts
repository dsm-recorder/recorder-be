import { Like } from '../like';

export interface LikePort {
    saveLike(like: Like): Promise<Like>;

    deleteLike(like: Like): Promise<void>;

    queryLikeByUserIdAndProjectId(userId: string, projectId: string): Promise<Like>;

    existsLikeByProjectIdAndUserId(projectId: string, userId: string): Promise<boolean>;
}

export const LikePort = Symbol('ILikePort');
