import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Settings,
  CheckCircle,
  XCircle,
  Save,
  RotateCcw
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  category: string;
  icon: string;
}

const mockPlatforms: Platform[] = [
  {
    id: "zomato",
    name: "Zomato",
    description: "Food delivery and restaurant discovery platform",
    isActive: true,
    category: "Food Delivery",
    icon: "🍕"
  },
  {
    id: "swiggy",
    name: "Swiggy",
    description: "Online food ordering and delivery platform",
    isActive: true,
    category: "Food Delivery",
    icon: "🛵"
  },
  {
    id: "blinkit",
    name: "BlinkIT",
    description: "Instant grocery delivery service",
    isActive: true,
    category: "Grocery",
    icon: "🛒"
  },
  {
    id: "uber-eats",
    name: "Uber Eats",
    description: "Food delivery service by Uber",
    isActive: false,
    category: "Food Delivery",
    icon: "🚗"
  },
  {
    id: "bigbasket",
    name: "BigBasket",
    description: "Online grocery shopping platform",
    isActive: false,
    category: "Grocery",
    icon: "🥬"
  },
  {
    id: "dunzo",
    name: "Dunzo",
    description: "Hyperlocal delivery platform",
    isActive: false,
    category: "Delivery",
    icon: "📦"
  },
  {
    id: "grofers",
    name: "Grofers",
    description: "Online grocery delivery service",
    isActive: false,
    category: "Grocery",
    icon: "🛍️"
  },
  {
    id: "amazon-fresh",
    name: "Amazon Fresh",
    description: "Amazon's grocery delivery service",
    isActive: false,
    category: "Grocery",
    icon: "📦"
  }
];

export default function Configuration() {
  const [platforms, setPlatforms] = useState<Platform[]>(mockPlatforms);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTogglePlatform = (platformId: string) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, isActive: !platform.isActive }
          : platform
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Simulate API call
    setTimeout(() => {
      setHasChanges(false);
      // Show success toast in real app
    }, 1000);
  };

  const handleResetChanges = () => {
    setPlatforms(mockPlatforms);
    setHasChanges(false);
  };

  const activePlatforms = platforms.filter(p => p.isActive).length;
  const totalPlatforms = platforms.length;

  const categories = [...new Set(platforms.map(p => p.category))];

  return (
    <AppLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Site Configuration</h1>
            <p className="text-muted-foreground mt-2">Manage platform integrations and review sources</p>
          </div>
          
          {hasChanges && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleResetChanges}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Platforms</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{activePlatforms}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-positive-muted flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-positive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Platforms</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{totalPlatforms}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-muted flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{categories.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-neutral-muted flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-neutral" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Platforms Grid */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryPlatforms = filteredPlatforms.filter(p => p.category === category);
            
            if (categoryPlatforms.length === 0) return null;
            
            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryPlatforms.map((platform) => (
                    <Card key={platform.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                              {platform.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{platform.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {platform.category}
                              </Badge>
                            </div>
                          </div>
                          <Switch
                            checked={platform.isActive}
                            onCheckedChange={() => handleTogglePlatform(platform.id)}
                          />
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          {platform.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            className={platform.isActive ? "status-positive" : "status-neutral"}
                          >
                            {platform.isActive ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                          
                          <Button variant="ghost" size="sm">
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Configuration Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Important Information</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Changes to platform configurations will take effect immediately after saving</li>
                <li>• Disabling a platform will stop new review imports but won't delete existing data</li>
                <li>• Each platform may require specific API credentials or webhook configurations</li>
                <li>• Contact support if you need to add custom platforms not listed here</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}