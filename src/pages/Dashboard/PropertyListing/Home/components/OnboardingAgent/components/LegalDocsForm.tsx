import React, { useCallback, useMemo, useState } from 'react';
import CloseButton from './CloseButton';
import {  useUploadAgentDocumentsMutation, type UploadAgentDocumentsPayload } from '@store/api/propertyAgent.api';
import './legalDocsProgress.css';
import StepProgress from './StepProgress';
import { useUploadFilesMutation } from '@store/api/upload.api';

interface LegalDocsFormProps {
    current: number;
    prev: () => void;
    submit: () => void;
    onClose: () => void;
}

type DocumentCategory = 'governmentId' | 'businessCertificate' | 'proofOfAddress';

interface UploadCategoryDefinition {
    key: DocumentCategory;
    label: string;
    required?: boolean;
    description?: string;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB max per upload
const ALLOWED_TYPES = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/png',
    'image/jpeg',
]);

function quantizeProgress(value: number): number {
    if (!Number.isFinite(value)) return 0;
    const clamped = Math.max(0, Math.min(100, value));
    return Math.round(clamped / 5) * 5;
}

function getProgressFillClass(value: number, animate: boolean): string {
    const base = `progress-fill progress-fill-${quantizeProgress(value)}`;
    return animate ? `${base} progress-fill-uploading` : base;
}

const UploadBox: React.FC<{
    label: string;
    required?: boolean;
    description?: string;
    files: File[];
    error?: string;
    progress?: number[];
    isUploading?: boolean;
    onFilesSelected: (files: FileList | null) => void;
    onRemoveFile: (index: number) => void;
}> = ({
    label,
    required,
    description,
    files,
    error,
    progress = [],
    isUploading = false,
    onFilesSelected,
    onRemoveFile,
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-secondary">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-xs text-[#64748B]">{description}</p>}
        <label
            className={`group cursor-pointer rounded-md border border-dashed ${
                error ? 'border-red-400 bg-red-50/40' : 'border-[#E0DEF7] bg-[#F7F7FD]'
            } hover:border-[#94A3B8] flex flex-col gap-2 p-5 text-[12px] text-[#667085] transition-colors`}
        >
            <input type="file" className="hidden" multiple onChange={(event) => onFilesSelected(event.target.files)} />
            <div className="flex flex-col items-center gap-2">
                <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-[#52525B] group-hover:text-[#1F2937] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                >
                    <path
                        d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2M7 9l5-5 5 5M12 4v12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="font-medium text-center text-[#52525B]">
                    Drag and drop or <span className="text-[#0F3A5E]">select files</span> to upload
                </span>
                <span className="text-xs text-[#94A3B8]">You can select multiple files</span>
            </div>
        </label>
        {files.length > 0 && (
            <ul className="mt-2 space-y-3 rounded-md border border-[#E2E8F0] bg-white p-3 text-xs text-[#1F2937]">
                {files.map((file, index) => {
                    const progressValue = progress[index];
                    const isComplete = typeof progressValue === 'number' && progressValue >= 100;
                    const showProgress = typeof progressValue === 'number' && (isUploading || isComplete);
                    const fillClassName =
                        typeof progressValue === 'number'
                            ? getProgressFillClass(progressValue, isUploading && !isComplete)
                            : '';
                    const displayPercent =
                        typeof progressValue === 'number' ? Math.round(Math.min(100, Math.max(0, progressValue))) : 0;
                    return (
                        <li key={`${file.name}-${index}`} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="truncate font-medium" title={file.name}>
                                    {file.name}
                                </span>
                                {isComplete ? (
                                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A]">
                                        <svg
                                            viewBox="0 0 20 20"
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                d="M16.667 5 8.125 15 3.333 10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Uploaded
                                    </span>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(index)}
                                    className="ml-auto text-[#DC2626] hover:text-[#B91C1C] font-semibold disabled:text-[#E2E8F0] disabled:hover:text-[#E2E8F0] disabled:cursor-not-allowed"
                                    disabled={isUploading}
                                >
                                    Remove
                                </button>
                            </div>
                            {showProgress ? (
                                <div className="flex items-center gap-2">
                                    <div className="progress-track relative h-2 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                                        <div className={fillClassName} aria-hidden="true" />
                                    </div>
                                    <span className="w-12 text-right text-[11px] font-semibold text-[#0F172A]">
                                        {displayPercent}%
                                    </span>
                                </div>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        )}
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
);

const LegalDocsForm: React.FC<LegalDocsFormProps> = ({ current, prev, submit, onClose }) => {
    const categories: UploadCategoryDefinition[] = useMemo(
        () => [
            {
                key: 'governmentId',
                label: 'Government Issued ID / Agent license',
                required: true,
            },
            {
                key: 'businessCertificate',
                label: 'Business certificate',
                description: 'CAC certificate or business registration paperwork.',
            },
            {
                key: 'proofOfAddress',
                label: 'Proof of address or utility bill',
            },
        ],
        [],
    );

    const [filesByCategory, setFilesByCategory] = useState<Record<DocumentCategory, File[]>>({
        governmentId: [],
        businessCertificate: [],
        proofOfAddress: [],
    });
    const [progressByCategory, setProgressByCategory] = useState<Record<DocumentCategory, number[]>>({
        governmentId: [],
        businessCertificate: [],
        proofOfAddress: [],
    });
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<DocumentCategory, string>>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [uploadFiles] = useUploadFilesMutation()
    const [uploadAgentDocuments, { isLoading: isSubmitting }] =
    useUploadAgentDocumentsMutation();


    const validateFiles = useCallback((files: File[]): string | null => {
        if (files.length === 0) return null;
        const invalid = files.find((file) => file.size > MAX_FILE_SIZE || (file.type && !ALLOWED_TYPES.has(file.type)));
        if (!invalid) return null;
        if (invalid.size > MAX_FILE_SIZE) {
            return 'Each file must be 1MB or less.';
        }
        return 'Unsupported file type. Upload PDF, Word, PPT, or image files.';
    }, []);

    const handleFilesSelected = useCallback(
        (category: DocumentCategory, fileList: FileList | null) => {
            if (!fileList) return;
            const newFiles = Array.from(fileList);
            const combined = [...filesByCategory[category], ...newFiles];
            const validation = validateFiles(combined);
            if (validation) {
                setFieldErrors((prev) => ({ ...prev, [category]: validation }));
                return;
            }
            setFilesByCategory((prev) => ({ ...prev, [category]: combined }));
            setProgressByCategory((prev) => ({
                ...prev,
                [category]: [...prev[category], ...newFiles.map(() => 0)],
            }));
            setFieldErrors((prev) => ({ ...prev, [category]: undefined }));
            setSubmitError(null);
        },
        [filesByCategory, validateFiles],
    );

    const handleRemoveFile = useCallback((category: DocumentCategory, index: number) => {
        setFilesByCategory((prev) => {
            const updated = [...prev[category]];
            updated.splice(index, 1);
            return { ...prev, [category]: updated };
        });
        setProgressByCategory((prev) => {
            const updated = [...prev[category]];
            updated.splice(index, 1);
            return { ...prev, [category]: updated };
        });
        setFieldErrors((prev) => ({ ...prev, [category]: undefined }));
        setSubmitError(null);
    }, []);



    const ensureRequiredFiles = useCallback(() => {
        const errors: Partial<Record<DocumentCategory, string>> = {};
        categories.forEach(({ key, required }) => {
            if (required && filesByCategory[key].length === 0) {
                errors[key] = 'Please upload at least one document.';
            }
        });
        setFieldErrors((prev) => ({ ...prev, ...errors }));
        return Object.keys(errors).length === 0;
    }, [categories, filesByCategory]);

        const handleSubmit = useCallback(
            async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setSubmitError(null);
                if (!ensureRequiredFiles()) return;

                try {
                    const uploadResults: Record<DocumentCategory, string[]> = {
                        governmentId: [],
                        businessCertificate: [],
                        proofOfAddress: [],
                    };

                    // Upload all files per category
                    for (const category of Object.keys(filesByCategory) as DocumentCategory[]) {
                        const files = filesByCategory[category];
                        if (!files?.length) continue;

                        // Set initial progress to 0
                        setProgressByCategory((prev) => ({
                            ...prev,
                            [category]: files.map(() => 0),
                        }));

                        const formData = new FormData();
                        files.forEach((file) => {
                            formData.append('files', file);
                        });

                        console.log(`Uploading ${files.length} file(s) for ${category}...`);

                        try {
                            const res = await uploadFiles(formData).unwrap();
                            console.log(`Response for ${category}:`, res);
                            if (res.data?.urls && Array.isArray(res.data.urls)) {
                                uploadResults[category] = res.data.urls;
                                
                                // Verify we got the expected number of URLs
                                if (res.data.urls.length !== files.length) {
                                    console.warn(
                                        `Warning: Uploaded ${files.length} files but received ${res.data.urls.length} URLs for ${category}`
                                    );
                                }
                                
                                setProgressByCategory((prev) => ({
                                    ...prev,
                                    [category]: files.map(() => 100),
                                }));
                                
                                console.log(`Successfully uploaded ${files.length} file(s) for ${category}:`, res.data.urls);
                            } else {
                                throw new Error(
                                    `Upload failed for ${category}: Invalid response format. Expected data.urls array, got ${JSON.stringify(res.data)}`
                                );
                            }
                            
                        } catch (uploadError: any) {
                            console.error(`Upload error for ${category}:`, uploadError);
                            
                            // Extract specific error message
                            const errorMessage = 
                                uploadError?.data?.message ||
                                uploadError?.data?.response?.message ||
                                uploadError?.message ||
                                `Failed to upload ${category} documents`;
                            
                            throw new Error(errorMessage);
                        }
                    }

                    // Validate required documents have URLs
                    if (uploadResults.governmentId.length === 0) {
                        throw new Error('Government ID is required but no upload URLs were received');
                    }

                    // Create payload with arrays of URLs
                    const payload: UploadAgentDocumentsPayload = {
                        governmentId: uploadResults.governmentId,
                    };

                    if (uploadResults.businessCertificate.length > 0) {
                        payload.businessCertificate = uploadResults.businessCertificate;
                    }

                    if (uploadResults.proofOfAddress.length > 0) {
                        payload.proofOfAddress = uploadResults.proofOfAddress;
                    }
                    
                    const agentResponse = await uploadAgentDocuments(payload).unwrap();
                    console.log('Agent documents uploaded successfully:', agentResponse);
                    
                    // Clear all files after successful submission
                    setFilesByCategory({
                        governmentId: [],
                        businessCertificate: [],
                        proofOfAddress: [],
                    });
                    
                    setProgressByCategory({
                        governmentId: [],
                        businessCertificate: [],
                        proofOfAddress: [],
                    });
                    
                    submit();

                } catch (error: any) {
                    console.error('Submission error:', error);
                    
                    setProgressByCategory({
                        governmentId: [],
                        businessCertificate: [],
                        proofOfAddress: [],
                    });
                    
                    const apiMessage = 
                        error?.data?.message ||
                        error?.data?.response?.message ||
                        error?.message ||
                        'Unable to upload documents. Please try again.';
                    
                    setSubmitError(apiMessage);
                    
                }
            },
            [filesByCategory, uploadFiles, ensureRequiredFiles, submit, uploadAgentDocuments],
        );

    return (
        <div className="w-full md:w-300 max-w-[100vw] rounded-xl overflow-hidden flex bg-white shadow-[0_4px_32px_-4px_rgba(15,23,42,0.12)] md:flex-row flex-col md:h-175">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <StepProgress current={current} />
            </div>
            {/* Mobile header */}
            <div className="md:hidden w-full px-6 pt-6 pb-2 flex items-center justify-between">
                <h2 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                    Become an <span className="text-[#16A34A]">Agent/Realtor</span>
                </h2>
                <CloseButton onClick={onClose} />
            </div>
            <div className="flex-1 flex flex-col md:max-h-none max-h-[80vh]">
                {/* Top bar (desktop) */}
                <div className="h-16 md:flex hidden items-center justify-between pl-10 pr-6 border-b border-[#EDF1F5] bg-white/70 backdrop-blur-sm">
                    <h3 className="text-[15px] font-semibold text-[#001731]">Verification And Legal Documents</h3>
                    <CloseButton onClick={onClose} />
                </div>
                {/* Mobile step indicator */}
                <div className="md:hidden flex items-center justify-between px-6 pt-2 pb-2">
                    <h3 className="text-[18px] font-semibold text-[#0F172A]">Verification & Legal Docs</h3>
                    <span className="text-[15px] text-[#64748B] font-medium">{current}/2</span>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="md:px-10 px-6 md:pt-10 pt-2 md:pb-8 pb-4 space-y-8">
                        <div className="bg-[#F2F8FD] border border-[#D6E7F5] rounded-md px-4 py-3 text-[12px] text-[#0F3A5E] leading-relaxed">
                            <strong className="mr-1">Note:</strong> Supported file formats: PDF, Word, PNG, PPT. Each
                            file must not exceed 1MB.
                        </div>
                        <div className="flex flex-col gap-8">
                            {categories.map(({ key, label, required, description }) => (
                                <UploadBox
                                    key={key}
                                    label={label}
                                    required={required}
                                    description={description}
                                    files={filesByCategory[key]}
                                    error={fieldErrors[key]}
                                    progress={progressByCategory[key]}
                                    isUploading={isSubmitting}
                                    onFilesSelected={(fileList) => handleFilesSelected(key, fileList)}
                                    onRemoveFile={(index) => handleRemoveFile(key, index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-white md:px-10 px-3 md:py-5 py-0 pb-2.5 border-t border-[#EDF1F5] flex flex-col md:flex-row md:items-center md:justify-between gap-3 sticky md:static bottom-0 z-10">
                        {submitError && <p className="text-sm text-red-500 font-medium md:mr-auto">{submitError}</p>}
                        <button
                            type="button"
                            onClick={prev}
                            className="text-[#002A54] bg-[#E8F1FA] hover:bg-[#DDE9F5] text-[13px] font-medium rounded-md px-6 py-2"
                            disabled={isSubmitting}
                        >
                            Previous
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#002A54] hover:bg-[#013463] disabled:bg-[#7B8AA0] disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-md px-6 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#013463]/40"
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LegalDocsForm;
