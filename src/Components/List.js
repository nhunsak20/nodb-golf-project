import React from 'react'

import ListGolf from './ListGolf'

function List(props) {
    const reverseItems = props.playGolfs.reverse()
    const playItems = reverseItems.slice(0,4).map(item => {
        return(
            <ListGolf 
                key={item.id}
                playgolf={item}
                editFn={props.editFn}
                removeFn={props.removeFn}
            />
        )
    })
    
    return (
        <div className='golf-list'>
            {playItems}
        </div>
    )
}

export default List