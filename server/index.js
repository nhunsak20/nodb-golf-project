const express = require('express'),
    cors = require('cors'),
    golfCtrl = require('./controllers/golfCotroller'),
    app = express(),
    port = 4040

app.use(cors())
app.use(express.json())

app.get('/api/golfhc', golfCtrl.getGolfPlay)
app.post('/api/golfhc', golfCtrl.createGolfPlay)
app.put('/api/golfhc/:id', golfCtrl.updateGolfPlay)
app.delete('/api/golfhc/:id', golfCtrl.removeGolfPlay)

app.listen(port, () => console.log(`Server running on port: ${port}`))