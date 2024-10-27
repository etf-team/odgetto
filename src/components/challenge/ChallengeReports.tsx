import React from 'react';
import { Card, CardContent } from "@/components/ui/card.tsx";
import { CheckCircle, XCircle, CircleDashed, FileText } from "lucide-react";

const ChallengeReports = ({ reports }) => {
    return (
        <div className="space-y-4">
            {reports.map((report) => (
                <Card key={report.id}>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-medium">{report.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(report.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {report.status === 'approved' && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                                {report.status === 'rejected' && (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                )}
                                {report.status === 'pending' && (
                                    <CircleDashed className="h-5 w-5 text-yellow-400" />
                                )}
                                <span className="text-sm capitalize">{report.status}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {report.evidence.map((ev, index) => (
                                <div
                                    key={index}
                                    className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center"
                                >
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ChallengeReports;
