import teamTable from '@/data/items/team.json';
import { table } from '../parse';

export const TEAM_PAGE = table(teamTable.TEAM_PAGE);

export const TEAM_MEMBERS = table(teamTable.TEAM_MEMBERS) as readonly {
	id: string;
	name: string;
	role: string;
	image: string;
	imageAlt: string;
	bio: readonly string[];
	/** Present for members with a standalone biography page at /team/[id]. */
	profile?: {
		jobTitle: string;
		email?: string;
		alumniOf?: readonly string[];
		memberOf?: readonly string[];
		knowsAbout?: readonly string[];
	};
}[];

export function teamMemberPath(id: string): string {
	return `/team/${id}`;
}

export function listTeamProfileIds(): string[] {
	return TEAM_MEMBERS.filter((member) => member.profile).map((member) => member.id);
}
