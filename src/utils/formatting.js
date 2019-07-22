
// Credit to: https://stackoverflow.com/a/37770048/3835750
export function seconds_to_mss(s){return(s-(s%=60))/60+(9<s?':':':0')+s}