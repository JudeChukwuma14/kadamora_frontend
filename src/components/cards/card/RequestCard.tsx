import React, { useState } from 'react';
// no extra types needed

// Reuse icons from Overview module via path alias
import serviceIcon from '@pages/Dashboard/PropertyManagement/Overview/components/icons/services.svg';
import amountIcon from '@pages/Dashboard/PropertyManagement/Overview/components/icons/amount.svg';
import RequestDetailsModal from './RequestDetailsModal';

export type RequestStatus = 'Pending' | 'In-progress' | 'Scheduled' | 'Completed' | 'Assigned';
export type Priority = 'High' | 'Medium' | 'Low';

export interface RequestCardProps {
    id?: number | string;
    title: string;
    description?: string;
    assignee?: string;
    property?: string;
    cost?: string;
    serviceType?: string;
    status?: RequestStatus;
    priority?: Priority;
    assignedTo?: string;
    scheduled?: string;
    percent?: number;
    avatar?: string;
    showActions?: boolean;
}

const statusCls: Record<RequestStatus, string> = {
    'Pending': 'bg-[#FFF9F1] text-[#AC6D00] border-none',
    'In-progress': 'bg-[#F1F9FF] text-[#0A66B2] border-none',
    'Scheduled': 'bg-[#F6F9FF] text-[#0A66B2] border-none',
    'Completed': 'bg-[#F4FDF6] text-[#096B35] border-none',
    'Assigned': 'bg-[#F1F8FF] text-[#0A66B2] border-none',
} as const;

const priorityCls: Record<Priority, string> = {
    High: 'bg-[#FFF0F0] text-[#D02929] border-none',
    Medium: 'bg-[#FFFBEB] text-[#9A6B1A] border-none',
    Low: 'bg-[#F1F9FF] text-[#0C5E9C] border-none',
} as const;

const StatusPill: React.FC<{ status?: RequestStatus }> = ({ status }) => {
    const cls = status ? (statusCls[status] ?? statusCls['Pending']) : statusCls['Pending'];
    return <span className={`px-5 py-2 rounded-full text-[16px] font-medium ${cls}`}>{status}</span>;
};

const PriorityTag: React.FC<{ priority?: Priority }> = ({ priority }) => {
    const cls = priority ? (priorityCls[priority] ?? priorityCls['Medium']) : priorityCls['Medium'];
    return <span className={`px-3 py-1 rounded-md text-[15px] font-medium ${cls}`}>{priority}</span>;
};


const SharedRequestCard: React.FC<RequestCardProps> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <article
                onClick={() => setOpen(true)}
                className="group relative bg-white rounded-2xl border border-[#CCE3FD] p-6 flex flex-col gap-4 md:p-6 sm:p-4 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:border-[#CCE3FD] hover:bg-[#F1F9FF] cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/40"
            >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                        <h4 className="text-[18px] font-medium text-[#002E62] flex items-center gap-3 sm:text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5">
                            {props.title}
                            {props.priority && <PriorityTag priority={props.priority} />}
                        </h4>
                        {props.description && (
                            <p className="mt-2 text-[16px] text-[#71717A] sm:text-[14px] transition-colors duration-200 group-hover:text-[#475467]">
                                {props.description}
                            </p>
                        )}
                    </div>
                    <StatusPill status={props.status} />
                </div>
                <div className="flex flex-col items-start gap-8 mt-2 md:gap-8 sm:gap-4 sm:flex-row sm:items-center flex-wrap">
                    {/* Avatar, Name, Property */}
                    <div className="flex items-center gap-3 min-w-[180px] sm:min-w-0 sm:w-full">
                        <img
                            src={props.avatar ?? 'https://randomuser.me/api/portraits/men/32.jpg'}
                            alt={props.assignee}
                            className="h-14 w-14 rounded-full object-cover border sm:h-12 sm:w-12"
                        />
                        <div>
                            <div className="text-[16px] md:text-[18px] font-medium text-[#0A2D50] truncate">
                                {props.assignee}
                            </div>
                            <div className="text-[14px] md:text-[16px] text-[#6B7280] truncate">{props.property}</div>
                        </div>
                    </div>
                    {/* Service Cost */}
                    <div className="flex items-center gap-3 min-w-[150px] sm:min-w-0 sm:w-full">
                        <span className="flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-[#F3F6F9]">
                            <img src={amountIcon} alt="Service Cost" className="h-12 w-12 sm:h-10 sm:w-10" />
                        </span>
                        <div>
                            <div className="text-[20px] font-medium text-[#0A2D50] sm:text-[16px] transition-transform duration-300 group-hover:-translate-y-0.5 truncate">
                                ₦ {props.cost}
                            </div>
                            <div className="text-[15px] text-[#6B7280] sm:text-[13px] truncate">Service Cost</div>
                        </div>
                    </div>
                    {/* Service Type */}
                    <div className="flex items-center gap-3 min-w-[150px] sm:min-w-0 sm:w-full">
                        <span className="flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-[#F3F6F9]">
                            <img src={serviceIcon} alt="Service Type" className="h-12 w-12 sm:h-10 sm:w-10" />
                        </span>
                        <div>
                            <div className="text-[20px] font-medium text-[#0A2D50] sm:text-[16px] transition-transform duration-300 group-hover:-translate-y-0.5 truncate">
                                {props.serviceType}
                            </div>
                            <div className="text-[15px] text-[#6B7280] sm:text-[13px] truncate">Service Type</div>
                        </div>
                    </div>
                </div>
                {/* assignedTo/scheduled block should be rendered for all statuses except Pending */}
                {props.status !== 'Pending' && (
                    <div className="flex flex-col gap-2 md:gap-8 mt-2  sm:flex-row">
                        {props.assignedTo && (
                            <div className="text-[17px] font-medium text-[#0A2D50] sm:text-[14px]">
                                Assigned to: <span className="font-normal text-[#6B7280]">{props.assignedTo}</span>
                            </div>
                        )}
                        {props.scheduled && (
                            <div className="text-[17px] font-medium text-[#0A2D50] sm:text-[14px]">
                                Scheduled: <span className="font-normal text-[#6B7280]">{props.scheduled}</span>
                            </div>
                        )}
                    </div>
                )}
                {/* Actions */}
                {props.showActions && (
                    <div className="flex gap-2 mt-2">
                        <button className="px-4 py-2 rounded border border-[#CCE3FD] bg-white text-[#0A66B2] font-medium">
                            View Details
                        </button>
                    </div>
                )}
            </article>
            <RequestDetailsModal isOpen={open} onClose={() => setOpen(false)} item={props} />
        </>
    );
};

export default SharedRequestCard;
// RequestStatus and Priority are already exported above using `export type` declarations.
