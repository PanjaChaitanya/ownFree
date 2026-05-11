'use client';
import { useState, useEffect } from 'react';

export function useContent(section) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = section ? `/api/content?section=${section}` : '/api/content';
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setData(section ? json.data[section] : json.data.content);
        } else {
          setError(json.error);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [section]);

  return { data, loading, error };
}
