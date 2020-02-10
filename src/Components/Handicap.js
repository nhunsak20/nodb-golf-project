import React from 'react'
import compute from '../handicapComputed'

import '../Styles/handicap.css'

function Handicap(props) {
    const handicapComputed = () => {
        const totals = []
        let addPlay = 0

        props.playGolfs.map(play => {
            const total = +compute(play.slope.slope, play.slope.rating, play.stroke).toFixed(1)
            totals.push(total)
            return totals
        })

        for(let i = 0; i < totals.length; i++) {
            addPlay += totals[i]
        }

        return Math.ceil(addPlay/totals.length).toFixed(1)
    }

    return (
            <section className='handicap-section'>
                { props.playGolfs.length >= 2 ? (
                    <div className='handicap-content'>
                        <h2>Your Handicap:</h2>
                        <h1 className='handicap-title'>
                            {handicapComputed()}
                        </h1>
                    </div>)
                    :
                    null
                }
            </section>
    )
}

export default Handicap