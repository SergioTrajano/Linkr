import React from "react";
import { TimelineProvider } from "./ TimelineProvider";
import { UserPublishProvider } from "./UserPublishProvider";
import { LoadingProvider } from "./LoadingProvider";
import { UserPageProvider } from "./ UserPageProvider";


export default function AppProvider({ children }) {
    return (
        <LoadingProvider>
                <TimelineProvider>
                    <UserPublishProvider>
                        <UserPageProvider>
                        {children}
                        </UserPageProvider>                    
                    </UserPublishProvider>
                </TimelineProvider>
        </LoadingProvider>
    );
}