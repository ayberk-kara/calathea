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

export type SkinComponents = typeof swiss;

export interface SkinDefinition {
  id: string;
  label: string;
  components: SkinComponents;
}

const componentsById: Record<string, SkinComponents> = {
  swiss,
};

export const skins: SkinDefinition[] = skinList.map((meta) => ({
  ...meta,
  components: componentsById[meta.id],
}));

export { DEFAULT_SKIN };
