
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
import {
  Upload,
  FileVideo,
  Clock,
  MessageSquare,
  Bookmark,
  Star,
  FileDigit,
  Tags,
  Timer,
  Download,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const VideoSummarization = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summarizationComplete, setSummarizationComplete] = useState(false);
  const [summary, setSummary] = useState<null | {
    text: string;
    keyMoments: Array<{ time: string; description: string; highlight: boolean }>;
    tags: string[];
    duration: string;
    statistics: { [key: string]: number };
  }>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      setSummarizationComplete(false);
      setSummary(null);
      
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
        startSummarization();
      }
    }, 200);
  };

  const startSummarization = () => {
    setIsProcessing(true);
    
    // Simulate summarization (would be an API call in real app)
    setTimeout(() => {
      setIsProcessing(false);
      setSummarizationComplete(true);
      setSummary({
        text: "In this match, Fighter A displayed excellent defensive techniques against Fighter B's aggressive style. The first round started with a cautious approach from both fighters, with Fighter A establishing control through effective jabs and distance management. Fighter B initiated several takedown attempts in the second round, but Fighter A showcased superior takedown defense. The final round saw Fighter A landing a significant right hook at 3:42, stunning Fighter B momentarily. Overall, Fighter A won by unanimous decision with technical striking being the deciding factor.",
        keyMoments: [
          { time: "00:45", description: "First significant exchange", highlight: false },
          { time: "02:18", description: "Fighter B attempts takedown", highlight: false },
          { time: "03:42", description: "Powerful right hook by Fighter A", highlight: true },
          { time: "04:30", description: "Clinch work against the fence", highlight: false },
          { time: "08:12", description: "Submission attempt by Fighter B", highlight: true },
        ],
        tags: ["MMA", "Striking", "Defensive Techniques", "Takedown Defense", "Decision Win"],
        duration: "15:24",
        statistics: {
          strikes: 78,
          takedowns: 2,
          submissions: 1,
          significantStrikes: 32,
        }
      });
      
      toast({
        title: "Summarization complete",
        description: "Video has been successfully summarized.",
      });
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Video Summarization</h1>
        <p className="text-muted-foreground mb-8">
          Upload combat footage to generate AI-powered summaries and key moment detection
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileVideo className="mr-2 h-5 w-5" /> Upload Video
                </CardTitle>
                <CardDescription>
                  Select a video file to summarize
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {file ? (
                    <div>
                      <FileDigit className="h-10 w-10 mx-auto mb-2 text-primary" />
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        No video selected
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        MP4, WebM, or MOV. Max 200MB.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center mt-4">
                  <Label
                    htmlFor="video-summarize"
                    className="cursor-pointer flex items-center justify-center bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {file ? "Change Video" : "Select Video"}
                  </Label>
                  <input
                    id="video-summarize"
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

                {file && !isUploading && !isProcessing && !summarizationComplete && (
                  <Button
                    className="w-full"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Generate Summary"}
                  </Button>
                )}

                {isProcessing && (
                  <div className="w-full text-center">
                    <Button disabled className="w-full">
                      Generating summary...
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>

            {summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tags className="mr-2 h-5 w-5" /> Tags & Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Duration</h3>
                    <div className="flex items-center">
                      <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{summary.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {summary.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/10 text-xs px-2 py-1 rounded-md"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Statistics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(summary.statistics).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-muted p-2 rounded-md text-center"
                        >
                          <div className="text-sm font-medium">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" /> Video Summary
                </CardTitle>
                <CardDescription>
                  AI-generated summary and key moments from your video
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                {summary ? (
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Summary</TabsTrigger>
                      <TabsTrigger value="moments">Key Moments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Duration: {summary.duration}
                          </span>
                        </div>
                        <p className="leading-relaxed text-sm">{summary.text}</p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Export as Text
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="moments" className="pt-4">
                      <div className="space-y-2">
                        {summary.keyMoments.map((moment, index) => (
                          <HoverCard key={index}>
                            <HoverCardTrigger asChild>
                              <div
                                className={`flex items-center p-3 rounded-md ${
                                  moment.highlight
                                    ? "bg-secondary/20"
                                    : "bg-muted"
                                }`}
                              >
                                <div
                                  className={`w-1 h-full mr-3 ${
                                    moment.highlight
                                      ? "bg-secondary"
                                      : "bg-transparent"
                                  }`}
                                ></div>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="font-mono mr-4">
                                      {moment.time}
                                    </div>
                                    <div>{moment.description}</div>
                                  </div>
                                  <div className="flex items-center">
                                    {moment.highlight && (
                                      <Star className="h-4 w-4 text-secondary" />
                                    )}
                                    <button className="ml-2 text-muted-foreground hover:text-foreground">
                                      <Bookmark className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  {moment.description}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Click to jump to this moment in the video
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-2">No summary yet</p>
                    <p className="text-sm text-muted-foreground/70 max-w-md">
                      Upload a video and generate a summary to see AI-powered insights 
                      and identified key moments
                    </p>
                  </div>
                )}
              </CardContent>
              {summary && (
                <CardFooter>
                  <Button className="w-full">
                    Generate Detailed Analysis Report
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

export default VideoSummarization;
