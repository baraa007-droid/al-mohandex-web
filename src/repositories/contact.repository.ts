import { BaseRepository } from './base.repository';
import type { Database } from '@/lib/database.types';

type ContactRow = Database['public']['Tables']['contacts']['Row'];

export class ContactRepository extends BaseRepository<'contacts'> {
  constructor() {
    super('contacts');
  }

  async findByStatus(status: string) {
    const { data, error } = await this.db.select('*').eq('status', status).order('created_at', { ascending: false });
    if (error) throw error;
    return data as ContactRow[];
  }
}
