import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type DashboardCardProps = {
  title: string;
  value: string;
  change: number;
  isIncrease: boolean;
};

export default function DashboardCard({
  title,
  value,
  change,
  isIncrease,
}: DashboardCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="py-6 px-4 flex flex-col gap-2">
        <span className="text-gray-500 text-sm">{title}</span>
        <span className="text-2xl font-semibold">{value}</span>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Badge
            variant="outline"
            className={`rounded-full px-2 py-1 font-medium ${
              isIncrease
                ? 'bg-purple-100 text-purple-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {change.toFixed(2)}{' '}
            {isIncrease ? (
              <ArrowUpRight className="ml-1 w-3 h-3" />
            ) : (
              <ArrowDownRight className="ml-1 w-3 h-3" />
            )}
          </Badge>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
