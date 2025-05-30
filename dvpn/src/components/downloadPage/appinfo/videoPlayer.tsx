

import { useRef} from "react"
import cartoon from "../../../assets/DVPN.mp4"
import "../../../style/components/downloadPage/appinfo/videoPlayer.css"


// const OKCACHE: number = 40;
// const COULDPLAYATIME: number = 3;

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    // const [canPlay, setCanPlay] = useState(false)

    // const listenCacheProgress = () =>{
    //     const video = videoRef.current;
    //     if (!video || video.buffered.length === 0) return;

    //     const bufferedEnd = video.buffered.end(0); 
    //     const duration = video.duration || 1; 
    //     const progress = (bufferedEnd / duration) * 100;

    //     console.log("progress:", progress)

    //     if (progress >= OKCACHE || video.readyState >= COULDPLAYATIME) {
    //         setCanPlay(true);
    //         video.removeEventListener("progress", listenCacheProgress);
    //      }
    // }

    // useEffect(() => {
    //     if(videoRef.current){
    //         videoRef.current.load();
    //         console.log("start listning")
    //     }
    // }, [videoRef])

    // useEffect(() => {
    //     return () => {
    //     if (videoRef.current) {
    //         videoRef.current.removeEventListener("progress", listenCacheProgress);
    //     }
    //     };
    // }, [])


    return(
        <div className="vediocontainer" > 
            <video ref={videoRef} src={cartoon} controls  preload="" className="video"/>
        </div> 
    )
}

export default VideoPlayer