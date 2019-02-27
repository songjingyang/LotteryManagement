import React from 'react'
import { Button, Popover, Radio, Card } from 'antd'
import { connect } from 'dva'
const RadioGroup = Radio.Group
@connect(({ global }) => ({
  global,
}))
export default class LetterNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedId: '',
      letter: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'global/getLetterNav',
      paylaod: {},
    })
  }
  onChangeLetter = key => () => {
    this.setState({ letter: key })
  }
  onChange = e => {
    this.setState({ checkedId: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.checkedId)
      }
    })
  }
  render() {
    const letterNav = this.props.global.letterNav
    const letterArr = Object.keys(letterNav)
    let currLetter = this.state.letter
    if (!currLetter && letterArr.length) {
      currLetter = letterArr[0]
    }
    return (
      <div>
        {letterArr.map((key, index) => (
          <Button
            key={index}
            style={{ margin: 8 }}
            onClick={this.onChangeLetter(key)}
            type={key === currLetter ? 'primary' : 'default'}
          >
            {key}
          </Button>
        ))}
        {letterArr.map((key, index) => {
          return (
            currLetter === key && (
              <Card style={{ borderRadius: '20px' }} key={index}>
                <div style={{ minHeight: 80, minWidth: 300 }}>
                  <RadioGroup
                    key={index}
                    onChange={this.onChange}
                    value={this.state.checkedId}
                    buttonStyle="solid"
                  >
                    {letterNav[key].map(item => (
                      <Radio.Button
                        key={item.id}
                        value={item.id}
                        style={{ margin: '10px' }}
                      >
                        {item.nickname}
                      </Radio.Button>
                    ))}
                  </RadioGroup>
                </div>
              </Card>
            )
          )
        })}
      </div>
    )
  }
}
