import { BaseRepository } from './base.repository';
import type { Database } from '@/lib/database.types';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

export class ProjectRepository extends BaseRepository<'projects'> {
  constructor() {
    super('projects');
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.db.select('*').eq('slug', slug).single();
    if (error) throw error;
    return data as ProjectRow;
  }

  async findFeatured() {
    const { data, error } = await this.db.select('*').eq('featured', true).order('created_at', { ascending: false });
    if (error) throw error;
    return data as ProjectRow[];
  }

  async findByCategory(category: string) {
    const { data, error } = await this.db.select('*').eq('category', category).order('created_at', { ascending: false });
    if (error) throw error;
    return data as ProjectRow[];
  }
}
