import React, { Component } from 'react'

import golfData from '../golf.json'

import '../Styles/createForm.css'

class Golf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: golfData,
            slopes: [],
            course: '',
            courseSelect: '',
            slopeSelect: '',
            strokeInput: 0,
            canClicked: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCourse(course) {
        course !== '' && this.state.slopeSelect !== '' && this.state.strokeInput !== 0 ? this.setState({ canClicked : true}): this.setState({ canClicked: false})
        const index = course !== '' ? this.state.courses.findIndex(e => e.course === course): null
        const slope = index !== null ? this.state.courses[index].slopes.men : []

        this.setState({
            courseSelect: course,
            course: this.state.courses[index],
            slopes: slope
        })

        document.getElementById('select-slope').disabled = course !== '' ? false : true
    }

    handleChangeSlope(slope) {
        slope !== '' && this.state.strokeInput !== 0 && this.state.courseSelect !== '' ? this.setState({ canClicked : true}): this.setState({ canClicked: false})
        const index = this.state.slopes.findIndex(e => e.color === slope)
        const slopeObj = this.state.slopes[index]
        this.setState({
            slopeSelect: slopeObj
        })
        document.getElementById('input-stroke').disabled = slope !== '' ? false : true
    }

    handleChangeStroke(stroke) {
        stroke !== 0 && this.state.slopeSelect !== '' && this.state.courseSelect !== '' ? this.setState({ canClicked : true}): this.setState({ canClicked: false})
        this.setState({
            strokeInput: stroke,
        })
    }

    handleSubmit() {
        let newPlay = {
            course: this.state.course,
            slope: this.state.slopeSelect,
            stroke: this.state.strokeInput
        }

        if (this.state.canClicked) this.props.newPlayFn(newPlay)
    }

    handleClick(event) {
        if(this.state.canClicked){
            this.handleSubmit()
        } else {
            event.preventDefault()
        }
    }


    render() {
        const course = this.state.courses.map(cou => {
            return (
                <option key={cou.id} value={cou.course}>
                    {cou.course}
                </option>
            )
        })
        const slope = this.state.slopes.map(slope => {
            return (
                <option key={slope.color} value={slope.color}>
                    {slope.color}
                </option>
            )
        })

        return (
            <div className='middle-content'>
            <div className='form-content'>
                <form onSubmit={this.handleClick}>
                    <select className='select-course' onChange={e => this.handleChangeCourse(e.target.value)}>
                        <option value='' >Select Courses</option>
                        {course}
                    </select>
                    <select id='select-slope' disabled='disabled' style={{cursor: this.state.courseSelect !== '' ? 'initial' : 'no-drop'}}className='select-slope' onChange={e => this.handleChangeSlope(e.target.value)}>
                        <option value=''>Select Slopes</option>
                        {slope}
                    </select>
                    <span><span className='stroke-title'>Strokes: </span><input id='input-stroke' className='input-stroke' type='number' onChange={e => this.handleChangeStroke(e.target.valueAsNumber)}/><span> 18 holes</span></span>
                    <input type='submit' id='submit-button' className='submit-button' value='Submit'/>
                </form>
            </div>
            </div>
        )
    }
}

export default Golf