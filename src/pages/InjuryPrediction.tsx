
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

// Types and mock data for the application
type AthleteData = {
  age: number;
  weight: number;
  height: number;
  trainingHoursPerWeek: number;
  previousInjuries: number;
  competitionsPerYear: number;
  riskFactors: Record<string, number>;
  prediction?: {
    risk: number;
    factors: {
      factor: string;
      contribution: number;
    }[];
  };
};

type InjuryRiskData = {
  name: string;
  risk: number;
};

// Mock data for demonstration purposes
const initialAthleteData: AthleteData = {
  age: 25,
  weight: 70,
  height: 175,
  trainingHoursPerWeek: 12,
  previousInjuries: 2,
  competitionsPerYear: 6,
  riskFactors: {
    "Overtraining": 0,
    "Poor Technique": 0,
    "Inadequate Recovery": 0,
    "Nutritional Deficits": 0,
    "Sleep Quality": 0,
    "Stress Levels": 0,
  }
};

// Example injury risk data from previously submitted athletes
const previousRiskData: InjuryRiskData[] = [
  { name: "Athlete A", risk: 25 },
  { name: "Athlete B", risk: 45 },
  { name: "Athlete C", risk: 60 },
  { name: "Athlete D", risk: 30 },
  { name: "Athlete E", risk: 75 },
];

const InjuryPrediction = () => {
  const [athleteData, setAthleteData] = useState<AthleteData>(initialAthleteData);

  const handleInputChange = (field: keyof AthleteData, value: string | number) => {
    if (typeof value === "string") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setAthleteData({ ...athleteData, [field]: numericValue });
      }
    } else {
      setAthleteData({ ...athleteData, [field]: value });
    }
  };

  const handleFactorChange = (factor: string, value: number) => {
    setAthleteData({
      ...athleteData,
      riskFactors: {
        ...athleteData.riskFactors,
        [factor]: value
      }
    });
  };

  const calculateRisk = (): number => {
    // This is a simplified algorithm - in real applications this would be a more complex model
    const baseRisk = 
      (athleteData.age > 30 ? 10 : 5) +
      (athleteData.weight > 80 ? 5 : 0) +
      (athleteData.trainingHoursPerWeek > 20 ? 15 : athleteData.trainingHoursPerWeek > 10 ? 5 : 0) +
      (athleteData.previousInjuries * 10) +
      (athleteData.competitionsPerYear * 2);
    
    // Add in risk factors
    const riskFactorSum = Object.values(athleteData.riskFactors).reduce((sum, value) => sum + value, 0);
    
    // Calculate risk percentage (capped at 100)
    const risk = Math.min(baseRisk + riskFactorSum / Object.keys(athleteData.riskFactors).length * 10, 100);
    
    return Math.round(risk);
  };

  const calculateContributions = (): { factor: string; contribution: number }[] => {
    const result = Object.entries(athleteData.riskFactors).map(([factor, value]) => ({
      factor,
      contribution: value * 2 // Simplified calculation
    }));

    // Add other factors
    result.push({ factor: "Age", contribution: athleteData.age > 30 ? 10 : 5 });
    result.push({ factor: "Weight", contribution: athleteData.weight > 80 ? 5 : 0 });
    result.push({ 
      factor: "Training Volume", 
      contribution: athleteData.trainingHoursPerWeek > 20 ? 15 : athleteData.trainingHoursPerWeek > 10 ? 5 : 0 
    });
    result.push({ factor: "Previous Injuries", contribution: athleteData.previousInjuries * 10 });
    result.push({ factor: "Competition Frequency", contribution: athleteData.competitionsPerYear * 2 });

    // Sort by contribution
    return result.sort((a, b) => b.contribution - a.contribution);
  };

  const predictInjuryRisk = () => {
    // Calculate injury risk prediction
    const risk = calculateRisk();
    const factors = calculateContributions();
    
    // Update athlete data with prediction
    setAthleteData({
      ...athleteData,
      prediction: {
        risk,
        factors
      }
    });

    toast.success("Injury risk prediction completed", {
      description: `Overall risk: ${risk}%`,
    });
  };

  // Prepare data for the contribution chart
  const contributionChartData = athleteData.prediction?.factors.map(item => ({
    name: item.factor,
    value: item.contribution
  })) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Injury Risk Prediction</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Athlete Biometric Data</CardTitle>
            <CardDescription>Enter the athlete's information to predict injury risk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={athleteData.age} 
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  value={athleteData.weight} 
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  value={athleteData.height} 
                  onChange={(e) => handleInputChange('height', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="training">Weekly Training Hours</Label>
                <Input 
                  id="training" 
                  type="number" 
                  value={athleteData.trainingHoursPerWeek} 
                  onChange={(e) => handleInputChange('trainingHoursPerWeek', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="injuries">Previous Injuries</Label>
                <Input 
                  id="injuries" 
                  type="number" 
                  value={athleteData.previousInjuries} 
                  onChange={(e) => handleInputChange('previousInjuries', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitions">Competitions per Year</Label>
                <Input 
                  id="competitions" 
                  type="number" 
                  value={athleteData.competitionsPerYear} 
                  onChange={(e) => handleInputChange('competitionsPerYear', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <h3 className="text-lg font-medium">Risk Factors</h3>
              <p className="text-sm text-muted-foreground">Adjust these factors based on the athlete's current condition</p>
              
              {Object.entries(athleteData.riskFactors).map(([factor, value]) => (
                <div key={factor} className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{factor}</Label>
                    <span className="text-sm text-muted-foreground">{value}/10</span>
                  </div>
                  <Slider
                    defaultValue={[value]}
                    max={10}
                    step={1}
                    onValueChange={(vals) => handleFactorChange(factor, vals[0])}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={predictInjuryRisk}>Predict Injury Risk</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className={`h-[300px] transition-opacity ${athleteData.prediction ? 'opacity-100' : 'opacity-50'}`}>
            <CardHeader>
              <CardTitle>Predicted Injury Risk</CardTitle>
              <CardDescription>Based on the provided biometric data</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              {athleteData.prediction ? (
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">
                    {athleteData.prediction.risk}%
                  </div>
                  <div className="text-sm">
                    {athleteData.prediction.risk < 30 ? (
                      <span className="text-green-500 font-medium">Low Risk</span>
                    ) : athleteData.prediction.risk < 60 ? (
                      <span className="text-amber-500 font-medium">Moderate Risk</span>
                    ) : (
                      <span className="text-red-500 font-medium">High Risk</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Enter athlete data and click "Predict Injury Risk"</p>
                </div>
              )}
            </CardContent>
          </Card>

          {athleteData.prediction && (
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Contribution</CardTitle>
                <CardDescription>Impact of each factor on injury risk</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer 
                  config={{
                    value: {
                      theme: {
                        light: "rgb(238, 64, 86)",
                        dark: "rgb(238, 64, 86)",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart 
                      data={contributionChartData.slice(0, 5)} 
                      layout="vertical"
                      margin={{ top: 10, right: 10, left: 70, bottom: 0 }}
                    >
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        width={60}
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar 
                        dataKey="value" 
                        fill="currentColor"
                        className="fill-primary"
                        barSize={20}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Comparative Risk Levels</CardTitle>
              <CardDescription>Compared to other athletes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer 
                config={{
                  risk: {
                    theme: {
                      light: "rgb(238, 64, 86)",
                      dark: "rgb(238, 64, 86)",
                    }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart 
                    data={previousRiskData} 
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar 
                      dataKey="risk" 
                      fill="currentColor"
                      className="fill-primary"
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InjuryPrediction;
