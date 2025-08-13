import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload as UploadIcon, 
  FileText,
  Star,
  Brain,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const StarRating = ({ rating, onRatingChange }: { 
  rating: number; 
  onRatingChange?: (rating: number) => void 
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onRatingChange?.(star)}
        className={`h-6 w-6 transition-colors ${
          star <= rating ? "text-warning fill-warning" : "text-muted-foreground hover:text-warning"
        }`}
      >
        <Star className="h-full w-full" />
      </button>
    ))}
  </div>
);

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualReview, setManualReview] = useState({
    text: "",
    category: "",
    rating: 0,
    customerName: ""
  });
  const [analysisResult, setAnalysisResult] = useState<{
    sentiment: string;
    confidence: number;
    suggestedResponse: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setUploadedFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!manualReview.text) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock sentiment analysis based on keywords
      let sentiment = "neutral";
      let confidence = 75;
      let suggestedResponse = "";
      
      const text = manualReview.text.toLowerCase();
      
      if (text.includes("excellent") || text.includes("amazing") || text.includes("great") || text.includes("love")) {
        sentiment = "positive";
        confidence = 92;
        suggestedResponse = "Thank you so much for your wonderful feedback! We're thrilled to hear about your positive experience and look forward to serving you again soon.";
      } else if (text.includes("terrible") || text.includes("bad") || text.includes("worst") || text.includes("hate")) {
        sentiment = "negative";
        confidence = 88;
        suggestedResponse = "We sincerely apologize for the poor experience. This is not the standard we strive for, and we would like to make this right. Please reach out to us directly so we can address your concerns.";
      } else {
        confidence = 65;
        suggestedResponse = "Thank you for your feedback! We appreciate you taking the time to share your experience with us and will use it to continue improving our service.";
      }
      
      setAnalysisResult({ sentiment, confidence, suggestedResponse });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "status-positive";
      case "negative": return "status-negative";
      default: return "status-neutral";
    }
  };

  return (
    <AppLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Reviews</h1>
          <p className="text-muted-foreground mt-2">Upload reviews via file or manually enter them for analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Upload Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Bulk Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary-muted/50" 
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Drop your Excel/CSV file here
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
              </div>

              {uploadedFile && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Process File
                  </Button>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">File Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Supported formats: CSV, Excel (.xlsx, .xls)</li>
                  <li>Required columns: Review Text, Rating, Platform</li>
                  <li>Optional columns: Customer Name, Date</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Manual Entry Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Manual Entry & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer-name">Customer Name or Email</Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter customer name or email (optional)"
                    value={manualReview.customerName || ""}
                    onChange={(e) => setManualReview(prev => ({ ...prev, customerName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="review-text">Review Text</Label>
                  <Textarea
                    id="review-text"
                    placeholder="Enter the customer review text here..."
                    rows={4}
                    value={manualReview.text}
                    onChange={(e) => setManualReview(prev => ({ ...prev, text: e.target.value }))}
                    className="resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Platform</Label>
                    <Select 
                      value={manualReview.category} 
                      onValueChange={(value) => setManualReview(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Zomato">Zomato</SelectItem>
                        <SelectItem value="Swiggy">Swiggy</SelectItem>
                        <SelectItem value="BlinkIT">BlinkIT</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2">
                      <StarRating 
                        rating={manualReview.rating} 
                        onRatingChange={(rating) => setManualReview(prev => ({ ...prev, rating }))}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!manualReview.text || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Sentiment
                    </>
                  )}
                </Button>
              </div>

              {analysisResult && (
                <div className="space-y-4 border-t border-border pt-6">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-positive" />
                    Analysis Results
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground mb-1">Sentiment</p>
                      <Badge className={getSentimentColor(analysisResult.sentiment)}>
                        {analysisResult.sentiment}
                      </Badge>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <p className="font-medium text-foreground">{analysisResult.confidence}%</p>
                    </div>
                  </div>

                  <div className="bg-primary-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Suggested Response:</p>
                    <p className="text-foreground">{analysisResult.suggestedResponse}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      Save Review
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Edit Response
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upload History */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { file: "reviews_jan_2024.csv", date: "2024-01-20", count: 125, status: "completed" },
                { file: "swiggy_reviews.xlsx", date: "2024-01-19", count: 89, status: "completed" },
                { file: "zomato_batch_1.csv", date: "2024-01-18", count: 156, status: "processing" },
              ].map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{upload.file}</p>
                      <p className="text-sm text-muted-foreground">{upload.date} • {upload.count} reviews</p>
                    </div>
                  </div>
                  <Badge variant={upload.status === "completed" ? "default" : "secondary"}>
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}