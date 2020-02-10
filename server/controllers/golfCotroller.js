const golfPlays = [];
let id = 0;

module.exports = {
    getGolfPlay: (req, res) => {
        const { course, slope, location } = req.query
        var golfLists = golfPlays
        if(course) {
            console.log(course)
            golfLists = golfPlays.filter(elem => elem.course.toLowerCase().includes(course))
        }
        if(slope) {
            golfLists = golfPlays.filter(elem => elem.slope.color.toLowerCase() === slope)
        }
        if(location) {
            golfLists = golfPlays.filter(elem => elem.course.location.toLowerCase().includes(location))
        }
        
        res.status(200).send(golfLists)
    },
    createGolfPlay: (req, res) => {
        const { course, slope, stroke } = req.body
        golfPlays.push({id, course, slope, stroke})
        id++

        res.status(200).send(golfPlays)
    },
    updateGolfPlay: (req, res) => {
        const { id } = req.params
        const { slope, stroke } = req.body

        const index = golfPlays.findIndex(play => play.id === +id)
        golfPlays[index].stroke = stroke
        golfPlays[index].slope = slope
        
        res.status(200).send(golfPlays)
    },
    removeGolfPlay: (req, res) => {
        const { id } = req.params
        const index = golfPlays.findIndex(play => play.id === +id)

        golfPlays.splice(index, 1)

        res.status(200).send(golfPlays)
    }
}