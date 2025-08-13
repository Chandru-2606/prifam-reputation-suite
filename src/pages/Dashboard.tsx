import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewsChart } from "@/components/charts/ReviewsChart";
import { SentimentChart } from "@/components/charts/SentimentChart";
import { PlatformChart } from "@/components/charts/PlatformChart";
import { 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Users,
  ThumbsUp,
  ThumbsDown,
  Minus
} from "lucide-react";

const mockReviewsData = [
  { month: "Jan", reviews: 45 },
  { month: "Feb", reviews: 52 },
  { month: "Mar", reviews: 38 },
  { month: "Apr", reviews: 67 },
  { month: "May", reviews: 71 },
  { month: "Jun", reviews: 83 },
];

const mockSentimentData = [
  { name: "Positive", value: 245, color: "hsl(var(--positive))" },
  { name: "Neutral", value: 123, color: "hsl(var(--neutral))" },
  { name: "Negative", value: 87, color: "hsl(var(--negative))" },
];

const mockPlatformData = [
  { name: "Zomato", value: 156 },
  { name: "Swiggy", value: 143 },
  { name: "BlinkIT", value: 89 },
  { name: "Others", value: 67 },
];

const mockRecentReviews = [
  {
    id: 1,
    text: "Great food and excellent service! Will definitely order again.",
    category: "Zomato",
    rating: 5,
    sentiment: "positive",
    suggestedResponse: "Thank you for your kind words! We're delighted to hear you enjoyed our service.",
    date: "2024-01-15"
  },
  {
    id: 2,
    text: "Food was okay but delivery was very late.",
    category: "Swiggy",
    rating: 2,
    sentiment: "negative",
    suggestedResponse: "We apologize for the delay. We're working to improve our delivery times.",
    date: "2024-01-14"
  },
  {
    id: 3,
    text: "Good variety of options available.",
    category: "BlinkIT",
    rating: 4,
    sentiment: "neutral",
    suggestedResponse: "Thank you for the feedback! We're glad you found our variety appealing.",
    date: "2024-01-13"
  },
];

const StatCard = ({ title, value, icon: Icon, change, changeType }: {
  title: string;
  value: string;
  icon: any;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}) => (
  <Card className="card-hover">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-positive mr-1" />
            <span className={`text-sm font-medium ${
              changeType === "positive" ? "text-positive" : 
              changeType === "negative" ? "text-negative" : "text-neutral"
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary-muted flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const config = {
    positive: { icon: ThumbsUp, className: "status-positive" },
    negative: { icon: ThumbsDown, className: "status-negative" },
    neutral: { icon: Minus, className: "status-neutral" },
  };
  
  const { icon: Icon, className } = config[sentiment as keyof typeof config] || config.neutral;
  
  return (
    <Badge className={`${className} px-2 py-1`}>
      <Icon className="h-3 w-3 mr-1" />
      {sentiment}
    </Badge>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? "fill-warning text-warning" : "text-muted-foreground"
        }`}
      />
    ))}
  </div>
);

export default function Dashboard() {
  return (
    <AppLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your reputation management metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reviews"
            value="455"
            icon={MessageSquare}
            change="+12.5%"
            changeType="positive"
          />
          <StatCard
            title="Average Rating"
            value="4.2"
            icon={Star}
            change="+0.3"
            changeType="positive"
          />
          <StatCard
            title="Response Rate"
            value="89%"
            icon={Users}
            change="+5%"
            changeType="positive"
          />
          <StatCard
            title="Sentiment Score"
            value="73%"
            icon={TrendingUp}
            change="+8%"
            changeType="positive"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Reviews Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsChart data={mockReviewsData} />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentChart data={mockSentimentData} />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformChart data={mockPlatformData} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Reviews Table */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Review Text</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Rating</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Sentiment</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentReviews.map((review) => (
                    <tr key={review.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-4 max-w-sm">
                        <p className="truncate text-foreground">{review.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{review.category}</Badge>
                      </td>
                      <td className="p-4">
                        <StarRating rating={review.rating} />
                      </td>
                      <td className="p-4">
                        <SentimentBadge sentiment={review.sentiment} />
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          View Response
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}