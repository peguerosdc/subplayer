
// Credit to: https://stackoverflow.com/a/37770048/3835750
export function seconds_to_mss(s){
    let display = "0:00"
    if( !isNaN(s) ) {
        display = (s-(s%=60))/60+(9<s?':':':0')+s
    }
    return display
}

// Credit to: https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
export function seconds_to_hhmmss(d){
    let display = "-"
    if( !isNaN(d) ) {
        d = Number(d)
        var days = Math.floor(d / (3600*24) )
        var h = Math.floor(d % (3600*24) / 3600)
        var m = Math.floor(d % 3600 / 60)
        // var s = Math.floor(d % 3600 % 60)

        var dDisplay = days > 0 ? days + (days === 1 ? " day " : " days ") : ""
        var hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : ""
        var mDisplay = m > 0 ? m + (m === 1 ? " mins " : " mins ") : ""
        // var sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : ""
        display = dDisplay + hDisplay + mDisplay 
    }
    return display
}

export const display_starred = (starred) => starred.split("T")[0]