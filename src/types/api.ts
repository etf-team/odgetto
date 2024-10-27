export interface UserDTO {
    id: number;
    full_name: string;
    email: string;
    achievements_assignations: AchievementAssignation[];
}

export interface AchievementAssignation {
    id: number;
    challenge_id: number;
    achievement_id: number;
    created_at: string;
}

export interface SpaceDTO {
    id: number;
    name: string;
    members_count: number;
    description: string;
    invitation_token: string;
    achievements: Achievement[];
}

export interface Achievement {
    id: number;
    space_id: number;
    name: string;
}

export interface CreateSpaceDTO {
    name: string;
    description: string;
}

export interface JoinSpaceDTO {
    invitation_token: string;
}

export interface ActiveResults {
    id: number;
    member_id: number;
    submitted_value: number;
    estimation_value: number;
    verification_value: number;
}

export interface ChallengeDTO {
    id: number;
    space_id: number;
    name: string;
    state: 'SCHEDULED' | 'ACTIVE' | 'FINISHED';
    description: string;
    prize: string | null;
    achievement_id: number | null;
    is_verification_required: boolean;
    is_estimation_required: boolean;
    starts_at: string;
    current_progress: number;
}

export interface CreateChallengeDTO {
    name: string;
    prize: string;
    description: string;
    achievement_id: number | null;
    is_verification_required: boolean;
    is_estimation_required: boolean;
    starts_at: string;
    ends_at_const: string;
    ends_at_determination_fn: 'HIGHER_THAN' | 'LESS_THAN' | 'HEAD' | 'TAIL';
    ends_at_determination_argument: number;
    results_aggregation_strategy: 'SUM' | 'AVG' | 'MAX' | 'MIN';
    prize_determination_fn: 'HIGHER_THAN' | 'LESS_THAN' | 'HEAD' | 'TAIL';
    prize_determination_argument: number;
}

export interface ChallengeMemberDTO {
    id: number;
    user: UserDTO;
    challenge_id: number;
    is_referee: boolean;
    is_participant: boolean;
    is_administrator: boolean;
    created_at: string;
}

export interface ChallengeFullDTO extends ChallengeDTO {
    ends_at_const: string | null;
    ends_at_determination_fn: 'HIGHER_THAN' | 'LESS_THAN' | 'HEAD' | 'TAIL';
    ends_at_determination_argument: number;
    results_aggregation_strategy: 'SUM' | 'AVG' | 'MAX' | 'MIN';
    prize_determination_fn: 'HIGHER_THAN' | 'LESS_THAN' | 'HEAD' | 'TAIL';
    prize_determination_argument: number;
    members: ChallengeMemberDTO[];
    active_results: ActiveResults[];
}

export interface ChallengeResultDTO {
    id: number;
    member_id: number;
    submitted_value: number;
    estimation_value: number | null;
    verification_value: number | null;
}

export interface SubmitChallengeResultDTO {
    submitted_value: number;
}

export interface JoinSpaceDTO {
    invitation_token: string;
}
