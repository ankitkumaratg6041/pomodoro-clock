import React, {useEffect, useState, useRef} from "react";
import BackgroundChanger from "./BackgroundChanger";

function PomodoroClock(){

    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // const [intervalId, setIntervalId] = useState(null);
    const intervalId = useRef(null);

    // refs to store current values of hour, min, and sec
    const hourRef = useRef(hour);
    const minuteRef = useRef(minute);
    const secondRef = useRef(second);

    // update refs whenever state changes
    useEffect(() => {
        hourRef.current = hour;
        minuteRef.current = minute;
        secondRef.current = second;
    }, [hour, minute, second]);

    function handleHourChange(direction){
        if(direction === "increase"){
            setHour((h) => h+1);
        }
        else if(direction === "decrease" && hour > 0){
            setHour((h) => h-1);
        }
    }
    function handleMinuteChange(direction){
        if(direction === "increase"){
            setMinute((m) => {
                if(m+1 === 60){
                    setHour((h) => h+1);
                    return 0;
                }
                else{
                    return m+1;
                }
            });
        }
        else if(direction === "decrease" && minute > 0){
            setMinute((m) => m-1);
        }
    }

    function formatNum(num){
        return (num < 10 ? '0' : "")+num;
    }

    function startTimer(){
        if (isRunning) return; // prevents multiple starts

        setIsRunning(true);
        let id = setInterval(() => {
            if(hourRef.current===0 && minuteRef.current===0 && secondRef.current===0){
                clearInterval(id);
                setIsRunning(false);
                return 0;
            }
            if(secondRef.current > 0) setSecond((s) => s-1);
            else if(minuteRef.current > 0 || hourRef.current > 0){
                if(minuteRef.current === 0 && hourRef.current > 0){
                    setHour((h) => h-1);
                    setMinute(59);
                }else if(minuteRef.current > 0){
                    setMinute((m) => m-1);
                }
                setSecond(59); // resets seconds everytime hour or minute changes
            }
        }, 1000);
    }

    useEffect(() => {
        function handleDocumentClick(){
            startTimer();
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
            clearInterval(intervalId);
        }
    }, [isRunning])

  return (
    <>
        <BackgroundChanger></BackgroundChanger>
        <div className="clock-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="time-display">
            <span>{formatNum(hour)}</span>
            <div className="colon">
            <button className="increase" onClick={() => handleHourChange("increase")}></button>
            <button className="decrease" onClick={() => handleHourChange("decrease")}></button>
            </div>
            <span>{formatNum(minute)}</span>
            <div className="colon">
            <button className="increase" onClick={() => handleMinuteChange("increase")}></button>
            <button className="decrease" onClick={() => handleMinuteChange("decrease")}></button>
            </div>
            <span>{formatNum(second)}</span>
        </div>

        {/* <div className="buttons">
            <button className="start" onClick={startTimer}>Start</button>
        </div> */}
        </div>
    </>
  );
}

export default PomodoroClock;