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
}[];
