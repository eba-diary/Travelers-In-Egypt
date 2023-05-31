import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIndex } from "../redux/slice/preSlice";

export default function usePageNumber(index) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIndex(index))
    }, [])
}