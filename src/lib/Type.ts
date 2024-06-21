import { ROLE } from "./enum";

export type USER = {
  user_id: string;
  first_name: string;
  last_name: string;
  role: string;
};

export type EMPLOYEE = {
  reported_issues: string[];
  assigned_issues: string[];
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: ROLE;
  is_active: Boolean;
  is_deleted: Boolean;
  user_id: string;
};

export type PROJECT = {
  project_id: string;
  project_name: string;
  description: string;
};

export type COMMENT = {
  issue_id: string;
  comment: string;
  comment_id: string;
};

export type ISSUE = {
  project_id: string;
  project_name: string | null;
  issue_type_id: string;
  issue_type: string | null;
  summary: string;
  description: string;
  priority: string;
  status: string;
  reporter_id: string | null;
  assignee_id: string;
  deveoper: string | null;
  comments: Comment[];
  issue_id: string;
  created_at: Date;
  updated_at: Date;
};

export type ISSUE_TYPE = {
  name: string;
  issue_type_id: string;
};

export type ISSUE_PROGRESS = {
  issue_id: string;
  project: PROJECT;
  issue_type: ISSUE_TYPE;
  summary: string;
  description: string;
  priority: string;
  status: string;
  developer: USER;
  created_at: string;
  updated_at: string;
  comments: COMMENT;
};
