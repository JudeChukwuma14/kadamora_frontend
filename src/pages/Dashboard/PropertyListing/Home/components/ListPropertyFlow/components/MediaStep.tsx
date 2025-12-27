import React, { useMemo, useRef } from 'react';
import { usePropertyListingForm } from '../formContext';

interface Props {
    includeDocs?: boolean;
}

const DOC_OPTIONS: Array<{ label: string; value: string }> = [
    { label: 'Certificate of Occupancy (C of O)', value: 'c_of_o' },
    { label: 'Right of Occupancy (R of O)', value: 'r_of_o' },
    { label: 'Receipt of Purchase / Sale Agreement', value: 'sales_agreement' },
    { label: 'Building Plan Approval', value: 'building_plan_approval' },
    { label: 'Survey Plan', value: 'survey_plan' },
    { label: "Governor's Consent", value: 'governors_consent' },
    { label: 'Offer Letter', value: 'offer_letter' },
    { label: 'Power of Attorney', value: 'power_of_attorney' },
    { label: 'Solicitor Letter', value: 'solicitor_letter' },
    { label: 'Family Receipt', value: 'family_receipt' },
    { label: 'Deed of Conveyance', value: 'deed_of_conveyance' },
];

const MediaStep: React.FC<Props> = ({ includeDocs }) => {
    const { state, setAvailableDocuments, addPhotos, removePhoto, reorderPhotos, setVideo } = usePropertyListingForm();

    const docsSet = useMemo(() => new Set(state.availablePropertyDocuments), [state.availablePropertyDocuments]);

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const videoInputRef = useRef<HTMLInputElement | null>(null);
    const dragPhotoId = useRef<string | null>(null);

    const handleAddPhotos = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        addPhotos(Array.from(files));
    };

    const handleAddVideo = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setVideo(files[0]);
    };

    const handlePhotoDrop = (event: React.DragEvent) => {
        event.preventDefault();
        handleAddPhotos(event.dataTransfer.files);
    };

    const handleVideoDrop = (event: React.DragEvent) => {
        event.preventDefault();
        handleAddVideo(event.dataTransfer.files);
    };

    const handleDragStart = (id: string) => (event: React.DragEvent) => {
        dragPhotoId.current = id;
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (id: string) => (event: React.DragEvent) => {
        event.preventDefault();
        if (dragPhotoId.current && dragPhotoId.current !== id) {
            reorderPhotos(dragPhotoId.current, id);
            dragPhotoId.current = id;
        }
    };

    const openPhotoPicker = () => photoInputRef.current?.click();
    const openVideoPicker = () => videoInputRef.current?.click();

    const toggleDoc = (value: string) => {
        const next = new Set(docsSet);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        setAvailableDocuments(Array.from(next));
    };

    const NoteBox = (
        <div className="rounded-md bg-[#F2F8FF] p-4 leading-relaxed">
            <div className="text-[#004493] text-[18px] font-medium">Note:</div>
            <div className="text-[#52525B]">
                Supported upload formats include PDF, Word, JPEG, JPG, MP4, PNG and PPT files, Each file not exceeding
                2MB.
            </div>
        </div>
    );

    const DocsSection = includeDocs && (
        <div className="space-y-3">
            <p className="text-[18px] font-semibold text-[#002E62]">Upload Property Document</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 text-[#52525B]">
                {DOC_OPTIONS.map(({ label, value }) => {
                    const selected = docsSet.has(value);
                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => toggleDoc(value)}
                            className={`px-4 py-2 rounded-lg text-[14px] font-medium border transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${
                                selected
                                    ? 'bg-[#002E62] text-white border-[#002E62]'
                                    : 'bg-[#F7F7FD] text-[#52525B] border-[#E0DEF7] hover:bg-white focus:bg-white'
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {NoteBox}
            {DocsSection}
            <div className="space-y-3">
                <p className="font-semibold text-[#002E62]">Upload Photos</p>
                <div
                    onClick={openPhotoPicker}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handlePhotoDrop}
                    className="flex flex-wrap gap-4"
                >
                    {state.photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            draggable
                            onDragStart={handleDragStart(photo.id)}
                            onDragOver={handleDragOver(photo.id)}
                            className="relative group h-28 w-44 overflow-hidden rounded-md border border-[#E2E8F0] bg-white cursor-move"
                            title={photo.file.name}
                        >
                            <img src={photo.previewUrl} alt={photo.file.name} className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    removePhoto(photo.id);
                                }}
                                className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white/90 text-[#0A2D50] flex items-center justify-center text-[11px] shadow hover:bg-white"
                                aria-label="Remove photo"
                            >
                                ×
                            </button>
                            {index === 0 && (
                                <span className="absolute left-1 bottom-1 rounded bg-black/50 px-1 py-0.5 text-[13px] text-white">
                                    Thumbnail
                                </span>
                            )}
                        </div>
                    ))}
                    <div className="h-28 w-44 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50">
                        <span className="text-[#52525B] leading-snug px-2">
                            Drag & drop or <span className="text-emerald-600 font-medium">click</span> to upload
                        </span>
                    </div>
                    <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        aria-label="Upload photos"
                        onChange={(event) => handleAddPhotos(event.target.files)}
                    />
                </div>
                <p className="text-[#52525B]">
                    You can rearrange the images by dragging them. The image in the first position will appear as the
                    thumbnail.
                </p>
            </div>

            <div className="space-y-3">
                <p className="font-semibold text-[18px] text-[#002E62]">Upload Video</p>
                <div
                    onClick={openVideoPicker}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleVideoDrop}
                    className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center hover:border-emerald-400 hover:bg-emerald-50"
                >
                    {state.video ? (
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-medium text-[#0A2D50] truncate max-w-50">
                                {state.video.file.name}
                            </span>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setVideo(null);
                                }}
                                className="text-[13px] text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <span className="text-[#475569] leading-snug px-4">Drag & drop or select file to upload</span>
                    )}
                </div>
                <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    aria-label="Upload video"
                    onChange={(event) => handleAddVideo(event.target.files)}
                />
            </div>
        </div>
    );
};

export default MediaStep;
