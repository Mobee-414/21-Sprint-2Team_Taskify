export interface InvitationUser {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: InvitationUser;
  teamId?: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: InvitationUser;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationsResponse {
  cursorId: number | null;
  invitations: Invitation[];
}
