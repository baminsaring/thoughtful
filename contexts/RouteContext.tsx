import { useContext, createContext, PropsWithChildren, useState } from "react";

type RouteProps = {
    isEditScreen: boolean;
    setIsEditScreen: ( item: boolean ) => void;
}

const RouteContext = createContext<RouteProps | null>(null);

export default function RouteProvider({ children }: PropsWithChildren) {
    
    const [isEditScreen, setIsEditScreen] = useState<boolean>(false);

    return (
        <RouteContext.Provider
            value={{
                isEditScreen,
                setIsEditScreen
            }}
        >
            {children}
        </RouteContext.Provider>
    )
}

export const useRoute = () => {
    const context = useContext(RouteContext);

    if (!context) throw new Error("useArticle must be used within a RouteProvider")

    return context;
}