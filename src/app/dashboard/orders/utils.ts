export const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
    case 'fully paid':
      return 'default';
    case 'open':
    case 'partial':
      return 'secondary';
    case 'cancelled':
    case 'unpaid':
    case 'refunded':
      return 'destructive';
    case 'draft':
      return 'outline';
    default:
      return 'outline';
  }
};
