// Formating Date
exports.getSuitableDate = () => {
                
        const date = new Date()

        let hours = date.getHours()
        let minutes = date.getMinutes()
        minutes <= 9 ? minutes = `0${minutes}`: minutes
        let str = ''
        hours >= 12 ? str = 'PM' : str = 'AM'
        hours > 12 ? hours = hours%12: hours
        if (hours === 0) {hours = 12}
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const d = `${day}-${month}-${year} at ${hours}:${minutes}${str}`
        return d
}