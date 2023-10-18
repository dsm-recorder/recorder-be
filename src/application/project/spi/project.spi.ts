import { Project } from '../project';

export interface ProjectPort {
  saveProject(project: Project): Promise<Project>;
}

export const ProjectPort = Symbol('IProjectPort');
