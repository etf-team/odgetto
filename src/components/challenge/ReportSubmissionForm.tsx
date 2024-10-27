import React from 'react';
import { Button } from "@/components/ui/button.tsx";
import { Upload } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

const ReportSubmissionForm = ({ showReportDialog, setShowReportDialog }) => {
    const [reportContent, setReportContent] = React.useState('');
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmitReport = async () => {
        console.log('Submitting report:', { content: reportContent, files });
        setReportContent('');
        setFiles([]);
        setShowReportDialog(false);
    };

    return (
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Отправить отчет</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="report" className="text-sm font-medium">
                            Описание
                        </label>
                        <Textarea
                            id="report"
                            className="w-full min-h-[100px] p-2 border rounded-md"
                            placeholder="Опишите ваши достижения..."
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Подтверждение
                        </label>
                        <div
                            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                                {files.length > 0
                                    ? `Выбрано файлов: ${files.length}`
                                    : 'Перетащите файлы сюда или кликните для выбора'}
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleSubmitReport}>
                        Отправить отчет
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportSubmissionForm;
