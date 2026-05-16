import { useState, useEffect } from 'react';
import { ProjectRepository } from '@/repositories/project.repository';
import type { Database } from '@/lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export function useProjects(options?: { limit?: number; category?: string }) {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const repo = new ProjectRepository();

    const fetchProjects = async () => {
      try {
        setLoading(true);
        let result: Project[];
        if (options?.category) {
          result = await repo.findByCategory(options.category);
        } else {
          result = await repo.findMany({ limit: options?.limit });
        }
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();
    return () => { cancelled = true; };
  }, [options?.limit, options?.category]);

  return { data, loading, error };
}
