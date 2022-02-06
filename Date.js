 const SplitTime = (numberOfHours: number) => {
    const Days = Math.floor(numberOfHours / 24);
    const Remainder = numberOfHours % 24;
    const Hours = Math.floor(Remainder);
    const Minutes = Math.floor(60 * (Remainder - Hours));
    return { Days: Days, Hours: Hours, Minutes: Minutes };
  };

// const startDate = moment(startDate).utc().valueOf(),

  const dateComparision = (startDate: number, endDate: number): string => {
    const cd = new Date();
    
    // For time with milisecond - (1643886416676)
    const ct = moment(cd).utc().unix();
    const currentTime = ct * 1000;
    //end
    
    // For time without miliseconds - 1644166897
    const currentTime = moment(cd).utc().unix().valueOf();

    console.log("Current time", currentTime);
    if (currentTime > startDate) {
      if (currentTime < endDate) {
        const diff = (endDate - currentTime) / 1000;
        const inHours = diff / 3600;
        const dateObj = SplitTime(inHours);
        console.log("inHours", inHours);
        console.log("dateObj", dateObj);
        setPoolStatus("started");
        return `Pool in process ${dateObj.Days} days, ${dateObj.Hours} hours remaining`;
      } else {
        console.log("Pool ended");
        const diff = (currentTime - endDate) / 1000;
        const inHours = diff / 3600;
        const dateObj = SplitTime(inHours);
        setPoolStatus("ended");
        return `Finished in ${dateObj.Days} days, ${dateObj.Hours} hours`;
      }
    } else {
      console.log("Pool not started");
      const diff = startDate - currentTime;
      const inHours = diff / 3600;
      const dateObj = SplitTime(inHours);
      setPoolStatus("coming");
      return `Registration opens in ${dateObj.Days} days, ${dateObj.Hours} hours`;
    }
  };
