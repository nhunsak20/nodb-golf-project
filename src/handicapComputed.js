const compute = (slope, rating, stroke) => {
    const substract = stroke - rating
    const amountTop = substract * 113

    return (amountTop / slope)
}

export default compute