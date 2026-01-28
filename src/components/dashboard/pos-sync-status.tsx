'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function PosSyncStatus() {
  const [hasError, setHasError] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState('just now');

  // Update the 'time ago' string every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(lastSync, { addSuffix: true }));
    }, 10000); // update every 10 seconds

    return () => clearInterval(interval);
  }, [lastSync]);

  // Function to simulate a sync error or successful sync
  const handleToggle = () => {
    // If we are currently in an error state, clicking fixes it and we log a new sync time.
    if (hasError) {
      const newSyncTime = new Date();
      setLastSync(newSyncTime);
      setTimeAgo('just now'); // Immediately update UI
    }
    setHasError(!hasError);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm text-muted-foreground"
            onClick={handleToggle}
          >
            {hasError ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <RefreshCw
                className="h-4 w-4 text-green-500 animate-spin"
                style={{ animationDuration: '2s' }}
              />
            )}
            <span>{hasError ? 'Sync Failed' : `Synced ${timeAgo}`}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasError ? (
            <div>
              <p>Last attempt failed. Click to retry.</p>
              <p className="font-bold">Error: Connection timed out.</p>
            </div>
          ) : (
            <div>
              <p>Last successful sync: {lastSync.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to simulate an error.
              </p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
