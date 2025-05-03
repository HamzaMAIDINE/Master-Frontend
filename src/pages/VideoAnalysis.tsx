
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Film,
  PlayCircle,
  PauseCircle,
  TrendingUp,
  Timer,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const VideoAnalysis = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | {
    techniqueScore: number;
    speed: number;
    power: number;
    balance: number;
    strengths: string[];
    improvements: string[];
  }>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (
      selectedFile &&
      (selectedFile.type === "video/mp4" ||
        selectedFile.type === "video/webm" ||
        selectedFile.type === "video/quicktime")
    ) {
      setFile(selectedFile);
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Reset states
      setUploadProgress(0);
      setAnalysisComplete(false);
      setAnalysisResults(null);
      
      toast({
        title: "Video selected",
        description: `${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)`,
      });
    } else if (selectedFile) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please select a valid video file (MP4, WebM, or MOV).",
      });
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        startAnalysis();
      }
    }, 200);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis (would be an API call in real app)
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisResults({
        techniqueScore: 78,
        speed: 82,
        power: 75,
        balance: 68,
        strengths: [
          "Excellent jab technique",
          "Good footwork and mobility",
          "Effective defensive stance",
        ],
        improvements: [
          "Balance during counterattacks",
          "Head movement could be improved",
          "More power in left hook",
        ],
      });
      
      toast({
        title: "Analysis complete",
        description: "Video has been successfully analyzed.",
      });
    }, 3000);
  };

  const togglePlay = () => {
    const videoElement = document.getElementById("previewVideo") as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Video Analysis</h1>
        <p className="text-muted-foreground mb-8">
          Upload combat footage for detailed technique analysis and feedback
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload Combat Video</CardTitle>
                <CardDescription>
                  Select a video file of your combat performance for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4">
                    <video
                      id="previewVideo"
                      src={previewUrl}
                      className="w-full h-full object-contain"
                      onEnded={() => setIsPlaying(false)}
                    ></video>
                    <button
                      onClick={togglePlay}
                      className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90"
                    >
                      {isPlaying ? (
                        <PauseCircle className="h-8 w-8" />
                      ) : (
                        <PlayCircle className="h-8 w-8" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                    <Film className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">
                      No video selected
                    </p>
                    <p className="text-sm text-muted-foreground/70 mb-4">
                      MP4, WebM, or MOV. Max 200MB.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center mt-4">
                  <Label
                    htmlFor="video-upload"
                    className="cursor-pointer flex items-center justify-center bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Video
                  </Label>
                  <input
                    id="video-upload"
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {isUploading && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                {file && !isUploading && !isAnalyzing && !analysisComplete && (
                  <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Start Analysis"}
                  </Button>
                )}

                {isAnalyzing && (
                  <div className="w-full text-center">
                    <Button disabled className="w-full">
                      Analyzing video...
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" /> Analysis Results
                </CardTitle>
                <CardDescription>
                  Technique breakdown and improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResults ? (
                  <Tabs defaultValue="scores" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="scores">Scores</TabsTrigger>
                      <TabsTrigger value="feedback">Feedback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="scores" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Technique</span>
                            <span className="text-sm font-medium">
                              {analysisResults.techniqueScore}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResults.techniqueScore}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Speed</span>
                            <span className="text-sm font-medium">
                              {analysisResults.speed}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResults.speed}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Power</span>
                            <span className="text-sm font-medium">
                              {analysisResults.power}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResults.power}
                            className="h-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Balance</span>
                            <span className="text-sm font-medium">
                              {analysisResults.balance}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResults.balance}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="feedback" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium flex items-center mb-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                            Strengths
                          </h3>
                          <ul className="space-y-1">
                            {analysisResults.strengths.map((strength, index) => (
                              <li key={index} className="text-sm">
                                • {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium flex items-center mb-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                            Areas for Improvement
                          </h3>
                          <ul className="space-y-1">
                            {analysisResults.improvements.map(
                              (improvement, index) => (
                                <li key={index} className="text-sm">
                                  • {improvement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <BarChart2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-2">No data yet</p>
                    <p className="text-sm text-muted-foreground/70">
                      Upload and analyze a video to see results
                    </p>
                  </div>
                )}
              </CardContent>
              {analysisComplete && (
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View Detailed Report
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;
