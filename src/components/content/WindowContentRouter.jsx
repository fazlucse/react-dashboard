import React from 'react';
import DashboardOverview from './DashboardOverview';
import AccountingSummary from './AccountingSummary';
import SupportTicketsSummary from './SupportTicketsSummary';
import GenericWindowContent from './GenericWindowContent';

const WindowContentRouter = ({
                                 window: win,
                                 isMobile,
                                 windows,
                                 onCreateChildWindow
                             }) => {
    const { data, title, id } = win;

    switch (data?.type) {
        case 'dashboard':
            return (
                <DashboardOverview
                    title={title}
                    data={data}
                    isMobile={isMobile}
                    onCreateChildWindow={onCreateChildWindow}
                />
            );

        case 'support':
            return (
                <SupportTicketsSummary
                    title={title}
                    data={data}
                    isMobile={isMobile}
                />
            );

        case 'accounting':
            return (
                <AccountingSummary
                    title={title}
                    data={data}
                    isMobile={isMobile}
                />
            );

        default:
            return (
                <GenericWindowContent
                    title={title}
                    id={id}
                    data={data}
                    isMobile={isMobile}
                    windows={windows}
                    onCreateChildWindow={onCreateChildWindow}
                />
            );
    }
};

export default WindowContentRouter;
