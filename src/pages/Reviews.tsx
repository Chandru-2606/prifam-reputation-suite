import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Calendar,
  MessageSquare
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockReviews = [
  {
    id: 1,
    text: "Amazing food quality and super fast delivery! The paneer butter masala was absolutely delicious. Will definitely order again. The packaging was also excellent and the food was still hot when it arrived.",
    category: "Zomato",
    rating: 5,
    sentiment: "positive",
    suggestedResponse: "Thank you so much for your wonderful feedback! We're thrilled to hear that you enjoyed our paneer butter masala and that the delivery met your expectations. We look forward to serving you again soon!",
    date: "2024-01-20",
    customer: "Rahul Sharma",
    platform: "Zomato"
  },
  {
    id: 2,
    text: "Food was okay but delivery took too long. I ordered at 7 PM and received it at 9:30 PM. The biryani was cold and the raita was missing from my order.",
    category: "Swiggy",
    rating: 2,
    sentiment: "negative",
    suggestedResponse: "We sincerely apologize for the delayed delivery and the missing item in your order. This is not the standard we aim for. We're taking immediate action to improve our delivery times and order accuracy. Please reach out to us directly so we can make this right.",
    date: "2024-01-19",
    customer: "Priya Mehta",
    platform: "Swiggy"
  },
  {
    id: 3,
    text: "Good variety of dishes available. Tried their South Indian combo and it was decent. Service is average but food quality is consistent.",
    category: "Zomato",
    rating: 4,
    sentiment: "neutral",
    suggestedResponse: "Thank you for trying our South Indian combo! We appreciate your feedback about our variety and consistency. We're always working to improve our service and would love to exceed your expectations on your next visit.",
    date: "2024-01-18",
    customer: "Amit Kumar",
    platform: "Zomato"
  },
  {
    id: 4,
    text: "Terrible experience! The food was completely stale and inedible. When I called to complain, the customer service was rude and unhelpful. Will never order again.",
    category: "BlinkIT",
    rating: 1,
    sentiment: "negative",
    suggestedResponse: "We are extremely sorry to hear about your poor experience. This is absolutely unacceptable and we take full responsibility. We would like to refund your order and ensure this never happens again. Please contact our management team directly.",
    date: "2024-01-17",
    customer: "Sneha Patel",
    platform: "BlinkIT"
  },
  {
    id: 5,
    text: "Excellent service and delicious food! The chicken tikka was perfectly cooked and the naan was fresh. Delivery was prompt and the delivery person was courteous.",
    category: "Swiggy",
    rating: 5,
    sentiment: "positive",
    suggestedResponse: "We're delighted to hear about your excellent experience! Our team takes great pride in preparing fresh, quality food and providing prompt, courteous service. Thank you for choosing us and we look forward to serving you again!",
    date: "2024-01-16",
    customer: "Vikash Singh",
    platform: "Swiggy"
  },
];

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

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || review.category === selectedCategory;
    const matchesSentiment = selectedSentiment === "all" || review.sentiment === selectedSentiment;
    
    return matchesSearch && matchesCategory && matchesSentiment;
  });

  return (
    <AppLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
          <p className="text-muted-foreground mt-2">Monitor, analyze, and respond to customer reviews</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews or customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Zomato">Zomato</SelectItem>
                  <SelectItem value="Swiggy">Swiggy</SelectItem>
                  <SelectItem value="BlinkIT">BlinkIT</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sentiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card 
                key={review.id} 
                className={`card-hover cursor-pointer transition-all ${
                  selectedReview?.id === review.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedReview(review)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-muted flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.customer}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{review.platform}</Badge>
                      <SentimentBadge sentiment={review.sentiment} />
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4 line-clamp-3">{review.text}</p>
                  
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} />
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Review Details */}
          <div className="sticky top-6">
            {selectedReview ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Review Details
                    <SentimentBadge sentiment={selectedReview.sentiment} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Customer Information</h4>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedReview.customer}</p>
                      <p><span className="font-medium">Platform:</span> {selectedReview.platform}</p>
                      <p><span className="font-medium">Date:</span> {selectedReview.date}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Rating:</span>
                        <StarRating rating={selectedReview.rating} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Review Text</h4>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-foreground">{selectedReview.text}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">AI Suggested Response</h4>
                    <div className="bg-primary-muted/50 rounded-lg p-4">
                      <p className="text-foreground">{selectedReview.suggestedResponse}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      Use Suggested Response
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Write Custom Response
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Select a review to view details and suggested responses</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}