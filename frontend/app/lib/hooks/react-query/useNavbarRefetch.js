import { useEffect } from "react";

export function useNavbarRefetch(refetch, refetchInterval) {
    useEffect(() => {
        const timer = setInterval(refetch, refetchInterval)
        return () => {
            clearInterval(timer)
        }
    }, [refetchInterval])
}