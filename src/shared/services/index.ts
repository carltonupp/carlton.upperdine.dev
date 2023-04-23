import { JobService } from "./JobService";
import { SkillService } from "./SkillService";

export interface RecentPost {
  slug: string;
  frontmatter: any;
}

export { JobService, SkillService };
