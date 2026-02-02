export interface Member {
  username: string;
  sushiCount: number;
  joinedAt: number;
  lastUpdated: number;
}

export interface Group {
  groupId: string;
  groupCode: string;
  groupName: string;
  createdAt: number;
  createdBy: string;
  memberUsernames: string[];
}
