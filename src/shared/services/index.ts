import { JobService } from "./JobService";
import { PostService } from "./PostService";
import { SkillService } from "./SkillService";

export interface RecentPost {
    slug: string;
    frontmatter: any;
}

export {
    PostService,
    JobService,
    SkillService
}