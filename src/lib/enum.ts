export const enum ROLE {
  ADMIN = "admin",
  DEVELOPER = "developer",
}

export const enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export enum PRIORITY {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

export enum ISSUE_STATUS {
  Open = "Open",
  InProgress = "In Progress",
  Resolved = "Resolved",
  Closed = "Closed",
}

const PRIORITY_COLORS: { [key in PRIORITY]: string } = {
  [PRIORITY.Low]: "#8BC34A", // Green
  [PRIORITY.Medium]: "#FFEB3B", // Yellow
  [PRIORITY.High]: "#FF9800", // Orange
  [PRIORITY.Critical]: "#F44336", // Red
};

const STATUS_COLORS: { [key in ISSUE_STATUS]: string } = {
  [ISSUE_STATUS.Open]: "#2196F3", // Blue
  [ISSUE_STATUS.InProgress]: "#FFC107", // Amber
  [ISSUE_STATUS.Resolved]: "#4CAF50", // Green
  [ISSUE_STATUS.Closed]: "#9E9E9E", // Grey
};

export { PRIORITY_COLORS, STATUS_COLORS };
