export const sortNameAZ = (a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}

export const sortNameZA = (a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) return 1
    if (nameA > nameB) return -1
    return 0
}

export const sortRatingBW = (a, b) => {
    return b.rating - a.rating
}

export const sortRatingWB = (a, b) => {
    return a.rating - b.rating
}