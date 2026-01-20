import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PortfolioPackage } from '../backend';

export function useGetLatestPortfolioPackage() {
  const { actor, isFetching } = useActor();

  return useQuery<PortfolioPackage | null>({
    queryKey: ['latestPortfolioPackage'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLatestPortfolioPackage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDownloadPortfolioPackage() {
  const { data: packageData, isLoading, error } = useGetLatestPortfolioPackage();

  const downloadPackage = () => {
    if (!packageData) {
      console.error('No package data available');
      return;
    }

    try {
      // Convert Uint8Array to a new Uint8Array with ArrayBuffer to satisfy TypeScript
      const uint8Array = new Uint8Array(packageData.zipData);
      const blob = new Blob([uint8Array], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      
      // Create download link with descriptive filename
      const link = document.createElement('a');
      link.href = url;
      link.download = `hamid-mughal-portfolio-${packageData.version}.zip`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading package:', error);
    }
  };

  return {
    downloadPackage,
    isLoading,
    hasPackage: !!packageData,
    packageVersion: packageData?.version,
    error,
  };
}
