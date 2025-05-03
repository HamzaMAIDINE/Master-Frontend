
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Video, 
  FileText, 
  BarChart3, 
  Shield, 
  Award, 
  TrendingUp 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="h-12 w-12 text-secondary" />,
      title: "Injury Prediction",
      description: "Predict potential injuries using advanced biometric data analysis",
      path: "/injury-prediction"
    },
    {
      icon: <Video className="h-12 w-12 text-secondary" />,
      title: "Video Analysis",
      description: "Upload and analyze combat footage for technique improvement",
      path: "/video-analysis"
    },
    {
      icon: <FileText className="h-12 w-12 text-secondary" />,
      title: "Video Summarization",
      description: "Get AI-powered summaries of fight videos and key moments",
      path: "/video-summarization"
    },
    /*{
      icon: <BarChart3 className="h-12 w-12 text-secondary" />,
      title: "Team Statistics",
      description: "Track performance metrics for your entire combat team",
      path: "/team-statistics"
    }*/
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with improved design */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-secondary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute inset-0 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent">
                Combat Insight
              </h1>
              <p className="text-xl mb-8 max-w-md text-gray-300">
                Advanced analytics platform for combat sports. Track performance, prevent injuries, and optimize training with data-driven insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/injury-prediction')}
                  className="orange-glow"
                >
                  Predict Injuries
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/video-analysis')}
                  className="bg-transparent border-secondary hover:bg-secondary hover:text-black transition-all duration-300"
                >
                  Analyze Performance
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="relative glass-dark rounded-xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Athletes", value: "124" },
                      { label: "Teams", value: "16" },
                      { label: "Matches", value: "1,482" },
                      { label: "Insights", value: "5,629" }
                    ].map((stat, index) => (
                      <div key={index} className="p-4 bg-black/50 rounded-lg border border-white/5 hover:border-secondary/50 transition-all">
                        <p className="text-secondary/80 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with improved design */}
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-secondary/30 rounded-full blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Platform Features</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Leverage our powerful tools to enhance your combat sports performance</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-8 shadow-md border border-white/5 hover:border-secondary/50 card-hover cursor-pointer"
                onClick={() => navigate(feature.path)}
              >
                <div className="mb-6 p-3 bg-black/40 rounded-full inline-block">{feature.icon}</div>
                <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <Button variant="ghost" className="text-secondary hover:text-secondary/80 hover:bg-secondary/10 p-0 flex items-center">
                  Explore {feature.title} 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with improved design */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Combat Insight?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Our platform offers unique advantages to combat sports professionals</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-secondary" />,
                title: "Injury Prevention",
                description: "Reduce injuries by up to 40% with our predictive analytics system"
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-secondary" />,
                title: "Performance Tracking",
                description: "Track and analyze performance metrics to optimize training programs"
              },
              {
                icon: <Award className="h-10 w-10 text-secondary" />,
                title: "Competitive Edge",
                description: "Gain tactical advantages through detailed opponent analysis"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-8 bg-card rounded-lg border border-white/5 hover:border-secondary/50 card-hover">
                <div className="bg-black p-5 rounded-full mb-6 orange-glow">{benefit.icon}</div>
                <h3 className="text-2xl font-medium mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with improved design */}
      <section className="py-20 bg-gradient-to-r from-black to-black/95 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-secondary/30 rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center z-10 relative">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-secondary/80 bg-clip-text text-transparent">Ready to Transform Your Combat Team?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Start using data-driven insights to improve performance and reduce injuries.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="px-8 py-6 text-lg orange-glow"
            onClick={() => navigate('/injury-prediction')}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
