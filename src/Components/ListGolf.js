import React, { Component } from 'react'

import '../Styles/listGolf.css'

class ListGolf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            strokeInput: 0,
            slopeSelect: ''
        }

        this.handleStroke = this.handleStroke.bind(this)
        this.submitSave = this.submitSave.bind(this)
    }

    handleStroke(stroke) {
        this.setState({ strokeInput: +stroke})
    }

    handleChangeSlope(slope) {
        const index = this.props.playgolf.course.slopes.men.findIndex(e => e.color === slope)
        const slopeObj = this.props.playgolf.course.slopes.men[index]
        this.setState({
            slopeSelect: slopeObj
        })
    }

    submitSave() {
        this.checkEditing()
        this.props.editFn(this.props.playgolf.id, this.state.strokeInput || this.props.playgolf.stroke, this.state.slopeSelect || this.props.playgolf.slope)
    }

    checkEditing = () => {

        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    render() {
        const color = this.props.playgolf.slope.color.toLowerCase()
        const textColor = color !== 'white' ? 'white' : 'black'
        const selected = this.state.slopeSelect.color || this.props.playgolf.slope.color

        const slope = this.props.playgolf.course.slopes.men.map(slope => {
            return (
                <option key={slope.color} value={slope.color}>
                    {slope.color}
                </option>
            )
        })
        
        return (
            <section className='golf-list-item'>
                <div className='golf-item-box'>
                    <div className='golf-item'>
                        <button className='edit-button' onClick={this.checkEditing}>Edit</button>
                        <div className='golf-item-head'>
                            <h3 className='course-title'>{this.props.playgolf.course.course}</h3>
                            <p className='location'>{this.props.playgolf.course.location}</p>
                        </div>
                        <div className='golf-item-content'>
                            
                            { this.state.isEditing ? 
                                <div className='edit-box'>
                                    <select id='edit-select-slope' className='edit-select-slope' value={selected} onChange={e => this.handleChangeSlope(e.target.value)}>
                                        {slope}
                                    </select>
                                    <input className='edit-input-stroke' type='number' placeholder={this.props.playgolf.stroke} onChange={e => this.handleStroke(e.target.value)}/> 
                                </div>
                                :
                                <div className='edit-show-box'>
                                    <p className='slope-color'><span id='slope-color' style={{backgroundColor: color, color: textColor}}>{this.props.playgolf.slope.color}</span></p>
                                    <p className='stroke'>{this.props.playgolf.stroke}</p>
                                </div>
                            }
                        </div>
                        { this.state.isEditing ? 
                            <div className='buttons'>
                                <button className='save-button' onClick={this.submitSave}>Save</button>
                                <button className='remove-button' onClick={() => this.props.removeFn(this.props.playgolf.id)}>Remove</button>
                            </div>
                            : 
                            null 
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default ListGolf