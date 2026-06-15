import SwissLayout from '../skins/swiss/Layout.astro';
import SwissHomePage from '../skins/swiss/HomePage.astro';
import SwissProjectsIndexPage from '../skins/swiss/ProjectsIndexPage.astro';
import SwissProjectDetailPage from '../skins/swiss/ProjectDetailPage.astro';
import SwissBlogIndexPage from '../skins/swiss/BlogIndexPage.astro';
import SwissPostPage from '../skins/swiss/PostPage.astro';
import SwissNotFoundPage from '../skins/swiss/NotFoundPage.astro';
import SwissProjectCard from '../skins/swiss/ProjectCard.astro';
import SwissPostCard from '../skins/swiss/PostCard.astro';
import SwissExperienceRow from '../skins/swiss/ExperienceRow.astro';
import SwissEducationRow from '../skins/swiss/EducationRow.astro';
import '../skins/swiss/skin.css';
import WesternLayout from '../skins/western/Layout.astro';
import WesternHomePage from '../skins/western/HomePage.astro';
import WesternProjectsIndexPage from '../skins/western/ProjectsIndexPage.astro';
import WesternProjectDetailPage from '../skins/western/ProjectDetailPage.astro';
import WesternBlogIndexPage from '../skins/western/BlogIndexPage.astro';
import WesternPostPage from '../skins/western/PostPage.astro';
import WesternNotFoundPage from '../skins/western/NotFoundPage.astro';
import WesternProjectCard from '../skins/western/ProjectCard.astro';
import WesternPostCard from '../skins/western/PostCard.astro';
import WesternExperienceRow from '../skins/western/ExperienceRow.astro';
import WesternEducationRow from '../skins/western/EducationRow.astro';
import '../skins/western/skin.css';
import ConsoleLayout from '../skins/console/Layout.astro';
import ConsoleHomePage from '../skins/console/HomePage.astro';
import ConsoleProjectsIndexPage from '../skins/console/ProjectsIndexPage.astro';
import ConsoleProjectDetailPage from '../skins/console/ProjectDetailPage.astro';
import ConsoleBlogIndexPage from '../skins/console/BlogIndexPage.astro';
import ConsolePostPage from '../skins/console/PostPage.astro';
import ConsoleNotFoundPage from '../skins/console/NotFoundPage.astro';
import ConsoleProjectCard from '../skins/console/ProjectCard.astro';
import ConsolePostCard from '../skins/console/PostCard.astro';
import ConsoleExperienceRow from '../skins/console/ExperienceRow.astro';
import ConsoleEducationRow from '../skins/console/EducationRow.astro';
import '../skins/console/skin.css';
import { skinList, DEFAULT_SKIN } from './skin-list';

const swiss = {
  Layout: SwissLayout,
  HomePage: SwissHomePage,
  ProjectsIndexPage: SwissProjectsIndexPage,
  ProjectDetailPage: SwissProjectDetailPage,
  BlogIndexPage: SwissBlogIndexPage,
  PostPage: SwissPostPage,
  NotFoundPage: SwissNotFoundPage,
  ProjectCard: SwissProjectCard,
  PostCard: SwissPostCard,
  ExperienceRow: SwissExperienceRow,
  EducationRow: SwissEducationRow,
};

const western = {
  Layout: WesternLayout,
  HomePage: WesternHomePage,
  ProjectsIndexPage: WesternProjectsIndexPage,
  ProjectDetailPage: WesternProjectDetailPage,
  BlogIndexPage: WesternBlogIndexPage,
  PostPage: WesternPostPage,
  NotFoundPage: WesternNotFoundPage,
  ProjectCard: WesternProjectCard,
  PostCard: WesternPostCard,
  ExperienceRow: WesternExperienceRow,
  EducationRow: WesternEducationRow,
};

const consoleSkin = {
  Layout: ConsoleLayout,
  HomePage: ConsoleHomePage,
  ProjectsIndexPage: ConsoleProjectsIndexPage,
  ProjectDetailPage: ConsoleProjectDetailPage,
  BlogIndexPage: ConsoleBlogIndexPage,
  PostPage: ConsolePostPage,
  NotFoundPage: ConsoleNotFoundPage,
  ProjectCard: ConsoleProjectCard,
  PostCard: ConsolePostCard,
  ExperienceRow: ConsoleExperienceRow,
  EducationRow: ConsoleEducationRow,
};

export type SkinComponents = typeof swiss;

export interface SkinDefinition {
  id: string;
  label: string;
  components: SkinComponents;
}

const componentsById: Record<string, SkinComponents> = {
  swiss,
  western,
  console: consoleSkin,
};

export const skins: SkinDefinition[] = skinList.map((meta) => ({
  ...meta,
  components: componentsById[meta.id],
}));

export { DEFAULT_SKIN };
