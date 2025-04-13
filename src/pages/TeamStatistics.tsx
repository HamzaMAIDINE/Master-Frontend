
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the team statistics
const teamPerformanceData = [
  { month: 'Jan', wins: 5, losses: 3 },
  { month: 'Feb', wins: 7, losses: 2 },
  { month: 'Mar', wins: 6, losses: 4 },
  { month: 'Apr', wins: 8, losses: 1 },
  { month: 'May', wins: 9, losses: 2 },
  { month: 'Jun', wins: 7, losses: 3 },
  { month: 'Jul', wins: 10, losses: 0 },
  { month: 'Aug', wins: 8, losses: 2 },
  { month: 'Sep', wins: 6, losses: 4 },
  { month: 'Oct', wins: 7, losses: 3 },
  { month: 'Nov', wins: 9, losses: 1 },
  { month: 'Dec', wins: 8, losses: 2 },
];

const athletePerformanceData = [
  { name: 'Athlete 1', performance: 85, improvement: 10 },
  { name: 'Athlete 2', performance: 92, improvement: 15 },
  { name: 'Athlete 3', performance: 78, improvement: 5 },
  { name: 'Athlete 4', performance: 88, improvement: 12 },
  { name: 'Athlete 5', performance: 95, improvement: 20 },
  { name: 'Athlete 6', performance: 82, improvement: 8 },
  { name: 'Athlete 7', performance: 75, improvement: 3 },
];

const injuryData = [
  { name: 'Concussion', value: 15, color: '#ff6b6b' },
  { name: 'Sprains', value: 25, color: '#feca57' },
  { name: 'Fractures', value: 10, color: '#5f27cd' },
  { name: 'Contusions', value: 35, color: '#1dd1a1' },
  { name: 'Lacerations', value: 15, color: '#54a0ff' },
];

const techniqueProficiencyData = [
  { name: 'Striking', score: 85 },
  { name: 'Grappling', score: 78 },
  { name: 'Clinch Work', score: 92 },
  { name: 'Takedowns', score: 65 },
  { name: 'Ground Game', score: 88 },
  { name: 'Footwork', score: 75 },
  { name: 'Defense', score: 80 },
];

const trainingComplianceData = [
  { name: 'Week 1', actual: 90, target: 100 },
  { name: 'Week 2', actual: 85, target: 100 },
  { name: 'Week 3', actual: 95, target: 100 },
  { name: 'Week 4', actual: 80, target: 100 },
  { name: 'Week 5', actual: 100, target: 100 },
  { name: 'Week 6', actual: 90, target: 100 },
  { name: 'Week 7', actual: 85, target: 100 },
  { name: 'Week 8', actual: 95, target: 100 },
];

const TeamStatistics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Team Statistics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Win Rate</CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Injury Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12%</div>
            <Progress value={12} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Performance</CardTitle>
            <CardDescription>Team average score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85/100</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="athletes">Athletes</TabsTrigger>
          <TabsTrigger value="injuries">Injuries</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wins vs Losses</CardTitle>
                <CardDescription>Monthly performance data</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    wins: {
                      theme: {
                        light: "#2563eb",
                        dark: "#3b82f6",
                      }
                    },
                    losses: {
                      theme: {
                        light: "#e11d48",
                        dark: "#f43f5e",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teamPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="wins" name="Wins" fill="currentColor" className="fill-[hsl(var(--primary))]" />
                      <Bar dataKey="losses" name="Losses" fill="currentColor" className="fill-[hsl(var(--secondary))]" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Win Rate Trend</CardTitle>
                <CardDescription>Performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    winRate: {
                      theme: {
                        light: "#059669",
                        dark: "#10b981",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={teamPerformanceData.map(d => ({
                        month: d.month,
                        winRate: Math.round((d.wins / (d.wins + d.losses)) * 100)
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="winRate" name="Win Rate (%)" stroke="currentColor" fill="currentColor" className="stroke-primary fill-primary/20" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="athletes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Performance</CardTitle>
                <CardDescription>Individual scores</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    performance: {
                      theme: {
                        light: "#0ea5e9",
                        dark: "#38bdf8",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={athletePerformanceData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="performance" name="Performance Score" fill="currentColor" className="fill-[hsl(var(--primary))]" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Over Time</CardTitle>
                <CardDescription>Performance improvement percentage</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    improvement: {
                      theme: {
                        light: "#9333ea",
                        dark: "#a855f7",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={athletePerformanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="improvement" name="Improvement %" fill="currentColor" className="fill-[hsl(var(--accent))]" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Technique Proficiency</CardTitle>
                <CardDescription>Skill breakdown by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    score: {
                      theme: {
                        light: "#0369a1",
                        dark: "#0ea5e9",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} width={500} height={500} data={techniqueProficiencyData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Proficiency" dataKey="score" stroke="currentColor" fill="currentColor" className="stroke-primary fill-primary/20" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="injuries">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Injury Breakdown</CardTitle>
                <CardDescription>By injury type</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={injuryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {injuryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Injury Recovery Status</CardTitle>
                <CardDescription>Current team health overview</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Athlete 2 - Knee Sprain</div>
                      <div className="text-sm text-muted-foreground">75%</div>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Athlete 5 - Shoulder Dislocation</div>
                      <div className="text-sm text-muted-foreground">45%</div>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Athlete 7 - Concussion</div>
                      <div className="text-sm text-muted-foreground">20%</div>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Athlete 3 - Ankle Sprain</div>
                      <div className="text-sm text-muted-foreground">90%</div>
                    </div>
                    <Progress value={90} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Compliance</CardTitle>
                <CardDescription>Actual vs Target training hours</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    actual: {
                      theme: {
                        light: "#0891b2",
                        dark: "#06b6d4",
                      }
                    },
                    target: {
                      theme: {
                        light: "#737373",
                        dark: "#a3a3a3",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trainingComplianceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="actual" name="Actual Hours" stroke="currentColor" className="stroke-primary" strokeWidth={2} />
                      <Line type="monotone" dataKey="target" name="Target Hours" stroke="currentColor" className="stroke-muted-foreground" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Intensity Distribution</CardTitle>
                <CardDescription>Training intensity levels</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Low Intensity', value: 30, color: '#4ade80' },
                        { name: 'Medium Intensity', value: 45, color: '#fb923c' },
                        { name: 'High Intensity', value: 25, color: '#f87171' },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Low Intensity', value: 30, color: '#4ade80' },
                        { name: 'Medium Intensity', value: 45, color: '#fb923c' },
                        { name: 'High Intensity', value: 25, color: '#f87171' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Training Focus Areas</CardTitle>
                <CardDescription>Hours spent on different training aspects</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer 
                  config={{
                    hours: {
                      theme: {
                        light: "#8b5cf6",
                        dark: "#a78bfa",
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Striking', hours: 12 },
                        { name: 'Grappling', hours: 10 },
                        { name: 'Conditioning', hours: 8 },
                        { name: 'Technique', hours: 15 },
                        { name: 'Sparring', hours: 6 },
                        { name: 'Recovery', hours: 4 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="hours" name="Hours" fill="currentColor" className="fill-[hsl(var(--primary))]" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamStatistics;
