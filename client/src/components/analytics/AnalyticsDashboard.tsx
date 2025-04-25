import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CandidateFunnel } from "./CandidateFunnel";
import { ApplicationSources } from "./ApplicationSources";
import { TimeToHire } from "./TimeToHire";
import { RejectionReasons } from "./RejectionReasons";
import { SkillsDistribution } from "./SkillsDistribution";

export function AnalyticsDashboard() {
  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center">
            <span className="mr-3 text-primary">📊</span> 
            AI Talent Recruitment Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
            Interactive visualizations of our recruitment process for Data, AI/ML and GenAI engineering roles. 
            These insights help optimize our talent acquisition strategy.
          </p>
        </div>
        
        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-lg">
            <TabsTrigger value="pipeline" className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <span className="mr-2">🔄</span> Pipeline Analytics
            </TabsTrigger>
            <TabsTrigger value="sources" className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <span className="mr-2">📈</span> Source Analytics
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <span className="mr-2">🧠</span> Skills Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="grid-col-1">
                <CandidateFunnel />
              </div>
              <div className="grid-col-1">
                <TimeToHire />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid-col-1">
                <RejectionReasons />
              </div>
              <div className="grid-col-1">
                <Card className="shadow-md h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center">
                      <span className="mr-2">💡</span> Pipeline Insights
                    </CardTitle>
                    <CardDescription>
                      Key takeaways and action items
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                        <span className="mr-2">🔍</span> Top Insights
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                        <li>The largest candidate drop-off occurs between screening and interview stages (55% decrease)</li>
                        <li>Data Engineering roles have the fastest time-to-hire at 35 days</li>
                        <li>Technical skills mismatch is the second most common rejection reason</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                        <span className="mr-2">✅</span> Recommended Actions
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                        <li>Improve screening process to better identify qualified candidates before interviews</li>
                        <li>Review job requirements for AI Research roles to reduce time-to-hire</li>
                        <li>Create better technical skills assessment criteria aligned with job requirements</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sources" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid-col-1">
                <ApplicationSources />
              </div>
              <div className="grid-col-1">
                <Card className="shadow-md h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center">
                      <span className="mr-2">📱</span> Source Quality Analysis
                    </CardTitle>
                    <CardDescription>
                      Performance of different recruiting channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 pt-2">
                      <div>
                        <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Quality of Candidates by Source</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🔗</span>
                              <span className="font-medium">LinkedIn</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <span className="ml-2 font-medium">70%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">👥</span>
                              <span className="font-medium">Referrals</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                            </div>
                            <span className="ml-2 font-medium">92%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🏢</span>
                              <span className="font-medium">Company Website</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <span className="ml-2 font-medium">65%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🌐</span>
                              <span className="font-medium">Job Boards</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "58%" }}></div>
                            </div>
                            <span className="ml-2 font-medium">58%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">📅</span>
                              <span className="font-medium">Recruiting Events</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="ml-2 font-medium">75%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Candidate Conversion Rate by Source</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🔗</span>
                              <span className="font-medium">LinkedIn</span>
                            </div>
                            <span className="font-medium text-blue-600">18.3%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">👥</span>
                              <span className="font-medium">Referrals</span>
                            </div>
                            <span className="font-medium text-blue-600">35.7%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🏢</span>
                              <span className="font-medium">Company Website</span>
                            </div>
                            <span className="font-medium text-blue-600">15.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🌐</span>
                              <span className="font-medium">Job Boards</span>
                            </div>
                            <span className="font-medium text-blue-600">9.8%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">📅</span>
                              <span className="font-medium">Recruiting Events</span>
                            </div>
                            <span className="font-medium text-blue-600">22.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid-col-1">
                <SkillsDistribution />
              </div>
              <div className="grid-col-1">
                <Card className="shadow-md h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center">
                      <span className="mr-2">📈</span> Skill Demand Trends
                    </CardTitle>
                    <CardDescription>
                      Emerging skills and market demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 pt-2">
                      <div>
                        <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Fastest Growing Skills</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🤖</span>
                              <span className="font-medium">LLM Fine-tuning</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                            </div>
                            <span className="ml-2 font-medium text-green-600">+95%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">✏️</span>
                              <span className="font-medium">Prompt Engineering</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                            </div>
                            <span className="ml-2 font-medium text-green-600">+88%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🧩</span>
                              <span className="font-medium">Agent Architecture</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                            </div>
                            <span className="ml-2 font-medium text-green-600">+82%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">🔄</span>
                              <span className="font-medium">Vector Databases</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="ml-2 font-medium text-green-600">+75%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">📊</span>
                              <span className="font-medium">RAG Systems</span>
                            </div>
                            <div className="w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <span className="ml-2 font-medium text-green-600">+70%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Skills Gap Analysis</h3>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                            <span className="mr-2">⚠️</span> Talent Shortage Alert
                          </h4>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            We're seeing a significant shortage of candidates with strong experience in:
                          </p>
                          <ul className="list-disc list-inside space-y-1 mt-2 text-slate-700 dark:text-slate-300 text-sm">
                            <li>LLM fine-tuning and optimization</li>
                            <li>Multi-agent system architecture</li>
                            <li>Vector database deployment at scale</li>
                            <li>Hybrid RAG systems implementation</li>
                          </ul>
                          <p className="text-slate-700 dark:text-slate-300 mt-2 text-sm">
                            Consider implementing targeted training programs or adjusting compensation for these high-demand skills.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}