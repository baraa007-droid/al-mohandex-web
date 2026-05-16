import { getSupabase } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

export abstract class BaseRepository<T extends keyof Database['public']['Tables']> {
  protected supabase: SupabaseClient<Database>;
  protected table: T;

  constructor(table: T) {
    const client = getSupabase();
    if (!client) throw new Error('Supabase not configured');
    this.supabase = client;
    this.table = table;
  }

  protected get db() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.supabase.from(this.table) as any;
  }

  async findById(id: string) {
    const { data, error } = await this.db.select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async findMany(options?: { limit?: number; offset?: number; orderBy?: { column: string; ascending?: boolean } }) {
    let query = this.db.select('*');
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? false });
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, (options.offset + (options.limit ?? 10)) - 1);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async insert(payload: unknown) {
    const { data, error } = await this.db.insert(payload).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, payload: unknown) {
    const { data, error } = await this.db.update(payload).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await this.db.delete().eq('id', id);
    if (error) throw error;
  }
}
