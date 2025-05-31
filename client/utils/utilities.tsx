// import moment from "moment";
import moment from "moment-timezone";

export const formatTime = (createdAt: string) => {
    const now= moment().tz("Asia/Kolkata"); //in IST
    const created = moment(createdAt).tz("Asia/Kolkata");

    //if task was created today -> if date of today
    if (created.isSame(now, 'day')){
        return 'Today';
    }

    // check if created yesterday so Subtracts 1 day from now 
    if (created.isSame(now.clone().subtract(1, "days"), 'day')){
        return 'Yesterday';
    }

    //check if created date is after 6 days ago
    if (created.isAfter(now.clone().subtract(6, 'days'))){
        return created.fromNow();
    }

    //check if item created with in the last 4 weeks
    if(created.isAfter(now.clone().subtract(3, 'weeks'), 'week')){
        return created.fromNow(); 
    }

    //If none matches return date
    return created.format("DD/MM/YYYY")
};