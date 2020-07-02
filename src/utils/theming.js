
export function getAvailableThemes() {
    return require('../themes.config')
}

export function formatName(name) {
    let result = name
    // Show as light or dark theme
    const normalized = name.toLowerCase()
    if(isThemeLight(name)){
        result = `Light ${normalized.split("light")[1]}`
    }
    else if(isThemeDark(name)){
        result = `Dark ${normalized.split("dark")[1]}`
    }
    return result  
}

export function isThemeLight(name) {
    return name.toLowerCase().startsWith("light")
}

export function isThemeDark(name) {
    return name.toLowerCase().startsWith("dark")
}

export function getThemeType(name){
    let result = ""
    if(isThemeLight(name)){
        result = "light"
    }
    else if(isThemeDark(name)){
        result = "dark"
    }
    return result   
}

export function changeTheme(theme) {
	// Replace theme in memory
	localStorage.setItem('theme', theme)
	// Load new theme
	loadTheme(theme)
}

export function loadTheme(theme) {
	const file = `${process.env.PUBLIC_URL}/css/${theme}.css`
	// Put stylesheet in the document
    const link = document.createElement('link')
    link.rel = 'stylesheet';
    link.href = file;
    link.dataset.theme = theme;
    document.head.appendChild(link)
}

export function initTheme() {
	const savedTheme = localStorage.getItem('theme') 
	const defaultTheme = "darkOrange"
	loadTheme(savedTheme || defaultTheme)
}